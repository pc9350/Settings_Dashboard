import { motion } from 'framer-motion';
import { FaChartLine, FaChartBar, FaChartPie, FaChartArea } from 'react-icons/fa';
import useSettings from '../hooks/useSettings';

const StatsPage = () => {
  const { stats, loading, error } = useSettings();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
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
    );
  }
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Statistics</h1>
        <p className="text-gray-600">
          Overview of fridge settings statistics and metrics
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Fridges" 
          value={stats.unique_fridges || 0}
          icon={FaChartBar}
          color="bg-primary-500"
        />
        <StatCard 
          title="Total Instruments" 
          value={stats.unique_instruments || 0}
          icon={FaChartLine}
          color="bg-secondary-500"
        />
        <StatCard 
          title="Total Parameters" 
          value={stats.unique_parameters || 0}
          icon={FaChartPie}
          color="bg-accent-500"
        />
        <StatCard 
          title="Total Settings" 
          value={stats.total_settings || 0}
          icon={FaChartArea}
          color="bg-gray-700"
        />
      </div>
      
      {/* Value Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Value Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard 
            title="Minimum Value" 
            value={stats.min_value !== undefined ? stats.min_value.toFixed(2) : 'N/A'} 
            color="text-blue-500"
          />
          <ValueCard 
            title="Average Value" 
            value={stats.avg_value !== undefined ? stats.avg_value.toFixed(2) : 'N/A'} 
            color="text-purple-500"
          />
          <ValueCard 
            title="Maximum Value" 
            value={stats.max_value !== undefined ? stats.max_value.toFixed(2) : 'N/A'} 
            color="text-red-500"
          />
        </div>
      </motion.div>
      
      {/* Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg shadow-md p-6 text-white"
      >
        <h2 className="text-xl font-semibold mb-2">Advanced Analytics Coming Soon</h2>
        <p className="mb-4">We're working on advanced analytics features including charts, trends, and predictive insights.</p>
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-lg shadow-md p-6 border-t-4 ${color}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <Icon className={`text-xl ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </motion.div>
  );
};

const ValueCard = ({ title, value, color }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`text-2xl font-mono font-semibold ${color} mt-2`}>{value}</p>
    </div>
  );
};

export default StatsPage; 