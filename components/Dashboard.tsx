import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onStartAnalysis: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartAnalysis }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-12 text-center flex flex-col items-center animate-fade-in">
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Welcome back, {user.name}!</h1>
      <p className="text-gray-400 max-w-2xl mb-8 text-lg">
        Ready to check in on your morning radiance?
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onStartAnalysis}
          style={{ backgroundColor: '#1E90FF' }}
          className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105"
        >
          Start Analysis
        </button>
        <button
          className="px-8 py-3 bg-gray-700 text-gray-200 font-semibold rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300"
        >
          Account Settings
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
