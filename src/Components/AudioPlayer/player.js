import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import { useApi } from "../../Context/apiContext";
import { SkeletonCard } from "../../LoadingUI/playerSkeleton/skeleton";
import ReadingPopup from "../POpup/ReadingPopup";
import { fetchStoryAudio } from "../../Api/StoriesAudio";
import { fetchStoryText } from "../../Api/StoriesText";
import SharePopUp from "../POpup/Share";
import "./player.css";

const AudioPlayer = () => {
  const navigate = useNavigate();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const { TopStories, loading } = useApi();
  const { storyId } = useParams();
  const url = `${window.location.origin}/player/${storyId}`;

  const location = useLocation();
  const passedStory = location.state?.story;

  const [currentStory, setCurrentStory] = useState();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReadText, setShowReadText] = useState(false);

  //audio control states
  const [banglaAudio, setBanglaAudio] = useState(null);
  const [englishAudio, setEnglishAudio] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isBangla, setIsBangla] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    if (storyId) {
      const loadAudio = async () => {
        const audioData = await fetchStoryAudio(storyId);
        console.log("Fetched audio data:", audioData);
        if (audioData && audioData.audio) {
          setCurrentStory(audioData);
          setBanglaAudio(audioData.audio.bangla.url);
          setSelectedAudio(
            isBangla ? audioData.audio.bangla.url : audioData.audio.english.url,
          ); // Set audio as default
          setEnglishAudio(audioData.audio.english.url);
        } else {
          console.error("Failed to load audio for story");
        }
      };

      loadAudio();
    }
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

  // Related stories will replace this with actual logic to fetch related stories based on currentStory
  const relatedStories = TopStories;

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("ended", () => {});
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
  const audioChangeControl = (lang) => {
    if (lang === "bangla") {
      setIsBangla(true);
      setSelectedAudio(banglaAudio);
      setIsBangla(true);
    } else {
      setIsBangla(false);
      setSelectedAudio(englishAudio);
      setIsBangla(false);
    }
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    alert(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    setShowSharePopup(true);
    
  };

  const handleStoryClick = (story) => {
    //stop audio when navigating to new story
    setStoryText("")
    setCurrentStory(story);
    setCurrentTime(0);
    setIsPlaying(false);
    navigate(`/player/${story._id}`, {
      state: { story },
    });
  };

  // only showing JSX part (no logic changed)

  return (
    <>
        {showSharePopup && (<SharePopUp link={url} onClose={() => setShowSharePopup(false)} />)}
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
            />
          </div>

          <div className="apx-controls">
            <button className="apx-btn-small" onClick={skipBackward}>
              <FaBackward />
              <span>30</span>
            </button>

            <button className="apx-btn-play" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button className="apx-btn-small" onClick={skipForward}>
              <FaForward />
              <span>30</span>
            </button>
          </div>

          <div className="apx-actions">
            <button className="apx-action read" onClick={handleReadText}>
              Read
            </button>

            <button
              className={`apx-action ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <FaHeart /> {isLiked ? "Liked" : "Like"}
            </button>

            <button className="apx-action" onClick={handleShare}>
              <FaShare /> Share
            </button>

            <button className="apx-action">Add to Playlist</button>
            <button className="apx-action">Comment</button>

            <button
              className={`apx-action ${isBangla ? "active-audio" : ""}`}
              onClick={() => audioChangeControl("bangla")}
              hidden={banglaAudio === ""}
            >
              Bangla
            </button>

            <button
              className={`apx-action ${!isBangla ? "active-audio" : ""}`}
              onClick={() => audioChangeControl("english")}
              hidden={englishAudio === ""}
            >
              English
            </button>
          </div>
        </div>

        <div className="apx-related">
          <div className="apx-related-head">
            <h2>Recommended for You</h2>
            <p>Based on your listening history</p>
          </div>

          <div className="apx-grid">
            {loading
              ? Array(9)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : relatedStories.map((story) => (
                  <div
                    key={story._id}
                    className="apx-card"
                    onClick={() => handleStoryClick(story)}
                  >
                    <div className="apx-card-img">
                      <img src={story.imageUrl} alt={story.title} />
                      <div className="apx-play-overlay">
                        <FaPlay className="apx-play-icon" />
                      </div>
                    </div>

                    <div className="apx-card-info">
                      <h4 className="apx-card-title">{story.title}</h4>
                      <p className="apx-card-writer">writer {story.writer}</p>
                      <span className="apx-card-duration">
                        ⏱️ {story.duration}
                      </span>
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
