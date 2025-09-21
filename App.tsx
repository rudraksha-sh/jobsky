import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { PracticePage } from './pages/PracticePage';
import { MentorshipPage } from './pages/MentorshipPage';
import { HelpPage } from './pages/HelpPage';
import { NewsletterPage } from './pages/NewsletterPage';
import AuthPage from './pages/AuthPage';
import type { UserProfile } from './types';

export type Page = 'landing' | 'advisor' | 'resume' | 'practice' | 'community' | 'mentorship' | 'profile' | 'help' | 'newsletter' | 'auth';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const pagesRequiringAuth: Page[] = ['advisor', 'resume', 'practice', 'community', 'mentorship', 'profile'];
  const isLoggedIn = !!userProfile;

  const handleNavigate = (newPage: Page) => {
    if (pagesRequiringAuth.includes(newPage) && !isLoggedIn) {
      setPage('auth');
    } else {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setPage('advisor');
  };

  const handleLogout = () => {
    setUserProfile(null);
    setPage('landing');
  };

  const renderPage = () => {
    if (pagesRequiringAuth.includes(page) && !isLoggedIn) {
      return <AuthPage onLogin={handleLogin} onNavigate={handleNavigate} />;
    }

    switch (page) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'advisor':
        return <AdvisorPage />;
      case 'resume':
        return <ResumeBuilderPage user={userProfile} />;
      case 'practice':
        return <PracticePage />;
      case 'community':
        return <CommunityPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'profile':
        return <ProfilePage user={userProfile} onLogout={handleLogout} />;
      case 'help':
        return <HelpPage />;
      case 'newsletter':
        return <NewsletterPage />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <Header page={page} onNavigate={handleNavigate} user={userProfile} onLogout={handleLogout} />
      <main className="flex-grow flex flex-col items-center w-full">
        {renderPage()}
      </main>
      <Footer page={page} />
    </div>
  );
}

export default App;