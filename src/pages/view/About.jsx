import React, { useState } from "react";
import Image1 from "./../images/Frontend.png";
import Image2 from "./../images/developers.png";
import Image3 from "./../images/Backend.png";

import styles from "./../css/About.module.css";
import { useAbout } from "../domain/domain/useAbout";

export const About = () => {
  const {
    showBackend,
    showFrontend,
    usersBackend,
    usersFrontend,
    toggleBackend,
    toggleFrontend,
  } = useAbout();

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
           {
            usersBackend.map((user,index) => <div key={index}>
              <p>
                <span
                  style={{
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: "10px",
                    padding: "5px",
                    backgroundColor: "white",
                    display: "inline-block",
                  }}
                >
                  {user.name}
                </span>
              </p>
              <p style={{ color: "white" }}>
                {user.description}
              </p>
            </div>)
           }
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
              <img
                src={Image1}
                alt="Cursor icon"
                className={styles.aboutImage}
              />
              <div className={styles.aboutItemText}>
                <h3>Frontend Developers</h3>
                <p>
                  Aqui encontrarás las contribuciones del equipo de desarrollo
                  de la web SET en su mejora y optimización desde el apartado
                  Backend
                </p>
              </div>
            </li>
            <li className={styles.aboutItem} onClick={toggleBackend}>
              <img
                src={Image3}
                alt="Server icon"
                className={styles.aboutImage}
              />
              <div className={styles.aboutItemText}>
                <h3>Backend Developers</h3>
                <p>
                  Aquí encontrarás las contribuciones del equipo de desarrollo
                  de la web SET en su mejora del apartado visual desde el
                  desarrollo del Frontend.
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};
