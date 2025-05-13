import React, { useState, useEffect } from 'react';
import ViagemCard from './ViagemCard';
// import viagemService from '../../services/viagemService'; // Uncomment when service is ready
// import { Link } from 'react-router-dom'; // Uncomment for navigation

const ViagemList = () => {
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Placeholder data - replace with API call
    const placeholderViagens = [
        { id: 1, nome_viagem: 'Férias na Europa', data_inicio: '2025-07-10', data_fim: '2025-07-25', orcamento_total: 3000 },
        { id: 2, nome_viagem: 'Conferência em São Paulo', data_inicio: '2025-09-05', data_fim: '2025-09-08', orcamento_total: 800 },
        { id: 3, nome_viagem: 'Fim de Semana na Serra', data_inicio: '2025-11-15', data_fim: '2025-11-17', orcamento_total: 450 },
    ];

    useEffect(() => {
        const fetchViagens = async () => {
            try {
                // const data = await viagemService.getAllViagens(); // Uncomment when service is ready
                // setViagens(data);
                setViagens(placeholderViagens); // Using placeholder data for now
                setLoading(false);
            } catch (err) {
                setError('Falha ao carregar viagens.');
                console.error(err);
                setLoading(false);
            }
        };

        fetchViagens();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-600">Carregando viagens...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Minhas Viagens</h2>
                {/* <Link to="/viagens/nova" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    + Nova Viagem
                </Link> */}
                 <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    + Nova Viagem (Simulado)
                </button>
            </div>
            {viagens.length === 0 ? (
                <p className="text-gray-600">Nenhuma viagem encontrada.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {viagens.map(viagem => (
                        <ViagemCard key={viagem.id} viagem={viagem} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViagemList;

