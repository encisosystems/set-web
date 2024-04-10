import React, {useEffect, useState} from "react";
import logotipo from "../assets/logotipo.svg";
import {Alert, Button, IconButton, InputAdornment, LinearProgress, Menu, MenuItem, Rating, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import {Email, Facebook, WhatsApp} from "@mui/icons-material";
import Toast from "./toast"; // Componente Toast para mostrar mensajes
import Dropdownn from "./ListaIdiomas";
import Snackbar from "@mui/material/Snackbar";

export default function EstimationTool() {
    const API_URL = 'http://18.221.34.229'
    const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
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

            const data = await response.json();
            console.log("data:", data);
            return data;
        } catch (error) {
            console.error('Error fetching estimations:', error);
            throw error;
        }
    };
    
    const handleLanguageChange = (selectedId) => {
        setIdLanguage(selectedId); // Actualiza el ID seleccionado
    };
    const handleClear = () => {
        setTask('');
        setShowCopy(false)
        setEstimations('')
        setShowEstimations(false)
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
         // Contenido del correo electrónico
        const shareURL = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(estimations)}`;
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
            <Dropdownn onLanguageChange={handleLanguageChange}/>
            <div className="container" style={{width: "100%", height: "25vh"}}>
                <img className="logo-menu" src={logotipo}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
                <div style={{padding: 16, maxWidth: 800, width: '100%'}}>
                    <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
                        <Alert onClose={() => setShowAlert(false)} severity="warning" sx={{ width: '100%' }}>
                            Por favor, ingrese un objetivo antes de obtener la estimación.
                        </Alert>
                    </Snackbar>

                    <TextField
                        label="Ingrese su objetivo"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        inputProps={{style: {textAlign: 'center'}}}
                        multiline
                        rowsMax={10}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={handleClear} edge="end">
                                        <DeleteIcon/>
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div>
                        {showLoading && <LinearProgress/>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0'}}>
                        <Button
                            onClick={handleEstimate}
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: "#0604A3",
                                "&:hover": {
                                    backgroundColor: "#940094",
                                },
                            }}
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
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0'}}>
                                        <IconButton onClick={copyToClipboard} aria-label="copy">
                                            <ContentCopyIcon/>
                                        </IconButton>
                                    </div>

                                    <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0'}}>
                                        <IconButton onClick={handleClick} aria-label="share">
                                            <ShareIcon/>
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={shareFacebook}>
                                                <Facebook style={{marginRight: '8px'}}/>
                                                Compartir en Facebook
                                            </MenuItem>
                                            <MenuItem onClick={shareWhatsApp}>
                                                <WhatsApp style={{marginRight: '8px'}}/>
                                                Compartir en WhatsApp
                                            </MenuItem>
                                            <MenuItem onClick={shareGmail}>
                                                <Email style={{marginRight: '8px'}}/>
                                                Enviar por Gmail
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            )}
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
                        onClose={() => setToast({...toast, open: false})}
                    />
                </div>
            </div>
        </div>
    )
        ;
}
