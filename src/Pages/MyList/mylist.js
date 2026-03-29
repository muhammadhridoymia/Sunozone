import React, { useState } from 'react';
import BottomNav from '../../Components/BottomNav/BottomNav';
import './mylist.css';

const MyList = () => {
  // State for saved stories with images
  const [savedStories, setSavedStories] = useState([
    { 
      id: 1, 
      title: "The Midnight Library", 
      author: "Matt Haig",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=100&fit=crop"
    },
    { 
      id: 2, 
      title: "Atomic Habits", 
      author: "James Clear",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop"
    },
    { 
      id: 3, 
      title: "Project Hail Mary", 
      author: "Andy Weir",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop"
    },
    { 
      id: 4, 
      title: "The Alchemist", 
      author: "Paulo Coelho",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop"
    },
    { 
      id: 5, 
      title: "Where the Crawdads Sing", 
      author: "Delia Owens",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop"
    }
  ]);

  const handleRemove = (id) => {
    if (window.confirm('Remove this story from your list?')) {
      setSavedStories(savedStories.filter(story => story.id !== id));
    }
  };

  const handleShare = (story) => {
    alert(`📤 Sharing: ${story.title} by ${story.author}`);
  };

  return (
    <>
      <div className="mylist-simple">
        {/* Header */}
        <div className="header-simple">
          <h1>📚 My List</h1>
          <p>{savedStories.length} saved stories</p>
        </div>

        {/* Stories List */}
        {savedStories.length > 0 ? (
          <div className="list-simple">
            {savedStories.map(story => (
              <div key={story.id} className="list-item">
                {/* Circular Image */}
                <div className="item-image">
                  <img src={story.image} alt={story.title} />
                </div>
                
                {/* Story Info */}
                <div className="item-info">
                  <h3 className="item-title">{story.title}</h3>
                  <p className="item-author">{story.author}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="item-buttons">
                  <button 
                    className="share-btn-simple"
                    onClick={() => handleShare(story)}
                    title="Share"
                  >
                    Share
                  </button>
                  <button 
                    className="remove-btn-simple"
                    onClick={() => handleRemove(story.id)}
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state-simple">
            <div className="empty-icon">📚</div>
            <h3>Your list is empty</h3>
            <p>Start saving your favorite stories</p>
            <button 
              className="explore-btn-simple"
              onClick={() => window.location.href = '/home'}
            >
              Explore Stories
            </button>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
};

export default MyList;