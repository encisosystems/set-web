import { API_URL } from "../../constants/api";

export const fetchHistorialDb = async () => {
  try {
    const historial = await fetch(`${API_URL}/Consultas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!historial.ok) {
      throw new Error(`HTTP error! status: ${historial.status}`);
    }

    const datah = await historial.json();
    console.log("data:", datah);

    // Creamos un string con los datos formateados
    let historicos = "Consultas Realizadas:\n";
    datah.forEach((item) => {
      historicos += `ID: ${item.id}, Consulta: ${item.consulta}, Respuesta: ${item.respuesta}\n`;
    });
    return historicos;
  } catch (error) {
    console.error("Error fetching estimations:", error);
    throw error;
  }
};
