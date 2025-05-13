import React from 'react';
import Navbar from '../components/layout/Navbar'; // Assuming Navbar is in layout
// import ViagemList from '../components/viagens/ViagemList'; // Placeholder for ViagemList

const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder cards for summary data */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Total de Viagens</h2>
                        <p className="text-3xl font-bold text-blue-500">5</p> {/* Placeholder data */}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Despesa Total (Este Mês)</h2>
                        <p className="text-3xl font-bold text-green-500">€1,250.00</p> {/* Placeholder data */}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Próxima Viagem</h2>
                        <p className="text-lg text-gray-600">Paris - 25/12/2025</p> {/* Placeholder data */}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Minhas Viagens Recentes</h2>
                    {/* <ViagemList /> */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-600">Lista de viagens aparecerá aqui...</p> 
                        {/* Example item */}
                        <div className="mt-2 p-3 border rounded-md hover:bg-gray-50">
                            <h3 className="font-semibold text-lg">Viagem para a Praia</h3>
                            <p className="text-sm text-gray-500">01/07/2025 - 07/07/2025</p>
                            <p className="text-sm">Orçamento: €500.00</p>
                        </div>
                        <div className="mt-2 p-3 border rounded-md hover:bg-gray-50">
                            <h3 className="font-semibold text-lg">Conferência em Berlim</h3>
                            <p className="text-sm text-gray-500">15/08/2025 - 18/08/2025</p>
                            <p className="text-sm">Orçamento: €700.00</p>
                        </div>
                    </div>
                </div>
                 {/* Placeholder for quick actions or charts */}
                 <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Nova Viagem
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Nova Despesa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

