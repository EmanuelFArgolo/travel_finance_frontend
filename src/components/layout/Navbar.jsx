import React from 'react';
// import { Link } from 'react-router-dom'; // Uncomment when router is set up

const Navbar = () => {
    // const { user, logout } = useContext(AuthContext); // Uncomment when AuthContext is created
    const user = { username: 'Admin (Simulado)' }; // Placeholder
    const logout = () => alert('Logout Simulado'); // Placeholder

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    {/* <Link to="/dashboard">Controle de Viagens</Link> */}
                    <a href="#">Controle de Viagens</a> {/* Placeholder Link */}
                </div>
                <div className="flex items-center">
                    {user && <span className="mr-4">Olá, {user.username}!</span>}
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

