import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ETHR_LOGO } from '../assets/ethr-assets';
import { Trophy, ChevronRight, Sparkles, Award, ShieldCheck, Flame } from 'lucide-react';

interface HeroProps {
  onExploreRaces: () => void;
  onExploreOwnership: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRaces, onExploreOwnership }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-performance gold dust ambient particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
    }> = [];

    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 85);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.08,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.15);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 186, 99, ${currentOpacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#dfba63';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#040404]">
      {/* Interactive Gold Dust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-75"
      />

      {/* Atmospheric Ambient Lighting Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[#dfba63]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[380px] h-[380px] bg-[#1e9a4b]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[380px] h-[380px] bg-[#da121a]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Imperial Flag Micro-Ribbon Header */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#120f0a] border border-[#dfba63]/40 mb-8 shadow-[0_0_25px_rgba(223,186,99,0.2)] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex gap-1 items-center">
            <span className="w-2 h-2 rounded-full bg-[#1e9a4b]" />
            <span className="w-2 h-2 rounded-full bg-[#fcd116]" />
            <span className="w-2 h-2 rounded-full bg-[#da121a]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#dfba63] font-bold font-sans">
            Imperial Equestrian Authority of Ethiopia
          </span>
          <span className="text-[9px] text-neutral-400 font-mono hidden sm:inline">| Jan Meda 1887</span>
        </div>

        {/* PROMINENT OFFICIAL LOGO EMBLEM SHOWCASE */}
        <div className="relative mb-8 group cursor-pointer">
          {/* Circular Gold Halo behind logo */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#dfba63]/20 via-[#f7e6b5]/30 to-[#dfba63]/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative w-52 sm:w-64 md:w-72 aspect-square rounded-3xl border-2 border-[#dfba63]/60 p-2 bg-[#050505] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(223,186,99,0.35)] group-hover:border-[#dfba63] transition-all duration-500 overflow-hidden">
            <img 
              src={ETHR_LOGO} 
              alt="Ethiopian Horse Racing (ETHR) Official Emblem" 
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle luxury light sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Grand Headline with Official Motto */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white tracking-wider leading-[1.1] mb-6">
          SPEED <span className="text-[#dfba63] font-light">·</span> HERITAGE <span className="text-[#dfba63] font-light">·</span> FUTURE
        </h1>

        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-10">
          Where 138 years of highland equestrian pride meets world-class thoroughbred racing. 
          Experience royal Ethiopian bloodlines, high-altitude endurance wagering, and sovereign syndicate ownership.
        </p>

        {/* Luxury CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          {isAuthenticated ? (
            <button
              onClick={onExploreRaces}
              className="gold-button w-full sm:w-auto px-8 py-4 uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center gap-2.5 cursor-pointer shadow-xl"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>Enter Members Paddock & Bet Slip</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('up')}
              className="gold-button w-full sm:w-auto px-8 py-4 uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center gap-2.5 cursor-pointer shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Join Royal Paddock</span>
            </button>
          )}

          <button
            onClick={onExploreOwnership}
            className="w-full sm:w-auto px-8 py-4 bg-[#0d0b07] hover:bg-[#17130b] border border-[#dfba63]/50 hover:border-[#dfba63] text-neutral-200 hover:text-white font-semibold uppercase tracking-[0.2em] text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Explore Syndicates & Stud</span>
            <ChevronRight className="w-4 h-4 text-[#dfba63]" />
          </button>
        </div>

        {/* Imperial Heritage Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-10 border-t border-[#2b2214]">
          <div className="gold-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-bright">1887</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 font-semibold">Jan Meda Tradition</div>
          </div>
          
          <div className="gold-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-cinzel font-bold text-white">2,400m</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 font-semibold">Highland Altitude</div>
          </div>
          
          <div className="gold-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-cinzel font-bold text-[#1e9a4b]">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 font-semibold">Royal Bloodstock</div>
          </div>
          
          <div className="gold-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fcd116]">1.2M+</div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 font-semibold">Season Purse (ETB)</div>
          </div>
        </div>

      </div>
    </section>
  );
};
