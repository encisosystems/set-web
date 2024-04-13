import { useRef, useState, useEffect } from "react";
import {
  fetchEstimations,
  saveEstimation,
  setRating,
} from "../../data/home/fetchEstimations";
import { useDarkMode } from "./userDarkMode";
import { useSpeechToText } from "./useSpeechToText";
import Swal from "sweetalert2";
import useAnalyticsEventTracker from "./../../../hooks/useAnalyticsEventTracker";
import ReactGA from 'react-ga4';

export const useHome = () => {
  const gaTrackerEvent = useAnalyticsEventTracker("estimation");
  const swal = Swal.mixin();
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

  const handleSubmitDislikeFeedbackAction = () => {
    handleSubmitDislikeFeedback();
    setToast({ open: true, message: "¡Gracias por tu mensaje! :)" });
  };

  const copyToClipboard = () => {
    gaTrackerEvent("copy task estimated action", "Copy generated estimation");
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

  const handleModal = async () => {
    const result = await swal.fire({
      title: "Bienvenido a<br> Simple Estimation Tool",
      confirmButtonText: "Continuemos",

      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // Manejar la lógica de confirmación (por ejemplo, eliminación)
      swal.fire({
        title: "¿Qué hacemos en SET?",
        text: "Es una herramienta diseñada para proporcionar al usuario estimaciones del tiempo necesario para completar tareas según los criterios SMART (Específicos, Medibles, Alcanzables, Relevantes y Temporales).",
      });
    }
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

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Estimation page Home",
    });
  }, []);



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
    handleModal,
  };
};
