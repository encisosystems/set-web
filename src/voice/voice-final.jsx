import React, { useState, useRef, useEffect, useCallback } from 'react';
import './voice.module.css';

export const useSpeechToText = (setTask) => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es-ES'); // Idioma predeterminado (español)
  const recognition = useRef(null);
  const languageSelector = useRef(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
    if (browserSupportsSpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        console.log('Texto reconocido:', text);
        setTranscript(text);
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
  }, [browserSupportsSpeechRecognition, startRecording, stopRecording]);

  useEffect(() => {
    if (!isRecording) {
      setTask((prevTask) => prevTask + transcript);
      setTranscript('');
    }else {
      setTask('');
    }
  }, [isRecording, transcript, setTask]);

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
    setTranscript,
    isRecording,
    handleLanguageChange,
    startRecording,
    stopRecording,
    handleMicClick,
  };
};

export const MicButton = ({ isRecording, handleClick }) => (
  <div id="micButton" className="mic-container" onClick={handleClick}>
    <span className="material-symbols-outlined">{isRecording ? 'mic' : 'mic_off'}</span>
  </div>
);
