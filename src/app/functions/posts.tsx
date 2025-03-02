  export async function fetchPosts(): Promise<any> {
    // Llamada a función para obtener todos los posts
    try {
      const response = await fetch(`https://backend-wtp.vercel.app/api/get-posts/20`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });   
      
      console.log("ijncdeiucdijn", response)
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const posts = await response.json();
  
      if (!posts || Object.keys(posts).length === 0) {
        console.log("No se encontró el post.");
        return null;
        
      }

      return posts;
      
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      
    }
  }

  export async function fetchPostByID(postID: number) {
    try {
      const response = await fetch(`https://backend-wtp.vercel.app/api/`, { // Falta
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });    
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const post = await response.json();
  
      if (!post || Object.keys(post).length === 0) {
        console.log("No se encontró el post.");
        return null;
        
      }
  
      return post;
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);

    }
  }

  export async function createPost(username: string | null, text: string, image: string, hashtags: string[], reposted: number) {
    try {
      const response = await fetch(`https://backend-wtp.vercel.app/api/createPost`, { // Falta
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, text, image, hashtags, reposted })
      });
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);

    }
  }