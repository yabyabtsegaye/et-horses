import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ETHR_LOGO } from '../assets/ethr-assets';
import { X, Wallet, CheckCircle, Smartphone, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const { user, updateWallet } = useAuth();
  const [amount, setAmount] = useState<number>(500);
  const [method, setMethod] = useState<'telebirr' | 'cbe' | 'card'>('telebirr');
  const [phoneOrAcc, setPhoneOrAcc] = useState('0911234567');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 50) return;

    setIsProcessing(true);
    setTimeout(() => {
      updateWallet(amount, 'deposit');
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0a0806] border border-[#dfba63]/40 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.95)] p-7 z-10 text-white overflow-hidden">
        
        {/* Top Flag Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e9a4b] via-[#fcd116] to-[#da121a]" />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer p-1.5 rounded-xl hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl border border-[#dfba63]/50 bg-black p-1 shadow-md overflow-hidden">
            <img src={ETHR_LOGO} alt="ETHR Emblem" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white">Deposit Racing Birr</h3>
            <p className="text-xs text-neutral-400">Current Balance: <span className="text-[#fcd116] font-mono font-bold">{user?.balance.toLocaleString()} ETB</span></p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="font-cinzel text-xl text-white font-bold">Deposit Confirmed</h4>
            <p className="text-xs text-neutral-400 font-light">
              Credited <strong className="text-[#dfba63] font-mono font-bold">{amount.toLocaleString()} ETB</strong> to your racing vault.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeposit} className="space-y-4">
            
            {/* Quick Amount Selectors */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                Select Amount (ETB)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[100, 250, 500, 1000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                      amount === amt
                        ? 'border-[#dfba63] bg-[#dfba63]/20 text-white'
                        : 'border-[#2b2214] bg-[#070605] text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {amt} ETB
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="50"
                step="50"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
                placeholder="Custom Amount"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('telebirr')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    method === 'telebirr'
                      ? 'border-[#1e9a4b] bg-[#1e9a4b]/15 text-white'
                      : 'border-[#2b2214] bg-[#070605] text-neutral-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#1e9a4b] mb-1" />
                  <div className="text-xs font-bold text-white">Telebirr</div>
                  <div className="text-[9px] text-neutral-400">Mobile Money</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('cbe')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    method === 'cbe'
                      ? 'border-[#ba68c8] bg-[#ba68c8]/15 text-white'
                      : 'border-[#2b2214] bg-[#070605] text-neutral-400'
                  }`}
                >
                  <Wallet className="w-4 h-4 text-[#ba68c8] mb-1" />
                  <div className="text-xs font-bold text-white">CBE Birr</div>
                  <div className="text-[9px] text-neutral-400">Commercial Bank</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    method === 'card'
                      ? 'border-[#dfba63] bg-[#dfba63]/15 text-white'
                      : 'border-[#2b2214] bg-[#070605] text-neutral-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#dfba63] mb-1" />
                  <div className="text-xs font-bold text-white">Card</div>
                  <div className="text-[9px] text-neutral-400">Visa / Master</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                {method === 'card' ? 'Card Number' : 'Ethiopian Mobile Number'}
              </label>
              <input
                type="text"
                value={phoneOrAcc}
                onChange={(e) => setPhoneOrAcc(e.target.value)}
                className="w-full bg-[#050403] border border-[#2b2214] focus:border-[#dfba63] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="gold-button w-full py-3.5 uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Confirm Deposit of {amount} ETB</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-5 pt-3 border-t border-[#2b2214] flex items-center justify-center gap-1.5 text-neutral-500 text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1e9a4b]" />
          <span>Direct Settlement via National Bank of Ethiopia Rail</span>
        </div>

      </div>
    </div>
  );
};
