import React, { useState } from 'react';
import SplashScreen from './pages/SplashScreen.jsx'
import EstimationTool from './pages/home';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Retorna primeramente el SplashScreen y luego a la pantalla de inicio
  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />} 
      {!showSplash && <EstimationTool />}
    </>
  );
}

export default App;
