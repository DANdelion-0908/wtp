import React from 'react'

export const Header = ({handleProfile, setProfileActive, handleAuth}) => {
    const handleLogout = () => {
        localStorage.removeItem("user");
        handleAuth();
        alert("Nos vemos.");
    }

    return (
        <>
            <div className="navbar bg-base absolute bg-base-300 top-0 z-10">
                <div className="flex-1">
                    <img src="favicon.png" width={"3%"} alt="Ícono de la app"/>
                    <a className="btn btn-ghost text-xl" onClick={setProfileActive}>What The Post?!</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="/eula.jpg" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-600 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a className="justify-between" onClick={handleProfile}>Perfil</a></li>
                        <li><a onClick={handleLogout}>Cerrar sesión</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
