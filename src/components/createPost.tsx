'use client';

import React, { useEffect, useState } from 'react'

export const CreatePost = () => {
  // Atributos de un post. Obtenido de Notion.
  const [postId, setPostId] = useState(0);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [postLikes, setPostLikes] = useState(0);
  const [postDislikes, setPostDislikes] = useState(0);
  const [postReposts, setPostReposts] = useState(0);
  const [postTopics, setPostTopics] = useState([""]);

  useEffect(() => {
    console.log(postTitle, postText);
  }, [postTitle, postText])

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPostImage(file);
      
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(file);
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
      text: postText,
      image: postImage ? postImage.name : "Sin imagen"
    })

    setPostTitle("");
    setPostText("");
    closeModal();
  }

  return (
    <>
      <button type='button' className="btn" onClick={openModal}>Crear post</button>
      <dialog id="postCreationModal" className="modal">
        <div className="modal-box h-auto overflow-hidden">
          <div className="modal-action mb-[5%]">
            <form method="dialog" className='h-auto '>
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
                className="textarea textarea-bordered h-[60%] w-full textarea-lg"
                placeholder="Escribe aquí">
              </textarea>
              {/* if there is a button in form, it will close the modal */}
              <button type='submit' onClick={handlePostSubmit} className="btn btn-primary ml-[78%] mb-[5%] mt-[2%]">Confirmar</button>
            </form>
          </div>
          <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
        </div>
      </dialog>
    </>
  )
}