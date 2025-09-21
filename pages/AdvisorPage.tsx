import React, { useState } from 'react';
import { InputForm } from '../components/InputForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { getCareerAdvice } from '../services/geminiService';
import type { CareerAdvisorResponse } from '../types';

// FIX: Implement the AdvisorPage component to manage the state and UI for the career advisor feature.
export const AdvisorPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [displayResults, setDisplayResults] = useState<CareerAdvisorResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

    const handleFormSubmit = async (userInput: string) => {
        setIsLoading(true);
        setError(null);
        setDisplayResults(null);
        setCompletedSteps({});
        try {
            const advice = await getCareerAdvice(userInput);
            setDisplayResults(advice);
        } catch (err) {
            if (err instanceof Error) {
                setError(`An error occurred: ${err.message}. Please try again.`);
            } else {
                setError("An unknown error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setDisplayResults(null);
        setError(null);
        setCompletedSteps({});
    };

    const handleToggleStep = (stepId: string) => {
        setCompletedSteps(prev => ({
            ...prev,
            [stepId]: !prev[stepId]
        }));
    };

    const handleClearCompleted = () => {
        if (window.confirm("Are you sure you want to clear all completed tasks? This action cannot be undone.")) {
            if (!displayResults) return;

            // Create a deep copy to avoid mutating state directly
            const newDisplayResults = JSON.parse(JSON.stringify(displayResults)) as CareerAdvisorResponse;

            newDisplayResults.career_suggestions = newDisplayResults.career_suggestions.map(suggestion => {
                suggestion.roadmap = suggestion.roadmap.filter(step => {
                    const stepId = `${suggestion.career}-${step.step}`;
                    return !completedSteps[stepId];
                });
                return suggestion;
            });

            setDisplayResults(newDisplayResults);
            setCompletedSteps({}); // Reset completion state
        }
    };


    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col items-center w-full animate-fade-in-up">
            {!displayResults && (
                 <div className="text-center mb-12 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
                        AI Career Advisor
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4">
                        Get a personalized career roadmap from our AI assistant.
                        Just describe your background and let our technology do the rest.
                    </p>
                </div>
            )}
            
            {!displayResults && !isLoading && <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
            
            {isLoading && (
                 <div className="mt-8 text-center">
                    <div className="flex justify-center items-center mb-4">
                        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8_0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p className="text-white font-semibold text-lg">Generating your personalized roadmap...</p>
                    <p className="text-gray-400">This may take a moment. Good things are worth waiting for!</p>
                </div>
            )}

            {error && !isLoading && (
                <div className="mt-8 text-center max-w-2xl bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
                    <p className="font-bold">Oops! Something went wrong.</p>
                    <p>{error}</p>
                    <button 
                        onClick={handleStartOver}
                        className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-600"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {displayResults && !isLoading && (
                 <>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Your AI-Generated Career Plan</h2>
                        <button 
                             onClick={handleStartOver}
                             className="mt-4 text-primary hover:underline"
                        >
                            &larr; Start Over
                        </button>
                    </div>
                    <ResultsDisplay 
                        results={displayResults} 
                        completedSteps={completedSteps}
                        onToggleStep={handleToggleStep}
                        onClearCompleted={handleClearCompleted}
                    />
                 </>
            )}

        </div>
    );
};