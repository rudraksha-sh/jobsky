import React from 'react';
import type { CareerAdvisorResponse } from '../types';
import { CareerCard } from './CareerCard';

interface ResultsDisplayProps {
  response: CareerAdvisorResponse | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-xl shadow-lg h-full border border-gray-700">
      <svg className="animate-spin h-12 w-12 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-lg font-semibold text-gray-200">JOBSKY is analyzing your profile...</p>
      <p className="text-gray-400">Our AI is crafting your personalized career roadmap.</p>
    </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="p-8 bg-red-900/50 border border-red-700 rounded-xl shadow-lg text-center">
        <h3 className="text-xl font-bold text-red-300">Oops! Something went wrong.</h3>
        <p className="mt-2 text-red-400">{message}</p>
    </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-xl shadow-lg h-full border border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-gray-100">Your Career Roadmap Awaits</h2>
        <p className="mt-2 text-gray-400 max-w-md">
            Enter your details on the left, and let JOBSKY's AI build a custom-tailored guide to help you achieve your professional goals.
        </p>
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ response, isLoading, error }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!response) {
        return <InitialState />;
    }

    return (
        <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-3">Detected Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {response.skills_detected.map(skill => (
                        <span key={skill} className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1.5 rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Career Suggestions</h2>
                <div className="space-y-6">
                    {response.career_suggestions.map((suggestion, index) => (
                        <CareerCard key={index} suggestion={suggestion} />
                    ))}
                </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-3">Extra Recommendations</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {response.extra_recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};