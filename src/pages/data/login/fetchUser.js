import { redirect } from "react-router-dom";
import { API_URL } from "../../constants/api";

export const fetchUser = async (data, path) => {
    try {
        const response = await fetch(
            `http://`+API_URL+`/API/`+path,
            {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
            }
        );
    
        if (!response.ok) {
            if (path === "register"){
                alert ("Hubo un error creando el usuario")
            }else if(path === "login"){
                alert ("Revisa tus credenciales")
            }
            throw new Error(`HTTP error! status: ${response}`);
        } else if (response.ok) {
            if (path === "register"){
                alert ("Se registro el usuario correctamente")
                redirect("/login")
            }else if(path === "login"){
                alert ("Sesión iniciada")
                sessionStorage.setItem("username", response.json().username)
                redirect("/")
            }
        }
    
        const res = await response.json();
        return res;
    } catch (error) {
        console.error('Error during the process:', error);
    }
};