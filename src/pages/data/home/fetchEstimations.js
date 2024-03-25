import axios from "axios";
import { API_URL } from "../../constants/api";

export const fetchEstimations = async (task) => {
    try {
      const response = await axios.get(`${API_URL}/API/chat?task=${encodeURIComponent(task)}`)
      const data = await response.data;
      console.log("data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching estimations:", error);
      throw new Error("Error fetching estimations");
    }
  }