import React, { useState, useEffect, useCallback } from 'react';
import DateRangeFilter from './DateRangeFilter';
import SelectFilter from './SelectFilter';
import DespesasPorCategoriaChart from '../charts/DespesasPorCategoriaChart';
import DespesasPorDiaChart from '../charts/DespesasPorDiaChart';
import relatorioService from '../../services/relatorioService';
import destinoService from '../../services/destinoService'; // Para buscar lista de destinos para o filtro
import dropdownService from '../../services/dropdownService'; // Para buscar categorias e meios de pagamento

const RelatoriosViagem = ({ viagemId }) => {
    const [filtros, setFiltros] = useState({
        data_inicio: null,
        data_fim: null,
        id_destino: null,
        meio_pagamento_id: null,
        categoria_id: null, // Adicionado filtro de categoria
    });

    const [destinos, setDestinos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [meiosPagamento, setMeiosPagamento] = useState([]);

    const [relatorioGeral, setRelatorioGeral] = useState(null);
    const [loadingRelatorio, setLoadingRelatorio] = useState(false);
    const [errorRelatorio, setErrorRelatorio] = useState('');

    // Fetch dropdown data (destinos, categorias, meios de pagamento)
    useEffect(() => {
        const fetchDropdownData = async () => {
            if (!viagemId) return;
            try {
                const [destinosData, categoriasData, meiosPagamentoData] = await Promise.all([
                    destinoService.getDestinosPorViagem(viagemId),
                    dropdownService.getAllCategorias(),
                    dropdownService.getAllMeiosPagamento(),
                ]);
                setDestinos(destinosData || []);
                setCategorias(categoriasData || []);
                setMeiosPagamento(meiosPagamentoData || []);
            } catch (error) {
                console.error("Erro ao carregar dados para filtros:", error);
                // setErrorFilters('Falha ao carregar opções de filtro.');
            }
        };
        fetchDropdownData();
    }, [viagemId]);

    const handleFilterChange = useCallback((novosFiltros) => {
        setFiltros(prevFiltros => ({ ...prevFiltros, ...novosFiltros }));
    }, []);

    // Fetch relatório geral quando filtros mudam
    useEffect(() => {
        const fetchRelatorio = async () => {
            if (!viagemId) return;
            setLoadingRelatorio(true);
            setErrorRelatorio('');
            try {
                const params = {};
                if (filtros.data_inicio) params.data_inicio = filtros.data_inicio;
                if (filtros.data_fim) params.data_fim = filtros.data_fim;
                if (filtros.id_destino) params.id_destino = filtros.id_destino;
                if (filtros.meio_pagamento_id) params.meio_pagamento_id = filtros.meio_pagamento_id;
                if (filtros.categoria_id) params.categoria_id = filtros.categoria_id;
                
                // const data = await relatorioService.getRelatorioGeral(viagemId, params);
                // setRelatorioGeral(data);
                // Placeholder para relatório geral
                setRelatorioGeral({
                    nome_viagem: "Viagem Exemplo",
                    orcamento_total_viagem: 2000,
                    total_gasto_geral: 1500,
                    saldo_geral: 500,
                    despesas_por_categoria: [{categoria: "Alimentação", total: 700}, {categoria: "Transporte", total: 300}],
                    despesas_por_destino: [{destino: "Paris", total: 1000}, {destino: "Roma", total: 500}],
                    filtros_aplicados: params
                }); 

            } catch (error) {
                console.error("Erro ao carregar relatório geral:", error);
                setErrorRelatorio('Falha ao carregar relatório geral.');
            } finally {
                setLoadingRelatorio(false);
            }
        };

        fetchRelatorio();
    }, [viagemId, filtros]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Relatórios e Gráficos da Viagem</h2>
            
            {/* Seção de Filtros */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Filtros</h3>
                <DateRangeFilter onFilterChange={({ startDate, endDate }) => handleFilterChange({ data_inicio: startDate, data_fim: endDate })} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <SelectFilter 
                        label="Destino (Cidade)" 
                        options={destinos.map(d => ({ id: d.id, nome: d.nome_cidade }))} 
                        selectedValue={filtros.id_destino}
                        onFilterChange={(value) => handleFilterChange({ id_destino: value || null })}
                        placeholder="Todos os Destinos"
                    />
                    <SelectFilter 
                        label="Categoria de Despesa" 
                        options={categorias} 
                        selectedValue={filtros.categoria_id}
                        onFilterChange={(value) => handleFilterChange({ categoria_id: value || null })}
                        placeholder="Todas as Categorias"
                    />
                    <SelectFilter 
                        label="Meio de Pagamento" 
                        options={meiosPagamento} 
                        selectedValue={filtros.meio_pagamento_id}
                        onFilterChange={(value) => handleFilterChange({ meio_pagamento_id: value || null })}
                        placeholder="Todos os Meios"
                    />
                </div>
            </div>

            {/* Seção de Relatório Geral */}
            {loadingRelatorio && <p>Carregando relatório...</p>}
            {errorRelatorio && <p className="text-red-500">{errorRelatorio}</p>}
            {relatorioGeral && !loadingRelatorio && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Resumo Geral da Viagem: {relatorioGeral.nome_viagem}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-500">Orçamento Total</p>
                            <p className="text-2xl font-bold text-blue-600">€{parseFloat(relatorioGeral.orcamento_total_viagem || 0).toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Gasto (Filtrado)</p>
                            <p className="text-2xl font-bold text-red-600">€{parseFloat(relatorioGeral.total_gasto_geral || 0).toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Saldo (Baseado no Orçamento Total)</p>
                            <p className="text-2xl font-bold text-green-600">€{parseFloat(relatorioGeral.saldo_geral || 0).toFixed(2)}</p>
                        </div>
                    </div>
                    {/* Detalhes adicionais do relatório podem ser adicionados aqui */}
                </div>
            )}

            {/* Seção de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DespesasPorCategoriaChart viagemId={viagemId} filtros={filtros} />
                <DespesasPorDiaChart viagemId={viagemId} filtros={filtros} />
            </div>
        </div>
    );
};

export default RelatoriosViagem;

