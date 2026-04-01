const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchStoryAudio = async (storyId) => {
    console.log(`Fetching audio for story ID: ${storyId}`);
  try {
    const response = await fetch(`${API_BASE_URL}/api/stories/audio/${storyId}`,);

    const data = await response.json();

    if (data.success) {
      return data.data; //audio URLs,
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching story audio:", error);
    return null;
  }
};
