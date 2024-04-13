import { baseApi } from "../../config/axiosConfig";
import { API_URL } from "../../constants/api";

export const fetchEstimations = async (task) => {
  try {
    const response = await baseApi.get(
      `${API_URL}/API/chat?task=${encodeURIComponent(task)}`
    );
    const data = await response.data;
    console.log("data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching estimations:", error);
    throw new Error("Error fetching estimations");
  }
};

export const setRating = async (id, newRating) => {
  try {
    const response = await fetch(`${API_URL}/API/estimations/${id}`, {
      method: "POST",
      body: JSON.stringify({
        stars: newRating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching estimations:", error);
    throw error;
  }

  // pendiente: llamar API para guardar el valor
};
