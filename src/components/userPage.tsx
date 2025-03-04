import React, { useEffect, useState } from 'react';
import { fetchPostsByUser } from '@/app/functions/user';
import { EditUserModal } from './EditUserModal';
import { deletePost } from '@/app/functions/posts';

interface User {
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

interface Country {
    "continent": string,
    "country_code": string,
    "name": string,
    "description": string,
    "language": string,
    "id": number
}

interface Post {
    post: {
        retweet: boolean;
        hashtags: string;
        imagen: string;
        dislikes: number;
        id: number;
        text: string;
        likes: number;
    };
    author: User;
}

export const UserPage = () => {
    const [user1, setUser1] = useState<User | null>(null); // Estado para el usuario
    const [country, setCountry] = useState<Country | null>(null); // Estado para el país
    const [posts1, setPosts1] = useState<Post[] | null>(null); // Estado para los posts
    const [countryName, setCountryName] = useState<string | null>(null); // Estado para el nombre del país
    const [username, setUsername] = useState("");

    const openModal = () => {
        const modal = document.getElementById('userEditModal') as HTMLDialogElement | null;
    
        if (modal) {
          modal.showModal();
        }
      }

    const handleDelete = async (id) => {
    const answer = confirm("¿Seguro que quieres eliminar el post?")
    console.log(answer)
        if (answer) {
            const response = await deletePost(id)
            console.log(response)
            window.location.reload();
        }
    }
    
    useEffect(() => {
        async function getUserFromStorage() {
            const userJSON = localStorage.getItem("user");
            const countryJSON = localStorage.getItem("userCountry");
            const userName = localStorage.getItem("userName");

            if (userJSON && userName) {
                const userData = JSON.parse(userJSON);
                setUsername(userData.user_name); // Convertir de JSON a objeto
                const countryData = countryJSON ? JSON.parse(countryJSON) : null; // Convertir de JSON a objeto (si existe)
                console.log("Usuario desde localStorage:", userData);
                console.log("País desde localStorage:", countryData);

                setUser1(userData);
                setCountry(countryData);

                // el nombre
                setCountryName(countryData ? countryData.name : null);

                try {
                    const userPosts = await fetchPostsByUser(userName);
                    const postssss = userPosts.posts; // Extraer la lista de posts
                    setPosts1(postssss);
                    console.log("Posts del usuario:", postssss);
                } catch (error) {
                    console.error("Error al obtener los posts del usuario:", error);
                }
            } else {
                console.log("No hay usuario en localStorage");
            }
        }

        getUserFromStorage();
    }, []);

    const handleSaveData = (countryId: number, countryName: string) => {
        console.log("País seleccionado (ID):", countryId);
        console.log("Nombre del país:", countryName);
        setCountryName(countryName); // Actualizar el nombre del país en la interfaz
    };

    return (
        <div className="card w-[40%] pb-[5%] h-full overflow-auto shadow-xl">

            {user1 ? (
                <div className='bg-primary flex gap-5 p-3 items-center rounded-xl'>
                    <div className='bg-black rounded-full w-[20%] h-[80%] flex items-center justify-center'>
                    <span className='text-4xl'>
                        {user1.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
                    </span>
                    </div>
                    <div className='flex flex-col h-auto gap-[10%] w-full'>
                        <div className='flex flex-col gap-[1%]'>
                            <div className='flex'>
                                <h2 className="card-title font-bold self-start text-white">{user1.first_name} {user1.last_name}</h2>
                                <img
                                    src={user1.verified ? "/verified.png" : "/nothing.png"}
                                    alt="Ícono de cuenta verificada"
                                    width={"5%"}
                                />
                            </div>
                            <p>{user1.user_name}</p>
                        </div>
                        <div className='flex flex-wrap items-center w-full gap-[5%]'>
                            <p>Seguidores: {user1.followers}</p>
                            <p>Seguidos: {user1.following}</p>
                            <p>Nacido: {user1.born}</p>
                            <p>Género: {user1.gender}</p>
                            <p>País: {countryName || "No especificado"}</p>
                        </div>

                        <button
                            className="btn btn-neutral self-end text-sm text-white"
                            onClick={openModal} // Abrir el modal
                        >
                            Editar
                        </button>

                        <EditUserModal
                            onSave={handleSaveData}
                            username={username} 
                        />
                    </div>
                </div>
            ) : (
                <p>No hay información del usuario</p>
            )}

            {/* los posssts */}
            <div className="card-body  bg-base-300">
                {posts1 && posts1.length > 0 ? (
                    posts1.map((post, index) => (
                        <div className='card bg-base-200 mb-[2%] w-[100%] shadow-xl' key={index}>
                            <div className="card-body flex flex-row items-center h-[1.5vh]">
                            <div className='bg-black rounded-full w-10 h-10 flex items-center justify-center'>
                                <span className='text-lg'>
                                    {post.author.user_name[0]} {/* Muestra la primera letra del nombre de usuario */}
                                </span>
                                </div>
                                <h3>{post.author.user_name}</h3>
                            </div>
                            <div>
                                <div className="card-body items-center">
                                    <h2 className="card-title">{post.post.text}</h2>
                                    {post.post.imagen && (
                                        <img
                                            src={post.post.imagen}
                                            alt="Post"
                                            className="w-[50%] h-auto rounded-lg"
                                        />
                                    )}
                                    {post.post.hashtags && (
                                        <p className="text-blue-500 text-sm mb-4">
                                            {post.post.hashtags}
                                        </p>
                                    )}
                                    <div className="card-actions self-end justify-end">
                                        <div className='mr-5'>
                                            <button className='pr-5'>
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
                                                    fill='white'
                                                    d= {"M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"} />
                                                </svg>
                                                {post.post.likes}
                                            </button>
                                            <button>
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
                                                    fill='white'
                                                    d= {"M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z"} />
                                                </svg>
                                                {post.post.dislikes}
                                            </button>
                                        </div>
                                    <button  disabled={post.author.user_name === localStorage.getItem("userName") ? "" : "disabled716868"} onClick={() => handleDelete(post.post.id)}>
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
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='mt-10'>No se encontró ningún post</p>
                )}
            </div>
        </div>
    );
};