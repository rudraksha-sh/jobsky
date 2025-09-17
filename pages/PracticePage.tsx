import React from 'react';

export const PracticePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-4xl text-center animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Practice Problems</h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
        Sharpen your skills with curated problems tailored to your career goals.
      </p>
      <div className="mt-8 bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-primary-400">Coming Soon!</h2>
        <p className="text-gray-300 mt-2">A dedicated space with coding challenges, case studies, and quizzes to help you prepare for interviews and real-world tasks is on its way.</p>
      </div>
    </div>
  );
};