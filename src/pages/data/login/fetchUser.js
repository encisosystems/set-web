export const fetchUser = async (data, path) => {
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
            alert ("Hubo un error creando el usuario")
            throw new Error(`HTTP error! status: ${response}`);
        }
    
        const res = await response.json();
        console.log("data:", res);
        return res;
    } catch (error) {
        console.error('Error during the process:', error);
    }
};