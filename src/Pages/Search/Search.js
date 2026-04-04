// SearchPage.js
import React, { useState } from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import './Search.css';

const SearchPage = () => {
  // Sample story data
  const [allStories] = useState([
    {
      _id: '1',
      title: 'The Last Letter',
      imageUrl: 'https://picsum.photos/id/20/300/200',
      duration: '12 min read',
      status: 'Completed',
      writer: 'Emily Hart',
      category: 'love story'
    },
    {
      _id: '2',
      title: 'Echoes of the Past',
      imageUrl: 'https://picsum.photos/id/22/300/200',
      duration: '8 min read',
      status: 'Ongoing',
      writer: 'Michael Chen',
      category: 'sad'
    },
    {
      _id: '3',
      title: 'Steve Jobs: The Visionary',
      imageUrl: 'https://picsum.photos/id/0/300/200',
      duration: '15 min read',
      status: 'Completed',
      writer: 'Walter Isaacson',
      category: 'famaus people'
    },
    {
      _id: '4',
      title: 'The Midnight Library',
      imageUrl: 'https://picsum.photos/id/24/300/200',
      duration: '10 min read',
      status: 'Completed',
      writer: 'Matt Haig',
      category: 'noval'
    },
    {
      _id: '5',
      title: 'When We Collided',
      imageUrl: 'https://picsum.photos/id/26/300/200',
      duration: '9 min read',
      status: 'Completed',
      writer: 'Emery Lord',
      category: 'love story'
    },
    {
      _id: '6',
      title: 'A Grief Observed',
      imageUrl: 'https://picsum.photos/id/29/300/200',
      duration: '6 min read',
      status: 'Completed',
      writer: 'C.S. Lewis',
      category: 'sad'
    },
    {
      _id: '7',
      title: 'Einstein: His Life',
      imageUrl: 'https://picsum.photos/id/1/300/200',
      duration: '14 min read',
      status: 'Ongoing',
      writer: 'Walter Isaacson',
      category: 'famaus people'
    },
    {
      _id: '8',
      title: 'The Silent Patient',
      imageUrl: 'https://picsum.photos/id/28/300/200',
      duration: '11 min read',
      status: 'Completed',
      writer: 'Alex Michaelides',
      category: 'noval'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Stories', key: 'all' },
    { id: 'love', name: 'Love Story', key: 'love story' },
    { id: 'sad', name: 'Sad', key: 'sad' },
    { id: 'famous', name: 'Famous People', key: 'famaus people' },
    { id: 'novel', name: 'Novel', key: 'noval' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter stories based on search query and selected category
  const filteredStories = allStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.writer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="stories-container">
        {filteredStories.length > 0 ? (
          <div className="stories-grid">
            {filteredStories.map(story => (
              <div key={story._id} className="story-card">
                <div className="story-image-wrapper">
                  <img src={story.imageUrl} alt={story.title} className="story-image" />
                  <span className={`story-status ${story.status.toLowerCase()}`}>
                    {story.status}
                  </span>
                </div>
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <div className="story-meta">
                    <span className="story-writer">By {story.writer}</span>
                    <span className="story-duration">{story.duration}</span>
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