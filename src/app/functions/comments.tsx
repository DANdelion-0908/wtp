  export async function fetchComments(postID?: number) {
    try {
      const response = await fetch(`https://backend-wtp.vercel.app/api/get-comments/${postID}`);    
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const comments = await response.json();
  
      if (!comments || Object.keys(comments).length === 0) {
        console.log("No se encontró el comments.");
        return null;
        
      }
      
      console.log("ÑEÑEÑEÑE: ", comments)
      return comments;
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);

    }
  }

  export async function createComment(text: string, reposted: boolean, postId: number, username: string, writterIsActive: boolean, isPinned: boolean, language: string) {
    console.log(text, reposted, postId, username, writterIsActive, isPinned, language)
    try {
        const response = await fetch(`https://backend-wtp.vercel.app/api/comment`, {
          method: 'POST',
          'headers': {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, reposted, postId, username, writterIsActive, isPinned, language })
        });    
        
        return response;
    
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
    
        }
}

export async function likeComment(user_name: string, nodeId: number, browser: string, source: string) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/likeComment`, { // Falta
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user_name, nodeId, browser, source })
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response;

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);

  }
}

export async function dislikeComment(user_name: string, nodeId: number, browser: string, source: string) {
  try {
    const response = await fetch(`https://backend-wtp.vercel.app/api/dislikeComment`, { // Falta
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user_name, nodeId, browser, source })
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response;

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);

  }
}