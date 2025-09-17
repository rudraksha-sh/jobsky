import React, { useState } from 'react';

// FIX: Define the InputForm component to capture user input for the career advisor.
interface InputFormProps {
  onSubmit: (userInput: string) => void;
  isLoading: boolean;
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !isLoading) {
      onSubmit(userInput);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-2xl">
        <label htmlFor="userInput" className="block text-xl font-bold text-white mb-3">
          Describe Your Skills & Interests
        </label>
        <p className="text-gray-400 mb-4 text-sm">
            Tell us about your current skills, work experience, what you enjoy doing, and any career goals you have. The more detail, the better the advice!
        </p>
        <textarea
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="e.g., 'I'm a student who knows Python and SQL. I enjoy solving puzzles and working with data. I'm interested in a career in tech but not sure where to start...'"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-500 min-h-[150px] resize-y"
          rows={6}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="mt-4 w-full flex justify-center items-center bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
                <LoadingSpinner />
                Analyzing...
            </>
          ) : (
            'Generate My Career Plan'
          )}
        </button>
      </form>
    </div>
  );
};
