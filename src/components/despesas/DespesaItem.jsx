import React from 'react';

// Placeholder para o componente DespesaItem
const DespesaItem = ({ despesa }) => {
    const formatCurrency = (value) => {
        return `€${parseFloat(value).toFixed(2)}`;
    };

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4 text-sm text-gray-700">{despesa.data || 'N/A'}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{despesa.descricao || 'Descrição não disponível'}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{despesa.categoria_nome || 'Sem Categoria'}</td>
            <td className="py-3 px-4 text-sm text-right text-red-600 font-medium">{formatCurrency(despesa.valor || 0)}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{despesa.meio_pagamento_nome || 'N/A'}</td>
            <td className="py-3 px-4 text-sm text-gray-500">{despesa.observacoes || '-'}</td>
            <td className="py-3 px-4 text-sm">
                <button className="text-blue-500 hover:text-blue-700 mr-2">Editar</button>
                <button className="text-red-500 hover:text-red-700">Excluir</button>
            </td>
        </tr>
    );
};

export default DespesaItem;

