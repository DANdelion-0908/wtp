'use client';

import React, { useEffect, useState } from 'react'

export const CreatePost = () => {
  // Atributos de un post. Obtenido de Notion.
  const [postId, setPostId] = useState(1); // Implementar con ID de Neo4J o un índice Auto Increment
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postTopics, setPostTopics] = useState([]);

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

    if (!postTitle.trim() || !postText.trim()){
      alert("Asegúrate de llenar todos los campos.");
      return;
    }

    console.log("Post enviado: ", {
      title: postTitle,
      text: postText
    })

    setPostTitle("");
    setPostText("");
    closeModal();
  }

  return (
    <>
      <button type='button' className="btn btn-primary max-w-[10em]" onClick={openModal}>Crear post</button>
      <dialog id="postCreationModal" className="modal">
        <div className="modal-box h-auto overflow-hidden">
          <div className="modal-action">
            <form method="dialog" className='h-full'>
              <h3 className="font-bold text-2xl mb-[2.5%]">Publicar</h3>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Título"
                className="input input-bordered mb-[5%] w-full"
              />
              <label>Escribe tu post:</label>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="textarea textarea-bordered w-full h-[30em] textarea-lg"
                placeholder="Escribe aquí">
              </textarea>
              {/* if there is a button in form, it will close the modal */}
              <button type='submit' onClick={handlePostSubmit} className="btn btn-primary mt-[3%]">Confirmar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}