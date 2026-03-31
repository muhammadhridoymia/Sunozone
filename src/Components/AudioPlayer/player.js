import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import audio from '../AudioPlayer/auidos.mp3'; // Placeholder audio file
import { FaPlay, FaPause, FaForward, FaBackward, FaHeart, FaShare, FaTimes } from 'react-icons/fa';
import BottomNav from '../BottomNav/BottomNav';
import { useApi } from '../../Context/apiContext';
import { SkeletonCard } from '../../LoadingUI/Skeleton/SkeletonCard';
import './player.css';

const AudioPlayer = () => {
  const { TopStories ,loading} = useApi();
  const location = useLocation();
  const story = location.state?.story;

  const [currentStory,setCurrentStory] = useState(story);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReadText, setShowReadText] = useState(false);
  
  const audioRef = useRef(null);


  // Related stories will replace this with actual logic to fetch related stories based on currentStory
  const relatedStories = TopStories

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('ended', () => {});
      };
    }
  }, []);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 30, 0);
    }
  };

  const handleReadText = () => {
    setShowReadText(true);
  };

  const closeReadText = () => {
    setShowReadText(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    alert(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    alert(`Sharing: ${currentStory.title} by ${currentStory.author}`);
  };

  const handleStoryClick = (story) => {
  setCurrentStory(story);
  setCurrentTime(0);
  setIsPlaying(false);

  if (audioRef.current) {
    audioRef.current.pause();
  }
};

  return (
    <>
      <div className="audio-player-container">
        {/* Audio Element */}
        <audio ref={audioRef} src={currentStory.audio.bangla.url} />

        {/* Read Text Modal */}
        {showReadText && (
          <div className="read-text-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{currentStory.title}</h2>
                <button className="close-modal" onClick={closeReadText}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="text-content">
                  {currentStory.textContent.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="player-main">
          {/* Top Image - Large Size */}
          <div className="player-image-container-large">
            <img src={currentStory.imageUrl} alt={currentStory.title} className="player-image-large" />
            <div className="image-overlay"></div>
          </div>

          {/* Story Info */}
          <div className="story-info">
            <h1 className="story-title">{currentStory.title}</h1>
            <p className="story-author">By {currentStory.writer.name}</p>
            <p className="story-narrator">Narrated by Sono Zone</p>
          </div>

          {/* Seek Bar */}
          <div className="seek-bar-container">
            <div className="time-info">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              className="seek-bar"
              value={currentTime}
              max={duration || 0}
              onChange={handleProgressChange}
              step="0.1"
            />
          </div>

          {/* Player Controls */}
          <div className="player-controls">
            <button className="control-btn" onClick={skipBackward}>
              <FaBackward />
              <span>30</span>
            </button>
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="control-btn" onClick={skipForward}>
              <FaForward />
              <span>30</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn read-text-btn" onClick={handleReadText}>
              Read
            </button>
            <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
              <FaHeart /> {isLiked ? 'Liked' : 'Like'}
            </button>
            <button className="action-btn" onClick={handleShare}>
              <FaShare /> Share
            </button>
            <button className="action-btn" onClick={handleShare}>
             Add to Playlist
            </button>
            <button className="action-btn" onClick={handleShare}>
               Comment
            </button>
          </div>
        </div>

        {/* Related Stories Section */}
        <div className="related-stories">
          <div className="related-header">
            <h2>Recommended for You</h2>
            <p>Based on your listening history</p>
          </div>
          
          <div className="related-grid">
            {loading?Array(9).fill().map((_, i) => <SkeletonCard key={i} />):
            relatedStories.map(story => (
              <div key={story._id} className="related-card" onClick={() => handleStoryClick(story)}>
                <div className="related-image">
                  <img src={story.imageUrl} alt={story.title} />
                  <div className="play-overlay">
                    <FaPlay className="play-icon" />
                  </div>
                </div>
                <div className="related-info">
                  <h4 className="related-title">{story.title}</h4>
                  <p className="related-author">{story.author}</p>
                  <span className="related-duration">⏱️ {story.audio.bangla.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
};

export default AudioPlayer;