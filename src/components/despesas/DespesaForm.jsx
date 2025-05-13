import React, { useState, useEffect } from 'react';

// Placeholder para o componente DespesaForm
const DespesaForm = ({ despesaExistente, onSubmit, onCancel, categorias = [], meiosPagamento = [] }) => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [meioPagamentoId, setMeioPagamentoId] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [error, setError] = useState('');

    // Mock data for dropdowns - replace with props or context/service call
    const mockCategorias = [
        { id: 1, nome: 'Alimentação' },
        { id: 2, nome: 'Transporte' },
        { id: 3, nome: 'Hospedagem' },
        { id: 4, nome: 'Lazer' },
        { id: 5, nome: 'Outros' },
    ];
    const mockMeiosPagamento = [
        { id: 1, nome: 'Cartão de Crédito' },
        { id: 2, nome: 'Dinheiro' },
        { id: 3, nome: 'Cartão de Débito' },
        { id: 4, nome: 'PIX' },
    ];

    const availableCategorias = categorias.length > 0 ? categorias : mockCategorias;
    const availableMeiosPagamento = meiosPagamento.length > 0 ? meiosPagamento : mockMeiosPagamento;

    useEffect(() => {
        if (despesaExistente) {
            setDescricao(despesaExistente.descricao || '');
            setValor(despesaExistente.valor !== null && despesaExistente.valor !== undefined ? String(despesaExistente.valor) : '');
            setData(despesaExistente.data || '');
            setCategoriaId(despesaExistente.categoria_id || '');
            setMeioPagamentoId(despesaExistente.meio_pagamento_id || '');
            setObservacoes(despesaExistente.observacoes || '');
        }
    }, [despesaExistente]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!descricao || !valor || !data) {
            setError('Descrição, valor e data são obrigatórios.');
            return;
        }
        setError('');
        
        const dadosDespesa = {
            descricao,
            valor: parseFloat(valor),
            data,
            categoria_id: categoriaId ? parseInt(categoriaId) : null,
            meio_pagamento_id: meioPagamentoId ? parseInt(meioPagamentoId) : null,
            observacoes,
        };

        if (despesaExistente && despesaExistente.id) {
            dadosDespesa.id = despesaExistente.id;
        }

        onSubmit(dadosDespesa);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {despesaExistente ? 'Editar Despesa' : 'Nova Despesa'}
            </h3>
            <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição*</label>
                <input 
                    type="text" 
                    id="descricao" 
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required 
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor (€)*</label>
                    <input 
                        type="number" 
                        id="valor" 
                        value={valor} 
                        onChange={(e) => setValor(e.target.value)} 
                        placeholder="Ex: 25.50"
                        step="0.01"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data*</label>
                    <input 
                        type="date" 
                        id="data" 
                        value={data} 
                        onChange={(e) => setData(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required 
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select 
                        id="categoriaId" 
                        value={categoriaId} 
                        onChange={(e) => setCategoriaId(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Selecione uma categoria</option>
                        {availableCategorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="meioPagamentoId" className="block text-sm font-medium text-gray-700">Meio de Pagamento</label>
                    <select 
                        id="meioPagamentoId" 
                        value={meioPagamentoId} 
                        onChange={(e) => setMeioPagamentoId(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Selecione um meio de pagamento</option>
                        {availableMeiosPagamento.map(mp => (
                            <option key={mp.id} value={mp.id}>{mp.nome}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">Observações</label>
                <textarea 
                    id="observacoes" 
                    value={observacoes} 
                    onChange={(e) => setObservacoes(e.target.value)} 
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="flex justify-end space-x-3 pt-2">
                {onCancel && (
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancelar
                    </button>
                )}
                <button 
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                    {despesaExistente ? 'Salvar Alterações' : 'Adicionar Despesa'}
                </button>
            </div>
        </form>
    );
};

export default DespesaForm;

