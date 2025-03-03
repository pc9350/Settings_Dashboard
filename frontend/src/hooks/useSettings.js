import { useState, useEffect, useMemo } from 'react';
import { fetchSettings, fetchStats } from '../services/api';
import toast from 'react-hot-toast';

const useSettings = () => {
  const [settings, setSettings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    fridge_id: '',
    instrument_name: '',
    parameter_name: '',
    search: '',
    timeFilter: '', // Simple text-based time filter
  });
  const [sorting, setSorting] = useState({
    column: 'timestamp', // Default sort by timestamp
    direction: 'desc'    // Default sort direction (newest first)
  });

  // Fetch settings data
  useEffect(() => {
    const getSettings = async () => {
      try {
        setLoading(true);
        
        // Create API filter params (excluding search which is client-side only)
        const apiFilters = {};
        if (filters.fridge_id) {
          apiFilters.fridge_id = parseInt(filters.fridge_id, 10);
        }
        if (filters.instrument_name) {
          apiFilters.instrument_name = filters.instrument_name;
        }
        if (filters.parameter_name) {
          apiFilters.parameter_name = filters.parameter_name;
        }
        
        // Fetch data with filters
        const response = await fetchSettings(apiFilters);
        setSettings(response.data || []);
        
        // Fetch stats if no filters are applied
        if (Object.keys(apiFilters).length === 0) {
          const statsData = await fetchStats();
          setStats(statsData);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch settings data');
        toast.error('Failed to fetch settings data');
      } finally {
        setLoading(false);
      }
    };

    getSettings();
  }, [filters.fridge_id, filters.instrument_name, filters.parameter_name]);

  // Filter settings based on search term and time filter (client-side filtering)
  const filteredSettings = useMemo(() => {
    let filtered = settings;
    
    // Apply search filter
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase().trim();
      
      filtered = filtered.filter((setting) => {
        // Convert all values to strings for comparison
        const fridgeName = `fridge ${setting.fridge_id}`.toLowerCase();
        const instrumentName = String(setting.instrument_name).toLowerCase();
        const parameterName = String(setting.parameter_name).toLowerCase();
        const appliedValue = String(setting.applied_value);
        
        // Simple includes check on all fields
        return (
          fridgeName.includes(searchTerm) ||
          instrumentName.includes(searchTerm) ||
          parameterName.includes(searchTerm) ||
          appliedValue.includes(searchTerm)
        );
      });
    }
    
    // Apply time filter (simple text-based filtering)
    if (filters.timeFilter && filters.timeFilter.trim() !== '') {
      const timeFilter = filters.timeFilter.toLowerCase().trim();
      
      filtered = filtered.filter((setting) => {
        // Get the formatted timestamp or format it if not already formatted
        const formattedTime = setting.formatted_time || 
          new Date(setting.timestamp * 1000).toLocaleString();
        
        return formattedTime.toLowerCase().includes(timeFilter);
      });
    }
    
    return filtered;
  }, [settings, filters.search, filters.timeFilter]);

  // Sort the filtered settings
  const sortedSettings = useMemo(() => {
    if (!filteredSettings.length) return filteredSettings;
    
    return [...filteredSettings].sort((a, b) => {
      const column = sorting.column;
      const direction = sorting.direction === 'asc' ? 1 : -1;
      
      try {
        // Handle different data types
        if (typeof a[column] === 'number') {
          // For numeric values (fridge_id, applied_value, timestamp)
          return (a[column] - b[column]) * direction;
        } else if (typeof a[column] === 'string') {
          // For string values (instrument_name, parameter_name)
          return a[column].localeCompare(b[column]) * direction;
        } else {
          // Fallback for other types
          if (a[column] > b[column]) return 1 * direction;
          if (a[column] < b[column]) return -1 * direction;
          return 0;
        }
      } catch (error) {
        console.error('Sorting error:', error);
        return 0; // Return 0 to maintain original order in case of error
      }
    });
  }, [filteredSettings, sorting]);

  // Get unique values for filter dropdowns
  const uniqueValues = useMemo(() => {
    const fridgeIds = [...new Set(settings.map(s => s.fridge_id))].sort();
    const instruments = [...new Set(settings.map(s => s.instrument_name))].sort();
    const parameters = [...new Set(settings.map(s => s.parameter_name))].sort();
    
    return { fridgeIds, instruments, parameters };
  }, [settings]);

  // Update a specific filter
  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      fridge_id: '',
      instrument_name: '',
      parameter_name: '',
      search: '',
      timeFilter: '',
    });
  };

  // Update sorting
  const updateSorting = (column) => {
    setSorting(prev => {
      // If clicking the same column, toggle direction
      if (prev.column === column) {
        return {
          column,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      // If clicking a new column, default to ascending
      return {
        column,
        direction: 'asc'
      };
    });
  };

  return {
    settings: sortedSettings,
    allSettings: settings,
    stats,
    loading,
    error,
    filters,
    sorting,
    updateFilter,
    clearFilters,
    updateSorting,
    uniqueValues,
  };
};

export default useSettings; 