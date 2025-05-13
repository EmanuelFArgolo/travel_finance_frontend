import apiClient from "./authService"; // Reutilizar o apiClient configurado

// Categorias de Despesa
const getAllCategorias = async () => {
    try {
        const response = await apiClient.get(`/api/categorias`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao buscar categorias");
    }
};

const createCategoria = async (categoriaData) => {
    try {
        const response = await apiClient.post(`/api/categorias`, categoriaData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar categoria:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao criar categoria");
    }
};

const updateCategoria = async (id, categoriaData) => {
    try {
        const response = await apiClient.put(`/api/categorias/${id}`, categoriaData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar categoria ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao atualizar categoria ${id}`);
    }
};

const deleteCategoria = async (id) => {
    try {
        const response = await apiClient.delete(`/api/categorias/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar categoria ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao deletar categoria ${id}`);
    }
};

// Meios de Pagamento
const getAllMeiosPagamento = async () => {
    try {
        const response = await apiClient.get(`/api/meios_pagamento`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar meios de pagamento:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao buscar meios de pagamento");
    }
};

const createMeioPagamento = async (meioPagamentoData) => {
    try {
        const response = await apiClient.post(`/api/meios_pagamento`, meioPagamentoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar meio de pagamento:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Erro ao criar meio de pagamento");
    }
};

const updateMeioPagamento = async (id, meioPagamentoData) => {
    try {
        const response = await apiClient.put(`/api/meios_pagamento/${id}`, meioPagamentoData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar meio de pagamento ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao atualizar meio de pagamento ${id}`);
    }
};

const deleteMeioPagamento = async (id) => {
    try {
        const response = await apiClient.delete(`/api/meios_pagamento/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar meio de pagamento ${id}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error(`Erro ao deletar meio de pagamento ${id}`);
    }
};

const dropdownService = {
    getAllCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getAllMeiosPagamento,
    createMeioPagamento,
    updateMeioPagamento,
    deleteMeioPagamento,
};

export default dropdownService;

