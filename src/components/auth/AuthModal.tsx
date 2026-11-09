import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { ETHR_LOGO } from '../../assets/ethr-assets';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ShieldCheck,
  Zap,
  Crown
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalInitialTab, 
    closeAuthModal, 
    login, 
    signup, 
    loginWithSocial,
    resetPassword
  } = useAuth();

  // Active tab inside modal
  const [activeTab, setActiveTab] = useState<'in' | 'up'>(authModalInitialTab);

  useEffect(() => {
    setActiveTab(authModalInitialTab);
  }, [authModalInitialTab]);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('bettor');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Forgot password mode inside modal
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password, rememberMe);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Login failed. Please check credentials.');
    } else {
      closeAuthModal();
      resetForm();
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    const result = await signup({
      name: name.trim(),
      email: email.trim(),
      password,
      role
    });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Failed to create account.');
    } else {
      setSuccessMsg('Account created successfully! Welcome to the royal paddock.');
      setTimeout(() => {
        closeAuthModal();
        resetForm();
      }, 1200);
    }
  };

  const handleQuickDemo = async (demoEmail: string) => {
    setError(null);
    setIsSubmitting(true);
    const result = await login(demoEmail, 'password123', true);
    setIsSubmitting(false);
    if (result.success) {
      closeAuthModal();
      resetForm();
    } else {
      setError(result.error || 'Demo login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    const res = await loginWithSocial('Google');
    setIsGoogleLoading(false);
    if (res.success) {
      closeAuthModal();
      resetForm();
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      setError('Please enter a valid email to receive reset instructions.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    await resetPassword(resetEmail);
    setIsSubmitting(false);
    setResetSent(true);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setSuccessMsg(null);
    setIsForgotPassword(false);
    setResetSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={() => {
          closeAuthModal();
          resetForm();
        }}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0a0806] border border-[#dfba63]/40 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(223,186,99,0.2)] p-6 sm:p-8 z-10 text-white my-8 overflow-hidden">
        
        {/* Top Ethiopian Tricolor Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e9a4b] via-[#fcd116] to-[#da121a]" />

        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#dfba63]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#dfba63]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={() => {
            closeAuthModal();
            resetForm();
          }}
          className="absolute top-5 right-5 text-neutral-400 hover:text-[#dfba63] transition-colors p-1.5 rounded-xl hover:bg-white/5 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Logo & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-2xl border-2 border-[#dfba63]/60 bg-black p-1 mb-3.5 shadow-[0_0_30px_rgba(223,186,99,0.35)] overflow-hidden">
            <img 
              src={ETHR_LOGO} 
              alt="ETHR Official Emblem" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#dfba63] font-bold">
            Ethiopian Horse Racing Club
          </span>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
            {isForgotPassword 
              ? 'Reset Credentials' 
              : activeTab === 'in' 
                ? 'Royal Paddock Entry' 
                : 'Join the Imperial Paddock'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs font-light">
            {isForgotPassword
              ? 'Enter your registered email to receive a recovery link'
              : activeTab === 'in'
                ? 'Sign in to access live betting, paddock passes, and syndicate vaults'
                : 'Register to access live racecards, paddock passes, and syndicate vaults'}
          </p>
        </div>

        {/* Tabs: Sign In / Sign Up (Only if not in forgot password) */}
        {!isForgotPassword && (
          <div className="grid grid-cols-2 p-1.5 bg-[#050403] rounded-2xl border border-[#2b2214] mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('in');
                setError(null);
              }}
              className={`py-2 text-xs font-cinzel font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'in'
                  ? 'gold-button shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('up');
                setError(null);
              }}
              className={`py-2 text-xs font-cinzel font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'up'
                  ? 'gold-button shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Error / Success Notifications */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {/* Quick Demo Credentials Bar */}
        {!isForgotPassword && (
          <div className="mb-6 p-3.5 bg-[#120f09] border border-[#dfba63]/30 rounded-2xl">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-[#dfba63] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#dfba63]" />
                1-Click Quick Demo Login:
              </span>
              <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Test Vault Accounts</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('abebe@ethr.et')}
                className="p-2 bg-[#080705] hover:bg-[#1a150e] border border-[#dfba63]/30 hover:border-[#dfba63] rounded-xl text-[11px] text-left transition-all text-neutral-300 hover:text-[#dfba63] cursor-pointer"
              >
                <div className="font-bold text-white truncate">Abebe B.</div>
                <div className="text-[9px] text-[#dfba63] truncate">Horse Owner</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('selam@ethr.et')}
                className="p-2 bg-[#080705] hover:bg-[#1a150e] border border-[#dfba63]/30 hover:border-[#dfba63] rounded-xl text-[11px] text-left transition-all text-neutral-300 hover:text-[#dfba63] cursor-pointer"
              >
                <div className="font-bold text-white truncate">Selam T.</div>
                <div className="text-[9px] text-[#1e9a4b] truncate">Bettor & Member</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('kassahun@ethr.et')}
                className="p-2 bg-[#080705] hover:bg-[#1a150e] border border-[#dfba63]/30 hover:border-[#dfba63] rounded-xl text-[11px] text-left transition-all text-neutral-300 hover:text-[#dfba63] cursor-pointer"
              >
                <div className="font-bold text-white truncate">Kassahun M.</div>
                <div className="text-[9px] text-[#fcd116] truncate">Breeder & Stud</div>
              </button>
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {isForgotPassword ? (
          <div>
            {resetSent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-[#1e9a4b]/20 border border-[#1e9a4b] rounded-full flex items-center justify-center mx-auto text-[#1e9a4b]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-cinzel text-white">Reset Link Dispatched</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  We have dispatched instructions to <span className="text-[#dfba63] font-mono font-bold">{resetEmail}</span>. Please verify your inbox or spam folder.
                </p>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="gold-button px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. yourname@domain.et"
                      className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="flex-1 py-2.5 border border-neutral-700 hover:border-neutral-500 rounded-xl text-xs uppercase tracking-wider font-semibold text-neutral-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="gold-button flex-1 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : activeTab === 'in' ? (
          /* LOG IN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. abebe@ethr.et"
                  className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs text-[#dfba63] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#dfba63] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#2b2214] text-[#dfba63] focus:ring-[#dfba63] focus:ring-offset-black bg-black"
                />
                Remember me on this terminal
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-button w-full mt-2 py-3.5 uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to ETHR</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Full Legal Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. almaz@ethiopia.et"
                  className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl pl-10 pr-10 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#dfba63] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Membership Category Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Select Membership Registry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bettor', label: 'Spectator & Bettor', desc: 'Live Racecards & Payouts' },
                  { id: 'owner', label: 'Horse Owner', desc: 'Silks & Paddock Pass' },
                  { id: 'breeder', label: 'Breeder / Stud', desc: 'Bloodline Certification' },
                  { id: 'syndicate', label: 'Syndicate Member', desc: 'Fractional Share Equity' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setRole(item.id as UserRole)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      role === item.id
                        ? 'border-[#dfba63] bg-[#dfba63]/15 text-white shadow-[0_0_15px_rgba(223,186,99,0.2)]'
                        : 'border-[#2b2214] bg-[#070604] text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{item.label}</div>
                    <div className="text-[10px] text-neutral-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Membership Registration Note */}
            <div className="bg-[#121008] border border-[#dfba63]/30 rounded-xl p-3 flex items-center gap-3">
              <Crown className="w-4 h-4 text-[#dfba63] shrink-0" />
              <p className="text-[11px] text-neutral-300">
                New accounts receive a verified member profile and digital Jan Meda royal paddock badge.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-button w-full mt-2 py-3.5 uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create ETHR Account</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Google Authentication & Social Divider */}
        {!isForgotPassword && (
          <div className="mt-6 space-y-3">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#2b2214]"></div>
              <span className="flex-shrink mx-4 text-[9px] tracking-widest uppercase text-neutral-500 font-semibold">
                Or Instant Google Authentication
              </span>
              <div className="flex-grow border-t border-[#2b2214]"></div>
            </div>

            <button
              type="button"
              disabled={isGoogleLoading || isSubmitting}
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#dfba63]/50 hover:border-[#dfba63] bg-[#120e08] hover:bg-[#1c170d] rounded-2xl text-xs font-semibold text-white transition-all cursor-pointer shadow-[0_0_20px_rgba(223,186,99,0.15)] group disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-[#dfba63] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
                  />
                </svg>
              )}
              <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>

            <button
              type="button"
              onClick={() => loginWithSocial('Apple')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-[#2b2214] hover:border-neutral-700 bg-[#070605] rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.16c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.73 1.4-.59.68-1.1 1.77-.96 2.83 1.04.08 2.09-.51 2.73-1.29z"/>
              </svg>
              <span>Continue with Apple ID</span>
            </button>
          </div>
        )}

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-[#2b2214] flex items-center justify-center gap-1.5 text-neutral-500 text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1e9a4b]" />
          <span>Encrypted 256-bit Ethiopian Equestrian Club Vault</span>
        </div>

      </div>
    </div>
  );
};
