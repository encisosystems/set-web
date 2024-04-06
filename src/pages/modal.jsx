import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

const fetchUser = async (data, path) => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8080/API/`+path,
            {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            }
        );
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }
    
        const res = await response.json();
        console.log("data:", res);
        return res;
    } catch (error) {
        console.error('Error creating the user:', error);
        throw error;
    }
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleButtons = {
    marginLeft: "auto",
    width: "fit-content"
}

export const LoginModal = ({handleOpen, handleLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const data = {
            username: username,
            password: password
        }
        await fetchUser(data, 'login')
    }

    return (
        <div>
        <Box sx={style}>
            <h2 id="modal-title">Inicio de sesión</h2>
            <FormControl sx={{width: "100%"}}>
                <FormLabel >Usuario</FormLabel>
                <TextField type="text" variant="filled" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
                <FormLabel >Contraseña</FormLabel>
                <TextField type="password" variant="filled" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            </FormControl>
            <p>
                Si no tienes cuenta y quieres guardar tu historial, considera&nbsp;
                <a href="avascript:void(0)" onClick={(e)=> {e.preventDefault();handleLogin();}}>registrarte</a>.
            </p>
            <hr />
            <div style={styleButtons}>
                <Button variant="contained" onClick={handleOpen} color="error" >Cancelar</Button>&nbsp;
                <Button variant="contained" onClick={handleSubmit} color="primary" >Iniciar sesion</Button>
            </div>
        </Box>
        </div>
    );
}

export const RegisterModal = ({handleOpen, handleLogin}) => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const data = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password
        }
        await fetchUser(data, 'register');
    }

    return (
        <div>
        <Box sx={style}>
            <h2 id="modal-title">Registro</h2>
            <FormControl sx={{width: "100%"}}>
                <FormLabel >Nombres</FormLabel>
                <TextField type="text" variant="filled" value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="Nombres" />
                <FormLabel >Apellidos</FormLabel>
                <TextField type="text" variant="filled" value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="Apellidos" />
                <FormLabel >Usuario</FormLabel>
                <TextField type="text" variant="filled" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
                <FormLabel >Contraseña</FormLabel>
                <TextField type="password" variant="filled" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            </FormControl>
            <p id="child-modal-description">
                Si ya creaste tu cuenta,&nbsp;
                <a href="avascript:void(0)" onClick={(e)=> {e.preventDefault();handleLogin();}}>inicia sesión</a>
                &nbsp;y sigue guardando tu historial.
            </p>
            <hr />
            <div style={styleButtons}>
                <Button variant="contained" onClick={handleOpen} color="error" >Cancelar</Button>&nbsp;
                <Button variant="contained" onClick={handleSubmit} color="primary" >Registrarse</Button>
            </div>
        </Box>
        </div>
    );
}