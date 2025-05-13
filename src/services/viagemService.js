import apiClient from "./authService"; // Reutilizar o apiClient configurado

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Garante que temos a URL base

// Viagens
const getAllViagens = async () => {
    try {
        const response = await apiClient.get(`/api/viagens`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar viagens:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao buscar viagens");
    }
};

const getViagemById = async (id) => {
    try {
        const response = await apiClient.get(`/api/viagens/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar viagem ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar viagem ${id}`);
    }
};

const createViagem = async (viagemData) => {
    try {
        const response = await apiClient.post(`/api/viagens`, viagemData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar viagem:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao criar viagem");
    }
};

const updateViagem = async (id, viagemData) => {
    try {
        const response = await apiClient.put(`/api/viagens/${id}`, viagemData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar viagem ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao atualizar viagem ${id}`);
    }
};

const deleteViagem = async (id) => {
    try {
        const response = await apiClient.delete(`/api/viagens/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar viagem ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao deletar viagem ${id}`);
    }
};

const viagemService = {
    getAllViagens,
    getViagemById,
    createViagem,
    updateViagem,
    deleteViagem,
};

export default viagemService;

