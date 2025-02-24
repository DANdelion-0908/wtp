'use client'

import React, { useEffect, useState } from 'react'
import { PostInteraction } from './postInteraction';

export const PostCard = () => {
  const [posts, setPosts] = useState([{"profilePicture": "/eula.jpg",
                                      "user": "dandelion",
                                      "title": "Mi primer post",
                                      "body": "¡Hola, Mundo! hiju9efgrhiju9efrhijuefrhijnuef efrhinuefrhijudefdhijouedfhijou iuhnefrwbhijnuefrbhijnudefvibhjndefvbhijn"},
                                      {"profilePicture": "/eula.jpg",
                                        "user": "dandelion",
                                        "title": "Mi primer post",
                                        "body": "¡Hola, Mundo! hiju9efgrhiju9efrhijuefrhijnuef efrhinuefrhijudefdhijouedfhijou iuhnefrwbhijnuefrbhijnudefvibhjndefvbhijn"},
                                      {"profilePicture": "/eula.jpg",
                                        "user": "dandelion",
                                        "title": "Mi primer post",
                                        "body": "¡Hola, Mundo! hiju9efgrhiju9efrhijuefrhijnuef efrhinuefrhijudefdhijouedfhijou iuhnefrwbhijnuefrbhijnudefvibhjndefvbhijn"}]); // Valores de prueba

  async function fetchPosts(): Promise<boolean> {
    // Llamada a función para obtener todos los posts
    try {
      const response: [] = [] // Colocar nombre de la función y tal

      if (response.length >= 1) {
        const data: [] = response;
        setPosts(data);

      } else {
        throw new Error("Ocurrió un error al obtener los posts");

      }
      
    } catch (error) {
      console.error("Error al hacer la solicitud: ", error);
      return false;

    }

    return true;
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div className='w-full mt-auto h-auto'>
        {posts.length === 0 ? (
          <p>No se encontró ningún post</p>
        ) : (
          posts.map((post: { profilePicture?: string, user?: string, title?: string, body?: string }, index: number) => (
            <div className="card card-side bg-base-100 shadow-xl h-auto flex flex-col mb-[1%]" key={index}>
              <div className="card-body flex flex-row items-center">
                  <img
                    src={post.profilePicture}
                    className='rounded-[50%]'
                    alt="User PFP"
                    width={70}
                    height={70}/>
                    <h3>{post.user}</h3>
                <div className='flex flex-col'>
                </div>
              </div>
              <h2 className="card-title ml-5">{post.title}</h2>
              <textarea className="textarea">{post.body}</textarea>
              <div className="divider divider-info w-[98%] self-center"></div>
              <PostInteraction />
            </div>
          ))
        )}
    </div>
  )
}