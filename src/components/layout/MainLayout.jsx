import React from 'react';
import Navbar from './Navbar'; // Supondo que Navbar.jsx está na mesma pasta ou caminho correto

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-4">
                {children}
            </main>
            {/* Você pode adicionar um Footer aqui se desejar */}
        </div>
    );
};

export default MainLayout;

