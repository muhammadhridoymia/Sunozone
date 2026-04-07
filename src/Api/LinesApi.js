const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get all published stories
export const GetLinesApi = async () => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/lines/list`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched lines data:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching lines:', error);
    throw error;
  }
};