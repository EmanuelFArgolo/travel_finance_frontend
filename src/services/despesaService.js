import apiClient from "./authService"; // Reutilizar o apiClient configurado

// Despesas (aninhadas sob destinos)
const getDespesasPorDestino = async (idDestino, filtros = {}) => {
    try {
        const response = await apiClient.get(`/api/destinos/${idDestino}/despesas`, { params: filtros });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar despesas para o destino ${idDestino}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar despesas para o destino ${idDestino}`);
    }
};

const getDespesaById = async (idDespesa) => {
    try {
        const response = await apiClient.get(`/api/despesas/${idDespesa}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar despesa ${idDespesa}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar despesa ${idDespesa}`);
    }
};

const createDespesa = async (idDestino, despesaData) => {
    try {
        const response = await apiClient.post(`/api/destinos/${idDestino}/despesas`, despesaData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar despesa:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao criar despesa");
    }
};

const updateDespesa = async (idDespesa, despesaData) => {
    try {
        const response = await apiClient.put(`/api/despesas/${idDespesa}`, despesaData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar despesa ${idDespesa}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao atualizar despesa ${idDespesa}`);
    }
};

const deleteDespesa = async (idDespesa) => {
    try {
        const response = await apiClient.delete(`/api/despesas/${idDespesa}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar despesa ${idDespesa}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao deletar despesa ${idDespesa}`);
    }
};

const despesaService = {
    getDespesasPorDestino,
    getDespesaById,
    createDespesa,
    updateDespesa,
    deleteDespesa,
};

export default despesaService;

