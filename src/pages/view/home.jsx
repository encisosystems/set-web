import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { MicButton } from "./../components/micBotton";
import Micro from "./../components/microphone";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Rating,
  InputAdornment,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Toast from "../components/toast";
import { useHome } from "../domain/home/useHome";

export default function EstimationTool() {
  const {
    showAlert,
    estimations,
    showCopy,
    showEstimations,
    task,
    toast,
    ratingValue,
    darkMode,
    showDislikeFeedback,
    dislikeClicked,
    dislikeFeedback,
    likeClicked,
    imagen,
    frase,
    handleMicClick,
    isRecording,
    setTranscript,
    stopRecording,
    transcript,
    setDarkMode,
    setDislikeClicked,
    setLikeClicked,
    setShowCopy,
    setShowDislikeFeedback,
    setShowEstimations,
    setEstimations,
    handleSubmitDislikeFeedbackAction,
    handleLikeClickAction,
    handleCloseDislikeFeedback,
    toggleDarkMode,
    setShowAlert,
    setTask,
    setToast,
    handleEstimate,
    copyToClipboard,
    onChangeRating,
    handleDisLikeClick,
    setDislikeFeedback,
    handleClear, //papelera
    dropdownOpen,
    toggle,
    selectedLanguage,
    setSelectedLanguage,
    handleLanguageChange,
  } = useHome();

  return (
    <div>
      <div style={{ width: "100%", top: 20 }}>
        <h1 style={{ textAlign: "center" }}>Simple Estimation Tool</h1>
        <div
          onClick={toggleDarkMode}
          className={`toggle-button ${darkMode ? "dark-mode" : ""}`}
        >
         {/* Icono del sol a la izquierda */}
          <Brightness7Icon />
          {/* Icono de la luna a la derecha */}
          <Brightness3Icon />
          {/* Círculo deslizante */}
          <div
            className={`switch-slider ${
              darkMode ? "switch-slider-active" : ""
            }`}
          ></div>
        </div>
      </div>
            <useLanguageSelector onLanguageChange={handleLanguageChange} />
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
          <div>
            <div className="image-container">
              <img src={imagen} alt="Imagen del momento del día" />
            </div>
            <div className="frase-container" style={{ textAlign: "center" }}>
              <p className="frase" style={{ marginTop: "20px" }}>
                {frase}
              </p>
            </div>
          </div>
          <div>
          <Micro/>
          </div>
          <TextField
            label="Ingrese su tarea"
            value={transcript || task}
            onChange={(e) => {
              setTask(e.target.value);
              setTranscript(e.target.value)
            }}
            fullWidth
            margin="normal"
            autoComplete="off"
            inputProps={{ style: { textAlign: "center" } }}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                      <MicButton isRecording={isRecording} handleClick={handleMicClick} />
                      <Button onClick={handleClear} edge="end">
                          <DeleteIcon />
                      </Button>
                  </InputAdornment>
              ),
          }}
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
                  {/* Botón de copiar */}
                  <IconButton onClick={copyToClipboard} aria-label="copy">
                    <ContentCopyIcon />
                  </IconButton>
                  {/* Botón de Me gusta */}
                  <IconButton onClick={handleLikeClickAction} aria-label="like">
                    <ThumbUpIcon
                      style={{ color: likeClicked ? "yellow" : "inherit" }}
                    />
                  </IconButton>
                  <IconButton onClick={handleDisLikeClick} aria-label="dislike">
                    <ThumbDownIcon
                      style={{ color: dislikeClicked ? "yellow" : "inherit" }}
                    />
                  </IconButton>

                  <Dialog
                    open={showDislikeFeedback}
                    onClose={handleCloseDislikeFeedback}
                  >
                    <DialogTitle>
                      Cuéntanos por qué no te ha gustado la respuesta
                    </DialogTitle>
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
                      <Button
                        onClick={handleCloseDislikeFeedback}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSubmitDislikeFeedbackAction}
                        color="primary"
                      >
                        Enviar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
              <div>
                <h3>Evalua las estimaciones</h3>
                <Rating
                  name="rating"
                  value={ratingValue}
                  onChange={onChangeRating}
                />
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
