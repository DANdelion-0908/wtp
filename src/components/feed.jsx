'use client'

import React, { useEffect, useState } from 'react'
import { PostInteraction } from './postInteraction';
import CommentInteraction from './commentInteraction';
import { fetchPostByID, fetchPosts } from '@/app/functions/posts';
import { createComment, fetchComments } from '@/app/functions/comments';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  
  const [isCommentActive, setCommentActive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState({});

  const [comments, setComments] = useState([]);

  const handleComments = (post) => {
    setCommentText("")
    if (!isCommentActive) {
      setCommentActive(true);
      setSelectedPost(post);
      
    } else {
      setCommentActive(false);

    }

  }

  const getComments = () => {
    setComments([])
    console.log("SELECCIONADO: ", selectedPost)
    const fetchData = async () => {
      const data = await fetchComments(selectedPost.post.id);
      console.log("ñañañañañañ: ", data)
      setComments(data.comments);
    };

    fetchData();
  }

  const getPosts = () => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data.posts);
      console.log("hijnuyftvijufcervuij", data.posts);
      
    };

    fetchData();
  }

  const commentCreation = async (id) => {
    const response = await createComment(commentText, false, id, localStorage.getItem("userName"), true, false, "sp");

    if (response.ok) {
      setCommentText("")
      getComments();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data.posts);
      console.log("hijnuyftvijufcervuij", data.posts);
      
    };

    fetchData();
  }, []);

  useEffect(() => {
    setComments([])
    console.log("SELECCIONADO: ", selectedPost)
    const fetchData = async () => {
      const data = await fetchComments(selectedPost.post.id);
      console.log("ñañañañañañ: ", data)
      setComments(data.comments);
    };

    fetchData();
  }, [selectedPost])

  return (
    <>
      {console.log(posts)}
      {isCommentActive === false ? (
        posts.length === 0 ? (
          <p>No se encontró ningún post</p>
        ) : (
          posts.map((post, index) => (
            <div className="card card-side bg-base-300 shadow-xl h-auto flex flex-col mb-[2%]" key={index}>
              <div className="card-body flex flex-row items-center">
                <div className='bg-black rounded-full w-10 h-10 flex items-center justify-center'>
                  <span className='text-lg'>
                    {post.author.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
                  </span>
                </div>
                <h3>{post.author.user_name}</h3>
              </div>
              <textarea readOnly value={post.post.text} className="textarea bg-inherit"></textarea>
              <img src={post.post.imagen} alt="Imagen" className='w-[50%] self-center'/>
              <div className="divider divider-info w-[98%] self-center"></div>
              <PostInteraction
                handleComments={handleComments}
                post={post}
                likesCount={post.post.likes}
                disLikesCount={post.post.dislikes}
                isLiked={false}
                isDisliked={false}
              />
            </div>
          ))
        )
      ) : (
        selectedPost ? (
          <div>
            <div className="card card-side bg-base-300 shadow-xl h-auto flex flex-col mb-[8%]">
              <div className="card-body flex flex-row items-center">
              <div className='bg-black rounded-full w-10 h-10 flex items-center justify-center'>
                <span className='text-lg'>
                  {selectedPost.author.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
                </span>
              </div>
              <h3>{selectedPost.author.user_name}</h3>
              </div>
              <textarea readOnly value={selectedPost.post.text} className="textarea bg-inherit"></textarea>
              <img src={selectedPost.post.imagen} alt="Imagen" className='w-[50%] self-center'/>
              <div className="divider divider-info w-[98%] self-center"></div>
              <PostInteraction
                handleComments={handleComments}
                post={selectedPost}
                likesCount={selectedPost.post.likes}
                dislikesCount={selectedPost.post.dislikes}
                sharedCount={selectedPost.post.reposted}
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
                  {console.log(selectedPost.post)}
                  <button type='submit' onClick={() => commentCreation(selectedPost.post.id)} className="btn btn-primary mt-[3%]">Publicar comentario</button>
                </form>
              </div>
              <h1 className='ml-[2%] text-3xl font-bold'>Comentarios</h1>
              {console.log("Comentarios", comments)}
              {/* Mostrar los comentarios si existen */}
              {comments.length > 0 ? (
                comments.map((singleComment, index) => (
                  <div className="card card-side bg-inherit shadow-xl h-auto flex flex-col rounded-none" key={index}>
                    <div className="divider divider-info w-[98%] self-center"></div>
                    <div className="card-body flex flex-row items-center">
                    <div className='bg-black rounded-full w-10 h-10 flex items-center justify-center'>
                      <span className='text-lg'>
                        {singleComment.author.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
                      </span>
                    </div>
                      <h3>{singleComment.author.user_name}</h3>
                    </div>
                    <textarea readOnly value={singleComment.comment.text} className="textarea bg-inherit"></textarea>
                    <div className="divider divider-primary w-[98%] self-center"></div>
                    <CommentInteraction
                      handleComments={handleComments}
                      post={selectedPost}
                      comment={singleComment}
                      likesCount={singleComment.comment.likes}
                      sharedCount={singleComment.sharedCount}
                      isLiked={false}
                      isDisliked={false} // Setear correctamente
                      />
                  </div>
                ))
              ) : (
                <p className='self-center p-20'>Cuánto vacío...</p>
              )}
            </div>
  
          </div>
        ) : 
        <p>A</p>
      )}
    </>
  );
  
}