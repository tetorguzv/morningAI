import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-12 h-96">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-semibold text-gray-300">{message}</p>
    </div>
  );
};

export default Loader;