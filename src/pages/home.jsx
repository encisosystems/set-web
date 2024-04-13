import React, { useEffect, useState } from "react";
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
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Importa el icono del pulgar hacia arriba
import Toast from "./toast"; // Componente Toast para mostrar mensajes
import { useTranslation } from 'react-i18next';

export default function EstimationTool() {
    const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [historico, setHistorico] = useState("");   //Oscar Paez
    const [mostrarHistorico, setMostrarHistorico] = useState(false);   //Oscar Paez
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "" });
    const {t} = useTranslation()
    const fetchEstimations = async () => {
        try {
            const response = await fetch(
                `http://18.221.175.62/API/chat?task=${encodeURIComponent(task)}`,
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
  
    
  const handleModal= async () => {
    const result = await swal.fire({
      title: "Bienvenido a<br> Simple Estimation Tool",
      confirmButtonText: "Continuemos",
     
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // Manejar la lógica de confirmación (por ejemplo, eliminación)
      swal.fire({
        title: "¿Qué hacemos en SET?",
        text: "Es una herramienta diseñada para proporcionar al usuario estimaciones del tiempo necesario para completar tareas según los criterios SMART (Específicos, Medibles, Alcanzables, Relevantes y Temporales).",
        
      });
    } 
  };

    const copyToClipboard = () => {
        gaTrackerEvent('copy task estimated action', "Copy generated estimation");
        navigator.clipboard.writeText(estimations).then(() => {
            setToast({
                    open: true,
                    message: "Estimaciones copiadas al portapapeles",
            });
        });
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
        } else {
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

  return (
    <div>
      <div style={{ width: "100%", top: 20 }}>
        <h1 style={{ textAlign: "center" }}>Simple Estimation Tool</h1>
        <GoogleADS />
   
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
        <div
          style={{
            width: "50%",
            height: "300px",
            backgroundColor: "red",
            margin: "0 auto",
          }}
        >
  
          <img
            style={{ width: "100%", height: "100%" }}
            src={imagenPaute}
            alt=""
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
        }}
      >
        <div style={{ padding: 16, maxWidth: 800, width: "100%" }}>
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
          
          <div style={{display: "flex",gap:"3px",alignItems:"baseline"}}>
          <TextField
            label="Ingrese su tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            margin="normal"
            autoComplete="off"
            inputProps={{ style: { textAlign: "center" } }}
          />
          <span >
            <IconButton onClick={handleModal}>
              <LiveHelpIcon />
            </IconButton>
          </span>
          </div>
          
 

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "16px 0",
            }}
            >
          
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "16px 0",
                  }}
                >
                  <IconButton onClick={copyToClipboard} aria-label="copy">
                    <ContentCopyIcon />
                  </IconButton>
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
      <Footer></Footer>
    </div>
  );
}
  
      
    
      

