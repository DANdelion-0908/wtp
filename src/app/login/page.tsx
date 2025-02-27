import { Footer } from '@/components/footer'
import React from 'react'

export const Login = () => {
  return (
    <>
        <div className="hero min-h-screen fixed">
            <div className="hero-content w-[60%] h-auto flex-col">
                <div className="card w-full h-full">
                    <div className='flex flex-col text-start gap-10'>
                        <img src="favicon.png" className='self-center' alt="Logo de WTP" width={"100vh"}/>
                        <h1 className="text-5xl font-bold">Ingresa tus credenciales</h1>
                    </div>
                    <form className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text text-info">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input bg-gray-900 input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text text-info">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input bg-gray-900 input-bordered" required />
                        <label className="label">
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-accent">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
