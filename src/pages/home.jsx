import React, { useState, useEffect } from "react";
import {Button, Dialog, DialogActions, DialogContent, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, Menu, MenuItem, Rating, Select, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import logotipo from "../assets/logotipo.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import {Email, Facebook, WhatsApp} from "@mui/icons-material";
import Toast from "./components/toast"; // Componente Toast para mostrar mensajes
import ListadoIdiomas from "./ListaIdiomas";
import {About} from "./view/About";


export default function EstimationTool() {
    //const API_URL = "http://18.221.34.229";
    const API_URL = "http://localhost:8082";
    const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [id, setID] = useState(0);
    const [idLanguage, setIdLanguage] = useState(1);
    const [ratingValue, setRatingValue] = useState(0);
    const [selectedSeniority, setSelectedSeniority] = useState("");
    const [toast, setToast] = useState({ open: false, message: "", severity: "" });
    const [anchorEl, setAnchorEl] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const seniorityLevels = ["Junior", "Middle", "Semi-senior", "Senior"];

    const translations = {
        1: {
            enterYourGoal: "Ingrese su objetivo",
            selectSeniorityLevel: "Seleccione el nivel de experiencia",
            estimate: "Estimar",
            estimations: "Estimaciones",
            estimated: "Estimado",
            completeForm: "Por favor, complete el formulario antes de obtener la estimación",
            hours: "horas",
            estimatedTotal: "Total estimado",
            errorObtainingEstimations: "Error al obtener las estimaciones",
            copyEstimations: "Copiar Estimaciones",
            estimationsCopied: "Estimaciones copiadas al portapapeles",
            rateEstimations: "Calificar Estimaciones",
            thanksForRating: "Gracias por evaluar las Estimaciones",
            shareOnFacebook: "Compartir en Facebook",
            shareOnWhatsApp: "Compartir en WhatsApp",
            shareOnGmail: "Compartir en Gmail",
        },
        2: {
            enterYourGoal: "Enter your goal",
            selectSeniorityLevel: "Select the experience level",
            estimate: "Estimate",
            estimations: "Estimations",
            estimated: "Estimated",
            completeForm: "Please complete the form before getting the estimation",
            hours: "hours",
            estimatedTotal: "Total estimated",
            errorObtainingEstimations: "Error fetching estimations",
            copyEstimations: "Copy Estimations",
            estimationsCopied: "Estimations copied to clipboard",
            rateEstimations: "Rate Estimations",
            thanksForRating: "Thanks for rating the Estimations",
            shareOnFacebook: "Share on Facebook",
            shareOnWhatsApp: "Share on WhatsApp",
            shareOnGmail: "Share on Gmail",
        }
    };

    useEffect(() => {}, [idLanguage]);

    const fetchEstimations = async () => {
        try {
            const response = await fetch(
                `${API_URL}/API/chat?task=${encodeURIComponent(task)}&seniority=${encodeURIComponent(selectedSeniority)}&idLanguage=${encodeURIComponent(idLanguage)}`, {
                    method: 'GET',
                }
            );

            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error(`${translations[idLanguage].errorObtainingEstimations}: `, error);
            throw error;
        }
    };

    const handleEstimate = async () => {
        setShowEstimations(false);
        setShowCopy(false);
        setShowLoading(true);
        if (!task || !selectedSeniority) {
            setToast({
                open: true,
                message: `${translations[idLanguage].completeForm}`,
                severity: "warning",
            });
            setShowLoading(false);
        }
        else {
            fetchEstimations()
                .then((data) => {
                    if (data.smart) {
                        // Procesa y muestra las estimaciones si smart es true
                        const tasksString = data.estimation.tasks
                            .map((t) => `•\t${t.task} - ${translations[idLanguage].estimated}: ${t.estimated_hours} ${translations[idLanguage].hours}`)
                            .join("\n");
                        setEstimations(
                            `${tasksString}\n\n${translations[idLanguage].estimatedTotal}: ${data.estimation.tasks.reduce(
                                (acc, curr) => acc + curr.estimated_hours,
                                0
                            )} ${translations[idLanguage].hours}`
                        );
                        setShowEstimations(true);
                        setShowCopy(true);
                    }
                    else {
                        const tasksString = data.estimation
                            .map((t, index) => (index === 0 ? `${t.task}` : `\t• ${t.task}`))
                            .join("\n");
                        setEstimations(tasksString);
                        setShowEstimations(true);
                        setShowCopy(false); // Controla la visibilidad del botón de copia
                    }
                    setID(data.id)
                })
                .catch((error) => {
                    setEstimations(`${translations[idLanguage].errorObtainingEstimations}: ${error.message}`);
                    setShowEstimations(true);
                    setShowCopy(false); // Ocultar el botón de copia en caso de error
                })
                .finally(() => {
                    setShowLoading(false);
                });
        }
    }

    const handleLanguageChange = (selectedId) => {
        setIdLanguage(selectedId); // Actualiza el ID seleccionado
    };

    const handleClear = () => {
        setTask('');
        setShowCopy(false)
        setEstimations('')
        setShowEstimations(false)
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(estimations).then(() => {
              setToast({
                    open: true,
                    message: `${translations[idLanguage].estimationsCopied}`,
                  severity: "success",
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
        window.open(shareURL, "_blank");
    };

    const shareGmail = () => {
        const subject = `${translations[idLanguage].estimations}`; // Asunto del correo electrónico
        const shareURL = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(estimations)}`;
        window.open(shareURL);
    };

    const shareWhatsApp = () => {
        const shareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(estimations)}`;
        window.open(shareURL, "_blank");
    };

    const onChangeRating = async (event, newRating) => {
        setRatingValue(newRating);
        console.log(newRating);
        try {
            const response = await fetch(`${API_URL}/API/estimations/${id}`, {
                method: "POST",
                body: JSON.stringify({
                    stars: newRating,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setToast({
                open: true,
                message: `${translations[idLanguage].thanksForRating}`,
                severity: "success",
            });
        } catch (error) {
            console.error(`${translations[idLanguage].errorObtainingEstimations}: `, error);
            throw error;
        }
    }

    return (
        <div>
            <ListadoIdiomas onLanguageChange={handleLanguageChange}/>
            <div className="container" style={{width: "100%", height: "10vh",}}>
                <img className="logo-menu" src={logotipo} alt={"Banner Enciso Estimation"}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', }}>
                <div style={{ padding: 16, maxWidth: 800, width: '100%' }}>
                    <Dialog open={showAbout} onClose={() => setShowAbout(false)} maxWidth="xl" fullWidth
                    PaperProps={{
                        style: {
                            backgroundColor: 'rgba(0, 0, 50, 0.95)' // Cambia el color de fondo aquí
                        }
                    }}>
                        <DialogContent>
                            <About />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowAbout(false)} style={{ color: 'white' }}>
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <TextField label={translations[idLanguage].enterYourGoal} value={task} onChange={(e) => setTask(e.target.value)} fullWidth margin="normal" autoComplete="off" inputProps={{style: {textAlign: 'center'}}} multiline rowsMax={10}
                        InputProps={{ endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={handleClear} edge="end">
                                    <DeleteIcon/>
                                </Button>
                            </InputAdornment>
                        )}}
                    />


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="seniority-label">{translations[idLanguage].selectSeniorityLevel}</InputLabel>
                        <Select
                            labelId="seniority-label"
                            value={selectedSeniority}
                            onChange={(e) => setSelectedSeniority(e.target.value)}
                            label={translations[idLanguage].selectSeniorityLevel} // Ahora efectivamente se usa
                        >
                            {seniorityLevels.map((level) => (
                                <MenuItem key={level} value={level} style={{textAlign: "center"}}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div>
                        {showLoading && <LinearProgress/>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0'}}>
                        <Button onClick={handleEstimate} variant="contained" color="primary"
                            sx={{
                                backgroundColor: "#0604A3",
                                "&:hover": {
                                    backgroundColor: "#940094",
                                },
                            }}
                        >
                            {translations[idLanguage].estimate}
                        </Button>
                    </div>

                    {showEstimations && (
                        <div>
                            <TextField label={translations[idLanguage].estimations} value={estimations} multiline fullWidth margin="normal" InputProps={{readOnly: true}} variant="outlined"/>
                            {showCopy && (
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0'}}>
                                        <IconButton onClick={copyToClipboard} aria-label="Copy">
                                            <ContentCopyIcon/>
                                        </IconButton>
                                    </div>

                                    <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0'}}>
                                        <IconButton onClick={handleClick} aria-label="share">
                                            <ShareIcon/>
                                        </IconButton>
                                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                            <MenuItem onClick={shareFacebook}>
                                                <Facebook style={{marginRight: '8px'}}/>
                                                {translations[idLanguage].shareOnFacebook}
                                            </MenuItem>
                                            <MenuItem onClick={shareWhatsApp}>
                                                <WhatsApp style={{marginRight: '8px'}}/>
                                                {translations[idLanguage].shareOnWhatsApp}
                                            </MenuItem>
                                            <MenuItem onClick={shareGmail}>
                                                <Email style={{marginRight: '8px'}}/>
                                                {translations[idLanguage].shareOnGmail}
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    {/*
                                    <div>
                                        <h3>{translations[idLanguage].rateEstimations}</h3>
                                        <Rating name="rating" value={ratingValue} onChange={onChangeRating}/>
                                    </div>
                                    */}
                                </div>
                            )}
                        </div>
                    )}
                    <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} />
                </div>
            </div>
        </div>
    );
}
