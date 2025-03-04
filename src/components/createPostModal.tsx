'use client';

import React, { useState } from 'react'
import { createPost } from '@/app/functions/posts';

export const CreatePostModal = () => {
  // Atributos de un post. Obtenido de Notion.
  const [postImage] = useState("");
  const [postText, setPostText] = useState("");
  const [postTopics, setPostTopics] = useState("");

  const openModal = () => {
    const modal = document.getElementById('postCreationModal') as HTMLDialogElement | null;

    if (modal) {
      modal.showModal();
    }
  }

  const closeModal = () => {
    const modal = document.getElementById('postCreationModal') as HTMLDialogElement | null;

    if (modal) {
      modal.close();
    }
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedTopics = postTopics.split(",");

    if (!postText.trim()){
      alert("Asegúrate de llenar todos los campos.");
      return;
    }

    console.log("Post enviado: ", {
      text: postText
    })

    createPost(localStorage.getItem("userName"), postText, postImage, parsedTopics, 0);

    setPostText("");
    closeModal();
  }

  return (
    <>
      <button type='button' className="max-w-[10em] text-white text-start font-bold" onClick={openModal}>Crear post</button>
      <dialog id="postCreationModal" className="modal">
        <div className="modal-box h-auto overflow-hidden bg-gray-800">
          <div className="modal-action">
            <form method="dialog" className='h-full'>
              <h3 className="font-bold text-2xl mb-[2.5%]">Publicar</h3>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <label>Escribe tu post:</label>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="textarea bg-gray-900 mb-[5%] marker:textarea-bordered w-full h-[20em] textarea-lg"
                placeholder="Escribe aquí">
              </textarea>
              <label>Ingresa los temas separados por comas: </label>
              <input
                type="text"
                value={postTopics}
                onChange={(e) => setPostTopics(e.target.value)}
                placeholder="tema1, tema2, tema3"
                className="input input-bordered bg-gray-900 w-full"
              />
              {/* if there is a button in form, it will close the modal */}
              <button type='submit' onClick={handlePostSubmit} className="btn btn-accent mt-[3%]">Confirmar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}