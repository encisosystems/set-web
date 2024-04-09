import { useState, useRef, useEffect, useCallback } from 'react';

export const useSpeechToText = ({ selectedLanguage }) => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  //const recognition = useRef(new SpeechRecognition());
  const recognition = useRef(SpeechRecognition ? new SpeechRecognition() : null); //evitar problemas con firefox
  const languageSelector = useRef(null);
  const browserSupportsSpeechRecognition = SpeechRecognition !== undefined;
  const inactivityTimeout = useRef(null);
  const inactivityTimeoutDuration = 4000;

  const startRecording = useCallback(() => {
    if (recognition.current && browserSupportsSpeechRecognition) {
      setTranscript('');
      recognition.current.lang = selectedLanguage;
      clearTimeout(inactivityTimeout.current);
      recognition.current.start();
      setIsRecording(true);
    }
  }, [browserSupportsSpeechRecognition, selectedLanguage]);

  const stopRecording = useCallback(() => {
    if (browserSupportsSpeechRecognition) {
      recognition.current.stop();
      setIsRecording(false);
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    const currentRecognition = recognition.current;//da warning si se sube
    if (browserSupportsSpeechRecognition) {
      currentRecognition.continuous = true;
      currentRecognition.interimResults = false;
      currentRecognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        setTranscript((prev) => prev + text);
        console.log(text);
        clearTimeout(inactivityTimeout.current);
        inactivityTimeout.current = setTimeout(() => {
          stopRecording();
        }, inactivityTimeoutDuration);
      };
      currentRecognition.onend = () => {
        setIsRecording(false);
      };
      if (languageSelector.current) {
        languageSelector.current.addEventListener('change', () => {
          stopRecording();
          startRecording();
        });
      }

      return () => {
        currentRecognition.stop();
        clearTimeout(inactivityTimeout.current);
      };
    }
  }, [browserSupportsSpeechRecognition, startRecording, stopRecording]);

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