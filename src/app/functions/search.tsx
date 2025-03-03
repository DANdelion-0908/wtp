export async function searchPostsBySimilarUser(username: string): Promise<any> {
    const url = `https://backend-wtp.vercel.app/api/search-posts-leven/${username}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("No matching users with " + username);
            return {"message":"No posts found","posts":[]}; 
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al buscar:", error);
        return {"message":"No posts found","posts":[]}; // Devuelve un array vacío o un valor por defecto
    }
}