import React, { useState, useCallback } from 'react';
import { InputForm } from '../components/InputForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { generateCareerAdvice } from '../services/geminiService';
import type { CareerAdvisorResponse, Language } from '../types';

export const AdvisorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<CareerAdvisorResponse | null>(null);

  const handleGenerate = useCallback(async (resumeText: string, skills: string[], language: Language) => {
    setIsLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const result = await generateCareerAdvice(resumeText, skills, language);
      setApiResponse(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating career advice. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-7xl animate-fade-in-up">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">AI Career Advisor</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
          Get a personalized, step-by-step roadmap to your dream career.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          <ResultsDisplay
            response={apiResponse}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};