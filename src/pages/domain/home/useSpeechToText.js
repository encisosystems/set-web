import React, { useState, useRef, useEffect, useCallback } from 'react';


export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es-ES');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // Idioma predeterminado (español)
  const recognition = useRef(new SpeechRecognition());
  const languageSelector = useRef(null);

  const browserSupportsSpeechRecognition = SpeechRecognition !== undefined;

  const startRecording = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      if (languageSelector.current) {
        recognition.current.lang = languageSelector.current.value;
      }
      recognition.current.start();
      setIsRecording(true);
    }
  }, [browserSupportsSpeechRecognition, languageSelector]);

  const stopRecording = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      recognition.current.stop();
      setIsRecording(false);
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {;
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.onresult = (event) => {
        console.log("record",event)
        const text = event.results[event.results.length - 1][0].transcript;
        console.log('Texto reconocido:', text);
        setTranscript(prev => prev + text);
      };
      recognition.current.onend = () => {
        setIsRecording(false);
      };

      if (languageSelector.current) {
        languageSelector.current.addEventListener('change', () => {
          stopRecording();
          startRecording();
        });
      }
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const handleLanguageChange = (event) => {
    if (languageSelector.current) {
      languageSelector.current.value = event.target.value;
      stopRecording();
      startRecording();
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };


  return {
    transcript,
    isRecording,
    setTranscript,
    handleLanguageChange,
    startRecording,
    stopRecording,
    handleMicClick,
  };
};