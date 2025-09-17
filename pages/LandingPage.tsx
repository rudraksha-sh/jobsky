import React from 'react';
import type { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto p-4 md:p-8 text-center animate-fade-in-up">
      <div className="py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
          Navigate Your Career Path with <span className="text-primary">AI Precision</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-6">
          JOBSKY is your personal career copilot. Get personalized roadmaps, build a standout resume, and land your dream job faster than ever.
        </p>
        <div className="mt-10">
          <button
            onClick={() => onNavigate('advisor')}
            className="bg-primary text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-primary/50"
          >
            Get Your Free Career Plan
          </button>
        </div>
      </div>
    </div>
  );
};
