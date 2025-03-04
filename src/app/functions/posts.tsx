export async function fetchPosts(): Promise<any> {
  // Llamada a función para obtener todos los posts
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/get-posts/20`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });   
    
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const posts = await response.json();
    
    if (!posts || Object.keys(posts).length === 0) {
      console.log("No se encontró el post.");
      return null;
      
    }
    
    console.log("ijncdeiucdijn", posts)
    return posts;
    
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    
  }
}

export async function fetchPostByID(postID: number) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/${postID}`, { // Falta
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

export async function createPost(username: string | null, text: string, imagen: string, hashtags: string[]) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/createPost`, { // Falta
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, text, imagen, hashtags })
    });

    console.log("KAKAKAKA: ", username, text, imagen, hashtags);
    return response;
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);

  }
}

export async function likePost(username: string, nodeId: number, browser: string, source: string) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/likePost`, { // Falta
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, nodeId, browser, source })
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response;

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);

  }
}

export async function dislikePost(username: string, nodeId: number, browser: string, source: string) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/dislikePost`, { // Falta
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, nodeId, browser, source })
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response;

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);

  }
}

export async function deletePost(id: number) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/deletepost/${id}`, { // Falta
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response;

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);

  }
}