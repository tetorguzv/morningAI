import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './icons';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onSwitchToSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Simulate login
    onLogin({ name: email.split('@')[0], email });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
      <p className="text-center text-gray-400 mb-8">Log in to continue your journey.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          style={{ backgroundColor: '#1E90FF' }}
          className="w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
        >
          Log In
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-8">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignUp} className="font-medium text-blue-400 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
