// Lines.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { GetLinesApi } from '../../Api/LinesApi';
import './Lines.css';

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${('0' + Math.floor(s % 60)).slice(-2)}`;
};

const Lines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState({});   // { [index]: { current, duration } }
  const [linesData, setLinesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const audioRefs = useRef([]);
  const flashRefs = useRef([]);
  const wrapperRef = useRef(null);

  const triggerFlash = (index) => {
    const el = flashRefs.current[index];
    if (!el) return;
    el.classList.remove('tap-flash--animate');
    void el.offsetWidth;
    el.classList.add('tap-flash--animate');
  };

  // ── Fetch ──────────────────────────────────────────────
  useEffect(() => {
    const fetchLines = async () => {
      setLoading(true);
      try {
        const data = await GetLinesApi();
        setLinesData(data);
      } catch (err) {
        console.error('Failed to fetch lines:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLines();
  }, []);

  // ── Pause every audio except one ──────────────────────
  const pauseAll = useCallback((exceptIndex = -1) => {
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== exceptIndex) audio.pause();
    });
  }, []);

  // ── Intersection Observer (auto-play on scroll) ────────
  useEffect(() => {
    if (!linesData.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          const audio = audioRefs.current[index];

          if (entry.isIntersecting) {
            setCurrentIndex(index);
            pauseAll(index);
            if (audio) {
              audio.play()
                .then(() => setPlayingIndex(index))
                .catch(() => {});
            }
          } else {
            if (audio && !audio.paused) {
              audio.pause();
              setPlayingIndex((prev) => (prev === index ? null : prev));
            }
          }
        });
      },
      { threshold: 0.65, root: wrapperRef.current }
    );

    const cards = document.querySelectorAll('.line-card');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [linesData, pauseAll]);

  // ── Image click: always restart from 0, then toggle play/stop ──
  const handleImageClick = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (!audio.paused) {
      // Currently playing → stop and reset to start
      audio.pause();
      audio.currentTime = 0;
      setPlayingIndex(null);
      setProgress((p) => ({
        ...p,
        [index]: { ...p[index], current: 0 },
      }));
      triggerFlash(index);
    } else {
      // Currently stopped → restart from beginning
      pauseAll(index);
      audio.currentTime = 0;
      setProgress((p) => ({
        ...p,
        [index]: { ...p[index], current: 0 },
      }));
      audio.play()
        .then(() => setPlayingIndex(index))
        .catch(() => {});
      triggerFlash(index);
    }
  };

  // ── Play / Pause toggle (bottom control button only) ──
  const handlePlayPause = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (audio.paused) {
      pauseAll(index);
      audio.play()
        .then(() => setPlayingIndex(index))
        .catch(() => {});
    } else {
      audio.pause();
      setPlayingIndex(null);
    }
  };

  // ── Seek ───────────────────────────────────────────────
  const handleSeek = (e, index) => {
    e.stopPropagation();
    const audio = audioRefs.current[index];
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
    setProgress((p) => ({
      ...p,
      [index]: { ...p[index], current: pct * audio.duration },
    }));
  };

  // ── Time update ────────────────────────────────────────
  const handleTimeUpdate = (e, index) => {
    setProgress((p) => ({
      ...p,
      [index]: {
        current: e.target.currentTime,
        duration: e.target.duration || 0,
      },
    }));
  };

  const handleMetadata = (e, index) => {
    setProgress((p) => ({
      ...p,
      [index]: { current: 0, duration: e.target.duration || 0 },
    }));
  };

  const getPct = (index) => {
    const p = progress[index];
    if (!p || !p.duration) return 0;
    return Math.min(100, (p.current / p.duration) * 100);
  };

  const isPlaying = (index) => playingIndex === index;

  if (loading) {
    return (
      <div className="lines-page lines-loading">
        <div className="loader-ring" />
        <p>Loading lines…</p>
      </div>
    );
  }

  return (
    <div className="lines-page">
      {/* Header */}
      <div className="lines-header">
        <h1 className="lines-logo">Lines</h1>
        <p className="lines-subtitle">Scroll · Listen · Feel</p>
      </div>

      <div className="lines-wrapper" ref={wrapperRef}>
        {linesData?.map((line, index) => (
          <div
            key={line._id}
            className="line-card"
            data-index={index}
          >
            {/* Background image — tap to restart / stop */}
            <img
              src={line.imageUrl}
              alt={line.title}
              className="line-image"
              draggable={false}
              onClick={() => handleImageClick(index)}
            />

            {/* Centre flash icon shown briefly on tap */}
            <div
              className="tap-flash"
              ref={(el) => (flashRefs.current[index] = el)}
            >
              {isPlaying(index) ? <PlayIcon /> : <PauseIcon />}
            </div>

            {/* Hidden audio */}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={line.audioUrl || line.audio}
              loop
              onTimeUpdate={(e) => handleTimeUpdate(e, index)}
              onLoadedMetadata={(e) => handleMetadata(e, index)}
              onPlay={() => setPlayingIndex(index)}
              onPause={() => setPlayingIndex((prev) => (prev === index ? null : prev))}
            />

            {/* Bottom overlay */}
            <div className="line-overlay">
              <div className="line-info">
                <h2 className="line-title">{line.title}</h2>
                <p className="line-writer">by {line.writer}</p>
              </div>

              {/* Controls */}
              <div className="controls-row">
                <button
                  className={`pp-btn ${isPlaying(index) ? 'pp-btn--playing' : ''}`}
                  onClick={() => handlePlayPause(index)}
                  aria-label={isPlaying(index) ? 'Pause' : 'Play'}
                >
                  {isPlaying(index) ? <PauseIcon /> : <PlayIcon />}
                </button>

                <div
                  className="seekbar-wrap"
                  onClick={(e) => handleSeek(e, index)}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(getPct(index))}
                  aria-label="Seek"
                >
                  <div className="seekbar-track">
                    <div
                      className="seekbar-fill"
                      style={{ width: `${getPct(index)}%` }}
                    />
                  </div>
                  <div
                    className="seekbar-thumb"
                    style={{ left: `${getPct(index)}%` }}
                  />
                </div>

                <span className="time-label">
                  {fmt(progress[index]?.current)} / {fmt(progress[index]?.duration)}
                </span>
              </div>
            </div>

            {/* Side action buttons */}
            <div className="action-buttons">
              <button className="action-btn">
                <span className="action-icon">♥</span>
                <small>{line.likes || 0}</small>
              </button>
              <button className="action-btn">
                <span className="action-icon">💬</span>
                <small>{line.comments || 0}</small>
              </button>
              <button className="action-btn">
                <span className="action-icon">↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Lines;