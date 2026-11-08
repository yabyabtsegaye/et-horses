import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PublicSections } from './components/PublicSections';
import { MembersArea } from './components/MembersArea';
import { AuthModal } from './components/auth/AuthModal';
import { DepositModal } from './components/DepositModal';

function AppContent() {
  const { isAuthenticated, openAuthModal, toastMessage } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'members'>('home');
  const [membersTab, setMembersTab] = useState<'betting' | 'events' | 'marketplace' | 'history'>('betting');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [targetInquirySubject, setTargetInquirySubject] = useState<string>('');

  const handleNavigate = (view: 'home' | 'members', sectionOrTab?: string) => {
    if (view === 'members') {
      if (!isAuthenticated) {
        openAuthModal('in');
        return;
      }
      if (sectionOrTab && ['betting', 'events', 'marketplace', 'history'].includes(sectionOrTab)) {
        setMembersTab(sectionOrTab as any);
      }
      setCurrentView('members');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      if (sectionOrTab) {
        setTimeout(() => {
          const el = document.getElementById(sectionOrTab);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleOpenBetting = () => {
    if (!isAuthenticated) {
      openAuthModal('in');
    } else {
      setCurrentView('members');
      setMembersTab('betting');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenOwnershipInquiry = (horseOrTierName: string) => {
    setTargetInquirySubject(horseOrTierName);
    if (!isAuthenticated) {
      openAuthModal('up');
    } else {
      setCurrentView('members');
      setMembersTab('marketplace');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#d9b25a] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#12100a] border border-[#d9b25a] rounded-xl p-4 shadow-[0_10px_30px_rgba(217,178,90,0.3)] text-white text-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3">
          <div className="w-2 h-2 rounded-full bg-[#1e9a4b] animate-ping shrink-0" />
          <div className="flex-1 font-medium">{toastMessage}</div>
        </div>
      )}

      {/* Top Fixed Navigation */}
      <Navbar 
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenDeposit={() => {
          if (!isAuthenticated) {
            openAuthModal('in');
          } else {
            setIsDepositOpen(true);
          }
        }}
      />

      {/* Main View Router */}
      <main>
        {currentView === 'home' ? (
          <>
            <Hero 
              onExploreRaces={handleOpenBetting}
              onExploreOwnership={() => {
                const el = document.getElementById('ownership');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <PublicSections 
              onOpenBetting={handleOpenBetting}
              onOpenOwnershipInquiry={handleOpenOwnershipInquiry}
            />
          </>
        ) : (
          <MembersArea 
            initialTab={membersTab}
            onOpenDeposit={() => setIsDepositOpen(true)}
            targetInquirySubject={targetInquirySubject}
          />
        )}
      </main>

      {/* Authentication Modal (Log In / Sign Up / Forgot Password / Quick Demo) */}
      <AuthModal />

      {/* Wallet Deposit Modal */}
      <DepositModal 
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
