import React, { useState } from 'react'

interface UserPageProps {
    currentProfilePicture: string,
    currentUserName: string
}

export const UserPage = ({
    currentProfilePicture,
    currentUserName
}: UserPageProps) => {
    const [profilePicture, setProfilePicture] = useState(currentProfilePicture);
    const [userName, setUsername] = useState(currentUserName);
    const [posts, setPosts] = useState([
        {
            "id": 1,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 2,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 3,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 4,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 4,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 4,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 4,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 4,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
          {
            "id": 4,
            "profilePicture": "/eula.jpg",
            "user": "dandelion",
            "title": "Mi primer post",
            "body": "¡Hola, Mundo! Estoy probando a escribir un texto medianamente largo y creíble.",
            "likesCount": 6,
            "dislikesCount": 8,
            "sharedCount": 9,
            "hashtags": ["greeting", "new", "UwU"]
          },
    ]);

    async function fetchPostsByUser(user: string) {
        try {
        const response = await fetch(``);    
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
    
        const posts = await response.json();
    
        if (!posts || Object.keys(posts).length === 0) {
            console.log("No se encontró el posts.");
            return null;
            
        }
    
        setPosts(posts);
    
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
            return false;
    
        }
    }

    return (
        <div className="card w-[40%] pb-[5%] h-full overflow-auto shadow-xl">
                <div className='bg-primary w-[40%] flex gap-5 fixed z-10 rounded-xl'>
                    <img
                    src={currentProfilePicture}
                    className='rounded-xl'
                    width={"20%"}
                    alt="Profile Picture" />
                    <h2 className="card-title font-bold text-white">{currentUserName}</h2>
                </div>
            <div className="card-body bg-base-300 mt-[20%]">
                {posts.length === 0 ? (
                    <p>No se encontró ningún post</p>
                ) : (
                    posts.map((post, index) => (
                        <div className='card bg-base-200 mb-[2%] w-[100%] shadow-xl' key={index}>
                            <div className="card-body flex flex-row items-center">
                                <img
                                src={post.profilePicture}
                                className="rounded-[50%]"
                                alt="User PFP"
                                width={70}
                                height={70}
                                />
                                <h3>{post.user}</h3>
                            </div>
                            <div className="">
                                <div className="card-body">
                                    <h2 className="card-title">{post.title}</h2>
                                    <p>{post.body}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
