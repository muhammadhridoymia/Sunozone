import React, { createContext, useState, useContext, useEffect } from "react";
import { TopStoriesApi } from "../Api/TopStoriesApi";

const ApiContext = createContext();
export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [TopStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");


    const [weeklyTopStories, setWeeklyTopStories] = useState([]);
    const [monthlyTopStories, setMonthlyTopStories] = useState([]);
    const [yearlyTopStories, setYearlyTopStories] = useState([]);

  const fetchStories = async (period, setter) => {
    try {
      const response = await TopStoriesApi(period);

      // normalize data (VERY IMPORTANT)
      if (response?.data && Array.isArray(response.data)) {
        setter(response.data);
      } else if (Array.isArray(response)) {
        setter(response);
      } else {
        setter([]);
      }

      console.log(`${period} stories:`, response);
    } catch (err) {
      console.error(`Error fetching ${period} stories:`, err);
    }
  };

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setLoading(true);
        const response = await TopStoriesApi("allTime");
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

  const value = {
    TopStories,
    loading,
    error,
    fetchStories,
    weeklyTopStories,
    monthlyTopStories,
    yearlyTopStories,
    setWeeklyTopStories,
    setMonthlyTopStories,
    setYearlyTopStories,
      searchText,
    setSearchText,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
