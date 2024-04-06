import React, { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    Rating,
    LinearProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Toast from "./toast"; // Componente Toast para mostrar mensajes
import { MicButton, useSpeechToText, LanguageSelector } from '../voice/voice-final';

// Componente principal de la herramienta de estimación
export default function EstimationTool() {
    const API_URL = 'http://18.221.34.229';
    const [task, setTask] = useState(""); // Estado para la tarea ingresada por el usuario
    const [estimations, setEstimations] = useState(""); // Estado para las estimaciones obtenidas
    const [showEstimations, setShowEstimations] = useState(false); // Estado para mostrar u ocultar las estimaciones
    const [showCopy, setShowCopy] = useState(false); // Estado para mostrar u ocultar el botón de copiar estimaciones
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar u ocultar el diálogo de alerta
    const [id, setID] = useState(0); // Estado para almacenar el ID de la estimación actual
    const [ratingValue, setRatingValue] = useState(0); // Estado para el valor de la calificación
    const [toast, setToast] = useState({ open: false, message: "" }); // Estado para mostrar mensajes de tostadas
    const [showLoading, setShowLoading] = useState(false); // Estado para mostrar u ocultar la barra de progreso de carga

    // Hook personalizado para el reconocimiento de voz y texto
    const { transcript, setTranscript, isRecording, stopRecording, handleMicClick, selectedLanguage, handleLanguageChange } = useSpeechToText(setTask);

    // Función para obtener las estimaciones desde el servidor
    const fetchEstimations = async (inputValue) => {
        try {
            const response = await fetch(
                `${API_URL}/API/chat?task=${encodeURIComponent(inputValue)}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Convierte la respuesta en formato JSON
            console.log("data:", data);
            return data; // Retorna los datos obtenidos
        } catch (error) {
            console.error('Error fetching estimations:', error); // Maneja errores al obtener las estimaciones
            throw error;
        }
    };

    // Función para limpiar la tarea y el texto transcrito
    const handleClear = () => {
        stopRecording(); // Detiene la grabación de voz
        setTranscript(""); // Limpia el texto transcrito
        setTask(""); // Limpia la tarea
    };

    // Función para realizar la estimación
    const handleEstimate = () => {
        setShowEstimations(false); // Oculta las estimaciones
        setShowCopy(false); // Oculta el botón de copiar
        setShowLoading(true); // Muestra la barra de progreso de carga

        // Verifica si no hay tarea o texto transcrito
        if (!transcript && !task) {
            setShowAlert(true); // Muestra el diálogo de alerta
            setShowLoading(false); // Oculta la barra de progreso de carga
            return; // Sale de la función
        }

        // Obtiene las estimaciones desde el servidor
        fetchEstimations(transcript || task)
        .then((data) => {
            setShowLoading(false); // Oculta la barra de progreso de carga

            // Verifica si las estimaciones son inteligentes
            if (data.smart) {
                // Formatea las estimaciones inteligentes
                const tasksString = data.estimation.tasks
                .map((t) => `•\t${t.task} - Estimado: ${t.estimated_hours} horas`)
                .join("\n");

                // Actualiza las estimaciones y muestra los resultados
                setEstimations(
                    `${tasksString}\n\nTotal estimado: ${data.estimation.tasks.reduce(
                        (acc, curr) => acc + curr.estimated_hours,
                        0
                    )} horas`
                );
                setShowEstimations(true); // Muestra las estimaciones
                setShowCopy(true); // Muestra el botón de copiar
            } else {
                // Formatea las estimaciones no inteligentes
                const tasksString = data.estimation.tasks
                .map((t, index) => (index === 0 ? `${t.task}` : `\t• ${t.task}`))
                .join("\n");

                // Actualiza las estimaciones y muestra los resultados
                setEstimations(tasksString);
                setShowEstimations(true); // Muestra las estimaciones
                setShowLoading(false); // Oculta la barra de progreso de carga
                setShowCopy(false); // Oculta el botón de copiar
            }
            setID(data.id); // Actualiza el ID de la estimación
        })
        .catch((error) => {
            // Maneja errores al obtener las estimaciones
            setEstimations(`Error al obtener las estimaciones: ${error.message}`);
            setShowEstimations(true); // Muestra las estimaciones
            setShowCopy(false); // Oculta el botón de copiar
        });
    };

    // Función para copiar las estimaciones al portapapeles
    const copyToClipboard = () => {
        navigator.clipboard.writeText(estimations).then(() => {
            // Muestra un mensaje de éxito al copiar las estimaciones
            setToast({
                open: true,
                message: "Estimaciones copiadas al portapapeles",
            });
        });
    };

    // Función para manejar el cambio de la calificación
    const onChangeRating = async (event, newRating) => {
        setRatingValue(newRating); // Actualiza el valor de la calificación
        console.log(newRating);

        try {
            // Envía la calificación al servidor
            const response = await fetch(
                `${API_URL}/API/estimations/${id}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        'stars': newRating,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Muestra un mensaje de éxito al enviar la calificación
            setToast({
                open: true,
                message: "Gracias por evaluar las Estimaciones"
            });
        } catch (error) {
            console.error('Error fetching estimations:', error); // Maneja errores al enviar la calificación
            throw error;
        }
    };

    // Retorna la interfaz de usuario de la herramienta de estimación
    return (
        <div>
            {/* Selector de idioma */}
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />

            <div style={{ width: '100%', top: 20 }}>
                <h1 style={{textAlign: 'center' }}>Simple Estimation Tool</h1>
            </div>

            {/* Contenedor principal */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <div style={{ padding: 16, maxWidth: 800, width: '100%' }}>
                    {/* Diálogo de alerta */}
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

                    {/* Campo de texto para ingresar la tarea */}
                    <TextField
                        label="Ingrese su tarea"
                        value={transcript || task}
                        onChange={(e) => setTask(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        inputProps={{ style: { textAlign: 'center' } }} 
                        InputProps={{
                            endAdornment: (
                                // Botón de micrófono y botón de eliminar tarea
                                <InputAdornment position="end">
                                    <MicButton isRecording={isRecording} handleClick={handleMicClick} />
                                    <Button onClick={handleClear} edge="end">
                                        <DeleteIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div>
                        {showLoading && <LinearProgress />} {/* Barra de progreso de carga */}
                    </div>
                    
                    {/* Botón para estimar */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                        <Button
                            onClick={handleEstimate}
                            variant="contained"
                            color="primary"
                        >
                            Estimar
                        </Button>
                    </div>
       
                    {/* Muestra las estimaciones */}
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
                            {/* Botón para copiar las estimaciones */}
                            {showCopy && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                                    <IconButton onClick={copyToClipboard} aria-label="copy">
                                        <ContentCopyIcon />
                                    </IconButton>
                                </div>
                            )}
                        </>
                    )}
                    
                    {/* Muestra la calificación */}
                    {showEstimations && (
                        <div>
                            <h3>Evalua las estimaciones</h3>
                            <Rating
                                name="rating"
                                value={ratingValue}
                                onChange={onChangeRating}
                            />
                        </div>
                    )}

                    {/* Componente Toast para mostrar mensajes */}
                    <Toast
                        open={toast.open}
                        message={toast.message}
                        onClose={() => setToast({ ...toast, open: false })}
                    />
                </div>
            </div>
            {/* Dropdownn */}
            <div className="container" style={{ position: 'absolute', top:'10px',left:'10px'}}>
               <Dropdownn />
             </div>
        </div>
    );
}
