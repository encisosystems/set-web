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
    Menu,
    MenuItem,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { Facebook, WhatsApp, Email } from "@mui/icons-material";
import Toast from "./toast";

export default function EstimationTool() {
    const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "" });
    const [anchorEl, setAnchorEl] = useState(null);

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
                if (data.smart) {
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
                setShowCopy(false);
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
