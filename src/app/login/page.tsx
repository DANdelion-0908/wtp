'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Dashboard from '../dashboard/page';

export default function Login() {
    const [isUserAuth, setUserAuth] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleAuth = () => {
        if (localStorage.getItem("user")) {
            setUserAuth(true);

        } else {
            setUserAuth(false);
        }
    }

    const handleLogin = () => {
        localStorage.setItem("user", userName);
        handleAuth();

    }

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
                                    <img src="favicon.png" className='self-center' alt="Logo de WTP" width={"100vh"}/>
                                    <h1 className="text-5xl font-bold">Ingresa tus credenciales</h1>
                                </div>
                                <form className="card-body" action={() => handleLogin()}>
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
                <Dashboard handleAuth={handleAuth}/>
            )}
        </>
    )
}
