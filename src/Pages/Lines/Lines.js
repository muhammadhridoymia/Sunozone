// Lines.js
import React, { useState, useRef, useEffect } from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { GetLinesApi } from '../../Api/LinesApi';

import './Lines.css';

const Lines = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  const audioRefs = useRef([]);
  const isUserInteracted = useRef(false);
  const pausedIndex = useRef(null);

  const [linesData, setLinesData] = useState([]);

  // Fetch lines data from API
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
        {linesData?.map((line, index) => (
          <div
            key={line._id}
            className="line-card"
            data-index={index}
          >
            {/* Background Image - Click to toggle audio */}
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
                <button className="action-btn">❤️ <small>{line.likes || 0}</small></button>
                <button className="action-btn">💬 <small>{line.comments || 0}</small></button>
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