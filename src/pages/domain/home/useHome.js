import { useState } from "react";
import { fetchEstimations } from "../../data/home/fetchEstimations";

export const useHome = () => {
  const [task, setTask] = useState("");
  const [estimations, setEstimations] = useState("");
  const [showEstimations, setShowEstimations] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "" });
 

  const handleEstimate = async () => {
    try {
      setShowEstimations(false);
      setShowCopy(false);
      if (!task) {
        setShowAlert(true);
        return;
      }
      const data = await fetchEstimations(task);
      if (data.smart) {
        // Procesa y muestra las estimaciones si smart es true
        const tasksString = _getTasksStringSmart(data);
        setEstimations(_getTotalEstimate(tasksString,data));
        setShowEstimations(true);
        setShowCopy(true);
      } else {
        const tasksString = data.estimation.tasks
          .map((t, index) => (index === 0 ? `${t.task}` : `\t• ${t.task}`))
          .join("\n");

        setEstimations(tasksString);
        setShowEstimations(true);
        setShowCopy(false); // Controla la visibilidad del botón de copia
      }
    } catch (error) {
      setEstimations(`Error al obtener las estimaciones: ${error.message}`);
      setShowEstimations(true);
      setShowCopy(false); // Ocultar el botón de copia en caso de error
    }
  };

  
 const copyToClipboard = () => {
    navigator.clipboard.writeText(estimations).then(() => {
      setToast({
        open: true,
        message: "Estimaciones copiadas al portapapeles",
      });
    });
  };



  // funciones privadas
  const _getTasksStringSmart = (data) => {
    return data.estimation.tasks
      .map((t) => `•\t${t.task} - Estimado: ${t.estimated_hours} horas`)
      .join("\n");
  };

  const _getTotalEstimate = (tasksString, data) => {
    return `${tasksString}\n\nTotal estimado: ${data.estimation.tasks.reduce(
      (acc, curr) => acc + curr.estimated_hours,
      0
    )} horas`;
  };

  


  return {
    task,
    estimations,
    showEstimations,
    showCopy,
    showAlert,
    toast,
    setTask,
    setEstimations,
    setShowEstimations,
    setShowCopy,
    setShowAlert,
    setToast,
    handleEstimate,
    copyToClipboard
  };
};
