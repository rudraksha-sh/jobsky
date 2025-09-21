import React from 'react';
import type { Page } from '../App';
import { Navbar } from './Navbar';

interface HeaderProps {
    page: Page;
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ page, onNavigate, isLoggedIn, onLogout }) => {
    return (
        <header className="bg-gray-900/80 sticky top-0 z-50 backdrop-blur-sm border-b border-gray-800 w-full">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div 
                        className="text-2xl font-bold text-white cursor-pointer"
                        onClick={() => onNavigate('landing')}
                    >
                        JOBSKY<span className="text-primary">.</span>
                    </div>
                    <Navbar page={page} onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} />
                </div>
            </div>
        </header>
    );
};
