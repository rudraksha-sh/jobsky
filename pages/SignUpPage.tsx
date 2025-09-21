import React, { useState } from 'react';
import * as apiService from '../services/apiService';
import type { Page } from '../App';

interface User {
    _id: string;
    email: string;
    fullName?: string;
}

interface SignUpPageProps {
    onLogin: (token: string, user: User) => void;
    onNavigate: (page: Page) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onLogin, onNavigate }) => {
    const [step, setStep] = useState(1); // 1 for details, 2 for OTP
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        contact: '',
        linkedin: '',
        dob: '',
        gender: '',
    });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await apiService.sendVerificationOtp(formData.email);
            setStep(2);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const { token, user } = await apiService.register({ ...formData, otp });
            onLogin(token, user);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-fade-in-up">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-2xl">
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Create Account
                </h1>
                <p className="text-center text-gray-400 mb-6">
                    {step === 1 ? 'Get started with your personalized career plan' : `Enter the OTP sent to ${formData.email}`}
                </p>

                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />
                        <InputField label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} />
                        <InputField label="LinkedIn Profile URL" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                        <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </SelectField>

                        <button type="submit" disabled={isLoading} className="mt-6 w-full auth-button">
                            {isLoading ? 'Sending OTP...' : 'Continue'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <InputField
                            label="Verification Code"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            maxLength={6}
                        />
                        <button type="submit" disabled={isLoading} className="mt-6 w-full auth-button">
                            {isLoading ? 'Verifying...' : 'Create Account'}
                        </button>
                        <button type="button" onClick={() => { setStep(1); setError(null); }} className="text-center w-full mt-2 text-sm text-primary hover:underline">
                           &larr; Back to details
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <button type="button" onClick={() => onNavigate('auth')} className="font-medium text-primary hover:underline">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

// Helper Components
const inputClasses = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-gray-200";

const InputField = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={props.name}>{props.label}</label>
        <input id={props.name} {...props} className={inputClasses} />
    </div>
);

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) => (
     <div>
        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={props.name}>{props.label}</label>
        <select id={props.name} {...props} className={inputClasses}>
            {props.children}
        </select>
    </div>
);

// Add a shared style for auth buttons
const style = document.createElement('style');
style.innerHTML = `
.auth-button {
    background-color: #10b981;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s;
}
.auth-button:hover {
    background-color: #059669;
}
.auth-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}`;
document.head.appendChild(style);
