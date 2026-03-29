import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaHeart, FaShare, FaTimes } from 'react-icons/fa';
import BottomNav from '../BottomNav/BottomNav';
import './player.css';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReadText, setShowReadText] = useState(false);
  
  const audioRef = useRef(null);

  // Current story data with text content
  const currentStory = {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    narrator: "Carey Mulligan",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop",
    duration: "8:30:00",
    description: "Between life and death there is a library...",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    textContent: `The Midnight Library

Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.

The books in the Midnight Library enable Nora to live as if she had done things differently. With the help of an old friend, she can now undo every decision she regrets as she tries to work out her perfect life. But things don't go as she expects.

Each book provides a different life experience - a chance to try out other versions of herself. As she explores these parallel lives, she discovers that the life she thought was full of regrets might actually be more meaningful than she ever imagined.

This is a story about what might have been, what could be, and what already is. It's about the choices we make and the lives we lead. Most importantly, it's about realizing that there's no such thing as a perfect life, but there is such a thing as a life worth living.

Join Nora on her journey through the Midnight Library, where every book contains a different possibility, and where she must find her own way back to the life she truly wants to live.`
  };

  // Related stories
  const relatedStories = [
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=150&h=150&fit=crop",
      duration: "5h 20m"
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=150&fit=crop",
      duration: "16h 45m"
    },
    {
      id: 4,
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=150&fit=crop",
      duration: "4h 15m"
    },
    {
      id: 5,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop",
      duration: "12h 15m"
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      image: "https://images.unsplash.com/photo-1506462945846-9d9d4c6a0d6f?w=150&h=150&fit=crop",
      duration: "9h 45m"
    },
    {
      id: 7,
      title: "Dune",
      author: "Frank Herbert",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=150&h=150&fit=crop",
      duration: "21h 30m"
    },
    {
      id: 8,
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150&h=150&fit=crop",
      duration: "15h 20m"
    },
    {
      id: 9,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&h=150&fit=crop",
      duration: "10h 15m"
    },
    {
      id: 10,
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&h=150&fit=crop",
      duration: "11h 30m"
    },
    {
      id: 11,
      title: "Malibu Rising",
      author: "Taylor Jenkins Reid",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop",
      duration: "9h 45m"
    }
  ];

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
    alert(`Opening: ${story.title} by ${story.author}`);
  };

  return (
    <>
      <div className="audio-player-container">
        {/* Audio Element */}
        <audio ref={audioRef} src={currentStory.audioUrl} />

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
            <img src={currentStory.image} alt={currentStory.title} className="player-image-large" />
            <div className="image-overlay"></div>
          </div>

          {/* Story Info */}
          <div className="story-info">
            <h1 className="story-title">{currentStory.title}</h1>
            <p className="story-author">By {currentStory.author}</p>
            <p className="story-narrator">Narrated by {currentStory.narrator}</p>
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
              📖 Read Text
            </button>
            <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
              <FaHeart /> {isLiked ? 'Liked' : 'Like'}
            </button>
            <button className="action-btn" onClick={handleShare}>
              <FaShare /> Share
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
            {relatedStories.map(story => (
              <div key={story.id} className="related-card" onClick={() => handleStoryClick(story)}>
                <div className="related-image">
                  <img src={story.image} alt={story.title} />
                  <div className="play-overlay">
                    <FaPlay className="play-icon" />
                  </div>
                </div>
                <div className="related-info">
                  <h4 className="related-title">{story.title}</h4>
                  <p className="related-author">{story.author}</p>
                  <span className="related-duration">⏱️ {story.duration}</span>
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