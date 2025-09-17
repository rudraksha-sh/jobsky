import React from 'react';
import type { CareerSuggestion } from '../types';

const SkillTag: React.FC<{ children: React.ReactNode, type: 'matched' | 'missing' }> = ({ children, type }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-medium rounded-full";
    const typeClasses = type === 'matched' 
        ? "bg-green-500/20 text-green-300" 
        : "bg-yellow-500/20 text-yellow-300";
    return <span className={`${baseClasses} ${typeClasses}`}>{children}</span>;
};

const ResourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CareerCard: React.FC<{ suggestion: CareerSuggestion }> = ({ suggestion }) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">{suggestion.career}</h3>

            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-white mb-2">Your Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {suggestion.matched_skills.length > 0 ? (
                            suggestion.matched_skills.map(skill => <SkillTag key={skill} type="matched">{skill}</SkillTag>)
                        ) : (
                            <p className="text-sm text-gray-400">None identified. Let's build some!</p>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-2">Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                        {suggestion.missing_skills.map(skill => <SkillTag key={skill} type="missing">{skill}</SkillTag>)}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-3">Your Personalized Roadmap</h4>
                    <ol className="relative border-l border-gray-600 space-y-6 ml-2">
                        {suggestion.roadmap.map((step, index) => (
                            <li key={index} className="ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-900 rounded-full -left-3 ring-8 ring-gray-800 text-primary-300">
                                    {index + 1}
                                </span>
                                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                                    <h5 className="font-semibold text-white mb-2">{step.step}</h5>
                                    <ul className="text-sm text-gray-400 space-y-2">
                                        {step.resources.map(resource => (
                                            <li key={resource} className="flex items-start">
                                                <ResourceIcon />
                                                <span>{resource}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};
