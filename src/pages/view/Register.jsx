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

export const Register = () => {
  const {
    username,
    first_name,
    last_name,
    password,
    handleSubmit,
    setFirst_name,
    setLast_name,
    setPassword,
    setUsername,
  } = useLogin();

  return (
    <div>
      <Box sx={style}>
        <h2 id="modal-title">Registro</h2>
        <form onSubmit={(e) => {e.preventDefault();handleSubmit("register")}} >
          <FormControl sx={{ width: "100%" }}>
            <FormLabel>Nombres</FormLabel>
            <TextField
              type="text"
              variant="filled"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              placeholder="Nombres"
              required
            />
            <FormLabel>Apellidos</FormLabel>
            <TextField
              type="text"
              variant="filled"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              placeholder="Apellidos"
              required
            />
            <FormLabel>Usuario</FormLabel>
            <TextField
              type="text"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
            />
            <FormLabel>Contraseña</FormLabel>
            <TextField
              type="password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <p id="child-modal-description">
              Si ya creaste tu cuenta,&nbsp;
              <Link to={"/login"}>inicia sesión</Link>
              &nbsp;y sigue guardando tu historial.
            </p>
            <hr />
            <div style={styleButtons}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Registrarse
              </Button>
            </div>
          </FormControl>
        </form>
      </Box>
    </div>
  );
};
