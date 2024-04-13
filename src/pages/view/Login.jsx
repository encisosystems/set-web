import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useLogin } from "../domain/login/useLogin";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleButtons = {
  marginLeft: "auto",
  width: "fit-content",
};

export const Login = ({ handleOpen, handleLogin }) => {
  const { username, password, setPassword, setUsername, handleSubmit } =
    useLogin();

  return (
    <div>
      <Box sx={style}>
        <h2 id="modal-title">Inicio de sesión</h2>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel>Usuario</FormLabel>
          <TextField
            type="text"
            variant="filled"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
          <FormLabel>Contraseña</FormLabel>
          <TextField
            type="password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </FormControl>
        <p>
          Si no tienes cuenta y quieres guardar tu historial, considera&nbsp;
          <Link to={"/register"}>registrarte</Link>
        </p>
        <hr />
        <div style={styleButtons}>
          <Button variant="contained" color="error">
            Cancelar
          </Button>
          &nbsp;
          <Button
            variant="contained"
            onClick={() => handleSubmit("login")}
            color="primary"
          >
            Iniciar sesion
          </Button>
        </div>
      </Box>
    </div>
  );
};


