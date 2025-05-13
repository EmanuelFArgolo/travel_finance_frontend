import React from 'react';

// Placeholder para o componente ViagemCard
const ViagemCard = ({ viagem }) => {
    // const navigate = useNavigate(); // Para navegação ao clicar, se necessário

    const handleCardClick = () => {
        // navigate(`/viagens/${viagem.id}`); // Exemplo de navegação para detalhes da viagem
        alert(`Clicou na viagem: ${viagem.nome_viagem}`); // Placeholder
    };

    return (
        <div 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleCardClick}
        >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{viagem.nome_viagem || 'Nome da Viagem Indefinido'}</h3>
            <p className="text-sm text-gray-600">
                Data: {viagem.data_inicio || 'N/A'} - {viagem.data_fim || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
                Orçamento: €{viagem.orcamento_total !== null && viagem.orcamento_total !== undefined ? parseFloat(viagem.orcamento_total).toFixed(2) : '0.00'}
            </p>
            {/* Adicionar mais detalhes ou ações rápidas se necessário */}
        </div>
    );
};

export default ViagemCard;

