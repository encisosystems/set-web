import React, { useState } from "react";
import { fetchUser } from "../../data/login/fetchUser";

export const useLogin = () => {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    const handleSubmit = async (action) => {
        const data = {
            username: username,
            password: password
        }
        const res = await fetchUser(data, action);
        if (res.username !== null){
            alert("Sesión iniciada");
        } else {
            alert("Por favor revise sus credenciales");
        }
    }

    return {
        username,
        password,
        setPassword,
        setUsername,
        first_name,
        setFirst_name,
        last_name,
        setLast_name,
        handleSubmit
    }

}