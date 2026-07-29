import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const SecureDate: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section id="secure-date" className="py-20 px-4 lg:px-8 bg-[#0B0C10] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#151720] border border-white/10 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4ADE80]/5 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EAB308]/5 blur-[100px] pointer-events-none rounded-full" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-medium italic text-white mb-4">
            Secure Your Date
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Our artisanal kitchen operates with limited daily capacity to ensure perfection. Reserve your delivery or request a bespoke quote today.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-[#4ADE80]/20 border border-[#4ADE80] text-[#4ADE80] px-6 py-3 rounded-full text-xs font-bold animate-fade-in">
              <CheckCircle2 size={16} />
              Permintaan Penawaran Terkirim! Tim Admin ATTA akan menghubungi Anda.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your professional email"
                className="flex-1 bg-[#0D0E13] border border-white/15 rounded-full px-5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#4ADE80] transition-colors"
              />
              <button
                type="submit"
                className="px-7 py-3 text-xs font-bold tracking-wider text-[#0B0C10] bg-[#4ADE80] hover:bg-[#38C172] rounded-full transition-all shadow-[0_0_15px_rgba(74,222,128,0.25)] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] cursor-pointer uppercase shrink-0"
              >
                GET QUOTE
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
