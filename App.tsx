import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { HelpPage } from './pages/HelpPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { SignUpPage } from './pages/SignUpPage';
import * as apiService from './services/apiService';

export type Page = 'landing' | 'advisor' | 'resume' | 'help' | 'profile' | 'auth' | 'signup';

interface User {
    _id: string;
    email: string;
    fullName?: string;
}

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('landing');
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state for initial auth check

    const verifyToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const currentUser = await apiService.getCurrentUser(token);
                setUser(currentUser);
            } catch (error) {
                console.error("Session verification failed:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    const handleNavigate = (newPage: Page) => {
        if ((newPage === 'profile' || newPage === 'advisor' || newPage === 'resume') && !user) {
            setPage('auth');
        } else {
            setPage(newPage);
        }
    };

    const handleLogin = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        setUser(userData);
        setPage('advisor'); // Redirect to advisor page after login
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setPage('landing');
    };

    const renderPage = () => {
        switch (page) {
            case 'landing':
                return <LandingPage onNavigate={handleNavigate} />;
            case 'advisor':
                return <AdvisorPage />;
            case 'resume':
                return <ResumeBuilderPage />;
            case 'help':
                return <HelpPage />;
            case 'profile':
                return <ProfilePage />;
            case 'auth':
                return <AuthPage onLogin={handleLogin} onNavigate={handleNavigate} />;
            case 'signup':
                return <SignUpPage onLogin={handleLogin} onNavigate={handleNavigate} />;
            default:
                return <LandingPage onNavigate={handleNavigate} />;
        }
    };

    if (isLoading) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading JOBSKY...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col font-sans">
            <Header page={page} onNavigate={handleNavigate} isLoggedIn={!!user} onLogout={handleLogout} />
            <main className="flex-grow flex items-center justify-center w-full">
                {renderPage()}
            </main>
            <Footer page={page} />
        </div>
    );
};

export default App;
