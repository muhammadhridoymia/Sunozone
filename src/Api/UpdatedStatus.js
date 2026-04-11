const API_BASE_URL = process.env.REACT_APP_API_URL;

export const UpdateStatus = async (storyId, type, commentText) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("User not authenticated");
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/stories/update/status/${storyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ type, commentText }),
      }
    );

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