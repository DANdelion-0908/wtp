export async function fetchPostsByUser(user: string) {
    try {
    const response = await fetch(``);    
    
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
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
    
        const user = await response.json();
    
        if (!user || Object.keys(user).length === 0) {
            console.log("No se encontró el usuario.");
            return null;
            
        }
    
        return user;
    
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
    
        }
}