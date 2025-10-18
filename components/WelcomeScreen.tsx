import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-12 text-center flex flex-col items-center animate-fade-in">
      <div className="w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white electric-blue-shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2 2-2.828-2.828a1 1 0 010-1.414L7.464 7.464A6 6 0 0112 3c1.32 0 2.55.44 3.536 1.207" />
        </svg>
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Welcome to Morning Radiance AI</h1>
      <p className="text-gray-400 max-w-2xl mb-8 text-lg">
        Start your day with personalized wellness insights. Our AI will analyze a quick photo to offer you tips for looking and feeling your best.
      </p>
      <button
        onClick={onStart}
        style={{ backgroundColor: '#1E90FF' }}
        className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105"
      >
        Begin Analysis
      </button>
    </div>
  );
};

export default WelcomeScreen;