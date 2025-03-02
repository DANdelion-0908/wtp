  export async function fetchComments(postID: number) {
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
  
      return comments;
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);

    }
  }