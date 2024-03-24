import { API_URL } from "../../constants/api";

export const fetchEstimations = async (task) => {
    try {
      const response = await fetch(
        `${API_URL}/API/chat?task=${encodeURIComponent(task)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching estimations:", error);
      throw new Error("Error fetching estimations");
    }
  }