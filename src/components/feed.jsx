'use client'

import React, { useEffect, useState } from 'react'
import { PostInteraction } from './postInteraction';
import CommentInteraction from './commentInteraction';
import { fetchPosts } from '@/app/functions/posts';
import { fetchComments } from '@/app/functions/comments';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  
  const [isCommentActive, setCommentActive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState({});

  const [comments, setComments] = useState([]);

  const handleComments = () => {
    if (!isCommentActive) {
      setCommentActive(true);
      
    } else {
      setCommentActive(false);

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
    const fetchData = async () => {
      const data = await fetchComments(3019);
      setComments(data);
      console.log("ñañañañañañ: ", data)
    };

    fetchData();
  }, [isCommentActive === true])

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
                <img
                  src="/user.svg"
                  className="rounded-[50%]"
                  alt="User PFP"
                  width={70}
                  height={70}
                />
                <h3>{post.author.user_name}</h3>
              </div>
              <textarea readOnly value={post.post.text} className="textarea bg-inherit"></textarea>
              <div className="divider divider-info w-[98%] self-center"></div>
              <PostInteraction
                handleComments={handleComments}
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
              {comments && comments.length > 0 ? (
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