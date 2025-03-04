import { json } from "stream/consumers";

export async function fetchPostsByUser(user: string) {
    try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/get-posts-user/${user}`);    
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const posts = await response.json();

    if (!posts || Object.keys(posts).length === 0) {
        console.log("No se encontró el posts.");
        return null;
        
    }

    return posts;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function fetchUser(userName: string) {
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/get-user/${userName}`);    
    
        const user = await response.json();
    
        if (!user || Object.keys(user).length === 0) {
            console.log("Error al buscar usuario");
            return null;
        }
    
        return user;

    } catch (error) {
        console.error("Error al hacer la solicitud:", error);

    }
}

export async function registerUser(userName: string, password: string, email: string, born: string, first_name: string, last_name: string, gender: string) {
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/registerUser`, {
            method: 'POST',
            body: JSON.stringify({ userName, password, email, born, first_name, last_name, gender })
        });    

        console.log(response.status);
    
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    
    }
}