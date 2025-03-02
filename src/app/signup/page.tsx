'use client'

import React, { useEffect, useState } from 'react'
import Dashboard from '../dashboard/page';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [isUserAuth, setUserAuth] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const router = useRouter();

    const handleAuth = () => {
        if (localStorage.getItem("user")) {
            setUserAuth(true);

        } else {
            setUserAuth(false);
        }
    }

    const handleSignup = () => {
        if (password === verifyPassword) {
            localStorage.setItem("user", userName);
            handleAuth();

        } else {
            alert("Las contraseñas no coinciden.")
        }
    }

    const handleLogin= () => {
        router.push("/login")
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
                                <h1 className="text-5xl font-bold">Regístrate con tus datos</h1>
                            </div>
                            <form className="card-body" action={() => handleSignup()}>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-info">Nombre de usuario</span>
                                </label>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="nombre de usuario" className="input bg-gray-900 input-bordered" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-info">Contraseña</span>
                                </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña" className="input bg-gray-900 input-bordered" required />
                                <label className="label">
                                    <span className="label-text text-info">Verifica tu contraseña</span>
                                </label>
                                <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder="verificación de contraseña" className="input bg-gray-900 input-bordered" required />
                                <label className="label">
                                </label>
                                </div>
                                <div className="form-control mt-6">
                                <button type='submit' className="btn btn-accent">Registrarse</button>
                                <div className='divider'>O</div>
                                <button type='button' className='btn' onClick={handleLogin}>Iniciar sesión</button>
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
