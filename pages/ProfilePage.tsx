import React from 'react';
import type { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);


export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  if (!user) {
    // This should ideally not be reached if routing is correct, but it's a good safeguard.
    return (
      <div className="container mx-auto p-4 md:p-8 w-full max-w-2xl text-center">
        <p className="text-white">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-8 w-full max-w-2xl animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">My Profile</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700 w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            {user.picture ? (
              <img src={user.picture} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserIcon />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <div className="text-left">
          <h3 className="text-xl font-semibold text-white mb-4">My Skills</h3>
          <p className="text-gray-400">
            This feature is coming soon! Your skills from the Career Advisor and your saved resumes will appear here.
          </p>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <div className="flex flex-col sm:flex-row gap-4">
            <button 
                disabled 
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Edit Profile
            </button>
            <button
                onClick={onLogout}
                className="w-full bg-gray-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
                Logout
            </button>
        </div>
      </div>
    </div>
  );
};
