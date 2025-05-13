import React from 'react';

const SelectFilter = ({ label, options, selectedValue, onFilterChange, placeholder }) => {
    const handleSelectChange = (e) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <label htmlFor={label.toLowerCase().replace(/ /g, '-') } className="block text-sm font-medium text-gray-700">{label}</label>
            <select 
                id={label.toLowerCase().replace(/ /g, '-')}
                value={selectedValue || ''} 
                onChange={handleSelectChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">{placeholder || `Selecione ${label.toLowerCase()}`}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>{option.nome}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectFilter;

