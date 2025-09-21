import React, { useState } from 'react';

interface ResumeInputFormProps {
  onSubmit: (jobDescription: string, userExperience: string) => void;
  isLoading: boolean;
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-4.48 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
);

export const ResumeInputForm: React.FC<ResumeInputFormProps> = ({ onSubmit, isLoading }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [showLinkedInHelp, setShowLinkedInHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim() && userExperience.trim() && !isLoading) {
      onSubmit(jobDescription, userExperience);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-2xl space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="jobDescription" className="block text-xl font-bold text-white mb-3">
                    1. Paste Job Description
                </label>
                <textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-500 min-h-[250px] resize-y"
                    rows={10}
                    disabled={isLoading}
                    required
                />
            </div>
            <div>
                <div className="flex justify-between items-center mb-3">
                    <label htmlFor="userExperience" className="block text-xl font-bold text-white">
                        2. Add Your Experience
                    </label>
                    <button 
                        type="button" 
                        onClick={() => setShowLinkedInHelp(!showLinkedInHelp)}
                        className="flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        aria-expanded={showLinkedInHelp}
                    >
                        <LinkedInIcon />
                        <span className="font-semibold">Use LinkedIn Profile</span>
                    </button>
                </div>

                {showLinkedInHelp && (
                    <div className="relative bg-gray-900/50 border border-gray-700 p-4 rounded-lg mb-4 text-sm text-gray-300 animate-fade-in-up">
                        <button 
                            type="button" 
                            onClick={() => setShowLinkedInHelp(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
                            aria-label="Close LinkedIn help"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <p className="font-bold text-white mb-2">How to use your LinkedIn Profile:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Go to your LinkedIn profile.</li>
                            <li>Click the <strong>More</strong> button, then <strong>Save to PDF</strong>.</li>
                            <li>Open the downloaded PDF.</li>
                            <li>Copy the text from your "Experience" and "About" sections.</li>
                            <li>Paste it into the text box below.</li>
                        </ol>
                    </div>
                )}
                
                <textarea
                    id="userExperience"
                    value={userExperience}
                    onChange={(e) => setUserExperience(e.target.value)}
                    placeholder="Paste your current resume, LinkedIn profile text, or list your skills and work history..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-500 min-h-[250px] resize-y"
                    rows={10}
                    disabled={isLoading}
                    required
                />
            </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !jobDescription.trim() || !userExperience.trim()}
          className="w-full flex justify-center items-center bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
                <LoadingSpinner />
                Building Resume...
            </>
          ) : (
            'Build My Resume'
          )}
        </button>
      </form>
    </div>
  );
};