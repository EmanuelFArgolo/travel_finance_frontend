import apiClient from "./authService"; // Reutilizar o apiClient configurado

// Relatórios e Gráficos
const getRelatorioGeral = async (idViagem, filtros = {}) => {
    try {
        const response = await apiClient.get(`/api/viagens/${idViagem}/relatorio/geral`, { params: filtros });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar relatório geral para viagem ${idViagem}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar relatório geral para viagem ${idViagem}`);
    }
};

const getGraficoDespesasPorCategoria = async (idViagem, filtros = {}) => {
    try {
        const response = await apiClient.get(`/api/viagens/${idViagem}/grafico/despesas_por_categoria`, { params: filtros });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar gráfico de despesas por categoria para viagem ${idViagem}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar gráfico de despesas por categoria para viagem ${idViagem}`);
    }
};

const getGraficoDespesasPorDia = async (idViagem, filtros = {}) => {
    try {
        const response = await apiClient.get(`/api/viagens/${idViagem}/grafico/despesas_por_dia`, { params: filtros });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar gráfico de despesas por dia para viagem ${idViagem}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar gráfico de despesas por dia para viagem ${idViagem}`);
    }
};

const relatorioService = {
    getRelatorioGeral,
    getGraficoDespesasPorCategoria,
    getGraficoDespesasPorDia,
};

export default relatorioService;

