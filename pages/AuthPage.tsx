import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import * as apiService from '../services/apiService';
import type { Page } from '../App';

interface User {
    _id: string;
    email: string;
    fullName?: string;
}

interface AuthPageProps {
    onLogin: (token: string, user: User) => void;
    onNavigate: (page: Page) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const { token, user } = await apiService.login(email, password);
            onLogin(token, user);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setIsLoading(true);
        setError(null);
        try {
            if (credentialResponse.credential) {
                const { token, user } = await apiService.googleLogin(credentialResponse.credential);
                onLogin(token, user);
            } else {
                throw new Error("Google login failed: No credential returned.");
            }
        } catch (err) {
             if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred during Google login.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <div className="w-full max-w-md animate-fade-in-up">
            <form onSubmit={handleSubmit} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-2xl">
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-400 mb-6">
                    Sign in to continue to JOBSKY
                </p>
                
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}
                
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">Email Address</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Password</label>
                        <input
                            id="password" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-200"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-all duration-300 disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : 'Login'}
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    { !isLoading && 
                      <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                          theme="filled_black"
                          text="continue_with"
                          shape="pill"
                          width="300px"
                      />
                    }
                </div>
                
                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => onNavigate('signup')} className="font-medium text-primary hover:underline">
                        Sign up
                    </button>
                </p>
            </form>
        </div>
    );
};
