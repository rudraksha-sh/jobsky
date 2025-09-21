import React, { useState } from 'react';

// --- Data Structure ---
interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  date: string;
  description: string;
}

interface Education {
    id: number;
    degree: string;
    institution: string;
    date: string;
}

interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  skills: string;
  experiences: Experience[];
  educations: Education[];
}

// --- Initial State ---
const initialResumeData: ResumeData = {
  name: "Your Name",
  title: "Aspiring Professional",
  phone: "123-456-7890",
  email: "youremail@example.com",
  linkedin: "linkedin.com/in/yourprofile",
  summary: "A brief professional summary about your skills, experience, and career goals. Tailor this to the job you are applying for.",
  skills: "Skill 1, Skill 2, Skill 3, AI, Web Development",
  experiences: [
    { id: 1, jobTitle: "Job Title", company: "Company Name", date: "Month Year - Month Year", description: "- Responsibility 1\n- Responsibility 2\n- Achieved X, Y, and Z by doing A, B, and C." }
  ],
  educations: [
    { id: 1, degree: "Degree or Certificate", institution: "University or Institution Name", date: "Month Year - Month Year" }
  ]
};

// --- Main Component ---
export const ResumeBuilderPage: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [paperSize, setPaperSize] = useState<'a4' | 'letter'>('letter');

  const handlePrint = () => {
    const preview = document.getElementById('resume-preview-wrapper');
    if (preview) {
        // Temporarily add a class to the body to trigger print styles
        document.body.classList.add('printable-resume');
        window.print();
        document.body.classList.remove('printable-resume');
    }
  };
  
  // Generic handler for top-level fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handlers for nested experience fields
  const handleExperienceChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
        ...prev,
        experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [name]: value } : exp)
    }));
  };

  const handleEducationChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
        ...prev,
        educations: prev.educations.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
    }));
  };

  return (
    <div className="w-full animate-fade-in-up">
        {/* Header and Controls */}
        <div className="bg-gray-800 p-4 sticky top-16 z-40 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-white">Resume Builder</h1>
                    <p className="text-sm text-gray-400">Fill in your details and see the live preview.</p>
                </div>
                <div className="flex items-center space-x-2">
                     <span className="text-sm font-medium text-gray-300 mr-2">Paper Size:</span>
                    <button onClick={() => setPaperSize('letter')} className={`px-3 py-1 text-sm rounded ${paperSize === 'letter' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>Letter</button>
                    <button onClick={() => setPaperSize('a4')} className={`px-3 py-1 text-sm rounded ${paperSize === 'a4' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>A4</button>
                    <button onClick={handlePrint} className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-1 px-4 rounded-lg ml-4">Print</button>
                </div>
            </div>
        </div>

      {/* Editor Layout */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Form Section */}
        <div className="w-full lg:w-1/3 bg-gray-900 p-6 space-y-6 overflow-y-auto h-[calc(100vh-128px)]">
            <h2 className="text-lg font-semibold text-primary-400 border-b border-gray-700 pb-2">Contact Information</h2>
            <InputField label="Full Name" name="name" value={resumeData.name} onChange={handleChange} />
            <InputField label="Job Title" name="title" value={resumeData.title} onChange={handleChange} />
            <InputField label="Phone" name="phone" value={resumeData.phone} onChange={handleChange} />
            <InputField label="Email" name="email" value={resumeData.email} onChange={handleChange} />
            <InputField label="LinkedIn" name="linkedin" value={resumeData.linkedin} onChange={handleChange} />
            
            <h2 className="text-lg font-semibold text-primary-400 border-b border-gray-700 pb-2 pt-4">Professional Summary</h2>
            <TextAreaField label="Summary" name="summary" value={resumeData.summary} onChange={handleChange} />

            <h2 className="text-lg font-semibold text-primary-400 border-b border-gray-700 pb-2 pt-4">Skills</h2>
            <TextAreaField label="Skills (comma-separated)" name="skills" value={resumeData.skills} onChange={handleChange} />
            
            <h2 className="text-lg font-semibold text-primary-400 border-b border-gray-700 pb-2 pt-4">Work Experience</h2>
            {resumeData.experiences.map(exp => (
                <div key={exp.id} className="p-4 border border-gray-700 rounded-lg space-y-2">
                    <InputField label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={e => handleExperienceChange(exp.id, e)} />
                    <InputField label="Company" name="company" value={exp.company} onChange={e => handleExperienceChange(exp.id, e)} />
                    <InputField label="Date" name="date" value={exp.date} onChange={e => handleExperienceChange(exp.id, e)} />
                    <TextAreaField label="Description" name="description" value={exp.description} onChange={e => handleExperienceChange(exp.id, e)} />
                </div>
            ))}
            
            <h2 className="text-lg font-semibold text-primary-400 border-b border-gray-700 pb-2 pt-4">Education</h2>
            {resumeData.educations.map(edu => (
                 <div key={edu.id} className="p-4 border border-gray-700 rounded-lg space-y-2">
                    <InputField label="Degree/Certificate" name="degree" value={edu.degree} onChange={e => handleEducationChange(edu.id, e)} />
                    <InputField label="Institution" name="institution" value={edu.institution} onChange={e => handleEducationChange(edu.id, e)} />
                    <InputField label="Date" name="date" value={edu.date} onChange={e => handleEducationChange(edu.id, e)} />
                </div>
            ))}
        </div>

        {/* Preview Section */}
        <div id="resume-preview-wrapper" className="w-full lg:w-2/3 bg-gray-800 p-8 overflow-y-auto h-[calc(100vh-128px)]">
            <div className={`resume-preview ${paperSize}`}>
                <div className="text-center border-b-2 border-gray-300 pb-2">
                    <h1 className="text-4xl font-bold">{resumeData.name}</h1>
                    <p className="text-xl">{resumeData.title}</p>
                    <div className="text-xs flex justify-center space-x-4 mt-1">
                        <span>{resumeData.phone}</span>
                        <span>|</span>
                        <span>{resumeData.email}</span>
                        <span>|</span>
                        <span>{resumeData.linkedin}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1">SUMMARY</h2>
                    <p className="text-sm mt-1">{resumeData.summary}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1">SKILLS</h2>
                    <p className="text-sm mt-1">{resumeData.skills}</p>
                </div>
                 <div className="mt-4">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1">EXPERIENCE</h2>
                    {resumeData.experiences.map(exp => (
                        <div key={exp.id} className="mt-2">
                            <div className="flex justify-between">
                                <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                                <p className="text-sm font-bold">{exp.date}</p>
                            </div>
                            <h4 className="text-md italic">{exp.company}</h4>
                            <ul className="list-disc list-inside text-sm mt-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-bold border-b border-gray-300 pb-1">EDUCATION</h2>
                     {resumeData.educations.map(edu => (
                        <div key={edu.id} className="mt-2">
                             <div className="flex justify-between">
                                <h3 className="text-md font-bold">{edu.degree}</h3>
                                <p className="text-sm font-bold">{edu.date}</p>
                            </div>
                            <h4 className="text-md italic">{edu.institution}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Form Components ---
interface FieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: any) => void;
}
const InputField: React.FC<FieldProps> = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input type="text" name={name} value={value} onChange={onChange} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-200" />
    </div>
);
const TextAreaField: React.FC<FieldProps> = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <textarea name={name} value={value} onChange={onChange} rows={4} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-200 resize-y" />
    </div>
);
