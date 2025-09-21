import React, { useState } from 'react';
import type { ResumeBuilderResponse } from '../types';

const CopyIcon: React.FC<{ copied: boolean }> = ({ copied }) => copied ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);


const ResumeSection: React.FC<{ title: string; children: React.ReactNode; textToCopy: string }> = ({ title, children, textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary-400">{title}</h3>
                <button
                    onClick={handleCopy}
                    className="group flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-all duration-200"
                    aria-label={`Copy ${title} to clipboard`}
                >
                    <CopyIcon copied={copied} />
                    <span className={`text-sm font-medium ${copied ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
                        {copied ? 'Copied!' : 'Copy'}
                    </span>
                </button>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                {children}
            </div>
        </div>
    );
};


export const ResumeDisplay: React.FC<{ results: ResumeBuilderResponse }> = ({ results }) => {
  return (
    <div className="w-full max-w-4xl space-y-8 animate-fade-in-up">
      <ResumeSection title="Professional Summary" textToCopy={results.summary}>
        <p>{results.summary}</p>
      </ResumeSection>

      <ResumeSection title="Experience" textToCopy={results.experience.map(item => `- ${item}`).join('\n')}>
        <ul className="list-disc pl-5 space-y-2">
            {results.experience.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </ResumeSection>

      <ResumeSection title="Skills" textToCopy={results.skills.join(', ')}>
        <div className="flex flex-wrap gap-2">
            {results.skills.map(skill => (
                <span key={skill} className="bg-primary-500/20 text-primary-300 px-3 py-1 text-sm font-medium rounded-full">
                    {skill}
                </span>
            ))}
        </div>
      </ResumeSection>
    </div>
  );
};
