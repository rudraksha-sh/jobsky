import React from 'react';

export const MentorshipPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-4xl text-center animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">1-on-1 Mentorship</h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
        Get personalized guidance from industry experts to accelerate your career growth.
      </p>
       <div className="mt-8 bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-primary-400">Launching Soon</h2>
        <p className="text-gray-300 mt-2">Our platform to connect you with experienced mentors for mock interviews, resume reviews, and career advice is currently in development.</p>
      </div>
    </div>
  );
};