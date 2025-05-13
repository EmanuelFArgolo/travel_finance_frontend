import React, { useState, useEffect } from 'react';
import DespesaItem from './DespesaItem';
// import despesaService from '../../services/despesaService'; // Uncomment when service is ready

const DespesaTable = ({ destinoId }) => {
    const [despesas, setDespesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Placeholder data - replace with API call
    const placeholderDespesas = [
        { id: 1, data: '2025-07-12', descricao: 'Almoço Restaurante Mar', categoria_nome: 'Alimentação', valor: 45.50, meio_pagamento_nome: 'Cartão Crédito', observacoes: 'Com vista para o mar' },
        { id: 2, data: '2025-07-12', descricao: 'Ticket Museu de Arte', categoria_nome: 'Lazer', valor: 15.00, meio_pagamento_nome: 'Dinheiro', observacoes: '' },
        { id: 3, data: '2025-07-13', descricao: 'Metrô para o centro', categoria_nome: 'Transporte', valor: 2.50, meio_pagamento_nome: 'Cartão Transporte', observacoes: 'Ida e volta' },
        { id: 4, data: '2025-09-06', descricao: 'Jantar com Clientes', categoria_nome: 'Alimentação', valor: 120.00, meio_pagamento_nome: 'Cartão Corporativo', observacoes: 'Restaurante Fogo de Chão' },
    ];

    useEffect(() => {
        const fetchDespesas = async () => {
            if (!destinoId) {
                setLoading(false);
                // setError('ID do Destino não fornecido para carregar despesas.');
                // console.warn('ID do Destino não fornecido para carregar despesas.');
                setDespesas(placeholderDespesas); // Show all placeholders if no ID for now
                return;
            }
            try {
                setLoading(true);
                // const data = await despesaService.getDespesasPorDestino(destinoId); // Uncomment when service is ready
                // setDespesas(data);
                // Filter placeholder data by a mock destinoId if needed for simulation
                const filteredPlaceholders = placeholderDespesas.filter(d => {
                    if (destinoId === 1) return d.id <= 3; // Mock: destino 1 tem despesas 1,2,3
                    if (destinoId === 2) return d.id === 4; // Mock: destino 2 tem despesa 4
                    return true; // Show all if no specific mock filter
                });
                setDespesas(filteredPlaceholders);

            } catch (err) {
                setError('Falha ao carregar despesas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDespesas();
    }, [destinoId]);

    if (loading) {
        return <p className="text-center text-gray-600">Carregando despesas...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Despesas do Destino</h3>
                <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">
                    + Nova Despesa (Simulado)
                </button>
            </div>
            {despesas.length === 0 ? (
                <p className="text-gray-600">Nenhuma despesa encontrada para este destino.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagamento</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obs.</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {despesas.map(despesa => (
                                <DespesaItem key={despesa.id} despesa={despesa} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DespesaTable;

