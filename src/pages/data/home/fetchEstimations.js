import axios from "axios";
import { API_URL } from "../../constants/api";

export const fetchEstimations = async (task,language) => {
    try {
      const response = await axios.get(`${API_URL}/API/chat?task=${encodeURIComponent(task)}&idLanguage=${language}`)
      const data = await response.data;
      console.log("data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching estimations:", error);
      throw new Error("Error fetching estimations");
    }
  }


export const setRating = async (id,newRating) => {

  try {


      const response = await fetch(
          `${API_URL}/API/estimations/${id}`,
          {
              method: 'POST',
              body: JSON.stringify({
                  'stars': newRating,
              }),
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

  } catch (error) {
      console.error('Error fetching estimations:', error);
      throw error;
  }
  
// pendiente: llamar API para guardar el valor
}


export const saveEstimation = async ({
  id,
  userId,
  task,
  stars,
  estimation,
}) => {
  try {
    const response = await axios.post(`${API_URL}/API/estimations/${id}`, {
      id,
      userId,
      task,
      stars,
      estimation,
    });
    const data = await response.data;
    console.log("data:", data);
    return data;
  } catch (error) {
    throw Error("Ocurrio un Error");
  }
};


