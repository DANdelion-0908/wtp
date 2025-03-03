import React from 'react';

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
  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
      {/* Información del autor */}
      <div className='flex items-center mb-4'>
        <div className='bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center'>
          <span className='text-gray-600 text-lg'>
            {post.author.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
          </span>
        </div>
        <div className='ml-3'>
          <p className='font-semibold'>{post.author.user_name}</p>
          <p className='text-sm text-gray-500'>{post.author.first_name} {post.author.last_name}</p>
        </div>
      </div>

      {/* Contenido del post */}
      <p className='text-gray-800 mb-4'>{post.post.text}</p>

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
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-600'>
          Similitud: <span className='font-semibold'>{post.similarity.toFixed(2)}</span>
        </p>
        <div className='flex items-center space-x-4'>
          <button className='text-gray-500 hover:text-blue-500'>
            👍 {post.post.likes}
          </button>
          <button className='text-gray-500 hover:text-red-500'>
            👎 {post.post.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;