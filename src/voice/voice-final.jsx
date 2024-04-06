import React, { useState, useRef, useEffect, useCallback } from 'react';
import './voice.module.css'; // Importa el archivo de estilos (si existe)

// Hook personalizado para el reconocimiento de voz y texto
export const useSpeechToText = (setTask) => {
  // Estado para almacenar el texto transcrito
  const [transcript, setTranscript] = useState('');
  // Estado para indicar si se está grabando
  const [isRecording, setIsRecording] = useState(false);
  // Estado para el idioma seleccionado (por defecto español)
  const [selectedLanguage, setSelectedLanguage] = useState('es-ES');
  // Referencia mutable para el reconocimiento de voz
  const recognition = useRef(null);
  // Referencia mutable para el selector de idiomas
  const languageSelector = useRef(null);
  // Verifica si el navegador soporta el reconocimiento de voz
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const browserSupportsSpeechRecognition = SpeechRecognition !== undefined;

  // Función para iniciar la grabación de voz
  const startRecording = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      if (recognition.current) {
        recognition.current.lang = selectedLanguage; // Establece el idioma seleccionado
        recognition.current.start(); // Inicia la grabación de voz
        setIsRecording(true); // Actualiza el estado de grabación
      }
    }
  }, [browserSupportsSpeechRecognition, selectedLanguage]);

  // Función para detener la grabación de voz
  const stopRecording = useCallback(() => {
    if (browserSupportsSpeechRecognition && recognition.current) {
      recognition.current.stop(); // Detiene la grabación de voz
      setIsRecording(false); // Actualiza el estado de grabación
    }
  }, [browserSupportsSpeechRecognition]);

  // Efecto secundario para configurar el reconocimiento de voz
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      recognition.current = new SpeechRecognition(); // Crea una nueva instancia de reconocimiento de voz
      recognition.current.continuous = true; // Habilita el reconocimiento continuo
      recognition.current.interimResults = false; // Desactiva los resultados provisionales
      recognition.current.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript; // Obtiene el texto transcrito
        console.log('Texto reconocido:', text);
        setTranscript(text); // Actualiza el estado del texto transcrito
      };
      recognition.current.onend = () => {
        setIsRecording(false); // Actualiza el estado de grabación al finalizar
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop(); // Detiene la grabación de voz al desmontar el componente
      }
    };
  }, [browserSupportsSpeechRecognition]);

  // Efecto secundario para manejar la lógica después de la grabación
  useEffect(() => {
    if (!isRecording) {
      // Si no se está grabando, agrega el texto transcrito a la tarea
      setTask((prevTask) => prevTask + transcript);
      setTranscript(''); // Limpia el texto transcrito
    } else {
      setTask(''); // Si se está grabando, limpia la tarea
    }
  }, [isRecording, transcript, setTask]);

  // Función para manejar el cambio de idioma
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage); // Actualiza el idioma seleccionado
    if (languageSelector.current) {
      languageSelector.current.value = newLanguage;
      stopRecording(); // Detiene la grabación antes de cambiar el idioma
      startRecording(); // Inicia la grabación con el nuevo idioma
    }
  };

  // Función para manejar el clic en el botón de micrófono
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording(); // Si se está grabando, detiene la grabación
    } else {
      startRecording(); // Si no se está grabando, inicia la grabación
    }
  };

  // Retorna un objeto con el estado y las funciones necesarias
  return {
    transcript,
    setTranscript,
    isRecording,
    handleLanguageChange,
    startRecording,
    stopRecording,
    handleMicClick,
    selectedLanguage,
    setSelectedLanguage,
  };
};

// Componente para el botón de micrófono
export const MicButton = ({ isRecording, handleClick }) => (
  <div id="micButton" className="mic-container" onClick={handleClick}>
    <span className="material-symbols-outlined">{isRecording ? 'mic' : 'mic_off'}</span>
  </div>
);

// Componente para el selector de idiomas
export const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  // Función para manejar el cambio de idioma
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage); // Actualiza el idioma seleccionado
  };

  // Retorna un elemento select con opciones de idioma
  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      <option value="es-ES">Español</option>
      <option value="en-US">Inglés</option>
      {/* Agrega más opciones de idioma según sea necesario */}
    </select>
  );
};
