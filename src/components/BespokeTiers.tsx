import React from 'react';
import { CateringTier } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface BespokeTiersProps {
  tiers: CateringTier[];
  onSelectTier: (tier: CateringTier) => void;
}

export const BespokeTiers: React.FC<BespokeTiersProps> = ({ tiers, onSelectTier }) => {
  return (
    <section id="bespoke-tiers" className="py-24 px-4 lg:px-8 bg-[#0B0C10] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif-display italic text-white font-medium tracking-wide mb-4">
            Bespoke Catering Tiers
          </h2>
          <div className="w-16 h-1 bg-[#EAB308] mx-auto rounded-full" />
        </div>

        {/* 2 Wide Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => onSelectTier(tier)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#15161E] cursor-pointer hover:border-[#EAB308]/50 transition-all duration-500 shadow-2xl flex flex-col justify-end min-h-[380px]"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={tier.image}
                  alt={tier.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/80 to-transparent" />
              </div>

              {/* Card Content Overlay */}
              <div className="relative z-10 p-8 flex flex-col justify-end">
                <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#EAB308] uppercase mb-2 block">
                  {tier.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white mb-3">
                  {tier.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6 max-w-lg">
                  {tier.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#EAB308] tracking-widest uppercase group-hover:translate-x-1.5 transition-transform">
                  <span>{tier.actionText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
