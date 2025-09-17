import React, { useState } from 'react';
import type { Page } from '../App';
import { useGoogleLogin } from '@react-oauth/google';

interface AuthPageProps {
  onLogin: () => void;
  onNavigate: (page: Page) => void;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.641-3.657-11.303-8.591l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C39.986 36.689 44 31.016 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    
    if (isLogin) {
      console.log('Logging in with:', { email, password });
      onLogin();
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      console.log('Signing up with:', { email, password });
      onLogin();
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google login successful:', tokenResponse);
      // In a real app, you would send this token to your backend for verification
      // and to create a session for the user.
      onLogin();
    },
    onError: () => {
      console.error('Google login failed.');
      setError('Google sign-in failed. Please try again.');
    },
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-md animate-fade-in-up flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700 w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className="text-gray-400 text-center mb-6">
          {isLogin ? 'Sign in to continue to JOBSKY' : 'Get started with your AI career copilot'}
        </p>
        
        <button
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-all duration-300"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>

        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full p-3 bg-gray-700 border rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-400 ${error ? 'border-red-500' : 'border-gray-600'}`}
                placeholder="••••••••"
              />
              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-all duration-300"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleForm} className="font-medium text-primary hover:underline focus:outline-none">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;