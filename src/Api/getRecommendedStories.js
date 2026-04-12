const API_BASE_URL = process.env.REACT_APP_API_URL;

export const RecommendStory = async (storyId) => {

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/stories/recommend/${storyId}`);

    const data = await response.json();

    if (data.success) {
      return data;
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return null;
  }
};