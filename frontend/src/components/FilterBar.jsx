import { useState } from 'react';
import { FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ 
  filters, 
  updateFilter, 
  clearFilters, 
  uniqueValues 
}) => {
  const [expanded, setExpanded] = useState(true);
  const { fridgeIds, instruments, parameters } = uniqueValues;
  
  const toggleExpanded = () => setExpanded(prev => !prev);
  
  // Simple direct search handler
  const handleSearchChange = (e) => {
    updateFilter('search', e.target.value);
  };
  
  // Handle search clear
  const handleClearSearch = () => {
    updateFilter('search', '');
  };
  
  const handleTimeFilterChange = (e) => {
    updateFilter('timeFilter', e.target.value);
  };

  const handleClearTimeFilter = () => {
    updateFilter('timeFilter', '');
  };
  
  const hasActiveFilters = filters.fridge_id || filters.instrument_name || filters.parameter_name || filters.search || filters.timeFilter;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-4 mb-6 border-l-4 border-primary-500"
    >
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <FaFilter className="text-primary-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Filter Settings</h2>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <button
            onClick={toggleExpanded}
            className="flex items-center text-sm text-gray-500 hover:text-primary-500 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
          >
            {expanded ? <FaChevronUp className="mr-1" /> : <FaChevronDown className="mr-1" />}
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Search Bar - Always visible */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search across all columns..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              {filters.search && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {/* Column Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Fridge ID Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Fridge ID</label>
                <select
                  value={filters.fridge_id}
                  onChange={(e) => updateFilter('fridge_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="">All Fridges</option>
                  {fridgeIds.map((id) => (
                    <option key={id} value={id}>
                      Fridge {id}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Instrument Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Instrument</label>
                <select
                  value={filters.instrument_name}
                  onChange={(e) => updateFilter('instrument_name', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="">All Instruments</option>
                  {instruments.map((instrument) => (
                    <option key={instrument} value={instrument}>
                      {instrument}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Parameter Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Parameter</label>
                <select
                  value={filters.parameter_name}
                  onChange={(e) => updateFilter('parameter_name', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="">All Parameters</option>
                  {parameters.map((parameter) => (
                    <option key={parameter} value={parameter}>
                      {parameter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Time Filter */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 bottom-1 pl-3 flex items-center justify-center pointer-events-none">
                  <FaClock className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.timeFilter}
                  onChange={handleTimeFilterChange}
                  placeholder="Filter by time (e.g., '2025', '02-14', '06:44')"
                  className="input pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
                {filters.timeFilter && (
                  <button
                    onClick={handleClearTimeFilter}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Clear time filter"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <div>
                <button
                  onClick={clearFilters}
                  className="btn btn-secondary py-2 px-4 h-[42px] whitespace-nowrap"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 pt-3 border-t border-gray-200"
              >
                <div className="text-xs text-gray-500 mb-2">Active Filters:</div>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs flex items-center">
                      Search: {filters.search}
                      <button 
                        onClick={handleClearSearch}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  
                  {filters.fridge_id && (
                    <div className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs flex items-center">
                      Fridge: {filters.fridge_id}
                      <button 
                        onClick={() => updateFilter('fridge_id', '')}
                        className="ml-1 text-secondary-600 hover:text-secondary-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  
                  {filters.instrument_name && (
                    <div className="bg-accent-100 text-accent-800 px-2 py-1 rounded-full text-xs flex items-center">
                      Instrument: {filters.instrument_name}
                      <button 
                        onClick={() => updateFilter('instrument_name', '')}
                        className="ml-1 text-accent-600 hover:text-accent-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  
                  {filters.parameter_name && (
                    <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center">
                      Parameter: {filters.parameter_name}
                      <button 
                        onClick={() => updateFilter('parameter_name', '')}
                        className="ml-1 text-gray-600 hover:text-gray-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterBar; 