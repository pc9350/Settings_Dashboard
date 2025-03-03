import React, { useEffect } from 'react';
import { FaThermometerHalf, FaTools, FaCog, FaDatabase } from 'react-icons/fa';
import useSettings from '../hooks/useSettings';
import FilterBar from '../components/FilterBar';
import SettingsTable from '../components/SettingsTable';
import StatsCard from '../components/StatsCard';

const SettingsPage = () => {
  const { 
    settings, 
    allSettings, 
    stats,
    loading, 
    error, 
    filters, 
    sorting,
    updateFilter, 
    clearFilters,
    updateSorting,
    uniqueValues 
  } = useSettings();

  const totalFridges = stats.unique_fridges || uniqueValues.fridgeIds?.length || 0;
  const totalInstruments = stats.unique_instruments || uniqueValues.instruments?.length || 0;
  const totalParameters = stats.unique_parameters || uniqueValues.parameters?.length || 0;
  const totalSettings = stats.total_settings || allSettings.length;

  useEffect(() => {
    console.log('Settings loaded:', settings.length);
    console.log('Current filters:', filters);
  }, [settings, filters]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fridge Settings</h1>
        <p className="text-gray-600">
          View and filter instrument parameter settings across different fridges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Fridges" 
          value={totalFridges} 
          icon={FaThermometerHalf} 
          color="bg-primary-500" 
        />
        <StatsCard 
          title="Total Instruments" 
          value={totalInstruments} 
          icon={FaTools} 
          color="bg-secondary-500" 
        />
        <StatsCard 
          title="Total Parameters" 
          value={totalParameters} 
          icon={FaCog} 
          color="bg-accent-500" 
        />
        <StatsCard 
          title="Total Settings" 
          value={totalSettings} 
          icon={FaDatabase} 
          color="bg-gray-700" 
        />
      </div>

      <FilterBar 
        filters={filters} 
        updateFilter={updateFilter} 
        clearFilters={clearFilters} 
        uniqueValues={uniqueValues} 
      />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <SettingsTable 
        settings={settings} 
        loading={loading} 
        sorting={sorting}
        updateSorting={updateSorting}
      />
      
      {!loading && !error && (
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
          <p>
            Showing {settings.length} of {allSettings.length} settings
          </p>
          
          {stats.min_value !== undefined && (
            <div className="mt-2 sm:mt-0 flex space-x-4">
              <span>Min: <span className="font-mono">{stats.min_value.toFixed(2)}</span></span>
              <span>Max: <span className="font-mono">{stats.max_value.toFixed(2)}</span></span>
              <span>Avg: <span className="font-mono">{stats.avg_value.toFixed(2)}</span></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsPage; 