// Lines.js
import React, { useState, useRef, useEffect } from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import './Lines.css';

const Lines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  const audioRefs = useRef([]);
  const isUserInteracted = useRef(false);
  const pausedIndex = useRef(null);

  // Demo Data
  const linesData = [
    {
      id: 1,
      image: 'https://picsum.photos/id/1015/1080/1920',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'The Last Sunset',
      writer: 'Emily Rose',
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/237/1080/1920',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'Whispers in the Rain',
      writer: 'Michael Chen',
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/201/1080/1920',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'Silent Mountains',
      writer: 'Sarah Khan',
    },
    {
      id: 4,
      image: 'https://picsum.photos/id/133/1080/1920',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      title: 'City Lights',
      writer: 'Ahmed Hassan',
    },
    {
      id: 5,
      image: 'https://picsum.photos/id/180/1080/1920',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      title: 'Ocean Dreams',
      writer: 'Priya Sharma',
    },
  ];

  // Auto-play logic with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          const audio = audioRefs.current[index];

          if (entry.isIntersecting) {
            setCurrentIndex(index);

            // Only auto-play if user didn't manually pause OR if it's a new card
            if (audio && !manuallyPaused) {
              audio.play().catch(() => {});
            }
          } else {
            if (audio) {
              audio.pause();
            }
          }
        });
      },
      { threshold: 0.65 }
    );

    const cards = document.querySelectorAll('.line-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [manuallyPaused]);

  // Toggle Play/Pause on Image Click
  const handleImageClick = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    isUserInteracted.current = true;

    if (currentIndex === index) {
      if (audio.paused) {
        // Resume playing
        audio.play().catch(() => {});
        setManuallyPaused(false);
      } else {
        // Pause manually
        audio.pause();
        setManuallyPaused(true);
      }
    }
  };

  // Reset manual pause when scrolling to a completely new card
  useEffect(() => {
    if (currentIndex !== pausedIndex) {
      setManuallyPaused(false);
    }
  }, [currentIndex]);

  return (
    <div className="lines-page">
      <div className="lines-wrapper">
        {linesData.map((line, index) => (
          <div
            key={line.id}
            className="line-card"
            data-index={index}
          >
            {/* Background Image - Click to toggle audio */}
            <img
              src={line.image}
              alt={line.title}
              className="line-image"
              onClick={() => handleImageClick(index)}
            />

            {/* Audio Element */}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={line.audio}
              loop
            />

            {/* Overlay */}
            <div className="line-overlay">
              <div className="line-info">
                <h2 className="line-title">{line.title}</h2>
                <p className="line-writer">by {line.writer}</p>
              </div>

              {/* Play Status */}
              {currentIndex === index && (
                <div className="play-status">
                  {manuallyPaused ? '⏸ Paused - Tap image to resume' : '▶️ Playing'}
                </div>
              )}

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: currentIndex === index && !manuallyPaused ? '100%' : '0%',
                    transition: currentIndex === index && !manuallyPaused 
                      ? 'width 10s linear' 
                      : 'none',
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bottom-info">
              <div className="action-buttons">
                <button className="action-btn">❤️</button>
                <button className="action-btn">💬</button>
                <button className="action-btn">↗️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="lines-header">
        <h1 className="lines-logo">Lines</h1>
        <p className="lines-subtitle">Scroll • Listen • Feel</p>
      </div>
        <BottomNav />
    </div>
  );
};

export default Lines;