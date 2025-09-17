import React from 'react';

interface LandingPageProps {
  onNavigate: (page: 'advisor') => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-primary/50 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary mb-4 border border-primary/30">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 md:space-y-32 py-16 md:py-24 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">
          Unlock Your Career Potential with <span className="animated-gradient">JOBSKY</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Your AI-powered copilot for navigating the job market. Get personalized career roadmaps, build a job-winning resume, and achieve your professional goals faster.
        </p>
        <button
          onClick={() => onNavigate('advisor')}
          className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-all duration-300 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:scale-105"
        >
          Get Started for Free
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="AI Career Roadmap"
            description="Analyze your skills and get a step-by-step guide to your dream job, complete with learning resources and project ideas."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          />
          <FeatureCard 
            title="Job-Ready Resume Builder"
            description="Generate a professional resume tailored to specific job descriptions, highlighting your strengths and experiences effectively."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
          <FeatureCard 
            title="Community & Mentorship"
            description="Connect with peers in our anonymous forum, practice interview questions, and get 1-on-1 guidance from industry experts."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="container mx-auto px-4 md:px-8 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <blockquote className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl font-medium text-gray-200 italic">"The future belongs to those who learn more skills and combine them in creative ways."</p>
          <footer className="mt-4 text-gray-400">- Robert Greene</footer>
        </blockquote>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 md:px-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <h2 className="text-3xl font-bold text-white text-center mb-8">Loved by Ambitious Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <p className="text-gray-300 mb-4">"JOBSKY's roadmap was a game-changer. It showed me exactly which skills to learn to transition from marketing to a data analyst role. I got a new job in 3 months!"</p>
                <div className="font-bold text-white">- Sarah J., Data Analyst</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <p className="text-gray-300 mb-4">"As a recent graduate, I was lost. JOBSKY gave me clarity and a concrete action plan. The resource recommendations are pure gold."</p>
                <div className="font-bold text-white">- Michael B., Junior Software Engineer</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <p className="text-gray-300 mb-4">"The best career tool I've ever used. It's like having a personal mentor available 24/7. Highly recommended for anyone looking to upskill."</p>
                <div className="font-bold text-white">- Emily R., Product Manager</div>
            </div>
        </div>
      </section>
    </div>
  );
};