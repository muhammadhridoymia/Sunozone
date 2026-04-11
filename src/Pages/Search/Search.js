// SearchPage.js
import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { SearchApi } from '../../Api/SearchStoryApi';
import './Search.css';

const SearchPage = () => {
  const navigate = useNavigate();

  // Most Searched Stories State 
  const [mostSearched, setMostSearched] = useState([]);
  useEffect(() => {
    const fetchMostSearched = async () => {
      try {
        const data = await SearchApi();
        setMostSearched(data);
      } catch (error) {
        console.error('Failed to fetch most searched stories:', error);
      }
    };

    fetchMostSearched();
  }, []);

  const categories = [
    { id: 'all', name: 'All Stories', key: 'all' },
    { id: 'love', name: 'Love Story', key: 'love story' },
    { id: 'sad', name: 'Sad', key: 'sad' },
    { id: 'famous', name: 'Famous People', key: 'famaus people' },
    { id: 'novel', name: 'Novel', key: 'noval' }
  ];

  const handleStoryClick = (story) => {
    navigate(`/player/${story._id}`);
  };


  return (
    <div className="search-page">
      {/* Header with Logo */}
      <header className="search-header">
        <div className="logo-container">
          <h1 className="logo">ShonoZone</h1>
        </div>
        
        {/* Centered Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search stories by title or writer..."
          />
          <button className="search-button">
            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Search
          </button>
        </div>
        
        <div className="header-placeholder"></div>
      </header>

      {/* Category Bar */}
      <div className="category-bar">
        <div className="category-wrapper">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn`}            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="stories-container">
        {mostSearched.length > 0 ? (
          <div className="stories-grid"
          >
            {mostSearched.map(story => (
              <div key={story._id} className="story-card" onClick={() => handleStoryClick(story)}>
                <div className="story-image-wrapper">
                  <img src={story.imageUrl} alt={story.title} className="story-image" />
                </div>
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <div className="story-meta">
                    <span className="story-writer">writer {story.writer}</span>
                    <span className="story-duration">🎧{story.duration}m</span>
                    <span className='story-view'>{story.status.views || 0} views</span>
                    <span className='story-like'>{story.status.likes || 0} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <h3>No stories found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
        <BottomNav />
    </div>
  );
};

export default SearchPage;