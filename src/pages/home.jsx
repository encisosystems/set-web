import React, { useState } from "react";
import mañanaImage from './mañana.png';
import tardeImage from './tarde.png';
import nocheImage from './noche.png';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Importa el icono del pulgar hacia arriba
import Toast from "./toast"; // Componente Toast para mostrar mensajes
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Icono para representar el sol
import Brightness3Icon from "@mui/icons-material/Brightness3"; // Icono para representar la luna

export default function EstimationTool() {
    const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "" });
    const [likeClicked, setLikeClicked] = useState(false);  //creada para dar la seleccion "Yellow"
    const [dislikeClicked, setDislikeClicked] = useState(false); 
    const [showDislikeFeedback, setShowDislikeFeedback] = useState(false); //mensajes cuando se da dislike
    const [dislikeFeedback, setDislikeFeedback] = useState("");
    const [darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    
    const getHoraDelSistema = () => {
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
      
        return { imagen, frase };
      };

    const { imagen, frase } = getHoraDelSistema();
      
    const fetchEstimations = async () => {
        try {
            const response = await fetch(
                `http://18.221.34.229/API/chat?task=${encodeURIComponent(task)}`,
                {
                method: 'GET',
                }
            );
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log("data:", data);
            return data;
        } catch (error) {
            console.error('Error fetching estimations:', error);
            throw error;
        }
    };
  
    const handleEstimate = () => {
        setShowEstimations(false);
        setShowCopy(false);
        if (!task) {
            setShowAlert(true);
            return;
        }

        fetchEstimations()
        .then((data) => {
            //console.log("Estimations:", data.smart);
            if (data.smart) {
                // Procesa y muestra las estimaciones si smart es true
                const tasksString = data.estimation.tasks
                .map((t) => `•\t${t.task} - Estimado: ${t.estimated_hours} horas`)
                .join("\n");
                setEstimations(
                    `${tasksString}\n\nTotal estimado: ${data.estimation.tasks.reduce(
                        (acc, curr) => acc + curr.estimated_hours,
                        0
                    )} horas`
                );
                setShowEstimations(true);
                setShowCopy(true);
            }
            else {
                const tasksString = data.estimation.tasks
                .map((t, index) => (index === 0 ? `${t.task}` : `\t• ${t.task}`))
                .join("\n");

                setEstimations(tasksString);
                setShowEstimations(true);
                setShowCopy(false); // Controla la visibilidad del botón de copia
            }
        })
        .catch((error) => {
            setEstimations(`Error al obtener las estimaciones: ${error.message}`);
            setShowEstimations(true);
            setShowCopy(false); // Ocultar el botón de copia en caso de error
        });  
  };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(estimations).then(() => {
            setToast({
                    open: true,
                    message: "Estimaciones copiadas al portapapeles",
            });
        });
    };

    const handleLikeClick = () => {
        setLikeClicked(true);
        setDislikeClicked(false);
        navigator.clipboard.writeText(estimations).then(() => {
            setToast({
                    open: true,
                    message: "Te gusta la respuesta",
            });
        });
    };

    const handleDisLikeClick = () => {
        setDislikeClicked(true);
        setLikeClicked(false);
        setShowDislikeFeedback(true);
    };

    const handleCloseDislikeFeedback = () => {
        setShowDislikeFeedback(false);
    };
    
    const handleSubmitDislikeFeedback = () => {
        // Aquí puedes realizar acciones con el feedback enviado, como enviarlo al servidor, etc.
        console.log("Feedback:", dislikeFeedback);
        setShowDislikeFeedback(false);
        setDislikeFeedback(""); // Restablecer el estado del mensaje de dislike
        setToast({ open: true, message: "¡Gracias por tu mensaje! :)" }); // Mostrar el toast de confirmación
    }

    return (
        <div>
            <div style={{ width: '100%', top: 20 }}>
                <h1 style={{textAlign: 'center' }}>Simple Estimation Tool</h1>
                <div onClick={toggleDarkMode} className={`toggle-button ${darkMode ? 'dark-mode' : ''}`}>
                    {/* Icono del sol a la izquierda */}
                    <Brightness7Icon />
                    {/* Icono de la luna a la derecha */} 
                    <Brightness3Icon />
                    {/* Círculo deslizante */}
                    <div className={`switch-slider ${darkMode ? 'switch-slider-active' : ''}`}></div>
                </div>          
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <div style={{ padding: 16, maxWidth: 800, width: '100%' }}>
                    <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
                        <DialogTitle>Alerta</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Por favor, ingrese una tarea antes de obtener la estimación.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowAlert(false)} color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                    
                    <div>
                        <div className="image-container">
                            <img src={imagen} alt="Imagen del momento del día" />
                          </div>
                          <div className="frase-container" style={{ textAlign: 'center' }}>
                            <p className="frase" style={{ marginTop: '20px' }}>{frase}</p>
                          </div>
                    </div>              

                    <TextField
                        label="Ingrese su tarea"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        inputProps={{ style: { textAlign: 'center' } }} 
                    />
                    
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                        <Button
                            onClick={handleEstimate}
                            variant="contained"
                            color="primary"
                        >
                            Estimar
                        </Button>
                    </div>

                    {showEstimations && (
                        <>
                    <TextField
                        label="Estimaciones"
                        value={estimations}
                        multiline
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    {showCopy && (
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                                 {/* Botón de copiar */}
                                 <IconButton onClick={copyToClipboard} aria-label="copy">
                                    <ContentCopyIcon />
                                </IconButton>
                                {/* Botón de Me gusta */}
                                <IconButton onClick={handleLikeClick} aria-label="like">
                                    <ThumbUpIcon style={{ color: likeClicked ? 'yellow' : 'inherit' }} />
                                </IconButton>     
                                <IconButton onClick={handleDisLikeClick} aria-label="dislike">
                                    <ThumbDownIcon style={{ color: dislikeClicked ? 'yellow' : 'inherit' }}/>
                                </IconButton>  
                                
                                <Dialog open={showDislikeFeedback} onClose={handleCloseDislikeFeedback}>
                                    <DialogTitle>Cuéntanos por qué no te ha gustado la respuesta</DialogTitle>
                                    <DialogContent>
                                     <TextField
                                        label="Escribe tu comentario"
                                        value={dislikeFeedback}
                                        onChange={(e) => setDislikeFeedback(e.target.value)}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        ariant="outlined"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDislikeFeedback} color="primary">
                                            Cancelar
                                        </Button>
                                        <Button onClick={handleSubmitDislikeFeedback} color="primary">
                                            Enviar
                                        </Button>
                                    </DialogActions>
                                </Dialog>                                                                  
                        </div>               
                    )}
                    
                </>
                    )}

                    <Toast
                        open={toast.open}
                        message={toast.message}
                        onClose={() => setToast({ ...toast, open: false })}
                    />
                </div>
            </div>
        </div>
    );
}


