import apiClient from "./authService"; // Reutilizar o apiClient configurado

// Destinos (aninhados sob viagens)
const getDestinosPorViagem = async (idViagem) => {
    try {
        const response = await apiClient.get(`/api/viagens/${idViagem}/destinos`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar destinos para viagem ${idViagem}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar destinos para viagem ${idViagem}`);
    }
};

const getDestinoById = async (idDestino) => {
    try {
        const response = await apiClient.get(`/api/destinos/${idDestino}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar destino ${idDestino}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao buscar destino ${idDestino}`);
    }
};

const createDestino = async (idViagem, destinoData) => {
    try {
        const response = await apiClient.post(`/api/viagens/${idViagem}/destinos`, destinoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar destino:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao criar destino");
    }
};

const updateDestino = async (idDestino, destinoData) => {
    try {
        const response = await apiClient.put(`/api/destinos/${idDestino}`, destinoData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar destino ${idDestino}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao atualizar destino ${idDestino}`);
    }
};

const deleteDestino = async (idDestino) => {
    try {
        const response = await apiClient.delete(`/api/destinos/${idDestino}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar destino ${idDestino}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao deletar destino ${idDestino}`);
    }
};

const destinoService = {
    getDestinosPorViagem,
    getDestinoById,
    createDestino,
    updateDestino,
    deleteDestino,
};

export default destinoService;

