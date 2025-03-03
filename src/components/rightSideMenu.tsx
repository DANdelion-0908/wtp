import React, { useEffect, useState } from 'react';
import { searchPostsBySimilarUser } from '@/app/functions/search';
import PostCard from './searchedPostCard';

export const RightSideMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // useEffect para realizar la búsqueda automáticamente
  useEffect(() => {
    const fetchData = async () => {
        const results = await searchPostsBySimilarUser(searchTerm);
        console.log('Resultados de la búsqueda:', results);
        setSearchResults(results.posts);
    };

    if (searchTerm) { // Solo realiza la búsqueda si searchTerm no está vacío
      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className='bg-base-300 rounded-box w-[50%] h-full mr-auto ml-[2%] p-4'>
      <input
        type='text'
        placeholder='Escribe algo...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
      />

      <div className='mt-4'>
        {searchResults.map((post, index) => (
          <PostCard key={index} post={post} /> // Usa el componente PostCard
        ))}
      </div>

    </div>
  );
};