const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get all published stories
export const TopStoriesApi = async (period) => {
  if (!period) {
    throw new Error("Period parameter is required");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/stories/all/tops/${period}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};