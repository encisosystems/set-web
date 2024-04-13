import React, { useState,useEffect } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    InputAdornment,
    Rating,
    LinearProgress
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { Facebook, WhatsApp, Email } from "@mui/icons-material";
import Toast from "./toast"; // Componente Toast para mostrar mensajes
import Dropdownn from "./ListaIdiomas";

export default function EstimationTool() {
    const API_URL = 'http://18.221.34.229'
    const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [historico, setHistorico] = useState("");   //Oscar Paez
    const [mostrarHistorico, setMostrarHistorico] = useState(false);   //Oscar Paez
    const [showAlert, setShowAlert] = useState(false);
    const [id, setID] = useState(0);
    const [idLanguage, setIdLanguage] = useState(1);
    const [ratingValue, setRatingValue] = useState(0);
    const [toast, setToast] = useState({ open: false, message: "" });
    const [anchorEl, setAnchorEl] = useState(null);
    const [showLoading, setShowLoading] = useState(false);


    
    useEffect(() => {
    }, [idLanguage]);


    const fetchEstimations = async () => {
        try {
            const response = await fetch(
                `${API_URL}/API/chat?task=${encodeURIComponent(task)}&idLanguage=${idLanguage}`,
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
    
///Oscar Paez
const verHistorial = async () => {
    setShowEstimations(false);
    setShowCopy(false);
    

    try {

        //18.221.175.62
        const historial = await fetch(
            `${API_URL}/Consultas`,
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              }
            }
        );
    
        if (!historial.ok) {
            throw new Error(`HTTP error! status: ${historial.status}`);
        }
    
        const datah = await historial.json();
        console.log("data:", datah);

        // Creamos un string con los datos formateados
        let historicos = 'Consultas Realizadas:\n';
        datah.forEach(item => {
            historicos += `ID: ${item.id}, Consulta: ${item.consulta}, Respuesta: ${item.respuesta}\n`;
        });

        setHistorico(historicos);
        setMostrarHistorico(true);

    } catch (error) {
        console.error('Error fetching estimations:', error);
        throw error;
    } 
};

///Oscar Paez

    const handleLanguageChange = (selectedId) => {
        setIdLanguage(selectedId); // Actualiza el ID seleccionado
    };
    const handleClear = () => {
        setTask('');
    };
    const handleEstimate = () => {
        setShowEstimations(false);
        setShowCopy(false);
        setShowLoading(true);
        if (!task) {
            setShowAlert(true);
            setShowLoading(false);
            return;
        }

        fetchEstimations()
        .then((data) => { 
            setShowLoading(false);
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
                    setShowCopy(false);
                }
            })
            .catch((error) => {
                setEstimations(`Error al obtener las estimaciones: ${error.message}`);
                setShowEstimations(true);
                setShowLoading(false);
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
                    setShowLoading(false);
                    setShowCopy(false); // Controla la visibilidad del botón de copia
                }
                setID(data.id)
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const shareFacebook = () => {
        const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(estimations)}`;
        window.open(shareURL, '_blank');
    };

    const shareWhatsApp = () => {
        const shareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(estimations)}`;
        window.open(shareURL, '_blank');
    };

    const shareGmail = () => {
        const subject = "Estimaciones"; // Asunto del correo electrónico
        const body = estimations; // Contenido del correo electrónico
        const shareURL = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(shareURL);
    };

    const onChangeRating = async (event, newRating) => {
        setRatingValue(newRating)
        console.log(newRating)
        try {
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
            setToast({
                open: true,
                message: "Gracias por evaluar las Estimaciones"
            });
        } catch (error) {
            console.error('Error fetching estimations:', error);
            throw error;
        }


        // pendiente: llamar API para guardar el valor
    }
    
    return (
        <div>
            <div style={{ width: '100%', top: 20 }}>
                <h1 style={{ textAlign: 'center' }}>Simple Estimation Tool</h1>
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

                    <TextField
                        label="Ingrese su tarea"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        inputProps={{ style: { textAlign: 'center' } }}
                        multiline
                        rowsMax={10}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={handleClear} edge="end">
                                        <DeleteIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div>
                        {showLoading && <LinearProgress />}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                        <Button
                            onClick={handleEstimate}
                            variant="contained"
                            color="primary"
                        >
                            Estimar
                        </Button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                        <Button
                            onClick={verHistorial}
                            variant="contained"
                            color="primary"
                        >
                            Historial
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
                                    <IconButton onClick={copyToClipboard} aria-label="copy">
                                        <ContentCopyIcon />
                                    </IconButton>
                                </div>
                            )}
                            {/* Botón de Compartir */}
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClick}
                                >
                                    <ShareIcon />
                                    Compartir
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={shareFacebook}>
                                        <Facebook style={{ marginRight: '8px' }} />
                                        Compartir en Facebook
                                    </MenuItem>
                                    <MenuItem onClick={shareWhatsApp}>
                                        <WhatsApp style={{ marginRight: '8px' }} />
                                        Compartir en WhatsApp
                                    </MenuItem>
                                    <MenuItem onClick={shareGmail}>
                                        <Email style={{ marginRight: '8px' }} />
                                        Enviar por Gmail
                                    </MenuItem>
                                </Menu>
                            </div>
                        </>
                    )}
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

                    <Toast
                        open={toast.open}
                        message={toast.message}
                        onClose={() => setToast({ ...toast, open: false })}
                    />
                </div>
            </div>
            <div className="container" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Dropdownn onLanguageChange={handleLanguageChange}/>

            </div>
            {/* Oscar Paez */}
            {mostrarHistorico &&(
                        
                        <TextField
                            label="Historico"
                            value={historico}
                            multiline
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    )}  
            {/* Oscar Paez */}
        </div>
    );
}
