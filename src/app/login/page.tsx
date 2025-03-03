'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Dashboard from '../dashboard/page';
import { fetchUser } from '../functions/user';

export default function Login() {
    const [isUserAuth, setUserAuth] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleAuth = () => {
        if (localStorage.getItem("user")) {
            setUserAuth(true);

        } else {
            setUserAuth(false);
        }
    }

    const handleLogin = async () => {
        try {
            const response = await fetchUser(userName);
    
            if (response.message === "User found") {
                const user = response.user;
                const userCountry = response.country;
    
                if (user && user.password === password) {
                    // Convertir el objeto user a JSON y almacenarlo en localStorage
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("userName", user.user_name);
                    localStorage.setItem("userCountry", JSON.stringify(userCountry)); // Si country es un objeto
                    setUserAuth(true);
                    setError("");
                } else {
                    setError("Contraseña incorrecta");
                }
            } else if (response.message === "User not found") {
                setError("Usuario no encontrado");
            } else {
                setError("Respuesta inesperada del servidor");
            }
        } catch (error) {
            console.error("Error al buscar el usuario:", error);
            setError("Error al buscar el usuario. Inténtalo de nuevo.");
        }
    };

    const handleSignUp = () => {
        router.push("/signup")
    }

    useEffect(() => {
        handleAuth();

    }, [isUserAuth])

    return (
        <>
            {isUserAuth === false ? (
                <div className="hero min-h-screen fixed">
                    <div className="hero-content w-[60%] h-auto flex-col">
                        <div className="card w-full h-full">
                            <div className='flex flex-col text-start gap-10'>
                                <img src="favicon.png" className='self-center' alt="Logo de WTP" width={"100vh"} />
                                <h1 className="text-5xl font-bold">Ingresa tus credenciales</h1>
                            </div>
                            <form className="card-body" action={(e) => { handleLogin(); }}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-info">Nombre de usuario</span>
                                    </label>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Nombre de usuario" className="input bg-gray-900 input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-info">Contraseña</span>
                                    </label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="input bg-gray-900 input-bordered" required />
                                    <label className="label">
                                    </label>
                                </div>
                                {error && ( // Mostrar mensaje de error si existe
                                    <div className="text-red-500 text-sm mb-4">
                                        {error}
                                    </div>
                                )}
                                <div className="form-control mt-6">
                                    <button type='submit' className="btn btn-accent">Iniciar sesión</button>
                                    <div className='divider'>O</div>
                                    <button type='button' className='btn' onClick={handleSignUp}>Crear una cuenta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <Dashboard handleAuth={handleAuth} />
            )}
        </>
    )
}
