import React from 'react';

const DateRangeFilter = ({ onFilterChange }) => {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const handleApplyFilter = () => {
        onFilterChange({ startDate, endDate });
    };

    const handleClearFilter = () => {
        setStartDate('');
        setEndDate('');
        onFilterChange({ startDate: null, endDate: null });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Filtrar por Data</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data Início</label>
                    <input 
                        type="date" 
                        id="startDate" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data Fim</label>
                    <input 
                        type="date" 
                        id="endDate" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="mt-4 flex space-x-2">
                <button 
                    onClick={handleApplyFilter} 
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Aplicar Filtro
                </button>
                <button 
                    onClick={handleClearFilter} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Limpar Filtro
                </button>
            </div>
        </div>
    );
};

export default DateRangeFilter;

