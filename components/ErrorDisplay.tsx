import React from 'react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center flex flex-col items-center animate-fade-in">
        <div className="w-16 h-16 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
      <h2 className="text-2xl font-bold text-white mb-3">An Error Occurred</h2>
      <p className="text-red-300 bg-red-900/30 border border-red-500/50 rounded-md p-4 max-w-md mb-6">{error}</p>
      <button
        onClick={onRetry}
        style={{ backgroundColor: '#1E90FF' }}
        className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;