import React, { useState, useEffect } from 'react';

// Placeholder para o componente ViagemForm
const ViagemForm = ({ viagemExistente, onSubmit, onCancel }) => {
    const [nomeViagem, setNomeViagem] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [orcamentoTotal, setOrcamentoTotal] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (viagemExistente) {
            setNomeViagem(viagemExistente.nome_viagem || '');
            setDataInicio(viagemExistente.data_inicio || '');
            setDataFim(viagemExistente.data_fim || '');
            setOrcamentoTotal(viagemExistente.orcamento_total !== null && viagemExistente.orcamento_total !== undefined ? String(viagemExistente.orcamento_total) : '');
        }
    }, [viagemExistente]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nomeViagem) {
            setError('O nome da viagem é obrigatório.');
            return;
        }
        setError('');
        
        const dadosViagem = {
            nome_viagem: nomeViagem,
            data_inicio: dataInicio || null,
            data_fim: dataFim || null,
            orcamento_total: orcamentoTotal ? parseFloat(orcamentoTotal) : null,
        };
        // Adicionar o ID se for uma edição
        if (viagemExistente && viagemExistente.id) {
            dadosViagem.id = viagemExistente.id;
        }

        onSubmit(dadosViagem);
        // Limpar formulário após submissão (opcional, depende do fluxo)
        // setNomeViagem('');
        // setDataInicio('');
        // setDataFim('');
        // setOrcamentoTotal('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {viagemExistente ? 'Editar Viagem' : 'Nova Viagem'}
            </h3>
            <div>
                <label htmlFor="nomeViagem" className="block text-sm font-medium text-gray-700">Nome da Viagem*</label>
                <input 
                    type="text" 
                    id="nomeViagem" 
                    value={nomeViagem} 
                    onChange={(e) => setNomeViagem(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required 
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">Data de Início</label>
                    <input 
                        type="date" 
                        id="dataInicio" 
                        value={dataInicio} 
                        onChange={(e) => setDataInicio(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700">Data de Fim</label>
                    <input 
                        type="date" 
                        id="dataFim" 
                        value={dataFim} 
                        onChange={(e) => setDataFim(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="orcamentoTotal" className="block text-sm font-medium text-gray-700">Orçamento Total (€)</label>
                <input 
                    type="number" 
                    id="orcamentoTotal" 
                    value={orcamentoTotal} 
                    onChange={(e) => setOrcamentoTotal(e.target.value)} 
                    placeholder="Ex: 1500.00"
                    step="0.01"
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
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {viagemExistente ? 'Salvar Alterações' : 'Criar Viagem'}
                </button>
            </div>
        </form>
    );
};

export default ViagemForm;

