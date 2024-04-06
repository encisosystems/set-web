
import mañanaImage from "./../../images/mañana.png";
import tardeImage from "./../../images/tarde.png";
import nocheImage from "./../../images/noche.png";
import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showDislikeFeedback, setShowDislikeFeedback] = useState(false);
  const [dislikeFeedback, setDislikeFeedback] = useState("");
  const [likeClicked, setLikeClicked] = useState(false); //creada para dar la seleccion "Yellow"
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [frase, setFrase] = useState();
  const [imagen, setImagen] = useState();

  const handleCloseDislikeFeedback = () => {
    setShowDislikeFeedback(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLikeClick = () => {
    setLikeClicked(true);
    setDislikeClicked(false);
  };

  const handleSubmitDislikeFeedback = () => {
    // Aquí puedes realizar acciones con el feedback enviado, como enviarlo al servidor, etc.
    console.log("Feedback:", dislikeFeedback);
    setShowDislikeFeedback(false);
    setDislikeFeedback(""); // Restablecer el estado del mensaje de dislike // Mostrar el toast de confirmación
  };

  const handleDisLikeClick = () => {
    setDislikeClicked(true);
    setLikeClicked(false);
    setShowDislikeFeedback(true);
  };

  

  useEffect(() => {
    setInterval(() => {
        const horaActual = new Date().getHours();
        let imagen;
        let frase;
        if (horaActual >= 6 && horaActual < 12) {
          imagen = mañanaImage;
          frase = "¡Lo mejor siempre es planear en la mañana!";
        } else if (horaActual >= 12 && horaActual < 18) {
          imagen = tardeImage;
          frase = "¡Despues de un lunch tambien comienzan los buenos proyectos!";
        } else {
          imagen = nocheImage;
          frase = "¡Planear antes de comenzar un nuevo día nos ahorra mucho timepo!";
        }
        setImagen(imagen)
        setFrase(frase)
    }, 1000);
  }, []);

  return {
    darkMode,
    showDislikeFeedback,
    dislikeFeedback,
    likeClicked,
    dislikeClicked,
    imagen,
    frase,
    handleLikeClick,
    setDislikeFeedback,
    handleCloseDislikeFeedback,
    toggleDarkMode,
    handleSubmitDislikeFeedback,
    handleDisLikeClick,
  };
};
