import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ETHR_LOGO } from '../assets/ethr-assets';
import { 
  Trophy, 
  Crown, 
  Zap, 
  Flame, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Shield,
  Medal,
  Activity
} from 'lucide-react';

interface PublicSectionsProps {
  onOpenBetting: () => void;
  onOpenOwnershipInquiry: (horseOrTierName: string) => void;
}

export const PublicSections: React.FC<PublicSectionsProps> = ({ 
  onOpenBetting,
  onOpenOwnershipInquiry
}) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const champions = [
    {
      name: 'Gold Mane (የወርቅ ጋማ)',
      sire: 'Emperor Menelik Royal Lineage',
      record: '14 Starts • 11 Wins • 3 Places',
      specialty: 'High-Altitude 1,600m Dirt Classic Champion',
      odds: '2.4',
      badge: 'Triple Crown Sovereign',
      color: 'Dark Bay Highland Stallion',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Selam Empress (ሰላም)',
      sire: 'Entoto Breeze x Blue Nile Mare',
      record: '10 Starts • 8 Wins • 2 Places',
      specialty: '1,200m Highland Turf Sprint Record Holder',
      odds: '3.8',
      badge: 'Fillies Sovereign Cup Winner',
      color: 'Chestnut Thoroughbred Mare',
      image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Habesha Star (ኮከብ)',
      sire: 'Bale Mountain Thunder x Red Sea Pride',
      record: '16 Starts • 10 Wins • 4 Places',
      specialty: '2,000m Jan Meda Endurance Gold Standard',
      odds: '5.2',
      badge: 'Jan Meda Gold Medalist',
      color: 'Midnight Black Stallion',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Rift Victor (ድል)',
      sire: 'Great Rift Galloper x Abyssinian Speed',
      record: '8 Starts • 6 Wins • 2 Places',
      specialty: '1,400m Mile Speedster with Explosive Turn of Foot',
      odds: '7.0',
      badge: 'Rising Phenom Stakes Winner',
      color: 'Silver Grey Arabian-Cross',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const tiers = [
    {
      name: 'Silver Paddock Syndicate',
      share: '5% Fractional Equity',
      price: '45,000 ETB',
      features: [
        'Quarterly purse dividend distributions to wallet',
        'VIP access to morning gallops at Jan Meda',
        'Paddock guest credentials for 2 on major race days',
        'Official encrypted digital ownership deed certificate',
      ],
      recommended: false,
    },
    {
      name: 'Gold Crown Syndicate',
      share: '15% Fractional Equity',
      price: '125,000 ETB',
      features: [
        'Direct trainer & jockey consultation & tactics access',
        '15% purse winnings + breeding royalty stud rights',
        'Royal Paddock enclosure credentials (4 VIP passes)',
        'Naming privilege for next generation thoroughbred foals',
        'Custom racing silks in imperial Ethiopian tricolor',
      ],
      recommended: true,
    },
    {
      name: 'Sole Sovereign Owner',
      share: '100% Solitary Title',
      price: '650,000 ETB',
      features: [
        'Exclusive champion horse ownership & international entry',
        'Full international race entry rights & trophy honors',
        '100% of all race purses & international stud cover fees',
        'Private stables & personal Master of Equine conditioning',
        'Head of Table honor at Annual Imperial Gold Cup Gala',
      ],
      recommended: false,
    },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-[#040404] text-white">
      
      {/* 1. Ticker Marquee with Ethiopian Flag Accents */}
      <div className="py-3 bg-[#0a0805] border-y border-[#2b2214] overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center gap-12 animate-[marqueeSlide_35s_linear_infinite] text-xs uppercase tracking-[0.25em] text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1e9a4b] animate-ping" />
            <strong className="text-white font-bold">NEXT DERBY:</strong> ADDIS ABABA GOLD CUP • JAN MEDA TURF • 15:30 EAT
          </span>
          <span className="text-[#dfba63]">✦</span>
          <span className="flex items-center gap-2">
            <strong className="text-[#fcd116] font-bold">PURSE POOL:</strong> 1,200,000 ETB GUARANTEED
          </span>
          <span className="text-[#dfba63]">✦</span>
          <span className="flex items-center gap-2">
            <strong className="text-white font-bold">ROYAL REGISTRY:</strong> CERTIFIED BY ETHIOPIAN HORSE RACING (ETHR)
          </span>
          <span className="text-[#dfba63]">✦</span>
          <span className="flex items-center gap-2">
            <strong className="text-[#1e9a4b] font-bold">DIGITAL WAGERING:</strong> LIVE PARI-MUTUEL POOLS OPEN FOR TELEBIRR & CBE
          </span>
          <span className="text-[#dfba63]">✦</span>
          <span className="flex items-center gap-2">
            <strong className="text-[#dfba63] font-bold">ALTITUDE SUPERIORITY:</strong> 2,400M HIGHLAND CARDIOVASCULAR CONDITIONING
          </span>
        </div>
      </div>

      {/* 2. Three Pillars of ETHR */}
      <section id="heritage" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfba63]/10 border border-[#dfba63]/30 mb-3">
            <Crown className="w-3.5 h-3.5 text-[#dfba63]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#dfba63]">
              The Core Foundation
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white mt-1 mb-4">
            A Legacy Carved in Gallop
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Ethiopia&apos;s equestrian heritage unites century-old imperial horsemanship with the biological superiority of high-altitude highland thoroughbred breeding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="gold-card p-8 rounded-3xl relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#1e9a4b]/15 border border-[#1e9a4b]/40 flex items-center justify-center mb-6 text-[#1e9a4b] group-hover:scale-110 transition-transform">
              <Crown className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-white mb-3">1. Heritage & Royalty</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Rooted in the royal equestrian parades of Emperor Menelik II at the historic Jan Meda racecourse in 1887. ETHR preserves national pride, noble lineages, and ceremonial equine mastery.
            </p>
            <div className="mt-8 pt-4 border-t border-[#2b2214] flex items-center justify-between text-xs text-[#dfba63] font-bold uppercase tracking-wider">
              <span>Imperial Sovereign Era</span>
              <span className="font-mono">1887</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="gold-card p-8 rounded-3xl relative group border-[#dfba63]/50 shadow-[0_0_35px_rgba(223,186,99,0.15)]">
            <div className="w-14 h-14 rounded-2xl bg-[#dfba63]/15 border border-[#dfba63]/50 flex items-center justify-center mb-6 text-[#dfba63] group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-white mb-3">2. High-Altitude Speed</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Bred and trained at 2,400+ meters in the Ethiopian highlands. Natural thin-air conditioning creates unprecedented red blood cell counts, boundless stamina, and blinding homestretch acceleration.
            </p>
            <div className="mt-8 pt-4 border-t border-[#2b2214] flex items-center justify-between text-xs text-[#dfba63] font-bold uppercase tracking-wider">
              <span>Cardiovascular Edge</span>
              <span className="font-mono">2,400m+</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="gold-card p-8 rounded-3xl relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#da121a]/15 border border-[#da121a]/40 flex items-center justify-center mb-6 text-[#da121a] group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-white mb-3">3. The Future: ETHR</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Next-generation digital racecards, real-time odds wagering, encrypted fractional syndicate equity, and global bloodline passports propelling Ethiopian thoroughbreds to international supremacy.
            </p>
            <div className="mt-8 pt-4 border-t border-[#2b2214] flex items-center justify-between text-xs text-[#dfba63] font-bold uppercase tracking-wider">
              <span>Digital Racing Era</span>
              <span className="font-mono">2026+</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Champions Gallery */}
      <section id="horses" className="py-28 bg-[#070604] border-y border-[#2b2214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfba63]/10 border border-[#dfba63]/30 mb-3">
                <Medal className="w-3.5 h-3.5 text-[#dfba63]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#dfba63]">
                  Highland Thoroughbreds
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white mt-1">
                Champions of the Track
              </h2>
            </div>
            <button
              onClick={onOpenBetting}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#dfba63] hover:text-[#f7e6b5] border-b border-[#dfba63] pb-1 cursor-pointer transition-colors"
            >
              <span>View Live Racecards & Place Wager</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {champions.map((horse, idx) => (
              <div 
                key={idx}
                className="gold-card rounded-3xl overflow-hidden group transition-all duration-300 flex flex-col"
              >
                {/* Horse Image */}
                <div className="relative h-60 overflow-hidden bg-neutral-900">
                  <img 
                    src={horse.image} 
                    alt={horse.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-black/85 backdrop-blur-md border border-[#dfba63]/50 px-3 py-1 rounded-lg text-[9px] uppercase tracking-wider text-[#dfba63] font-bold shadow-md">
                    {horse.badge}
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-end">
                    <div>
                      <div className="text-[11px] text-neutral-300 font-mono font-medium">{horse.record}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-wider text-neutral-400">Current Odds</div>
                      <div className="text-lg font-bold text-[#fcd116] font-mono leading-none">{horse.odds}x</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl text-white font-bold group-hover:text-[#dfba63] transition-colors mb-1">
                      {horse.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-2 font-light">{horse.sire}</p>
                    <p className="text-xs text-neutral-300 font-light italic mb-4 leading-relaxed">{horse.specialty}</p>
                  </div>

                  <div className="pt-4 border-t border-[#2b2214] flex gap-2">
                    <button
                      onClick={() => onOpenOwnershipInquiry(horse.name)}
                      className="flex-1 py-2.5 px-2 bg-[#120f0a] hover:bg-[#1c1810] border border-[#2b2214] hover:border-neutral-500 rounded-xl text-[10px] text-neutral-200 uppercase tracking-wider font-bold text-center cursor-pointer transition-colors"
                    >
                      Inquire Stud
                    </button>
                    <button
                      onClick={onOpenBetting}
                      className="flex-1 py-2.5 px-2 gold-button rounded-xl text-[10px] uppercase tracking-wider font-bold text-center cursor-pointer"
                    >
                      Bet @ {horse.odds}x
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ownership & Syndicates */}
      <section id="ownership" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfba63]/10 border border-[#dfba63]/30 mb-3">
            <Crown className="w-3.5 h-3.5 text-[#dfba63]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#dfba63]">
              Royal Equestrian Equity
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white mt-1 mb-4">
            Own a Share of Ethiopian Racing History
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Acquire fractional syndicate shares or exclusive solitary title in certified highland thoroughbreds. Share the pride, dividend purses, and prestige of the winners&apos; enclosure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                tier.recommended
                  ? 'bg-gradient-to-b from-[#18130a] via-[#100d07] to-[#0a0805] border-2 border-[#dfba63] shadow-[0_0_40px_rgba(223,186,99,0.25)]'
                  : 'gold-card'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gold-button text-black px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] shadow-lg">
                  Most Prestigious Syndicate
                </div>
              )}

              <div>
                <h3 className="text-2xl font-cinzel font-bold text-white mb-1">{tier.name}</h3>
                <div className="text-xs text-[#dfba63] uppercase tracking-wider font-mono font-bold mb-4">{tier.share}</div>
                
                <div className="mb-6 pb-6 border-b border-[#2b2214]">
                  <span className="text-3xl sm:text-4xl font-cinzel font-bold text-white">{tier.price}</span>
                  <span className="text-xs text-neutral-400 ml-2 font-mono">/ Season Equity</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light">
                      <CheckCircle className="w-4 h-4 text-[#1e9a4b] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  if (isAuthenticated) {
                    onOpenOwnershipInquiry(tier.name);
                  } else {
                    openAuthModal('up');
                  }
                }}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tier.recommended
                    ? 'gold-button shadow-lg'
                    : 'bg-[#141009] hover:bg-[#1d170d] border border-[#dfba63]/40 text-white'
                }`}
              >
                <span>Request Syndicate Prospectus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Heritage Story Showcase with Official Logo */}
      <section className="py-24 bg-gradient-to-b from-[#040404] via-[#0e0a05] to-[#040404] border-t border-[#2b2214]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Box with Official Crest Accent */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#dfba63]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
              <img 
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80" 
                alt="Ethiopian Horse Racing Heritage"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Corner Official Logo Watermark */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-2xl border border-[#dfba63]/50 bg-black/85 p-1 backdrop-blur-md shadow-lg overflow-hidden">
                <img src={ETHR_LOGO} alt="ETHR Emblem" className="w-full h-full object-cover rounded-xl" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/85 backdrop-blur-md rounded-2xl border border-[#dfba63]/30">
                <div className="text-xs uppercase tracking-widest text-[#dfba63] font-bold mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1e9a4b]" />
                  Jan Meda Historic Racecourse • Addis Ababa
                </div>
                <div className="text-xs text-neutral-300 font-light leading-relaxed">
                  The imperial track where legendary Ethiopian thoroughbreds have galloped under sovereign patronage since 1887.
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfba63]/10 border border-[#dfba63]/30">
                <Crown className="w-3.5 h-3.5 text-[#dfba63]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#dfba63]">
                  A Living Tradition
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white leading-snug">
                Where Ancient Highland Horsemanship Meets the Future of Sport
              </h2>
              
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                For over a century, Ethiopian horsemen have showcased fearless mastery, courage, and pride during the celebrated Timkat, Meskel, and national celebrations. Today, ETHR channels this enduring heritage into a premier international sporting organization.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#0a0805] border border-[#2b2214] rounded-2xl">
                  <div className="font-cinzel text-2xl text-[#dfba63] font-bold">2,400m</div>
                  <div className="text-xs text-neutral-400 mt-1 font-light">Highland conditioning gives horses exceptional lung volume and endurance</div>
                </div>
                <div className="p-4 bg-[#0a0805] border border-[#2b2214] rounded-2xl">
                  <div className="font-cinzel text-2xl text-[#1e9a4b] font-bold">100% Pure</div>
                  <div className="text-xs text-neutral-400 mt-1 font-light">World equine welfare standards and verified imperial pedigree records</div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => openAuthModal('up')}
                  className="gold-button px-7 py-3.5 text-xs uppercase tracking-[0.2em] rounded-xl cursor-pointer shadow-lg"
                >
                  Join as Registered Member
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Newsletter / Paddock Bulletin */}
      <section className="py-20 bg-[#080705] border-t border-[#2b2214]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="w-6 h-6 text-[#dfba63] mx-auto mb-3" />
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mb-2">The Royal Paddock Dispatch</h3>
          <p className="text-xs text-neutral-400 mb-8 font-light">
            Receive morning gallop logs, racecard declarations, and exclusive syndicate prospectus releases.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs inline-flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>You are subscribed to the Royal Paddock Dispatch. Welcome to the inner circle!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#040404] border border-[#2b2214] focus:border-[#dfba63] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="gold-button px-7 py-3 uppercase tracking-widest text-xs rounded-xl cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="pt-20 pb-14 bg-[#030303] border-t border-[#2b2214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Col 1: Official Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl border border-[#dfba63]/50 p-1 bg-black overflow-hidden shadow-lg">
                  <img src={ETHR_LOGO} alt="ETHR Logo" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="font-cinzel text-xl font-bold text-white tracking-widest">ETHR</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-[#dfba63] font-bold">Ethiopian Horse Racing</div>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Speed, Heritage, and Future. The supreme regulatory and racing authority for Ethiopian thoroughbreds.
              </p>
              <div className="h-[2px] w-28 bg-gradient-to-r from-[#1e9a4b] via-[#fcd116] to-[#da121a] rounded" />
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#dfba63] mb-4 font-cinzel">
                Racing & Paddock
              </h4>
              <ul className="space-y-3 text-xs text-neutral-400 font-light">
                <li><a href="#heritage" className="hover:text-white transition-colors">Imperial Heritage (1887)</a></li>
                <li><a href="#horses" className="hover:text-white transition-colors">Champions of the Track</a></li>
                <li><a href="#ownership" className="hover:text-white transition-colors">Ownership Syndicates</a></li>
                <li><button onClick={onOpenBetting} className="hover:text-white transition-colors text-left cursor-pointer">Live Racecards & Odds</button></li>
              </ul>
            </div>

            {/* Col 3: Legal & Governance */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#dfba63] mb-4 font-cinzel">
                Governance & Club
              </h4>
              <ul className="space-y-3 text-xs text-neutral-400 font-light">
                <li><span>Jan Meda Turf Authority</span></li>
                <li><span>Highland Stud Book Registry</span></li>
                <li><span>Responsible Wagering Code</span></li>
                <li><span>Addis Ababa Turf Stewards</span></li>
              </ul>
            </div>

            {/* Col 4: Clubhouse Contact */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#dfba63] mb-4 font-cinzel">
                Clubhouse
              </h4>
              <ul className="space-y-3 text-xs text-neutral-400 font-light">
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#dfba63] shrink-0" />
                  <span>Jan Meda Racecourse, Addis Ababa</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#dfba63] shrink-0" />
                  <span>+251 11 551 8870</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#dfba63] shrink-0" />
                  <span>royal.paddock@ethr.et</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-[#2b2214] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4 font-light">
            <div>
              © 1887–{new Date().getFullYear()} Ethiopian Horse Racing Club (ETHR). Speed · Heritage · Future.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Licensed by Ethiopian Gaming & Equestrian Board</span>
              <span>•</span>
              <span>18+ Play Responsibly</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
