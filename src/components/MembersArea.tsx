import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Race, RaceRunner, Bet } from '../types/auth';
import { ETHR_LOGO } from '../assets/ethr-assets';
import { 
  Trophy, 
  Flag, 
  Play, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Tag, 
  ChevronRight,
  Shield,
  Crown,
  Award,
  Wallet
} from 'lucide-react';

interface MembersAreaProps {
  initialTab?: 'betting' | 'events' | 'marketplace' | 'history';
  onOpenDeposit: () => void;
  targetInquirySubject?: string;
}

export const MembersArea: React.FC<MembersAreaProps> = ({ 
  initialTab = 'betting', 
  onOpenDeposit,
  targetInquirySubject
}) => {
  const { user, bets, eventRSVPs, placeBet, rsvpEvent, submitInquiry, updateWallet } = useAuth();
  const [activeTab, setActiveTab] = useState<'betting' | 'events' | 'marketplace' | 'history'>(initialTab);

  // Synchronize when initialTab changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Available races
  const races: Race[] = [
    {
      id: 'race-1',
      name: 'Jan Meda Gold Cup — Emperor Stakes',
      track: 'Jan Meda Turf',
      distance: '1,600m Dirt Track',
      purse: '1,200,000 ETB',
      time: '15:30 EAT',
      status: 'upcoming',
      runners: [
        { id: 'h-1', name: 'Gold Mane (የወርቅ ጋማ)', number: 1, odds: 2.4, jockey: 'Tewodros A.', trainer: 'Mekonnen B.', weight: '56kg', form: '1-1-2-1', silkColor: '#dfba63' },
        { id: 'h-2', name: 'Selam Empress (ሰላም)', number: 2, odds: 3.8, jockey: 'Kenenisa G.', trainer: 'Hailemariam D.', weight: '54kg', form: '1-2-1-3', silkColor: '#1e9a4b' },
        { id: 'h-3', name: 'Habesha Star (ኮከብ)', number: 3, odds: 5.2, jockey: 'Derartu T.', trainer: 'Girma W.', weight: '57kg', form: '3-1-1-4', silkColor: '#da121a' },
        { id: 'h-4', name: 'Rift Victor (ድል)', number: 4, odds: 7.0, jockey: 'Solomon E.', trainer: 'Berhanu Z.', weight: '55kg', form: '2-3-2-1', silkColor: '#fcd116' },
      ]
    },
    {
      id: 'race-2',
      name: 'Entoto Highland Sprint Classic',
      track: 'Entoto Ridge',
      distance: '1,200m Turf Track',
      purse: '750,000 ETB',
      time: '16:45 EAT',
      status: 'upcoming',
      runners: [
        { id: 'h-2', name: 'Selam Empress (ሰላም)', number: 1, odds: 2.1, jockey: 'Kenenisa G.', trainer: 'Hailemariam D.', weight: '54kg', form: '1-1-1-2', silkColor: '#1e9a4b' },
        { id: 'h-4', name: 'Rift Victor (ድል)', number: 2, odds: 4.5, jockey: 'Solomon E.', trainer: 'Berhanu Z.', weight: '55kg', form: '3-2-1-1', silkColor: '#fcd116' },
        { id: 'h-1', name: 'Gold Mane (የወርቅ ጋማ)', number: 3, odds: 5.0, jockey: 'Tewodros A.', trainer: 'Mekonnen B.', weight: '56kg', form: '2-1-3-2', silkColor: '#dfba63' },
        { id: 'h-3', name: 'Habesha Star (ኮከብ)', number: 4, odds: 6.8, jockey: 'Derartu T.', trainer: 'Girma W.', weight: '57kg', form: '4-3-2-2', silkColor: '#da121a' },
      ]
    }
  ];

  const [selectedRace, setSelectedRace] = useState<Race>(races[0]);
  const [selectedHorse, setSelectedHorse] = useState<RaceRunner>(races[0].runners[0]);
  const [stake, setStake] = useState<number>(200);
  const [betSuccessBanner, setBetSuccessBanner] = useState<string | null>(null);

  // Live Race Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [raceProgress, setRaceProgress] = useState<Record<string, number>>({
    'h-1': 0,
    'h-2': 0,
    'h-3': 0,
    'h-4': 0,
  });
  const [raceCommentary, setRaceCommentary] = useState('Highland thoroughbreds taking their positions at Jan Meda gate...');
  const [winnerHorse, setWinnerHorse] = useState<RaceRunner | null>(null);

  // Event RSVPs state
  const upcomingEvents = [
    {
      id: 'evt-1',
      title: 'Addis Ababa Gold Cup Gala & Royal Pavilion',
      date: 'Saturday, Nov 15, 2026',
      time: '13:00 - 18:30 EAT',
      location: 'Jan Meda Racecourse, Royal Pavilion',
      badge: 'Premier Classic',
      description: 'Exclusive trackside champagne reception, royal enclosure dining, and sovereign trophy presentation.',
    },
    {
      id: 'evt-2',
      title: 'Imperial Bloodstock & Yearling Auction',
      date: 'Sunday, Nov 23, 2026',
      time: '10:00 - 15:00 EAT',
      location: 'Entoto Equestrian Stud Farm',
      badge: 'Breeding & Syndicate',
      description: 'Private veterinary inspection of highland thoroughbred foals and syndicate share allocations for 2027.',
    },
    {
      id: 'evt-3',
      title: 'Twilight Stakes & Ethio-Jazz Gala',
      date: 'Friday, Dec 05, 2026',
      time: '17:00 - 22:00 EAT',
      location: 'Addis Turf Club Lawn',
      badge: 'Cultural Evening',
      description: 'Sunset sprint championship followed by live Ethio-Jazz performances and traditional banquet feast.',
    }
  ];

  // Selected RSVP for Pass Viewing
  const [selectedPass, setSelectedPass] = useState<any | null>(null);

  // Marketplace Inquiry Modal
  const [inquiryHorse, setInquiryHorse] = useState<string>(targetInquirySubject || '');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    if (targetInquirySubject) {
      setInquiryHorse(targetInquirySubject);
      setActiveTab('marketplace');
    }
  }, [targetInquirySubject]);

  // Compute potential payout
  const potentialPayout = Math.round(stake * selectedHorse.odds);

  // Handle Bet placement
  const handlePlaceBet = () => {
    if (!user) return;
    if (user.balance < stake) {
      onOpenDeposit();
      return;
    }

    const result = placeBet({
      raceId: selectedRace.id,
      raceName: selectedRace.name,
      horseId: selectedHorse.id,
      horseName: selectedHorse.name,
      stake,
      odds: selectedHorse.odds,
      potentialPayout,
    });

    if (result.success) {
      setBetSuccessBanner(`Wager confirmed: ${stake} ETB placed on ${selectedHorse.name} @ ${selectedHorse.odds}x odds!`);
      setTimeout(() => setBetSuccessBanner(null), 4500);
    }
  };

  // Run Race Simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setWinnerHorse(null);
    setRaceProgress({ 'h-1': 0, 'h-2': 0, 'h-3': 0, 'h-4': 0 });
    setRaceCommentary('The starter raises the imperial red flag... AND THEY ARE OFF!');

    const commentarySteps = [
      'Clean break! Gold Mane and Selam Empress vie for the rail position early on!',
      'Passing the 800m marker at 2,400m altitude! Habesha Star accelerates on the outside!',
      'Rounding the final bend into the Jan Meda homestretch! The royal grandstand is on its feet!',
      'Down to the wire! The whips are flashing! Incredible high-altitude finishing power!',
    ];

    let step = 0;
    const interval = setInterval(() => {
      setRaceProgress((prev) => {
        const next: Record<string, number> = {};
        selectedRace.runners.forEach((r) => {
          const boost = (8 - r.odds) * 1.5 + Math.random() * 12;
          next[r.id] = Math.min(100, (prev[r.id] || 0) + boost);
        });
        return next;
      });

      if (step < commentarySteps.length) {
        setRaceCommentary(commentarySteps[step]);
        step++;
      }
    }, 600);

    // Conclude race after 5.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setRaceProgress({ 'h-1': 100, 'h-2': 98, 'h-3': 95, 'h-4': 92 });

      const winner = selectedRace.runners[0];
      setWinnerHorse(winner);
      setIsSimulating(false);
      setRaceCommentary(`UNBELIEVABLE FINISH! ${winner.name} captures the Jan Meda Gold Cup!`);

      // Check if user won
      const matchingBet = bets.find(
        (b: Bet) => b.raceId === selectedRace.id && b.horseId === winner.id && b.status === 'pending'
      );
      if (matchingBet) {
        updateWallet(matchingBet.potentialPayout, 'deposit');
        setBetSuccessBanner(`ROYAL PURSE PAYOUT! You won ${matchingBet.potentialPayout.toLocaleString()} ETB on ${winner.name}! Credited to wallet.`);
      }
    }, 5500);
  };

  // Handle RSVP
  const handleRSVP = (event: (typeof upcomingEvents)[0]) => {
    rsvpEvent({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      location: event.location,
      tier: 'Royal Paddock VIP Pass',
      guests: 2,
    });
  };

  // Handle Marketplace Inquiry
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryHorse) return;

    submitInquiry({
      horseId: `h_${Date.now()}`,
      horseName: inquiryHorse,
      category: 'Syndicate Share / Stud Rights',
      message: inquiryNotes || 'Interested in 2026/27 syndicate prospectus and bloodline certificates.',
    });
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryNotes('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Member Header Banner with Official Logo */}
        <div className="mb-8 p-6 sm:p-8 bg-gradient-to-r from-[#140f08] via-[#1a140b] to-[#0c0a06] border border-[#dfba63]/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-full bg-[#dfba63]/8 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-5">
            {/* Official Logo Emblem Avatar */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#dfba63]/60 bg-black p-1 shadow-[0_0_25px_rgba(223,186,99,0.3)] shrink-0 overflow-hidden">
              <img src={ETHR_LOGO} alt="ETHR Logo" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">{user?.name}</h1>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#1e9a4b] bg-[#1e9a4b]/15 px-2.5 py-0.5 rounded-full border border-[#1e9a4b]/30">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Registry Tier: <span className="text-[#dfba63] uppercase font-semibold">{user?.role}</span> • Member ID: <span className="font-mono text-neutral-400">{user?.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-5 py-3 bg-[#070503] border border-[#dfba63]/40 rounded-2xl text-right shadow-inner">
              <div className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">Racing Vault</div>
              <div className="text-2xl font-cinzel font-bold text-gold-bright font-mono">
                {user?.balance.toLocaleString()} <span className="text-xs font-sans text-[#dfba63]">ETB</span>
              </div>
            </div>
            <button
              onClick={onOpenDeposit}
              className="gold-button px-5 py-3 uppercase tracking-wider text-xs rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Top Up</span>
            </button>
          </div>
        </div>

        {/* Global Success / Won Banner */}
        {betSuccessBanner && (
          <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl text-emerald-200 text-sm flex items-center gap-3 shadow-[0_0_25px_rgba(30,154,75,0.3)] animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="flex-1 font-medium">{betSuccessBanner}</div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2.5 border-b border-[#2b2214] pb-3 mb-8 no-scrollbar">
          {[
            { id: 'betting', label: 'Live Racecard & Bets', icon: Trophy, count: null },
            { id: 'events', label: 'VIP Derby Passes', icon: Calendar, count: eventRSVPs.length || null },
            { id: 'marketplace', label: 'Thoroughbred Vault', icon: Tag, count: null },
            { id: 'history', label: 'My Bets & Payouts', icon: Clock, count: bets.length || null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'gold-button shadow-md'
                    : 'bg-[#0a0805] border border-[#2b2214] text-neutral-400 hover:text-white hover:border-[#dfba63]/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? 'bg-black text-[#dfba63]' : 'bg-[#1a150e] text-neutral-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE RACECARD & BET SLIP */}
        {activeTab === 'betting' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Race & Runner Cards */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Race Selector Pill Bar */}
              <div className="flex gap-3">
                {races.map((race) => (
                  <button
                    key={race.id}
                    onClick={() => {
                      setSelectedRace(race);
                      setSelectedHorse(race.runners[0]);
                    }}
                    className={`flex-1 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedRace.id === race.id
                        ? 'border-[#dfba63] bg-[#161109] shadow-[0_0_20px_rgba(223,186,99,0.2)]'
                        : 'border-[#2b2214] bg-[#090705] text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs uppercase tracking-widest text-[#dfba63] font-bold">
                        {race.time}
                      </span>
                      <span className="text-[9px] bg-red-950/90 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                        Live Entry
                      </span>
                    </div>
                    <div className="font-cinzel text-base sm:text-lg font-bold text-white truncate">{race.name}</div>
                    <div className="text-[11px] text-neutral-400 mt-1">{race.distance} • Purse: <span className="text-[#fcd116] font-semibold">{race.purse}</span></div>
                  </button>
                ))}
              </div>

              {/* LIVE RACE SIMULATION ARENA */}
              <div className="p-6 sm:p-7 bg-[#0a0805] border border-[#dfba63]/40 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Flag className="w-5 h-5 text-[#dfba63]" />
                    <span className="text-xs uppercase tracking-widest font-bold text-white font-cinzel">
                      Jan Meda Dirt Track Simulator
                    </span>
                  </div>
                  
                  <button
                    onClick={handleStartSimulation}
                    disabled={isSimulating}
                    className="gold-button px-5 py-2.5 uppercase tracking-wider text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isSimulating ? 'Race In Progress...' : 'Start 2D Race Simulation'}</span>
                  </button>
                </div>

                {/* Commentary Ribbon */}
                <div className="p-3 bg-black/90 border border-[#2b2214] rounded-2xl mb-5 text-xs font-mono text-[#fcd116] flex items-center gap-2.5 shadow-inner">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="truncate">{raceCommentary}</span>
                </div>

                {/* Simulated 2D Race Track */}
                <div className="space-y-3.5 bg-[#120e08] border border-[#2b2214] p-5 rounded-2xl">
                  {selectedRace.runners.map((runner, index) => {
                    const progress = raceProgress[runner.id] || 0;
                    return (
                      <div key={runner.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs text-neutral-300">
                          <span className="font-semibold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-black border border-[#dfba63]/50 text-center text-[10px] text-[#dfba63] font-mono leading-5 font-bold">
                              {index + 1}
                            </span>
                            {runner.name}
                          </span>
                          <span className="font-mono text-[#fcd116] font-bold">
                            {runner.odds}x • {Math.round(progress)}%
                          </span>
                        </div>
                        
                        {/* Dirt Track Lane */}
                        <div className="relative h-7 bg-black/80 rounded-xl border border-neutral-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#dfba63]/30 via-[#dfba63]/60 to-[#dfba63] rounded-xl transition-all duration-300 relative flex items-center justify-end pr-1.5 shadow-sm"
                            style={{ width: `${Math.max(6, progress)}%` }}
                          >
                            <span className="text-sm">🏇</span>
                          </div>
                          {/* Finish line post */}
                          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/50 border-r border-dashed border-red-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Winner Announcement Banner */}
                {winnerHorse && (
                  <div className="mt-5 p-5 bg-gradient-to-r from-[#17120a] to-[#1e9a4b]/20 border-2 border-[#dfba63] rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(223,186,99,0.3)]">
                    <div className="flex items-center gap-3.5">
                      <Trophy className="w-7 h-7 text-[#fcd116]" />
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#dfba63] font-bold">Jan Meda Champion</div>
                        <div className="text-lg font-cinzel text-white font-bold">{winnerHorse.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase text-neutral-400">Winning Return</div>
                      <div className="text-base font-bold text-[#1e9a4b] font-mono">Paid at {winnerHorse.odds}x</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Official Runners List */}
              <div className="space-y-3.5">
                <div className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-cinzel">
                  Official Runners & Field Declarations
                </div>

                {selectedRace.runners.map((runner) => (
                  <div
                    key={runner.id}
                    onClick={() => setSelectedHorse(runner)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      selectedHorse.id === runner.id
                        ? 'border-[#dfba63] bg-[#161109] shadow-[0_0_20px_rgba(223,186,99,0.18)]'
                        : 'border-[#2b2214] bg-[#090705] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-black border border-[#dfba63]/50 flex items-center justify-center text-sm font-cinzel font-bold text-[#dfba63]">
                        {runner.odds}x
                      </div>
                      <div>
                        <div className="font-cinzel text-base text-white font-bold flex items-center gap-2">
                          <span>{runner.name}</span>
                          {selectedHorse.id === runner.id && (
                            <span className="text-[9px] bg-[#dfba63] text-black font-sans font-bold px-2 py-0.5 rounded uppercase">
                              Active Slip
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-400 mt-1 font-light">
                          Jockey: <span className="text-neutral-200">{runner.jockey}</span> • Trainer: <span className="text-neutral-200">{runner.trainer}</span>
                        </div>
                        <div className="text-[11px] text-[#1e9a4b] font-mono mt-0.5">
                          Recent Form: {runner.form} • Weight: {runner.weight}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <span className="text-xs text-neutral-400 uppercase sm:text-right font-light">Decimal Odds</span>
                      <span className="text-2xl font-bold font-mono text-[#fcd116] sm:text-right">{runner.odds}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right 1 Col: Interactive Bet Slip */}
            <div className="space-y-6">
              <div className="gold-card p-6 rounded-3xl sticky top-28 border-[#dfba63]/50 shadow-2xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-[#2b2214] mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#dfba63]" />
                    <span className="text-xs uppercase tracking-widest font-bold text-white font-cinzel">
                      Official Bet Slip
                    </span>
                  </div>
                  <span className="text-[9px] bg-[#1e9a4b]/20 text-[#1e9a4b] border border-[#1e9a4b]/40 px-2.5 py-0.5 rounded-full font-bold uppercase">
                    Paddock Live
                  </span>
                </div>

                {/* Selected Horse Details */}
                <div className="p-4 bg-black/80 border border-[#2b2214] rounded-2xl mb-4">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">Selected Runner</div>
                  <div className="font-cinzel text-lg font-bold text-white truncate">{selectedHorse.name}</div>
                  <div className="flex justify-between items-center text-xs mt-1.5">
                    <span className="text-neutral-400">{selectedRace.name}</span>
                    <span className="font-mono text-[#fcd116] font-bold">@ {selectedHorse.odds}x</span>
                  </div>
                </div>

                {/* Stake Selection */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Stake (ETB)
                    </label>
                    <span className="text-xs text-neutral-400">
                      Balance: <strong className="text-white font-mono">{user?.balance.toLocaleString()} ETB</strong>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-2.5">
                    {[50, 100, 200, 500].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setStake(amt)}
                        className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                          stake === amt
                            ? 'border-[#dfba63] bg-[#dfba63]/20 text-white'
                            : 'border-[#2b2214] bg-[#070605] text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value))}
                    className="w-full bg-black/80 border border-[#2b2214] focus:border-[#dfba63] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Payout calculation */}
                <div className="p-4 bg-[#140f09] border border-[#dfba63]/30 rounded-2xl mb-6 space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Total Stake</span>
                    <span className="font-mono text-white font-bold">{stake} ETB</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Odds Multiplier</span>
                    <span className="font-mono text-white font-bold">x{selectedHorse.odds}</span>
                  </div>
                  <div className="pt-2.5 border-t border-[#2b2214] flex justify-between items-center">
                    <span className="text-xs uppercase font-bold text-[#dfba63]">Estimated Payout</span>
                    <span className="text-xl font-bold font-mono text-[#fcd116]">
                      {potentialPayout.toLocaleString()} ETB
                    </span>
                  </div>
                </div>

                {/* Submit Bet */}
                <button
                  type="button"
                  onClick={handlePlaceBet}
                  className="gold-button w-full py-4 uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Place Wager • {stake} ETB</span>
                </button>

                <p className="text-[10px] text-neutral-500 text-center mt-3 font-light">
                  Winnings automatically credited upon official steward confirmation.
                </p>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DERBY PASSES & RSVPS */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">Jan Meda Derby & Gala Passes</h2>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                RSVP for official championship race days, syndicate banquets, and pedigree inspections. Passes include electronic QR credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((evt) => {
                const hasRSVP = eventRSVPs.some((r: any) => r.eventId === evt.id);
                return (
                  <div 
                    key={evt.id}
                    className="gold-card p-7 rounded-3xl flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3.5">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#dfba63] bg-[#dfba63]/10 border border-[#dfba63]/30 px-3 py-1 rounded-full">
                          {evt.badge}
                        </span>
                        {hasRSVP && (
                          <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Confirmed
                          </span>
                        )}
                      </div>

                      <h3 className="font-cinzel text-xl text-white font-bold mb-2">{evt.title}</h3>
                      <p className="text-xs text-neutral-400 mb-5 font-light leading-relaxed">{evt.description}</p>
                      
                      <div className="space-y-2.5 py-4 border-y border-[#2b2214] text-xs text-neutral-300">
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#dfba63]" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#1e9a4b]" />
                          <span>{evt.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-2">
                      {hasRSVP ? (
                        <button
                          type="button"
                          onClick={() => {
                            const r = eventRSVPs.find((r: any) => r.eventId === evt.id);
                            setSelectedPass(r);
                          }}
                          className="w-full py-3 bg-[#141009] border border-[#dfba63]/60 text-[#dfba63] rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1f180d]"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>View Official Pass</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRSVP(evt)}
                          className="gold-button w-full py-3 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Reserve Member Pass</span>
                          <ChevronRight className="w-4 h-4 text-black" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* QR Pass Modal with Official Seal */}
            {selectedPass && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
                <div className="bg-[#0b0907] border-2 border-[#dfba63] rounded-3xl p-7 max-w-sm w-full text-center text-white relative shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(223,186,99,0.3)]">
                  <div className="h-[3px] w-full bg-gradient-to-r from-[#1e9a4b] via-[#fcd116] to-[#da121a] absolute top-0 left-0 right-0 rounded-t-3xl" />
                  
                  {/* Official Logo Watermark */}
                  <div className="w-16 h-16 rounded-2xl border border-[#dfba63]/50 bg-black p-1 mx-auto mt-2 mb-3 shadow-md overflow-hidden">
                    <img src={ETHR_LOGO} alt="ETHR Emblem" className="w-full h-full object-cover rounded-xl" />
                  </div>

                  <h3 className="font-cinzel text-lg text-white font-bold mb-1">{selectedPass.eventTitle}</h3>
                  <div className="text-[10px] text-[#dfba63] uppercase tracking-widest font-mono font-bold mb-4">{selectedPass.tier}</div>

                  <div className="w-44 h-44 bg-white p-3.5 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <QrCode className="w-full h-full text-black stroke-[1.5]" />
                  </div>

                  <div className="text-[10px] font-mono text-neutral-400 mb-1 uppercase tracking-widest">Digital Badge Code</div>
                  <div className="text-base font-mono font-bold text-[#fcd116] tracking-widest mb-6">
                    {selectedPass.ticketCode}
                  </div>

                  <button
                    onClick={() => setSelectedPass(null)}
                    className="gold-button w-full py-3 text-black font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer"
                  >
                    Close Pass
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HORSE MARKETPLACE & INQUIRY */}
        {activeTab === 'marketplace' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">Thoroughbred Bloodline & Syndicate Vault</h2>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Explore available stallion stud services, fractional syndicate ownership shares, and broodmare pedigrees certified by ETHR.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Horse Listings */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  {
                    name: 'Gold Mane (የወርቅ ጋማ)',
                    type: 'Stud Service & Breeding Rights',
                    fee: '35,000 ETB / Cover',
                    damSire: 'King Menelik Lineage x Simien Queen',
                    studBook: 'ETHR-TB-19881',
                  },
                  {
                    name: 'Selam Empress (ሰላም)',
                    type: 'Fractional Broodmare Syndicate (10% Shares)',
                    fee: '50,000 ETB / Share',
                    damSire: 'Entoto Breeze x Blue Nile Mare',
                    studBook: 'ETHR-TB-20104',
                  },
                  {
                    name: 'Habesha Star (ኮከብ)',
                    type: 'Racing Syndicate (15% Equity)',
                    fee: '125,000 ETB / Share',
                    damSire: 'Bale Mountain Thunder x Red Sea Pride',
                    studBook: 'ETHR-TB-19942',
                  },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="gold-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#dfba63] font-bold">{item.type}</div>
                      <h3 className="font-cinzel text-lg text-white font-bold mt-0.5">{item.name}</h3>
                      <div className="text-xs text-neutral-400 mt-1 font-light">Lineage: {item.damSire}</div>
                      <div className="text-[11px] font-mono text-neutral-500 mt-0.5">Registry #{item.studBook}</div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <div className="text-lg font-bold text-[#fcd116] font-mono">{item.fee}</div>
                      <button
                        onClick={() => setInquiryHorse(item.name)}
                        className="px-4 py-2 bg-[#dfba63]/15 hover:bg-[#dfba63]/30 border border-[#dfba63]/50 text-[#dfba63] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquiry Form */}
              <div className="gold-card p-7 rounded-3xl">
                <h3 className="font-cinzel text-xl text-white font-bold mb-2">Request Official Dossier</h3>
                <p className="text-xs text-neutral-400 mb-5 font-light">
                  Direct inquiry to the Ethiopian Thoroughbred Registrar and Syndicate Manager.
                </p>

                {inquirySubmitted ? (
                  <div className="p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Inquiry submitted! Our syndicate registrar will contact you shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase text-neutral-400 mb-1 font-medium">Target Horse / Syndicate</label>
                      <input
                        type="text"
                        value={inquiryHorse}
                        onChange={(e) => setInquiryHorse(e.target.value)}
                        placeholder="e.g. Gold Mane"
                        className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl px-3.5 py-2.5 text-xs text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-neutral-400 mb-1 font-medium">Notes / Questions</label>
                      <textarea
                        rows={3}
                        value={inquiryNotes}
                        onChange={(e) => setInquiryNotes(e.target.value)}
                        placeholder="Inquire about veterinary health records, breeding history, or payment options..."
                        className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl p-3.5 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="gold-button w-full py-3.5 uppercase tracking-wider text-xs rounded-xl cursor-pointer"
                    >
                      Submit Official Inquiry
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: MY BETS & ACTIVITY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">Wager History & Payout Log</h2>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                All bets placed under your Ethiopian Horse Racing registered member identity.
              </p>
            </div>

            {bets.length === 0 ? (
              <div className="p-14 text-center gold-card rounded-3xl">
                <Trophy className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-cinzel text-xl text-white font-bold">No Bets Placed Yet</h3>
                <p className="text-xs text-neutral-400 mt-1 mb-5 font-light">
                  Explore the live racecard to place your first highland thoroughbred wager.
                </p>
                <button
                  onClick={() => setActiveTab('betting')}
                  className="gold-button px-6 py-3 text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Open Racecard
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {bets.map((bet: Bet) => (
                  <div 
                    key={bet.id}
                    className="gold-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                          bet.status === 'won'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : bet.status === 'lost'
                              ? 'bg-red-950 text-red-300 border border-red-500/40'
                              : 'bg-[#dfba63]/20 text-[#dfba63] border border-[#dfba63]/40'
                        }`}>
                          {bet.status}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">
                          {bet.placedAt}
                        </span>
                      </div>
                      <div className="font-cinzel text-base text-white font-bold">{bet.horseName}</div>
                      <div className="text-xs text-neutral-400 font-light">{bet.raceName}</div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <div className="text-xs text-neutral-400 font-light">Stake: {bet.stake} ETB @ {bet.odds}x</div>
                      <div className="text-base font-bold font-mono text-[#fcd116]">
                        {bet.status === 'won' ? `+${bet.potentialPayout.toLocaleString()} ETB Won` : `Potential: ${bet.potentialPayout.toLocaleString()} ETB`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
