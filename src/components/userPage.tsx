import React, { useEffect, useState } from 'react';
import { fetchPostsByUser } from '@/app/functions/user';
import { EditUserModal } from './EditUserModal';

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
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [username, setUsername] = useState("");
    
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
                <div className='bg-primary w-[40%] flex gap-5 fixed z-10 rounded-xl'>
                    <img
                        src="/eula.jpg"
                        className='rounded-xl'
                        width={"20%"}
                        alt="Profile Picture"
                    />
                    <div className='flex flex-col justify-end items-start gap-[10%] w-full'>
                        <div className='flex flex-col gap-[1%]'>
                            <div className='flex'>
                                <h2 className="card-title font-bold self-start text-white">
                                    {user1.first_name} {user1.last_name}
                                </h2>
                                {user1.verified && (
                                    <img
                                        src="/verified.png"
                                        alt="Ícono de cuenta verificada"
                                        width={"5%"}
                                    />
                                )}
                            </div>
                            <p>{user1.user_name}</p>
                        </div>
                        <div className='flex flex-wrap w-full gap-[5%]'>
                            <p>Seguidores: {user1.followers}</p>
                            <p>Seguidos: {user1.following}</p>
                            <p>Nacido: {user1.born}</p>
                            <p>Género: {user1.gender}</p>
                            <p>País: {countryName || "No especificado"}</p>
                        </div>

                        <button
                            className="btn btn-accent mt-4 px-1 py-0 text-sm text-white"
                            onClick={() => setIsModalOpen(true)} // Abrir el modal
                        >
                            Editar
                        </button>

                        <EditUserModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveData}
                            username={username} 
                        />
                    </div>
                </div>
            ) : (
                <p>No hay información del usuario</p>
            )}

            {/* los posssts */}
            <div className="card-body bg-base-300 mt-[20%]">
                {posts1 && posts1.length > 0 ? (
                    posts1.map((post, index) => (
                        <div className='card bg-base-200 mb-[2%] w-[100%] shadow-xl' key={index}>
                            <div className="card-body flex flex-row items-center">
                                <img
                                    src="/eula.jpg"
                                    className="rounded-[50%]"
                                    alt="User PFP"
                                    width={70}
                                    height={70}
                                />
                                <h3>{post.author.user_name}</h3>
                            </div>
                            <div className="">
                                <div className="card-body">
                                    <h2 className="card-title">{post.post.text}</h2>
                                    {post.post.imagen && (
                                        <img
                                            src={post.post.imagen}
                                            alt="Post"
                                            className="w-full h-auto rounded-lg mb-4"
                                        />
                                    )}
                                    {post.post.hashtags && (
                                        <p className="text-blue-500 text-sm mb-4">
                                            {post.post.hashtags}
                                        </p>
                                    )}
                                    <div className="card-actions justify-end">
                                        <button className="text-gray-500 hover:text-blue-500">
                                            👍 {post.post.likes}
                                        </button>
                                        <button className="text-gray-500 hover:text-red-500">
                                            👎 {post.post.dislikes}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontró ningún post</p>
                )}
            </div>
        </div>
    );
};