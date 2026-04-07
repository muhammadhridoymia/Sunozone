const API_BASE_URL = process.env.REACT_APP_API_URL;

export const UpdateStatus = async (storyId, type) => {
    console.log(`Updating status for story ID: ${storyId}`);
  try {
    const response = await fetch(`${API_BASE_URL}/api/stories/update/status/${storyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: type }), //type can be likes ,comments or views
    });

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching story text:", error);
    return null;
  }
};
