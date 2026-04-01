import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../Components/BottomNav/BottomNav";
import { useApi } from "../../Context/apiContext";
import { SkeletonCard } from "../../LoadingUI/Skeleton/SkeletonCard";
import "./home.css";

const Home = () => {
  const { TopStories,loading} = useApi();
  const navigate = useNavigate();
  // Refs for scrollable containers
  const topStoriesRef = useRef(null);
  const weekStoriesRef = useRef(null);
  const monthStoriesRef = useRef(null);
  const yearStoriesRef = useRef(null);

  const handleSearchClick = () => {
    alert(
      "🔍 Search feature coming soon! Discover thousands of amazing stories.",
    );
  };

  const handleStoryClick = (story) => {
    navigate("/player", { state: { story } });
  };

  const handleSeeAllClick = (category) => {
    alert(`✨ See all ${category} stories - Discover more amazing tales!`);
  };

  const handleBannerClick = () => {
    alert("🎉 Welcome to StoryTime! Start your reading adventure today.");
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
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
            <p>
              Listen or read thousands of captivating tales from amazing authors
              worldwide
            </p>
            <button className="banner-btn">Start Reading →</button>
          </div>
        </div>

        {/* Top Stories Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>Top Stories</h2>
              <p className="section-subtitle">Most popular in Sono Zone</p>
            </div>
            <button
              className="see-all-btn"
              onClick={() => handleSeeAllClick("Top Stories")}
            >
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft(topStoriesRef)}
            >
              ‹
            </button>
            <div className="stories-horizontal" ref={topStoriesRef}>
              {loading || !TopStories || TopStories.length === 0 ?Array(9).fill().map((_, i) => <SkeletonCard key={i} />)
                :TopStories.map((story) => (
                  <div
                    key={story._id}
                    className="story-card-horizontal"
                    onClick={() => handleStoryClick(story)}
                  >
                  <div className="story-image-wrapper">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="story-image"
                    />
                    <div className="story-overlay">
                      <span className="listen-badge">
                        🎧{" "}
                        {story.duration ||"0:00"}m
                      </span>
                    </div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">
                      Writer {story.writer || "Unknown Author"}
                    </p>
                    <div className="story-meta">
                      <span className="reads">
                      {story.stats?.views || 0} views
                      </span>
                      <span className="reads">{story.stats?.likes || 0} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-btn right"
              onClick={() => scrollRight(topStoriesRef)}
            >
              ›
            </button>
          </div>
        </section>

        {/* Best of Week Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>Best of Week</h2>
              <p className="section-subtitle">Editor's picks this week</p>
            </div>
            <button
              className="see-all-btn"
              onClick={() => handleSeeAllClick("Best of Week")}
            >
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft(weekStoriesRef)}
            >
              ‹
            </button>
            <div className="stories-horizontal" ref={weekStoriesRef}>
              {loading || !TopStories || TopStories.length === 0 ?Array(9).fill().map((_, i) => <SkeletonCard key={i} />)
                :TopStories.map((story) => (
                  <div
                    key={story._id}
                    className="story-card-horizontal"
                    onClick={() => handleStoryClick(story)}
                  >
                  <div className="story-image-wrapper">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="story-image"
                    />
                    <div className="story-overlay">
                      <span className="listen-badge">
                        🎧{" "}
                        {story.duration ||"0:00"}m
                      </span>
                    </div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">
                      {story.writer || "Unknown Author"}
                    </p>
                    <div className="story-meta">
                      <span className="reads">
                      {story.stats?.views || 0} views
                      </span>
                      <span className="reads">
                        {story.stats?.likes || 0} likes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-btn right"
              onClick={() => scrollRight(weekStoriesRef)}
            >
              ›
            </button>
          </div>
        </section>

        {/* Best of Month Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>Best of Month</h2>
              <p className="section-subtitle">Must-read masterpieces</p>
            </div>
            <button
              className="see-all-btn"
              onClick={() => handleSeeAllClick("Best of Month")}
            >
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft(monthStoriesRef)}
            >
              ‹
            </button>
            <div className="stories-horizontal" ref={monthStoriesRef}>
              {loading || !TopStories || TopStories.length === 0?Array(9).fill().map((_, i) => <SkeletonCard key={i} />)
                :TopStories.map((story) => (
                  <div
                    key={story._id}
                    className="story-card-horizontal"
                    onClick={() => handleStoryClick(story)}
                  >
                  <div className="story-image-wrapper">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="story-image"
                    />
                    <div className="story-overlay">
                      <span className="listen-badge">
                        🎧{" "}
                        {story.duration ||"0:00"}m
                      </span>
                    </div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">
                      {story.writer || "Unknown Author"}
                    </p>
                    <div className="story-meta">
                        <span className="reads">
                        {story.stats?.views || 0} views
                        </span>
                        <span className="reads">
                          {story.stats?.likes || 0} likes
                        </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-btn right"
              onClick={() => scrollRight(monthStoriesRef)}
            >
              ›
            </button>
          </div>
        </section>

        {/* Best of Year Section - Horizontal Scroll */}
        <section className="stories-section">
          <div className="section-header">
            <div>
              <h2>Best of Year</h2>
              <p className="section-subtitle">Award-winning stories</p>
            </div>
            <button
              className="see-all-btn"
              onClick={() => handleSeeAllClick("Best of Year")}
            >
              See All <span>→</span>
            </button>
          </div>
          <div className="horizontal-scroll-container">
            <button
              className="scroll-btn left"
              onClick={() => scrollLeft(yearStoriesRef)}
            >
              ‹
            </button>
            <div className="stories-horizontal" ref={yearStoriesRef}>
              {loading || !TopStories || TopStories.length === 0 ?Array(9).fill().map((_, i) => <SkeletonCard key={i} />)
                :TopStories.map((story) => (
                  <div
                    key={story._id}
                    className="story-card-horizontal"
                    onClick={() => handleStoryClick(story)}
                  >
                  <div className="story-image-wrapper">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="story-image"
                    />
                    <div className="story-overlay">
                      <span className="listen-badge">
                        🎧{" "}
                        {story.duration ||"0:00"}m
                      </span>
                    </div>
                  </div>
                  <div className="story-info">
                    <h3>{story.title}</h3>
                    <p className="author">
                      {story.writer || "Unknown Author"}
                    </p>
                    <div className="story-meta">
                      <span className="reads">
                      {story.stats?.views || 0} views
                      </span>
                      <span className="reads">
                        {story.stats?.likes || 0} likes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-btn right"
              onClick={() => scrollRight(yearStoriesRef)}
            >
              ›
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
