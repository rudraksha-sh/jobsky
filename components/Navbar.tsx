import React from 'react';
import type { Page } from '../App';

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-400">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface NavLinkProps {
  label: string;
  targetPage: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, targetPage, currentPage, onNavigate }) => {
  const isActive = currentPage === targetPage;
  return (
    <button
      onClick={() => onNavigate(targetPage)}
      className={`text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
    >
      {label}
    </button>
  );
};

interface NavbarProps {
    onNavigate: (page: Page) => void;
    currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg">
            <Logo />
            <span className="text-xl font-bold text-white tracking-wide">JOBSKY</span>
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink label="Career Advisor" targetPage="advisor" currentPage={currentPage} onNavigate={onNavigate} />
            <NavLink label="Resume Builder" targetPage="resume" currentPage={currentPage} onNavigate={onNavigate} />
            <NavLink label="Community" targetPage="community" currentPage={currentPage} onNavigate={onNavigate} />
            <NavLink label="Practice" targetPage="practice" currentPage={currentPage} onNavigate={onNavigate} />
            <NavLink label="Mentors" targetPage="mentorship" currentPage={currentPage} onNavigate={onNavigate} />
          </nav>
          <div className="flex items-center space-x-4">
             <NavLink label="Profile" targetPage="profile" currentPage={currentPage} onNavigate={onNavigate} />
             <button className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary">
                Sign In
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};