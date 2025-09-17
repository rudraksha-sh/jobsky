import React from 'react';

const FAQItem: React.FC<{question: string, answer: string}> = ({question, answer}) => (
    <details className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 cursor-pointer">
        <summary className="font-semibold text-white">{question}</summary>
        <p className="text-gray-400 mt-2">{answer}</p>
    </details>
);

export const HelpPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-4xl animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Help Center</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
          Have questions? We're here to help.
        </p>
      </div>

      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-bold text-primary-400 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <FAQItem 
                    question="What is JOBSKY?"
                    answer="JOBSKY is an AI-powered platform designed to provide personalized career guidance, resume building tools, and a community to help you achieve your professional goals."
                />
                 <FAQItem 
                    question="Is the Career Advisor feature free?"
                    answer="Yes, the basic career advisor functionality is available for free. We plan to introduce premium features with more in-depth analysis and tools in the future."
                />
                 <FAQItem 
                    question="How does the AI generate career roadmaps?"
                    answer="Our platform uses Google's advanced Gemini model. It analyzes the skills and information you provide against current job market data to create realistic and actionable career paths."
                />
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-primary-400 mb-4">Raise a Ticket</h2>
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
                <p className="text-gray-300 mb-4">If you can't find an answer in the FAQ, please reach out to our support team. This form will be active soon.</p>
                 <button disabled className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                    Contact Support (Coming Soon)
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};