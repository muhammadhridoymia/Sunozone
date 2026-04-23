import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../Components/BottomNav/BottomNav";
import { useApi } from "../../Context/apiContext";
import { SkeletonCard } from "../../LoadingUI/Skeleton/SkeletonCard";
import "./home.css";

const Home = () => {
  const [callWeekly, setCallWeekly] = useState(false);
  const [callMonthly, setCallMonthly] = useState(false);
  const [callYearly, setCallYearly] = useState(false);

  const bannerUrl ="https://res.cloudinary.com/dyqmmzz5f/image/upload/v1776931178/listenBanner_tkoqye.png";

  //Context State and API calls
  const {
    TopStories,
    loading,
    fetchStories,
    weeklyTopStories,
    monthlyTopStories,
    yearlyTopStories,
    setWeeklyTopStories,
    setMonthlyTopStories,
    setYearlyTopStories,
  } = useApi();


  // Fetch weekly stories
  useEffect(() => {
    if (callWeekly && weeklyTopStories.length === 0) {
      fetchStories("week", setWeeklyTopStories);
    }
  }, [callWeekly]);

  // Fetch monthly stories
  useEffect(() => {
    if (callMonthly && monthlyTopStories.length === 0) {
      fetchStories("month", setMonthlyTopStories);
    }
  }, [callMonthly]);

  // Fetch yearly stories
  useEffect(() => {
    if (callYearly && yearlyTopStories.length === 0) {
      fetchStories("year", setYearlyTopStories);
    }
  }, [callYearly]);

  const weeklyCalledRef = useRef(false);
  const monthlyCalledRef = useRef(false);
  const yearlyCalledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      // when user reaches near bottom
      if (
        scrollPosition >= pageHeight - 900 &&
        !weeklyCalledRef.current &&
        weeklyTopStories.length === 0
      ) {
        setCallWeekly(true);
        console.log("User scrolled near bottom, setCallWeekly triggered");
        weeklyCalledRef.current = true;
      }

      if (
        scrollPosition >= pageHeight - 500 &&
        !monthlyCalledRef.current &&
        monthlyTopStories.length === 0
      ) {
        setCallMonthly(true);
        console.log("User scrolled near bottom, setCallMonthly triggered");
        monthlyCalledRef.current = true;
      }

      if (
        scrollPosition >= pageHeight - 100 &&
        !yearlyCalledRef.current &&
        yearlyTopStories.length === 0
      ) {
        setCallYearly(true);
        console.log("User scrolled near bottom, setCallYearly triggered");
        yearlyCalledRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  // Refs for scrollable containers
  const topStoriesRef = useRef(null);
  const weekStoriesRef = useRef(null);
  const monthStoriesRef = useRef(null);
  const yearStoriesRef = useRef(null);


  const handleSearchClick = () => {
    navigate("/search");
  }

  const handleStoryClick = (story) => {
    navigate(`/player/${story._id}`, { state: { story } });
  };

  const handleSeeAllClick = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
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
          Search
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Banner Section */}
        <div className="banner" onClick={()=> navigate("/search")}>
          <img src={bannerUrl} alt="Listening Banner" className="banner-image" />
          <div className="banner-content">
            <h2>Listen Your Favorite Story</h2>
            <button className="banner-btn">Explore Now</button>
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
              {loading || !TopStories || TopStories.length === 0
                ? Array(9)
                    .fill()
                    .map((_, i) => <SkeletonCard key={i} />)
                : TopStories.map((story) => (
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
                            🎧 {story.duration + ":00" || "0:00"}
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
                            {story.status?.views || 0} views
                          </span>
                          <span className="reads">
                            {story.status?.likes || 0} likes
                          </span>
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
              {loading || !weeklyTopStories || weeklyTopStories.length === 0
                ? Array(9)
                    .fill()
                    .map((_, i) => <SkeletonCard key={i} />)
                : weeklyTopStories?.map((story) => (
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
                            🎧 {story.duration + ":00" || "0:00"}
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
              {loading || !monthlyTopStories || monthlyTopStories.length === 0
                ? Array(9)
                    .fill()
                    .map((_, i) => <SkeletonCard key={i} />)
                : monthlyTopStories.map((story) => (
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
                            🎧 {story.duration + ":00" || "0:00"}
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
              {loading || !yearlyTopStories || yearlyTopStories.length === 0
                ? Array(9)
                    .fill()
                    .map((_, i) => <SkeletonCard key={i} />)
                : yearlyTopStories.map((story) => (
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
                            🎧 {story.duration + ":00" || "0:00"}
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