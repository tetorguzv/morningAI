import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './icons';
import { User } from '../types';

interface SignUpPageProps {
  onSignUp: (user: User) => void;
  onSwitchToLogin: () => void;
}

const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email: string): { isValid: boolean; message: string } => {
    if (!email.trim()) {
        return { isValid: false, message: 'Email cannot be empty.' };
    }

    // Basic Syntax, Character & Format Rules
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'Please enter a valid email format (e.g., user@example.com). No spaces allowed.',
      };
    }
  
    // Domain Whitelisting
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain.toLowerCase())) {
      return {
        isValid: false,
        message: 'Sorry, only emails from Gmail, Yahoo, Outlook, and iCloud are currently accepted.',
      };
    }
    
    // Note: MX Record Check is a server-side operation and cannot be reliably implemented in a frontend-only application.

    return { isValid: true, message: '' };
  };

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    if (!name || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setError('');
    onSignUp({ name, email });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900/50 border border-gray-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Create an Account</h2>
      <p className="text-center text-gray-400 mb-8">Join to get your personalized insights.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300" htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jane Doe"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300" htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300" htmlFor="signup-password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
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
          Create Account
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-8">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-medium text-blue-400 hover:underline">
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignUpPage;