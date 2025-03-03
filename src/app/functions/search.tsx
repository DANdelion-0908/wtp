export async function searchPostsBySimilarUser(username: string): Promise<any> {
    const url = `https://backend-wtp.vercel.app/api/search-posts-leven/${username}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to search posts");
    }

    const data = await response.json();
    return data;
}