import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ItineraryFilter as FilterType } from '../types';

interface ItineraryFilterProps {
  onFilter: (filters: FilterType) => void;
}

const ItineraryFilter: React.FC<ItineraryFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<FilterType>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterType, value: any) => {
    if (value === '' || value === 0) {
      const newFilters = { ...filters };
      delete newFilters[key];
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const resetFilters = () => {
    setFilters({});
    onFilter({});
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Find Your Perfect Itinerary</h2>
        <button
          onClick={toggleFilters}
          className="flex items-center text-primary-500 hover:text-primary-600"
        >
          <SlidersHorizontal size={18} className="mr-1" />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search destinations..."
            className="input w-full pl-10"
            onChange={(e) => handleFilterChange('destination', e.target.value)}
            value={filters.destination || ''}
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={applyFilters} className="btn-primary whitespace-nowrap">
          Search
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4 animate-slide-up">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (nights)</label>
            <select
              className="select w-full"
              value={filters.duration || ''}
              onChange={(e) => handleFilterChange('duration', e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">Any duration</option>
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} nights
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Any price"
              min="0"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : '')}
            />
          </div>
          
          <div className="flex items-end">
            <button onClick={resetFilters} className="btn-outline w-full">
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryFilter;