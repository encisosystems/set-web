import React, { useState } from "react";
import Image1 from './Frontend.png';
import Image2 from './developers.png';
import Image3 from './Backend.png';

import styles from "./About.module.css";

export const About = () => {
  const [showFrontend, setShowFrontend] = useState(false);
  const [showBackend, setShowBackend] = useState(false);

  const toggleFrontend = () => {
    setShowFrontend(!showFrontend);
  };

  const toggleBackend = () => {
    setShowBackend(!showBackend);
  };

  return (
    <section className={styles.container} id="about">
      {!showFrontend && !showBackend && (
        <h2 className={styles.title}>ACERCA DE NOSOTROS</h2>
      )}
      {showFrontend ? (
        <div className={styles.frontendContainer}>
          <button className={styles.backButton} onClick={toggleFrontend}>
            &#8592;
          </button>
          <h2 className={styles.aboutItems}>Frontend</h2>
          <p>Hola, ¿cómo estás?</p>
        </div>
      ) : showBackend ? (
        <div className={styles.backendContainer}>
          <button className={styles.backButton} onClick={toggleBackend}>
            &#8592;
          </button>
          <h2 className={styles.aboutItems}>Backend</h2>
          <div>
            <p><span style={{color: "blue", border: "2px solid blue", borderRadius: "10px", padding: "5px", backgroundColor: "white", display: "inline-block"}}>Javier Charry</span></p>
            <p style={{color: "white"}}>
              Responsable de desarrollar el sistema de traducciones. Diseñó y creó la estructura de la base de datos que almacena todas las traducciones, cada una identificada por un ID único. Esta tabla contiene la clave única, el idioma correspondiente y el valor traducido de cada elemento. Además, implementó consultas SQL para garantizar la integridad y eficiencia del sistema, permitiendo así la fácil recuperación y manipulación de los datos.
            </p>
            <p><span style={{color: "blue", border: "2px solid blue", borderRadius: "10px", padding: "5px", backgroundColor: "white", display: "inline-block"}}>Johan Molina</span></p>
            <p style={{color: "white"}}>
              Implementó una función que asegura que la aplicación responda en el idioma configurado, mejorando la accesibilidad para usuarios de diferentes regiones. Además, diseñó la interfaz para que registre todas las consultas realizadas durante la sesión, facilitando a los usuarios acceder a su historial de actividades.
            </p>
            <p><span style={{color: "blue", border: "2px solid blue", borderRadius: "10px", padding: "5px", backgroundColor: "white", display: "inline-block"}}>Orión Guevara</span></p>
            <p style={{color: "white"}}>
              Contribuyó al proceso de estimación del tiempo de desarrollo de la aplicación al agregar un apartado en el prompt que permite seleccionar el seniority level garantizando una estimación precisa del tiempo requerido para completar las tareas.
            </p>
            <p><span style={{color: "blue", border: "2px solid blue", borderRadius: "10px", padding: "5px", backgroundColor: "white", display: "inline-block"}}>Alan Herrera</span></p>
            <p style={{color: "white"}}>
              Implementó un patrón de arquitectura en el código de la aplicación web. Este patrón asegura una mejor mantenibilidad y escalabilidad del proyecto, permitiendo una gestión más eficiente del código y facilitando su expansión en el futuro.
            </p>
            <p><span style={{color: "blue", border: "2px solid blue", borderRadius: "10px", padding: "5px", backgroundColor: "white", display: "inline-block"}}>Andrés Cruz</span></p>
            <p style={{color: "white"}}>
              Se encargó de desarrollar la API para el registro e inicio de sesión de usuarios, así como de implementar la funcionalidad para consultar el historial de consultas generadas por el usuario. Además, diseñó y creó las tablas necesarias para almacenar la información básica del usuario, junto con el historial de consultas realizadas en el sitio.
            </p>
            <p><span style={{color: "blue", border: "2px solid blue", borderRadius: "10px", padding: "5px", backgroundColor: "white", display: "inline-block"}}>Camila Murillo</span></p>
            <p style={{color: "white"}}>
              Implementación de un sistema de sugerencias dentro de SET que evalúa los objetivos ingresados por los usuarios para determinar si cumplen con los criterios SMART, mejorando la experiencia del usuario al brindar orientación y apoyo para la formulación efectiva de objetivos.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <img
            src={Image2}
            alt="Me sitting with a laptop"
            className={styles.aboutImage}
          />
          <ul className={styles.aboutItems}>
            <li className={styles.aboutItem} onClick={toggleFrontend}>
              <img src={Image1} alt="Cursor icon" className={styles.aboutImage}/>
              <div className={styles.aboutItemText}>
                <h3>Frontend Developers</h3>
                <p>
                  Aqui encontrarás las contribuciones del equipo de desarrollo de la web SET 
                  en su mejora y optimización desde el apartado Backend
                </p>
              </div>
            </li>
            <li className={styles.aboutItem} onClick={toggleBackend}>
              <img src={Image3} alt="Server icon" className={styles.aboutImage}/>
              <div className={styles.aboutItemText}>
                <h3>Backend Developers</h3>
                <p>
                  Aquí encontrarás las contribuciones del equipo de desarrollo de la web SET 
                  en su mejora del apartado visual desde el desarrollo del Frontend.
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};
