import React from 'react';
import type { Page } from '../App';
import type { UserProfile } from '../types';

interface NavbarProps {
    page: Page;
    onNavigate: (page: Page) => void;
    user: UserProfile | null;
    onLogout: () => void;
}

const NavLink: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            active
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {children}
    </button>
);

export const Navbar: React.FC<NavbarProps> = ({ page, onNavigate, user, onLogout }) => {
    const isLoggedIn = !!user;
    return (
        <nav className="hidden md:flex items-center space-x-4">
            <NavLink active={page === 'advisor'} onClick={() => onNavigate('advisor')}>Advisor</NavLink>
            <NavLink active={page === 'resume'} onClick={() => onNavigate('resume')}>Resume Builder</NavLink>
            <NavLink active={page === 'help'} onClick={() => onNavigate('help')}>Help</NavLink>
            <div className="w-px h-6 bg-gray-700"></div>
            {isLoggedIn ? (
                <>
                    <button
                        onClick={() => onNavigate('profile')}
                        className={`rounded-full h-9 w-9 bg-gray-700 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary ${page === 'profile' ? 'ring-2 ring-primary' : ''}`}
                        aria-label="View Profile"
                    >
                       {user.picture ? (
                            <img src={user.picture} alt="Your profile" className="h-full w-full object-cover" />
                       ) : (
                            <span className="font-bold text-white">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                       )}
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <button
                    onClick={() => onNavigate('auth')}
                    className="bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                >
                    Login / Sign Up
                </button>
            )}
        </nav>
    );
};
