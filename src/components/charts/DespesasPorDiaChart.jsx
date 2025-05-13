import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import relatorioService from '../../services/relatorioService';

const DespesasPorDiaChart = ({ viagemId, filtros }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!viagemId) {
                setData([]);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const chartData = await relatorioService.getGraficoDespesasPorDia(viagemId, filtros);
                // Formatar a data para exibição no gráfico, se necessário
                const formattedData = chartData.map(item => ({ 
                    ...item, 
                    date: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) // Ex: DD/MM
                })); 
                setData(formattedData || []);
                setError('');
            } catch (err) {
                setError('Falha ao carregar dados do gráfico de despesas por dia.');
                console.error("Erro em DespesasPorDiaChart:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [viagemId, filtros]);

    if (loading) {
        return <p className="text-center text-gray-600">Carregando gráfico de despesas por dia...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (data.length === 0) {
        return <p className="text-center text-gray-600">Sem dados de despesas por dia para exibir.</p>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-96">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Despesas por Dia</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `€${value}`} />
                    <Tooltip formatter={(value) => `€${parseFloat(value).toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} name="Despesa (€)"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DespesasPorDiaChart;

