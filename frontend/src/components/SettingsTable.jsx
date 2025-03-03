import { FaSort, FaSortUp, FaSortDown, FaExclamationTriangle } from 'react-icons/fa';

const SettingsTable = ({ settings, loading, sorting, updateSorting }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatNumber = (value, precision = 2) => {
    if (value === null || value === undefined) return 'N/A';
    return Number(value).toFixed(precision);
  };

  const getParameterClass = (paramName) => {
    if (paramName === 'temperature') return 'text-red-600';
    if (paramName === 'flux_bias') return 'text-blue-600';
    if (paramName === 'power_level') return 'text-purple-600';
    if (paramName === 'current_bias') return 'text-yellow-600';
    if (paramName === 'voltage') return 'text-green-600';
    return 'text-gray-700';
  };

  const getFridgeBadgeClass = (fridgeId) => {
    if (fridgeId === 1) return 'badge-primary';
    if (fridgeId === 2) return 'badge-secondary';
    if (fridgeId === 3) return 'badge-accent';
    return 'bg-gray-100 text-gray-800';
  };

  const renderSortIcon = (column) => {
    if (!sorting) return <FaSort className="ml-1 text-gray-400" />;
    
    if (sorting.column === column) {
      return sorting.direction === 'asc' 
        ? <FaSortUp className="ml-1 text-primary-500" /> 
        : <FaSortDown className="ml-1 text-primary-500" />;
    }
    
    return <FaSort className="ml-1 text-gray-400" />;
  };
  
  const columns = [
    { id: 'fridge_id', label: 'Fridge ID', sortKey: 'fridge_id' },
    { id: 'instrument', label: 'Instrument', sortKey: 'instrument_name' },
    { id: 'parameter', label: 'Parameter', sortKey: 'parameter_name' },
    { id: 'value', label: 'Applied Value', sortKey: 'applied_value' },
    { id: 'timestamp', label: 'Timestamp', sortKey: 'timestamp' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (settings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <FaExclamationTriangle className="mx-auto text-4xl text-yellow-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">No settings found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.id}
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  onClick={() => updateSorting && updateSorting(column.sortKey)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {renderSortIcon(column.sortKey)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {settings.map((setting) => (
              <tr 
                key={`${setting.fridge_id}-${setting.instrument_name}-${setting.timestamp}`}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${getFridgeBadgeClass(setting.fridge_id)}`}>
                    Fridge {setting.fridge_id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{setting.instrument_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getParameterClass(setting.parameter_name)}`}>
                    {setting.parameter_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                    {formatNumber(setting.applied_value)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {setting.formatted_time || formatTimestamp(setting.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsTable; 