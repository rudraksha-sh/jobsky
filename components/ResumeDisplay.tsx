import React, { useState, useEffect } from 'react';
import type { ResumeBuilderResponse, UserProfile } from '../types';

// Declare global libraries loaded from CDN
declare const jspdf: any;
declare const html2canvas: any;

// --- Types for formatting options ---
type FontOption = 'sans' | 'serif' | 'mono';
type SizeOption = 'sm' | 'base' | 'lg';

const CopyIcon: React.FC<{ copied: boolean }> = ({ copied }) => copied ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; textToCopy: string; hideCopy?: boolean }> = ({ title, children, textToCopy, hideCopy=false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    return (
        <div className="pt-4">
            <div className="flex justify-between items-center mb-3 border-b border-gray-600 pb-2">
                <h3 className="text-lg font-bold text-primary-400 uppercase tracking-wider">{title}</h3>
                {!hideCopy && (
                    <button
                        onClick={handleCopy}
                        className="group flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-all duration-200"
                        aria-label={`Copy ${title} to clipboard`}
                    >
                        <CopyIcon copied={copied} />
                        <span className={`text-xs font-medium ${copied ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
                            {copied ? 'Copied!' : 'Copy'}
                        </span>
                    </button>
                )}
            </div>
            <div className="prose-invert max-w-none text-gray-300">
                {children}
            </div>
        </div>
    );
};

const FormattingToolbar: React.FC<{
    font: FontOption;
    size: SizeOption;
    onFontChange: (font: FontOption) => void;
    onSizeChange: (size: SizeOption) => void;
    onExport: () => void;
    isExporting: boolean;
}> = ({ font, size, onFontChange, onSizeChange, onExport, isExporting }) => {
    const fontOptions: { id: FontOption; label: string }[] = [ { id: 'sans', label: 'Sans' }, { id: 'serif', label: 'Serif' }, { id: 'mono', label: 'Mono' } ];
    const sizeOptions: { id: SizeOption; label: string }[] = [ { id: 'sm', label: 'S' }, { id: 'base', label: 'M' }, { id: 'lg', label: 'L' } ];

    const OptionButton: React.FC<{ onClick: () => void; active: boolean; children: React.ReactNode; className?: string }> = ({ onClick, active, children, className }) => (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${active ? 'bg-primary text-white font-semibold' : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'} ${className}`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm mr-2">Font:</span>
                {fontOptions.map(option => (
                    <OptionButton key={option.id} onClick={() => onFontChange(option.id)} active={font === option.id}>{option.label}</OptionButton>
                ))}
            </div>
             <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm mr-2">Size:</span>
                {sizeOptions.map(option => (
                    <OptionButton key={option.id} onClick={() => onSizeChange(option.id)} active={size === option.id}>{option.label}</OptionButton>
                ))}
            </div>
            <button
                onClick={onExport}
                disabled={isExporting}
                className="flex items-center justify-center space-x-2 bg-green-600/80 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <DownloadIcon />
                <span>{isExporting ? 'Exporting...' : 'Export to PDF'}</span>
            </button>
        </div>
    );
};

const PersonalDetailInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string }> = 
({ label, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
        />
    </div>
);


interface ResumeDisplayProps {
    results: ResumeBuilderResponse;
    user: UserProfile | null;
}

export const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ results, user }) => {
    const [font, setFont] = useState<FontOption>(() => (localStorage.getItem('resumeFont') as FontOption) || 'sans');
    const [size, setSize] = useState<SizeOption>(() => (localStorage.getItem('resumeSize') as SizeOption) || 'base');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => { localStorage.setItem('resumeFont', font); }, [font]);
    useEffect(() => { localStorage.setItem('resumeSize', size); }, [size]);

    const handleExportPDF = () => {
        setIsExporting(true);
        const resumeElement = document.getElementById('resume-content-export');
        if (resumeElement) {
            html2canvas(resumeElement, {
                scale: 2.5, // Higher scale for better quality
                backgroundColor: '#1e293b', // Match resume background
                useCORS: true,
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = imgWidth / imgHeight;
                let finalImgWidth = pageWidth;
                let finalImgHeight = finalImgWidth / ratio;
                
                if (finalImgHeight > pageHeight) {
                    finalImgHeight = pageHeight;
                    finalImgWidth = finalImgHeight * ratio;
                }
                
                pdf.addImage(imgData, 'PNG', 0, 0, finalImgWidth, finalImgHeight);
                pdf.save('Jobsky-Resume.pdf');
            }).catch(err => {
                console.error("Error generating PDF:", err);
            }).finally(() => {
                setIsExporting(false);
            });
        } else {
            console.error("Could not find resume element to export.");
            setIsExporting(false);
        }
    };

    const fontClass = { sans: 'font-sans', serif: 'font-serif', mono: 'font-mono' }[font];
    const sizeClass = { sm: 'prose-sm', base: 'prose', lg: 'prose-lg' }[size];

    return (
        <div className="w-full max-w-4xl animate-fade-in-up">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mb-6">
                 <h3 className="text-lg font-bold text-white mb-3">Your Personal Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PersonalDetailInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" />
                    <PersonalDetailInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g., jane.doe@email.com" type="email" />
                    <PersonalDetailInput label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., (123) 456-7890" />
                    <PersonalDetailInput label="LinkedIn Profile URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="e.g., linkedin.com/in/janedoe" />
                 </div>
            </div>

            <FormattingToolbar 
                font={font}
                size={size}
                onFontChange={setFont}
                onSizeChange={setSize}
                onExport={handleExportPDF}
                isExporting={isExporting}
            />
            
            <div id="resume-content-export" className={`bg-gray-800 p-8 md:p-12 shadow-2xl ${fontClass} ${sizeClass}`}>
                <header className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{name || "Your Name"}</h1>
                    <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mt-2">
                        {email && <span>{email}</span>}
                        {phone && <span>&bull; {phone}</span>}
                        {linkedin && <span>&bull; {linkedin}</span>}
                    </div>
                </header>
                <div className="space-y-4">
                    <ResumeSection title="Professional Summary" textToCopy={results.summary}>
                        <p>{results.summary}</p>
                    </ResumeSection>

                    <ResumeSection title="Experience" textToCopy={results.experience.map(item => `- ${item}`).join('\n')}>
                        <ul className="list-disc pl-5 space-y-2">
                            {results.experience.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </ResumeSection>

                    <ResumeSection title="Skills" textToCopy={results.skills.join(', ')}>
                        <div className="flex flex-wrap gap-2">
                            {results.skills.map(skill => (
                                <span key={skill} className="bg-primary-500/20 text-primary-300 px-3 py-1 text-xs font-medium rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </ResumeSection>
                </div>
            </div>
        </div>
    );
};