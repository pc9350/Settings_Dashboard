import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      
      {/* Simple border instead of decorative element */}
      <div className="mt-4 pt-3 border-t border-gray-100"></div>
    </div>
  );
};

export default StatsCard; 