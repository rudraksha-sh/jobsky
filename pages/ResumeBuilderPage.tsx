import React from 'react';

const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-primary-400 border-b border-gray-700 pb-2 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const InputField: React.FC<{label: string, id: string, placeholder: string, type?: string}> = ({ label, id, placeholder, type="text" }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            type={type} 
            id={id}
            placeholder={placeholder}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-500"
        />
    </div>
);


export const ResumeBuilderPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-7xl animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">Job-Ready Resume Builder</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
          Create a professional, ATS-friendly resume in minutes with the power of AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 space-y-6">
            <FormSection title="Personal Details">
                <InputField label="Full Name" id="full-name" placeholder="Alex Doe" />
                <InputField label="Job Title" id="job-title" placeholder="Software Engineer" />
                <InputField label="Email" id="email" placeholder="alex.doe@example.com" type="email" />
                <InputField label="Phone" id="phone" placeholder="+1 (555) 123-4567" type="tel" />
                <InputField label="LinkedIn" id="linkedin" placeholder="linkedin.com/in/alexdoe" />
                <InputField label="GitHub" id="github" placeholder="github.com/alexdoe" />
            </FormSection>

            <FormSection title="Work Experience (Most Recent)">
                 <InputField label="Job Title" id="exp-job-title" placeholder="Senior Developer" />
                 <InputField label="Company" id="exp-company" placeholder="Tech Solutions Inc." />
                 <InputField label="Start Date" id="exp-start" placeholder="Jan 2022" />
                 <InputField label="End Date" id="exp-end" placeholder="Present" />
            </FormSection>
             <div className="md:col-span-2">
                <label htmlFor="exp-desc" className="block text-sm font-medium text-gray-300 mb-1">Key Responsibilities / Achievements</label>
                <textarea 
                    id="exp-desc" 
                    rows={4}
                    placeholder="Briefly describe your role and accomplishments. Use bullet points for clarity."
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary transition text-gray-200 placeholder-gray-500"
                />
            </div>
             <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-all duration-300">
                Generate Resume
            </button>
        </div>

        {/* Resume Preview */}
        <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="bg-white text-gray-800 p-8 h-full rounded-md shadow-inner">
                <h2 className="text-3xl font-bold border-b pb-2">Alex Doe</h2>
                <p className="text-lg text-primary-700 font-semibold">Software Engineer</p>
                <div className="text-xs text-gray-600 mt-2 flex space-x-4">
                    <span>alex.doe@example.com</span>
                    <span>linkedin.com/in/alexdoe</span>
                    <span>github.com/alexdoe</span>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-700 border-b-2 border-primary-400 pb-1">Summary</h3>
                    <p className="text-sm mt-2">Highly motivated Software Engineer with a passion for building scalable web applications. AI will generate this summary for you based on your input.</p>
                </div>
                 <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-700 border-b-2 border-primary-400 pb-1">Experience</h3>
                    <div className="mt-2">
                        <p className="font-bold">Senior Developer <span className="font-normal text-gray-600">| Tech Solutions Inc.</span></p>
                        <p className="text-xs text-gray-500">Jan 2022 - Present</p>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                            <li>AI will write your achievement bullet points here.</li>
                            <li>Optimized application performance by 30%.</li>
                        </ul>
                    </div>
                </div>
                 <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-700 border-b-2 border-primary-400 pb-1">Skills</h3>
                    <p className="text-sm mt-2">JavaScript, React, Node.js, Python, AWS, Docker</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};