import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { Footer } from './components/Footer';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { PracticePage } from './pages/PracticePage';
import { MentorshipPage } from './pages/MentorshipPage';
import { HelpPage } from './pages/HelpPage';

export type Page = 'landing' | 'advisor' | 'resume' | 'profile' | 'community' | 'practice' | 'mentorship' | 'help';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'advisor':
        return <AdvisorPage />;
      case 'resume':
        return <ResumeBuilderPage />;
      case 'profile':
        return <ProfilePage />;
      case 'community':
        return <CommunityPage />;
      case 'practice':
        return <PracticePage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer page={currentPage} />
    </div>
  );
};

export default App;