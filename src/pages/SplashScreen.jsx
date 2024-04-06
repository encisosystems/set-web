import React, { useEffect, useState } from 'react';
import  '../assets/SplashScreen.css';


const SplashScreen = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish(); // Llama a onFinish para indicar que el splash screen ha terminado
    }, 3000); // Muestra el splash screen durante 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (                                                             
    <div className={`splash-screen ${show ? 'show' : 'hide'}`}>
        <div className='logo-splashscreen'>
        </div>
    </div>
  );
};

export default SplashScreen;
