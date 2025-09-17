import React, { useState } from 'react';
import type { Language } from '../types';

interface InputFormProps {
  onGenerate: (resumeText: string, skills: string[], language: Language) => void;
  isLoading: boolean;
}

const SkillTag: React.FC<{ skill: string; onRemove: () => void }> = ({ skill, onRemove }) => (
  <div className="flex items-center bg-gray-700 text-gray-200 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
    <span>{skill}</span>
    <button onClick={onRemove} className="ml-2 text-gray-400 hover:text-white focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [resumeText, setResumeText] = useState<string>('');
  const [skills, setSkills] = useState<string[]>(['Python', 'SQL']);
  const [currentSkill, setCurrentSkill] = useState<string>('');
  const [language, setLanguage] = useState<Language>('english');

  const handleAddSkill = () => {
    const trimmedSkill = currentSkill.trim();
    if (trimmedSkill && !skills.find(s => s.toLowerCase() === trimmedSkill.toLowerCase())) {
      setSkills([...skills, trimmedSkill]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(resumeText, skills, language);
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 sticky top-24">
      <form onSubmit={handleSubmit} className="space-y-6">
         <div>
          <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-300 mb-1">
            LinkedIn Profile URL
          </label>
          <input
            id="linkedin-url"
            type="url"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-400"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label htmlFor="resume-text" className="block text-sm font-medium text-gray-300 mb-1">
            Or Paste Resume Text (Optional)
          </label>
          <textarea
            id="resume-text"
            rows={8}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-400"
            placeholder="Paste your resume content here for a more detailed analysis..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-1">
            Add Your Skills
          </label>
          <div className="flex">
            <input
              type="text"
              id="skills"
              className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-l-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-400"
              placeholder="e.g., JavaScript"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={handleSkillKeyDown}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary font-semibold"
            >
              Add
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillTag key={skill} skill={skill} onRemove={() => handleRemoveSkill(skill)} />
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Output Language
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="english"
                checked={language === 'english'}
                onChange={() => setLanguage('english')}
                className="focus:ring-primary h-4 w-4 text-primary bg-gray-600 border-gray-500"
              />
              <span className="ml-2 text-gray-300">English</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="hindi"
                checked={language === 'hindi'}
                onChange={() => setLanguage('hindi')}
                className="focus:ring-primary h-4 w-4 text-primary bg-gray-600 border-gray-500"
              />
              <span className="ml-2 text-gray-300">Hindi</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
             'Generate Career Path'
          )}
        </button>
      </form>
    </div>
  );
};