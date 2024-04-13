import EstimationTool from "./pages/view/home";
import React, { useState } from 'react';
import SplashScreen from './pages/components/SplashScreen'
import './App.css';
import {useEffect} from 'react';
import ReactGA from 'react-ga4';

function App() {

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    ReactGA.initialize('G-GJZR0LQFJR');
  }, []);
  // Retorna primeramente el SplashScreen y luego a la pantalla de inicio
  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />} 
      {!showSplash && <EstimationTool />}
    </>
  );
}

export default App;
