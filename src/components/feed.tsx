'use client'

import React, { useEffect, useState } from 'react'
import { PostInteraction } from './postInteraction';
import { CommentInteraction } from './commentInteraction';

export function Feed() {
  const [posts, setPosts] = useState([
    {
      "id": 1,
      "profilePicture": "/eula.jpg",
      "user": "dandelion",
      "title": "Mi primer post",
      "body": "¡Hola, Mundo! hiju9efgrhiju9efrhijuefrhijnuef efrhinuefrhijudefdhijouedfhijou iuhnefrwbhijnuefrbhijnudefvibhjndefvbhijn",
      "likesCount": 6,
      "dislikesCount": 8,
      "sharedCount": 9,
      "hashtags": ["greeting", "new", "UwU"]
    },

    {
      "id": 2,
      "profilePicture": "/eula.jpg",
      "user": "Max",
      "title": "¿Qué pasó con los cofres Hextech?",
      "body": "¡¡¡¡¡¡RIOT!!!!!!",
      "likesCount": 50,
      "dislikesCount": 1,
      "sharedCount": 25,
      "hashtags": ["hate", "leagueoflegends", "gaming"]
    },

    {
      "id": 3,
      "profilePicture": "/eula.jpg",
      "user": "Ana",
      "title": "Ayuda con Linux",
      "body": "No puedo instalar Linux en mi equipo, siempre me sale un error relacionado con Bitlocker.",
      "likesCount": 1,
      "dislikesCount": 0,
      "sharedCount": 0,
      "hashtags": ["help", "linux", "OS"]
    }
  ]); // Valores de prueba
  
  const [isCommentActive, setCommentActive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState(
    {
      "id": 1,
      "profilePicture": "/eula.jpg",
      "user": "dandelion",
      "title": "Mi primer post",
      "body": "¡Hola, Mundo! hiju9efgrhiju9efrhijuefrhijnuef efrhinuefrhijudefdhijouedfhijou iuhnefrwbhijnuefrbhijnudefvibhjndefvbhijn",
      "likesCount": 6,
      "dislikesCount": 8,
      "sharedCount": 9,
      "hashtags": ["greeting", "new", "UwU"]
    }
  );

  const [comments, setComments] = useState([
    {
      "profilePicture": "eula.jpg",
      "user": "Jorge",
      "text": "Qué bien.",
      "timeStamp": "25/02/2025 22:25",
      "likesCount": 2,
      "disLikesCount": 1,
      "sharedCount": 5
    },
    
    {
      "profilePicture": "eula.jpg",
      "user": "dandelion",
      "text": "Qué mal.",
      "timeStamp": "25/03/2025 18:01",
      "likesCount": 8,
      "disLikesCount": 100,
      "sharedCount": 0
    }
  ]);
      
  async function fetchPosts() {
    // Llamada a función para obtener todos los posts
    try {
      const response = await fetch(``);    
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const posts = await response.json();
  
      if (!posts || Object.keys(posts).length === 0) {
        console.log("No se encontró el post.");
        return null;
        
      }
  
      setPosts(posts);
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      return false;

    }
  }

  async function fetchPostByID(postID: number) {
    try {
      const response = await fetch(``);    
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const post = await response.json();
  
      if (!post || Object.keys(post).length === 0) {
        console.log("No se encontró el post.");
        return null;
        
      }
  
      setSelectedPost(post);
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      return false;

    }
  }
  

  async function fetchComments(postID: number) {
    try {
      const response = await fetch(``);    
    
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const comments = await response.json();
  
      if (!comments || Object.keys(comments).length === 0) {
        console.log("No se encontró el comments.");
        return null;
        
      }
  
      setComments(comments);
  
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      return false;

    }
  }

  const handleComments = () => {
    if (!isCommentActive) {
      setCommentActive(true);

    } else {
      setCommentActive(false);

    }

  }

  useEffect(() => {
    fetchPosts();
  }, [])

  useEffect(() => {
    if (selectedPost.id != 0) {
      fetchComments(selectedPost.id);

    }
  }, [isCommentActive === true])

  return (
    <>
      {isCommentActive === false ? (
        posts.length === 0 ? (
          <p>No se encontró ningún post</p>
        ) : (
          posts.map((post, index) => (
            <div className="card card-side bg-base-300 shadow-xl h-auto flex flex-col mb-[2%]" key={index}>
              <div className="card-body flex flex-row items-center">
                <img
                  src={post.profilePicture}
                  className="rounded-[50%]"
                  alt="User PFP"
                  width={70}
                  height={70}
                />
                <h3>{post.user}</h3>
              </div>
              <h2 className="card-title ml-5">{post.title}</h2>
              <textarea readOnly value={post.body} className="textarea bg-inherit"></textarea>
              <div className="divider divider-info w-[98%] self-center"></div>
              <PostInteraction
                handleComments={handleComments}
                likesCount={post.likesCount - post.dislikesCount}
                sharedCount={post.sharedCount}
                isLiked={false}
                isDisliked={false}
              />
            </div>
          ))
        )
      ) : (
        selectedPost && (
          <div>
            <div className="card card-side bg-base-300 shadow-xl h-auto flex flex-col mb-[8%]">
              <div className="card-body flex flex-row items-center">
                <img
                  src={selectedPost.profilePicture}
                  className="rounded-[50%]"
                  alt="User PFP"
                  width={70}
                  height={70}
                />
                <h3>{selectedPost.user}</h3>
              </div>
              <h2 className="card-title ml-5">{selectedPost.title}</h2>
              <textarea readOnly value={selectedPost.body} className="textarea bg-inherit"></textarea>
              <div className="divider divider-info w-[98%] self-center"></div>
              <PostInteraction
                handleComments={handleComments}
                likesCount={selectedPost.likesCount - selectedPost.dislikesCount}
                sharedCount={selectedPost.sharedCount}
                isLiked={false}
                isDisliked={false}
              />
              <div className="divider divider-primary w-[98%] self-center"></div>
              <div className="p-[2%] mb-[5%]">
                <form method="dialog" className='h-full'>
                  <h3 className="font-bold text-2xl mb-[2.5%]">Publicar un comentario</h3>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="textarea textarea-bordered w-full bg-base-900 h-auto textarea-lg"
                    placeholder="Escribe aquí">
                  </textarea>
                  <button type='submit' onClick={() => console.log("Comentario publicado: ", commentText)} className="btn btn-primary mt-[3%]">Publicar comentario</button>
                </form>
              </div>
              <h1 className='ml-[2%] text-3xl font-bold'>Comentarios</h1>
              {/* Mostrar los comentarios si existen */}
              {comments.length > 0 ? (
                comments.map((singleComment, index) => (
                  <div className="card card-side bg-inherit shadow-xl h-auto flex flex-col rounded-none" key={index}>
                    <div className="divider divider-info w-[98%] self-center"></div>
                    <div className="card-body flex flex-row items-center">
                      <img
                        src={singleComment.profilePicture}
                        className="rounded-[50%]"
                        alt="User PFP"
                        width={70}
                        height={70}
                      />
                      <h3>{singleComment.user}</h3>
                    </div>
                    <textarea readOnly value={singleComment.text} className="textarea bg-inherit"></textarea>
                    <div className="divider divider-primary w-[98%] self-center"></div>
                    <CommentInteraction
                      handleComments={handleComments}
                      likesCount={singleComment.likesCount - singleComment.disLikesCount}
                      sharedCount={singleComment.sharedCount}
                      isLiked={false}
                      isDisliked={true} // Setear correctamente
                    />
                  </div>
                ))
              ) : (
                <p>Cuanto vacío.</p>
              )}
            </div>
  
          </div>
        )
      )}
    </>
  );
  
}