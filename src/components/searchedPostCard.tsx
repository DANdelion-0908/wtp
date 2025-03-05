import React, { useEffect, useState } from 'react';

import { deletePost } from '@/app/functions/posts';
import { checkFollowRelation, followUser, unfollowUser } from '@/app/functions/user';

// Definimos las interfaces
interface Author {
  password: string;
  followers: number;
  gender: string;
  user_name: string;
  born: string;
  following: number;
  verified: boolean;
  last_name: string;
  first_name: string;
  email: string;
}

interface PostData {
  retweet: boolean;
  hashtags: string;
  imagen: string;
  dislikes: number;
  id: number;
  text: string;
  likes: number;
}

interface Post {
  post: PostData;
  author: Author;
  similarity: number;
}

// Definimos las props del componente
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const handleDelete = async () => {
      const answer = confirm("¿Seguro que quieres eliminar el post?")
      console.log(answer)
      if (answer) {
        const response = await deletePost(post.post.id)
        console.log(response)
        window.location.reload();
      }
    }

    const [relation, setRelation] = useState(false);

  const handleFollowUser = async () => {
    const followerUsername  = localStorage.getItem("userName");
    const followedUsername = post.author.user_name;

    const body = JSON.stringify({  followerUsername, followedUsername, "followType": "casual" });
    const response = await followUser(body);

    console.log(response);
    window.location.reload();
  }

  const handleunfollowUser = async () => {
    const followerName  = localStorage.getItem("userName");
    const followedName = post.author.user_name;

    const body = JSON.stringify({  followerName, followedName });
    const response = await unfollowUser(body);

    console.log(response);
    window.location.reload();
  }

  useEffect(() => {
    const checkRelation = async () => {
      const user1Name = localStorage.getItem("userName");
      const user2Name = post.author.user_name;
      const response = await checkFollowRelation(user1Name, user2Name);
      
      setRelation(response)
      
      console.log("Follows: ", response)
    }
    
    checkRelation()
  }, [post])
    
  return (
    <div className='bg-base-100 text-white rounded-lg shadow-md p-4 mb-4'>
      {/* Información del autor */}
      <div className='flex items-center mb-4 justify-around'>
        <div className='bg-black rounded-full w-10 h-10 flex items-center justify-center'>
          <span className='text-lg'>
            {post.author.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
          </span>
        </div>
        <div className='ml-3'>
          <p className='font-semibold'>{post.author.user_name}</p>
          <p className='text-sm'>{post.author.first_name} {post.author.last_name}</p>
        </div>
        {post.author.user_name != localStorage.getItem("userName") && (relation === false ? <button className='btn btn-primary' onClick={handleFollowUser}>Follow</button> : <button className='btn btn-primary' onClick={handleunfollowUser}>Unfollow</button>)}
      </div>

      {/* Contenido del post */}
      <p className='mb-4'>{post.post.text}</p>

      {/* Imagen del post (si existe) */}
      {post.post.imagen && (
        <img
          src={post.post.imagen}
          alt='Post'
          className='w-full h-auto rounded-lg mb-4'
        />
      )}

      {/* Hashtags */}
      {post.post.hashtags && (
        <p className='text-blue-500 text-sm mb-4'>
          {post.post.hashtags}
        </p>
      )}

      {/* Similitud */}
      <div className='flex items-center justify-center'>
      <button title='Delete' disabled={post.author.user_name === localStorage.getItem("userName") ? "" : "disabled"} onClick={handleDelete}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 512 512"
                stroke="currentColor">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill={post.author.user_name === localStorage.getItem("userName") ? "#ed7e5a" : "#716868"} d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default PostCard;