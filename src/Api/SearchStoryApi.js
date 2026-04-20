const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get all published stories
export const SearchApi = async () => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/stories/most/searched`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched stories most searched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching most searched stories:', error);
    throw error;
  }
};