import { useState } from "react";
import { fetchUser } from "../../data/login/fetchUser";

export const useLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    const handleSubmit = async (action) => {
        let data = {};
        if (action === "login") {
            data = {
                username: username,
                password: password
            }
        } else if (action === "register") {
            data = {
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name
            }
        }
        await fetchUser(data, action);
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