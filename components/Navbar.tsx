import React from 'react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout, onLogoClick }) => {

  return (
    <header className="w-full p-4 bg-black/30 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={isAuthenticated ? onLogoClick : undefined}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            R
          </div>
          <span className="text-xl font-bold text-white">Radiance</span>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <button
              onClick={onLogout}
              className="px-4 py-2 text-gray-300 font-semibold border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;