import React  from "react";
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
import Toast from "../components/toast"; // Componente Toast para mostrar mensajes
import { useHome } from "../domain/home/useHome";

export default function EstimationTool() {
  const {
    showAlert,
    estimations,
    showCopy,
    showEstimations,
    task,
    toast,
    setShowAlert,
    setTask,
    setToast,
    handleEstimate,
    copyToClipboard
  } = useHome();



  return (
    <div>
      <div style={{ width: "100%", top: 20 }}>
        <h1 style={{ textAlign: "center" }}>Simple Estimation Tool</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
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

          <TextField
            label="Ingrese su tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            margin="normal"
            autoComplete="off"
            inputProps={{ style: { textAlign: "center" } }}
          />

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
    </div>
  );
}
