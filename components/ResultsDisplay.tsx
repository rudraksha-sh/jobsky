import React from 'react';
import { CareerCard } from './CareerCard';
import type { CareerAdvisorResponse } from '../types';

interface ResultsDisplayProps {
  results: CareerAdvisorResponse;
  completedSteps: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
  onClearCompleted: () => void;
}

const InfoCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-bold text-primary-400 mb-3">{title}</h3>
        {items.length > 0 ? (
             <ul className="list-disc list-inside text-gray-300 space-y-1">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        ) : (
            <p className="text-gray-400">No specific items to show here.</p>
        )}
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, completedSteps, onToggleStep, onClearCompleted }) => {
    const hasCompletedSteps = Object.values(completedSteps).some(isCompleted => isCompleted);
  
    return (
    <div className="w-full max-w-4xl space-y-8 animate-fade-in-up">
        
        <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Detected Skills" items={results.skills_detected} />
            <InfoCard title="Extra Recommendations" items={results.extra_recommendations} />
        </div>

        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-white text-center sm:text-left">
                    Your Custom Career Paths
                </h2>
                <button
                    onClick={onClearCompleted}
                    disabled={!hasCompletedSteps}
                    className="bg-red-800/80 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    aria-label="Clear all completed tasks"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                    Clear Completed
                </button>
            </div>
            <div className="space-y-8">
                {results.career_suggestions.map(suggestion => (
                    <CareerCard 
                        key={suggestion.career} 
                        suggestion={suggestion} 
                        completedSteps={completedSteps}
                        onToggleStep={onToggleStep}
                    />
                ))}
            </div>
        </div>

    </div>
  );
};