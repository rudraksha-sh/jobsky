import React, { useState } from 'react';
import { ResumeInputForm } from '../components/ResumeInputForm';
import { ResumeDisplay } from '../components/ResumeDisplay';
import { getResumeAdvice } from '../services/geminiService';
import type { ResumeBuilderResponse, UserProfile } from '../types';

interface ResumeBuilderPageProps {
  user: UserProfile | null;
}

export const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResumeBuilderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (jobDescription: string, userExperience: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const advice = await getResumeAdvice(jobDescription, userExperience);
      setResults(advice);
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
    setResults(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center w-full animate-fade-in-up">
      {!results && (
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            AI Resume Builder
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-4">
            Tailor your resume for any job in seconds. Paste the job description and your experience to get started.
          </p>
        </div>
      )}

      {!results && !isLoading && <ResumeInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
      
      {isLoading && (
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-white font-semibold text-lg">Crafting your tailored resume...</p>
          <p className="text-gray-400">Analyzing the job description and aligning your skills.</p>
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

      {results && !isLoading && (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Your Tailored Resume Content</h2>
            <button
              onClick={handleStartOver}
              className="mt-4 text-primary hover:underline"
            >
              &larr; Build Another Resume
            </button>
          </div>
          <ResumeDisplay results={results} user={user} />
        </>
      )}
    </div>
  );
};