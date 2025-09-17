import React from 'react';

export const NewsletterPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 text-center animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Newsletter</h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
        This feature is coming soon! Sign up for our newsletter to get career tips and updates.
      </p>
    </div>
  );
};
