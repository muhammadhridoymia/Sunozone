import React, { createContext, useState, useContext, useEffect } from "react";
import { TopStoriesApi } from "../Api/TopStoriesApi";

const ApiContext = createContext();
export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [TopStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("ApiProvider rendered, TopStories:", TopStories);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setLoading(true);
        const response = await TopStoriesApi();
        console.log("API Response:", response);

        // Handle different response structures
        if (response.success) {
          setTopStories(response.data);
        } else if (Array.isArray(response)) {
          setTopStories(response);
        } else {
          setTopStories(response);
        }
      } catch (err) {
        console.error("Error fetching top stories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  const fetchStoryAudio = async (storyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/story/audio/${storyId}`,
      );
      const data = await response.json();

      if (data.success) {
        return data.data; // contains audio URLs, title, writer, etc.
      } else {
        console.error(data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching story audio:", error);
      return null;
    }
  };

  const value = {
    TopStories,
    loading,
    error,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
