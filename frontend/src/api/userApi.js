const API_BASE_URL = "http://localhost:3000";

export async function getUserById(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}
