import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import relatorioService from '../../services/relatorioService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF00AA', '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const DespesasPorCategoriaChart = ({ viagemId, filtros }) => {
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
                const chartData = await relatorioService.getGraficoDespesasPorCategoria(viagemId, filtros);
                setData(chartData || []);
                setError('');
            } catch (err) {
                setError('Falha ao carregar dados do gráfico de categorias.');
                console.error("Erro em DespesasPorCategoriaChart:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [viagemId, filtros]);

    if (loading) {
        return <p className="text-center text-gray-600">Carregando gráfico de categorias...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (data.length === 0) {
        return <p className="text-center text-gray-600">Sem dados de despesas por categoria para exibir.</p>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-96">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Despesas por Categoria</h4>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `€${parseFloat(value).toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DespesasPorCategoriaChart;

