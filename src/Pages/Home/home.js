import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../Components/BottomNav/BottomNav';
import './home.css';

const Home = () => {
    const navigate = useNavigate();
  // Refs for scrollable containers
  const topStoriesRef = useRef(null);
  const weekStoriesRef = useRef(null);
  const monthStoriesRef = useRef(null);
  const yearStoriesRef = useRef(null);

  // Real story data with actual images from Unsplash
  const topStories = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      reads: "125K",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      description: "Between life and death there is a library...",
      duration: "8h 30m"
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      reads: "98.5K",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A mysterious murder in the marshes...",
      duration: "12h 15m"
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      reads: "87.2K",
      image: "https://images.unsplash.com/photo-1506462945846-9d9d4c6a0d6f?w=400&h=300&fit=crop",
      description: "A woman's act of violence and her silence...",
      duration: "9h 45m"
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      reads: "156K",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Tiny changes, remarkable results...",
      duration: "5h 20m"
    },
    {
      id: 5,
      title: "The Alchemist",
      author: "Paulo Coelho",
      reads: "234K",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      description: "A journey of self-discovery...",
      duration: "4h 15m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      reads: "167K",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=300&fit=crop",
      description: "The epic sci-fi masterpiece...",
      duration: "21h 30m"
    },
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      reads: "125K",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      description: "Between life and death there is a library...",
      duration: "8h 30m"
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      reads: "98.5K",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A mysterious murder in the marshes...",
      duration: "12h 15m"
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      reads: "87.2K",
      image: "https://images.unsplash.com/photo-1506462945846-9d9d4c6a0d6f?w=400&h=300&fit=crop",
      description: "A woman's act of violence and her silence...",
      duration: "9h 45m"
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      reads: "156K",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Tiny changes, remarkable results...",
      duration: "5h 20m"
    },
    {
      id: 5,
      title: "The Alchemist",
      author: "Paulo Coelho",
      reads: "234K",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      description: "A journey of self-discovery...",
      duration: "4h 15m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      reads: "167K",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=300&fit=crop",
      description: "The epic sci-fi masterpiece...",
      duration: "21h 30m"
    }
  ];

  const bestOfWeek = [
    {
      id: 7,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      description: "A lone astronaut must save humanity...",
      trend: "+47%"
    },
    {
      id: 8,
      title: "The Four Winds",
      author: "Kristin Hannah",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      description: "A story of resilience during the Dust Bowl...",
      trend: "+32%"
    },
    {
      id: 9,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
      description: "An AI's perspective on human love...",
      trend: "+28%"
    },
    {
      id: 10,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
      description: "A woman who lives for centuries...",
      trend: "+56%"
    },
    {
      id: 11,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400&h=300&fit=crop",
      description: "A tale of gods and heroes...",
      trend: "+41%"
    },
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      reads: "125K",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      description: "Between life and death there is a library...",
      duration: "8h 30m"
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      reads: "98.5K",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A mysterious murder in the marshes...",
      duration: "12h 15m"
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      reads: "87.2K",
      image: "https://images.unsplash.com/photo-1506462945846-9d9d4c6a0d6f?w=400&h=300&fit=crop",
      description: "A woman's act of violence and her silence...",
      duration: "9h 45m"
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      reads: "156K",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Tiny changes, remarkable results...",
      duration: "5h 20m"
    },
    {
      id: 5,
      title: "The Alchemist",
      author: "Paulo Coelho",
      reads: "234K",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      description: "A journey of self-discovery...",
      duration: "4h 15m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      reads: "167K",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=300&fit=crop",
      description: "The epic sci-fi masterpiece...",
      duration: "21h 30m"
    }
  ];

  const bestOfMonth = [
    {
      id: 12,
      title: "The Vanishing Half",
      author: "Brit Bennett",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
      description: "Twin sisters who choose different paths...",
      reads: "45K"
    },
    {
      id: 13,
      title: "Malibu Rising",
      author: "Taylor Jenkins Reid",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A famous family's wild party...",
      reads: "38K"
    },
    {
      id: 14,
      title: "The Paris Library",
      author: "Janet Skeslien Charles",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
      description: "A love letter to books and libraries...",
      reads: "32K"
    },
    {
      id: 15,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
      description: "A Hollywood icon's story...",
      reads: "52K"
    },
    {
      id: 16,
      title: "Circe",
      author: "Madeline Miller",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&h=300&fit=crop",
      description: "The goddess of magic speaks...",
      reads: "41K"
    },
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      reads: "125K",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      description: "Between life and death there is a library...",
      duration: "8h 30m"
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      reads: "98.5K",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A mysterious murder in the marshes...",
      duration: "12h 15m"
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      reads: "87.2K",
      image: "https://images.unsplash.com/photo-1506462945846-9d9d4c6a0d6f?w=400&h=300&fit=crop",
      description: "A woman's act of violence and her silence...",
      duration: "9h 45m"
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      reads: "156K",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Tiny changes, remarkable results...",
      duration: "5h 20m"
    },
    {
      id: 5,
      title: "The Alchemist",
      author: "Paulo Coelho",
      reads: "234K",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      description: "A journey of self-discovery...",
      duration: "4h 15m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      reads: "167K",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=300&fit=crop",
      description: "The epic sci-fi masterpiece...",
      duration: "21h 30m"
    }
  ];

  const bestOfYear = [
    {
      id: 17,
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=300&fit=crop",
      description: "A story of friendship and creativity...",
      award: "🏆 Best Novel 2024"
    },
    {
      id: 18,
      title: "Demon Copperhead",
      author: "Barbara Kingsolver",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=400&h=300&fit=crop",
      description: "A modern retelling of David Copperfield...",
      award: "📚 Pulitzer Prize"
    },
    {
      id: 19,
      title: "Yellowface",
      author: "R.F. Kuang",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
      description: "A darkly humorous literary thriller...",
      award: "⭐ Best Thriller"
    },
    {
      id: 20,
      title: "The Covenant of Water",
      author: "Abraham Verghese",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      description: "A family epic spanning generations...",
      award: "🏆 Oprah's Book Club"
    },
    {
      id: 21,
      title: "Fourth Wing",
      author: "Rebecca Yarros",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop",
      description: "Dragons, magic, and romance...",
      award: "🔥 Most Read"
    },
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      reads: "125K",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      description: "Between life and death there is a library...",
      duration: "8h 30m"
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      reads: "98.5K",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      description: "A mysterious murder in the marshes...",
      duration: "12h 15m"
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      reads: "87.2K",
      image: "https://images.unsplash.com/photo-1506462945846-9d9d4c6a0d6f?w=400&h=300&fit=crop",
      description: "A woman's act of violence and her silence...",
      duration: "9h 45m"
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      reads: "156K",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      description: "Tiny changes, remarkable results...",
      duration: "5h 20m"
    },
    {
      id: 5,
      title: "The Alchemist",
      author: "Paulo Coelho",
      reads: "234K",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      description: "A journey of self-discovery...",
      duration: "4h 15m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      reads: "167K",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=300&fit=crop",
      description: "The epic sci-fi masterpiece...",
      duration: "21h 30m"
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      reads: "167K",
      image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=300&fit=crop",
      description: "The epic sci-fi masterpiece...",
      duration: "21h 30m"
    }
  ];

  const handleSearchClick = () => {
    alert('🔍 Search feature coming soon! Discover thousands of amazing stories.');
  };

  const handleStoryClick = (story) => {
    navigate('/player');
  };

  const handleSeeAllClick = (category) => {
    alert(`✨ See all ${category} stories - Discover more amazing tales!`);
  };

  const handleBannerClick = () => {
    alert('🎉 Welcome to StoryTime! Start your reading adventure today.');
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Header with Search Button */}
      <div className="header">
        <div className="logo-section">
          <h1 className="logo">Shono Zone</h1>
        </div>
        <button className="search-btn" onClick={handleSearchClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Search Stories
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Banner Section */}
        <div className="banner" onClick={handleBannerClick}>
          <div className="banner-content">
            <div className="banner-badge">✨ NEW</div>
            <h2>Discover Your Next Favorite Story</h2>
            <p>Listen or read thousands of captivating tales from amazing authors worldwide</p>
            <button className="banner-btn">Start Reading →</button>
          </div>
        </div>

        {/* Top Stories Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>🔥 Top Stories</h2>
              <p className="section-subtitle">Most popular this week</p>
            </div>
            <button className="see-all-btn" onClick={() => handleSeeAllClick('Top Stories')}>
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button className="scroll-btn left" onClick={() => scrollLeft(topStoriesRef)}>‹</button>
            <div className="stories-horizontal" ref={topStoriesRef}>
              {topStories.map(story => (
                <div key={story.id} className="story-card-horizontal" onClick={() => handleStoryClick(story)}>
                  <div className="story-image-wrapper">
                    <img src={story.image} alt={story.title} className="story-image" />
                    <div className="story-overlay">
                      <span className="listen-badge">🎧 {story.duration}</span>
                    </div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">{story.author}</p>
                    <div className="story-meta">
                      <span className="reads">📖 {story.reads} reads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight(topStoriesRef)}>›</button>
          </div>
        </section>

        {/* Best of Week Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>⭐ Best of Week</h2>
              <p className="section-subtitle">Editor's picks this week</p>
            </div>
            <button className="see-all-btn" onClick={() => handleSeeAllClick('Best of Week')}>
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button className="scroll-btn left" onClick={() => scrollLeft(weekStoriesRef)}>‹</button>
            <div className="stories-horizontal" ref={weekStoriesRef}>
              {bestOfWeek.map(story => (
                <div key={story.id} className="story-card-horizontal" onClick={() => handleStoryClick(story)}>
                  <div className="story-image-wrapper">
                    <img src={story.image} alt={story.title} className="story-image" />
                    <div className="rating-badge">⭐ {story.rating}</div>
                    <div className="trend-badge">{story.trend}</div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">{story.author}</p>
                    <p className="story-description">{story.description.substring(0, 60)}...</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight(weekStoriesRef)}>›</button>
          </div>
        </section>

        {/* Best of Month Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>🏆 Best of Month</h2>
              <p className="section-subtitle">Must-read masterpieces</p>
            </div>
            <button className="see-all-btn" onClick={() => handleSeeAllClick('Best of Month')}>
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button className="scroll-btn left" onClick={() => scrollLeft(monthStoriesRef)}>‹</button>
            <div className="stories-horizontal" ref={monthStoriesRef}>
              {bestOfMonth.map(story => (
                <div key={story.id} className="story-card-horizontal" onClick={() => handleStoryClick(story)}>
                  <div className="story-image-wrapper">
                    <img src={story.image} alt={story.title} className="story-image" />
                    <div className="rating-badge">⭐ {story.rating}</div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">{story.author}</p>
                    <div className="story-meta">
                      <span className="reads">📖 {story.reads} reads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight(monthStoriesRef)}>›</button>
          </div>
        </section>

        {/* Best of Year Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>🌟 Best of Year</h2>
              <p className="section-subtitle">Award-winning stories</p>
            </div>
            <button className="see-all-btn" onClick={() => handleSeeAllClick('Best of Year')}>
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button className="scroll-btn left" onClick={() => scrollLeft(yearStoriesRef)}>‹</button>
            <div className="stories-horizontal" ref={yearStoriesRef}>
              {bestOfYear.map(story => (
                <div key={story.id} className="story-card-horizontal" onClick={() => handleStoryClick(story)}>
                  <div className="story-image-wrapper">
                    <img src={story.image} alt={story.title} className="story-image" />
                    <div className="rating-badge">⭐ {story.rating}</div>
                    <div className="award-badge">{story.award}</div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">{story.author}</p>
                    <p className="story-description">{story.description.substring(0, 60)}...</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight(yearStoriesRef)}>›</button>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNav/>
    </div>
  );
};

export default Home;