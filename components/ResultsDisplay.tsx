import React from 'react';
import { CareerCard } from './CareerCard';
import type { CareerAdvisorResponse } from '../types';

interface ResultsDisplayProps {
  results: CareerAdvisorResponse;
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


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="w-full max-w-4xl space-y-8 animate-fade-in-up">
        
        <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Detected Skills" items={results.skills_detected} />
            <InfoCard title="Extra Recommendations" items={results.extra_recommendations} />
        </div>

        <div>
            <h2 className="text-3xl font-extrabold text-white text-center mb-8">
                Your Custom Career Paths
            </h2>
            <div className="space-y-8">
                {results.career_suggestions.map(suggestion => (
                    <CareerCard key={suggestion.career} suggestion={suggestion} />
                ))}
            </div>
        </div>

    </div>
  );
};
