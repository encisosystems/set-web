import { useRef, useState, useEffect } from "react";
import {
  fetchEstimations,
  saveEstimation,
  setRating,
} from "../../data/home/fetchEstimations";
import { useDarkMode } from "./userDarkMode";
import { useSpeechToText } from "./useSpeechToText";

export const useHome = () => {
  const [task, setTask] = useState("");
  const {
    darkMode,
    showDislikeFeedback,
    dislikeClicked,
    dislikeFeedback,
    likeClicked,
    setDarkMode,
    setShowDislikeFeedback,
    setDislikeClicked,
    imagen,
    frase,
    setDislikeFeedback,
    setLikeClicked,
    handleCloseDislikeFeedback,
    toggleDarkMode,
    handleLikeClick,
    handleSubmitDislikeFeedback,
    handleDisLikeClick,
  } = useDarkMode();

  const {
    transcript,
    isRecording,
    setTranscript,
    stopRecording,
    handleMicClick,
  } = useSpeechToText();


  const [estimations, setEstimations] = useState("");
  const [showEstimations, setShowEstimations] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "" });

  const id = useRef();
  const [ratingValue, setRatingValue] = useState(0);

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
        setEstimations(_getTotalEstimate(tasksString, data));
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
      id.current = data.id;
    } catch (error) {
      setEstimations(`Error al obtener las estimaciones: ${error.message}`);
      setShowEstimations(true);
      setShowCopy(false); // Ocultar el botón de copia en caso de error
    }
  };

  const handleLikeClickAction = () => {
    handleLikeClick();
    navigator.clipboard.writeText(estimations).then(() => {
      setToast({
        open: true,
        message: "Te gusta la respuesta",
      });
    });
  };

  // (papelera) Función para limpiar la tarea y el texto transcrito 
  const handleClear = () => {
    stopRecording(); // Detiene la grabación de voz
    setTranscript(""); // Limpia el texto transcrito
    setTask(""); // Limpia la tarea
};

  const handleSubmitDislikeFeedbackAction = () => {
    handleSubmitDislikeFeedback();
    setToast({ open: true, message: "¡Gracias por tu mensaje! :)" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(estimations).then(() => {
      setToast({
        open: true,
        message: "Estimaciones copiadas al portapapeles",
      });
    });
  };

  const onChangeRating = async (_, newRating) => {
    setRatingValue(newRating);
    try {
      setRating(id.current, newRating);
      setToast({
        open: true,
        message: "Gracias por evaluar las Estimaciones",
      });
    } catch (error) {
      console.error("Error fetching estimations:", error);
      throw error;
    }

    // pendiente: llamar API para guardar el valor
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
    darkMode,
    showDislikeFeedback,
    dislikeClicked,
    dislikeFeedback,
    likeClicked,
    setDarkMode,
    setShowDislikeFeedback,
    setDislikeClicked,
    setLikeClicked,
    imagen,
    frase,
    transcript,
    isRecording,
    setTranscript,
    stopRecording,
    handleMicClick,
    handleCloseDislikeFeedback,
    setTask,
    setEstimations,
    setShowEstimations,
    setShowCopy,
    setShowAlert,
    setToast,
    handleEstimate,
    copyToClipboard,
    onChangeRating,
    toggleDarkMode,
    handleLikeClickAction,
    handleSubmitDislikeFeedbackAction,
    handleDisLikeClick,
    setDislikeFeedback,
    handleClear,
  };
};
