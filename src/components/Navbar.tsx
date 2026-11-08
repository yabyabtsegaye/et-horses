import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ETHR_LOGO } from '../assets/ethr-assets';
import { 
  Wallet, 
  Plus, 
  LogOut, 
  ChevronDown, 
  Trophy, 
  Calendar, 
  Menu, 
  X,
  Sparkles,
  Shield,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'members';
  onNavigate: (view: 'home' | 'members', sectionId?: string) => void;
  onOpenDeposit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenDeposit }) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'owner': return 'Horse Owner';
      case 'breeder': return 'Breeder / Stud';
      case 'syndicate': return 'Syndicate Member';
      default: return 'Bettor / Club Member';
    }
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home', id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-[#2b2214] shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Ethiopian Tricolor Imperial Ribbon */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1e9a4b] via-[#fcd116] to-[#da121a]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Official Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="relative w-12 h-12 rounded-xl border border-[#dfba63]/50 p-0.5 bg-black overflow-hidden shadow-[0_0_20px_rgba(223,186,99,0.25)] group-hover:border-[#dfba63] group-hover:shadow-[0_0_30px_rgba(223,186,99,0.4)] transition-all">
            <img 
              src={ETHR_LOGO} 
              alt="ETHR Logo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-gold-bright">
                ETHR
              </span>
              <span className="text-[9px] uppercase font-sans font-bold tracking-[0.25em] text-[#dfba63] bg-[#dfba63]/10 px-2 py-0.5 rounded-full border border-[#dfba63]/30">
                JAN MEDA 1887
              </span>
            </div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-sans hidden sm:block">
              Speed <span className="text-[#dfba63]">·</span> Heritage <span className="text-[#dfba63]">·</span> Future
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-300">
          <button 
            onClick={() => scrollToSection('heritage')} 
            className="hover:text-[#dfba63] transition-colors cursor-pointer relative py-1 group"
          >
            <span>Imperial Heritage</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#dfba63] transition-all duration-300 group-hover:w-full" />
          </button>
          
          <button 
            onClick={() => scrollToSection('horses')} 
            className="hover:text-[#dfba63] transition-colors cursor-pointer relative py-1 group"
          >
            <span>Champions</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#dfba63] transition-all duration-300 group-hover:w-full" />
          </button>
          
          <button 
            onClick={() => scrollToSection('ownership')} 
            className="hover:text-[#dfba63] transition-colors cursor-pointer relative py-1 group"
          >
            <span>Syndicates</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#dfba63] transition-all duration-300 group-hover:w-full" />
          </button>
          
          <button 
            onClick={() => {
              if (isAuthenticated) {
                onNavigate('members', 'betting');
              } else {
                openAuthModal('in');
              }
            }} 
            className="hover:text-[#dfba63] transition-colors cursor-pointer flex items-center gap-1.5 py-1 group"
          >
            <Trophy className="w-3.5 h-3.5 text-[#dfba63]" />
            <span>Live Racecard</span>
          </button>
          
          <button 
            onClick={() => {
              if (isAuthenticated) {
                onNavigate('members', 'events');
              } else {
                openAuthModal('in');
              }
            }} 
            className="hover:text-[#dfba63] transition-colors cursor-pointer relative py-1 group"
          >
            <span>Derby Gala</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#dfba63] transition-all duration-300 group-hover:w-full" />
          </button>
        </div>

        {/* Right Section: Auth State / Action Buttons */}
        <div className="flex items-center gap-3">
          
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* Wallet Badge */}
              <div 
                onClick={onOpenDeposit}
                className="flex items-center bg-[#13100a] hover:bg-[#1c170e] border border-[#dfba63]/40 rounded-full pl-3.5 pr-2 py-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(223,186,99,0.15)] group"
                title="Deposit / Top-up Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-[#dfba63] mr-1.5" />
                <div className="text-right">
                  <span className="text-xs font-bold text-white font-mono">
                    {user.balance.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-[#dfba63] ml-1 font-sans font-semibold">ETB</span>
                </div>
                <div className="ml-2 w-5 h-5 rounded-full bg-[#dfba63] text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Plus className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {/* Members Portal Button Toggle */}
              <button
                onClick={() => onNavigate(currentView === 'members' ? 'home' : 'members')}
                className={`hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  currentView === 'members'
                    ? 'bg-[#15120c] text-[#dfba63] border border-[#dfba63]/50'
                    : 'gold-button'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentView === 'members' ? 'Public Turf' : 'Members Club'}</span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 bg-black/80 border border-[#dfba63]/40 hover:border-[#dfba63] rounded-xl transition-all text-white cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dfba63] to-[#9e7a29] p-[1px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#0a0805] rounded-lg flex items-center justify-center text-xs font-bold font-cinzel text-[#dfba63]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#dfba63] mr-1" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-[#0c0a07] border border-[#dfba63]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] py-4 px-4 z-50 text-white animate-in fade-in slide-in-from-top-2">
                    <div className="pb-3 border-b border-[#2b2214]">
                      <div className="font-serif text-base font-bold text-white truncate">{user.name}</div>
                      <div className="text-xs text-neutral-400 truncate">{user.email}</div>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dfba63]/15 border border-[#dfba63]/30 text-[10px] text-[#dfba63] font-semibold tracking-wider uppercase">
                        <Shield className="w-3 h-3 text-[#dfba63]" />
                        {getRoleLabel(user.role)}
                      </div>
                    </div>

                    <div className="py-2.5 space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onNavigate('members', 'betting');
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1a150e] flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Trophy className="w-4 h-4 text-[#dfba63]" />
                        <span>Live Racecards & Bet Slip</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onNavigate('members', 'events');
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1a150e] flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#1e9a4b]" />
                        <span>My VIP Derby Passes</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onNavigate('members', 'marketplace');
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1a150e] flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-[#fcd116]" />
                        <span>Bloodline & Stud Vault</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onOpenDeposit();
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#1a150e] flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Wallet className="w-4 h-4 text-[#dfba63]" />
                        <span>Deposit Birr (Telebirr / CBE)</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#2b2214]">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-950/40 text-red-400 flex items-center gap-2 text-xs font-semibold cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out of ETHR</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Logged Out Buttons */
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal('in')}
                className="text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-[#dfba63] px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => openAuthModal('up')}
                className="gold-button text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Join Club</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Open navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#070605] border-b border-[#2b2214] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-xs uppercase tracking-widest font-semibold text-neutral-300">
            <button 
              onClick={() => scrollToSection('heritage')} 
              className="text-left py-2 hover:text-[#dfba63]"
            >
              Imperial Heritage
            </button>
            <button 
              onClick={() => scrollToSection('horses')} 
              className="text-left py-2 hover:text-[#dfba63]"
            >
              Champions
            </button>
            <button 
              onClick={() => scrollToSection('ownership')} 
              className="text-left py-2 hover:text-[#dfba63]"
            >
              Ownership Syndicates
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAuthenticated) {
                  onNavigate('members', 'betting');
                } else {
                  openAuthModal('in');
                }
              }} 
              className="text-left py-2 hover:text-[#dfba63] flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-[#dfba63]" />
              Live Races & Betting
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAuthenticated) {
                  onNavigate('members', 'events');
                } else {
                  openAuthModal('in');
                }
              }} 
              className="text-left py-2 hover:text-[#dfba63]"
            >
              Derby Events & Passes
            </button>

            {isAuthenticated ? (
              <div className="pt-4 border-t border-[#2b2214] space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(currentView === 'members' ? 'home' : 'members');
                  }}
                  className="w-full text-center py-3 rounded-xl gold-button text-xs uppercase tracking-widest font-bold"
                >
                  {currentView === 'members' ? 'Return to Public Showcase' : 'Enter Members Club Lounge'}
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 text-xs text-red-400"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#2b2214] flex gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('in');
                  }}
                  className="flex-1 py-2.5 border border-neutral-700 rounded-xl text-center text-xs"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('up');
                  }}
                  className="flex-1 py-2.5 gold-button rounded-xl text-center text-xs font-bold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
