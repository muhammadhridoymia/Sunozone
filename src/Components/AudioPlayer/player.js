import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import BottomNav from "../BottomNav/BottomNav";
import { SkeletonCard } from "../../LoadingUI/playerSkeleton/skeleton";
import ReadingPopup from "../POpup/ReadingPopup";
import { fetchStoryAudio } from "../../Api/StoriesAudio";
import { fetchStoryText } from "../../Api/StoriesText";
import SharePopUp from "../POpup/Share";
import { UpdateStatus } from "../../Api/UpdatedStatus";
import { RecommendStory } from "../../Api/getRecommendedStories";
import CommentPopup from "../POpup/Comment";
import "./player.css";

const AudioPlayer = () => {
  const navigate = useNavigate();
  // Token
  const token = localStorage.getItem("token");
  const [loading, setloading] = useState(true);
  const [likelaoding, setLikeLoading] = useState(false);

  //Popup
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showCommentUi, setCommentUi] = useState(false);

  //Recommend Stories
  const [relatedStories, setRelatedStories] = useState([]);

  const { storyId } = useParams();
  const url = `${window.location.origin}/player/${storyId}`;
  const [showlogin, setShowLogin] = useState(false);

  const [currentStory, setCurrentStory] = useState();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReadText, setShowReadText] = useState(false);

  //audio control states
  const [isAudioLoading, setIsAudioLoading] = useState(true);
  const [banglaAudio, setBanglaAudio] = useState(null);
  const [englishAudio, setEnglishAudio] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isBangla, setIsBangla] = useState(true);

  const audioRef = useRef(null);

  // Audio Fetching
  useEffect(() => {
    setIsAudioLoading(true);
    if (storyId) {
      const loadAudio = async () => {
        const audioData = await fetchStoryAudio(storyId);

        if (audioData && audioData.audio) {
          setCurrentStory(audioData);
          console.log("Fetched audio data:", audioData);
          setIsLiked(audioData?.isLiked);
          setBanglaAudio(audioData?.audio?.bangla?.url || null);
          setEnglishAudio(audioData?.audio?.english?.url || null);

          // Set audio as default
          setSelectedAudio(
            isBangla
              ? audioData?.audio?.bangla?.url
              : audioData?.audio?.english?.url,
          );
        } else {
          console.error("Failed to load audio for story");
        }
      };

      loadAudio();
    }
    window.scrollTo(0, 0);
  }, [storyId]);

  //Text fetching and state management for Read Text feature
  const [storyText, setStoryText] = useState("");

  const loadStoryText = async () => {
    const textData = await fetchStoryText(storyId);
    console.log("Fetched text data:", textData);
    if (textData) {
      setStoryText(textData);
    } else {
      console.error("Failed to load text for story");
    }
  };

  const handleReadText = () => {
    if (storyText === "") {
      loadStoryText();
    }
    setShowReadText(true);
  };

  // Audio controls and event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsAudioLoading(false);
    };

    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [selectedAudio]);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Play failed:", err);
      setIsPlaying(false); // make sure it resets on failure
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 30,
        duration,
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 30,
        0,
      );
    }
  };

  // Audio Change Controller
  const audioChangeControl = (lang) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newUrl = lang === "bangla" ? banglaAudio : englishAudio;
    if (!newUrl) return;

    // Pause first
    audio.pause();

    // Change source
    setSelectedAudio(newUrl);
    setIsBangla(lang === "bangla");
    setCurrentTime(0);
    setIsPlaying(false);
  };

  //Reload Song after change
  useEffect(() => {
    if (!selectedAudio || !audioRef.current) return;
    audioRef.current.load();
  }, [selectedAudio]);

  // Handle Likes
  const handleLike = () => {
    const updateStatus = async () => {
      const result = await UpdateStatus(storyId, "likes", null);
      console.log("Like status updated:", result);
      if (result.success) {
        setIsLiked((prev) => !prev);
        setLikeLoading(false);
      } else {
        console.error("Failed to update like status");
        setLikeLoading(false);
      }
    };
    if (token) {
      setLikeLoading(true);
      updateStatus();
    } else {
      setShowLogin(true);
    }
  };

  //Share PopUp
  const handleShare = () => {
    setShowSharePopup(true);
  };

  // Handle Story Click
  const handleStoryClick = (story) => {
    setCurrentStory(null);
    setSelectedAudio(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setStoryText("");
    navigate(`/player/${story._id}`);
  };

  //Recommend Stories
  useEffect(() => {
    if (storyId) {
      const Fetch = async () => {
        const res = await RecommendStory(storyId);

        if (!res) {
          console.error("Server not responding");
          // setloading(false);
          return;
        }
        console.log("recommend Story is : ", res.data);
        if (res.success) {
          setRelatedStories(res.data);
          setloading(false);
        }
      };
      Fetch();
    }
  }, [storyId]);

  // Handle audio loading states can play and waiting events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsAudioLoading(false);
    };

    const handleWaiting = () => {
      setIsAudioLoading(true);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
    };
  }, [selectedAudio]);

  //Navigate to Login
  useEffect(() => {
    if (showlogin) {
      navigate("/login");
    }
  }, [showlogin, navigate]);

  return (
    <>
      {showCommentUi && <CommentPopup onClose={() => setCommentUi(false)} />}
      {showSharePopup && (
        <SharePopUp link={url} onClose={() => setShowSharePopup(false)} />
      )}
      <div className="apx-container">
        <audio ref={audioRef} src={selectedAudio} />

        {showReadText && (
          <ReadingPopup
            text={storyText}
            onClose={() => setShowReadText(false)}
          />
        )}

        <div className="apx-main">
          <div className="apx-img-box">
            <img
              src={currentStory?.imageUrl}
              alt={currentStory?.title}
              className="apx-img"
            />
            <div className="apx-overlay"></div>
          </div>

          <div className="apx-info">
            <h1 className="apx-title">{currentStory?.title}</h1>
            <p className="apx-writer">Writer {currentStory?.writer}</p>
            <p className="apx-narrator">Narrated by Sono Zone</p>
          </div>

          <div className="apx-seek-wrap">
            <div className="apx-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              type="range"
              className="apx-seek"
              value={currentTime}
              max={duration || 0}
              onChange={handleProgressChange}
              step="0.1"
              disabled={isAudioLoading}
            />
          </div>

          <div className="apx-controls">
            <button
              className="apx-btn-small"
              onClick={skipBackward}
              disabled={isAudioLoading}
            >
              <FaBackward />
              <span>30</span>
            </button>

            <button
              className="apx-btn-play"
              onClick={togglePlay}
              disabled={isAudioLoading}
            >
              {isAudioLoading ? (
                <div className="loader"></div>
              ) : isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>

            <button
              className="apx-btn-small"
              onClick={skipForward}
              disabled={isAudioLoading}
            >
              <FaForward />
              <span>30</span>
            </button>
          </div>

          <div className="apx-actions">
            <button
              className="apx-action read"
              onClick={handleReadText}
              disabled={isAudioLoading}
            >
              Read
            </button>

            <button
              className={`apx-action ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
              disabled={isAudioLoading || likelaoding}
            >
              {likelaoding ? (
                <div className="like-loader"></div>
              ) : (
                <>
                  <FaHeart />
                  <span>{isLiked ? " Liked" : " Like"}</span>
                </>
              )}
            </button>

            <button
              className="apx-action"
              onClick={handleShare}
              disabled={isAudioLoading}
            >
              <FaShare /> Share
            </button>

            <button className="apx-action" disabled={isAudioLoading}>
              Add to Playlist
            </button>
            <button
              className="apx-action"
              onClick={() => setCommentUi(true)}
              disabled={isAudioLoading}
            >
              Comment
            </button>
            {banglaAudio && (
              <button
                className={`apx-action ${isBangla ? "active-audio" : ""}`}
                onClick={() => audioChangeControl("bangla")}
                disabled={isAudioLoading}
              >
                Bangla
              </button>
            )}

            {englishAudio && (
              <button
                className={`apx-action ${!isBangla ? "active-audio" : ""}`}
                onClick={() => audioChangeControl("english")}
                disabled={isAudioLoading}
              >
                English
              </button>
            )}
          </div>
        </div>

        <div className="related-section">
          <div className="related-header">
            <h2>Recommended for You</h2>
            <p>Based on your listening history</p>
          </div>

          <div className="related-grid">
            {loading
              ? Array(9)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : relatedStories.map((story) => (
                  <div
                    key={story._id}
                    className="story-card"
                    onClick={() => handleStoryClick(story)}
                  >
                    {/* Thumbnail Container */}
                    <div className="thumbnail-wrapper">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="thumbnail"
                      />

                      {/* Duration Badge */}
                      <div className="duration-badge">
                        {story.duration || "0:00"}m
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="card-info">
                      <h3 className="card-title">{story.title}</h3>

                      <p className="card-author">
                        {story.writer || "Unknown Author"}
                      </p>

                      <div className="card-meta">
                        <span>{story.status?.views || 0} views</span>
                        <span className="meta-dot">•</span>
                        <span>{story.status?.likes || 0} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default AudioPlayer;
