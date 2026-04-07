const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchStoryText = async (storyId, type) => {
    console.log(`Fetching text for story ID: ${storyId}`);
  try {
    const response = await fetch(`${API_BASE_URL}/api/stories/text/${storyId}?type=${type}`);

    const data = await response.json();

    if (data.success) {
      return data.data; //text content
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching story text:", error);
    return null;
  }
};
