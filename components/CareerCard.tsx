import React from 'react';
import type { CareerSuggestion } from '../types';

const SkillPill: React.FC<{ skill: string, type: 'matched' | 'missing' }> = ({ skill, type }) => {
  const baseClasses = "text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full";
  const typeClasses = type === 'matched'
    ? "bg-green-500/10 text-green-300 border border-green-500/20"
    : "bg-amber-500/10 text-amber-300 border border-amber-500/20";
  return <span className={`${baseClasses} ${typeClasses}`}>{skill}</span>;
};

const RoadmapStep: React.FC<{ step: string; resources: string[]; index: number, total: number }> = ({ step, resources, index, total }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 flex flex-col items-center relative">
       {index > 0 && <div className="absolute top-0 left-1/2 w-px h-6 -translate-x-1/2 -translate-y-full bg-gray-700"></div>}
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold z-10">
        {index + 1}
      </div>
      {index < total - 1 && <div className="w-px h-full bg-gray-700 my-1"></div>}
    </div>
    <div className="flex-grow pb-8">
      <h4 className="font-semibold text-gray-200">{step}</h4>
      <ul className="mt-2 space-y-2">
        {resources.map((resource, i) => (
          <li key={i} className="flex items-center text-sm text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a href={resource} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 hover:underline break-all">
              {resource.length > 60 ? `${resource.substring(0, 60)}...` : resource}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const CareerCard: React.FC<{ suggestion: CareerSuggestion }> = ({ suggestion }) => {
  return (
    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-400">{suggestion.career}</h3>
        
        <div className="mt-4">
          <h4 className="font-semibold text-gray-400 text-sm mb-2">Matched Skills</h4>
          <div className="flex flex-wrap">
            {suggestion.matched_skills.map(skill => <SkillPill key={skill} skill={skill} type="matched" />)}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-gray-400 text-sm mb-2">Skills to Develop</h4>
          <div className="flex flex-wrap">
            {suggestion.missing_skills.map(skill => <SkillPill key={skill} skill={skill} type="missing" />)}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/20 p-6 border-t border-gray-700">
        <h4 className="font-bold text-white mb-6">Your Learning Roadmap</h4>
        <div className="relative">
          {suggestion.roadmap.map((item, index) => (
            <RoadmapStep key={index} step={item.step} resources={item.resources} index={index} total={suggestion.roadmap.length} />
          ))}
        </div>
      </div>
    </div>
  );
};