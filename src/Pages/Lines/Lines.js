import React, { useState, useRef, useEffect } from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { GetLinesApi } from '../../Api/LinesApi';
import './Lines.css';

const Lines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [linesData, setLinesData] = useState([]);
  const [currentTime, setCurrentTime] = useState({}); // Track progress for UI updates

  const audioRefs = useRef([]);
  const containerRef = useRef(null);

  // 1. Fetch data
  useEffect(() => {
    const fetchLines = async () => {
      try {
        const data = await GetLinesApi();
        setLinesData(data);
      } catch (error) {
        console.error('Failed to fetch lines:', error);
      }
    };
    fetchLines();
  }, []);

  // 2. Intersection Observer for Scrolling
  useEffect(() => {
    if (linesData.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index'));
          const audio = audioRefs.current[index];

          if (entry.isIntersecting) {
            setCurrentIndex(index);
            setManuallyPaused(false); // Reset pause state on new scroll

            if (audio) {
              audio.play().catch((err) => console.log("Autoplay blocked:", err));
            }
          } else {
            if (audio) {
              audio.pause();
              audio.currentTime = 0; // Optional: Reset track on scroll away
            }
          }
        });
      },
      { threshold: 0.7 } // Higher threshold for better accuracy
    );

    const cards = document.querySelectorAll('.line-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [linesData]); // Only re-run if data changes

  // 3. Handle Play/Pause
  const handleImageClick = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setManuallyPaused(false);
    } else {
      audio.pause();
      setManuallyPaused(true);
    }
  };

  // 4. Update Progress Bar
  const handleTimeUpdate = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      setCurrentTime((prev) => ({
        ...prev,
        [index]: audio.currentTime,
      }));
    }
  };

  return (
    <div className="lines-page" ref={containerRef}>
      <div className="lines-wrapper">
        {linesData?.map((line, index) => (
          <div
            key={line._id || index}
            className="line-card"
            data-index={index}
          >
            {/* Background Image */}
            <img
              src={line.imageUrl}
              alt={line.title}
              className="line-image"
              onClick={() => handleImageClick(index)}
            />

            {/* Audio Element */}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={line.audio}
              loop
              onTimeUpdate={() => handleTimeUpdate(index)}
            />

            {/* Overlay */}
            <div className="line-overlay">
              <div className="line-info">
                <h2 className="line-title">{line.title}</h2>
                <p className="line-writer">by {line.writer}</p>
              </div>

              {/* Play Status UI */}
              {currentIndex === index && (
                <div className="play-status">
                  {manuallyPaused ? '⏸ Paused' : '▶ Playing'}
                </div>
              )}

              {/* Progress Bar */}
              <div className="progress-bar-container">
                <input
                  type="range"
                  min="0"
                  max={audioRefs.current[index]?.duration || 0}
                  value={currentTime[index] || 0}
                  step="0.1"
                  onChange={(e) => {
                    const audio = audioRefs.current[index];
                    if (audio) {
                      audio.currentTime = parseFloat(e.target.value);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent triggering image click
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bottom-info">
              <div className="action-buttons">
                <button className="action-btn">❤️ <small>{line.likes || 0}</small></button>
                <button className="action-btn">💬 <small>{line.comments || 0}</small></button>
                <button className="action-btn">↗️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lines-header">
        <h1 className="lines-logo">Lines</h1>
        <p className="lines-subtitle">Scroll • Listen • Feel</p>
      </div>
      <BottomNav />
    </div>
  );
};

export default Lines;