import React from 'react';
import { AttaLogo } from './AttaLogo';

interface HeroProps {
  onViewCollection: () => void;
  onOpenStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewCollection, onOpenStory }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0B0C10] via-[#12131C] to-[#0B0C10]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EAB308]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#4ADE80]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo & Established Badge */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <AttaLogo size="xl" className="shadow-[0_0_25px_rgba(234,179,8,0.35)]" />
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#181A22] border border-[#EAB308]/30 shadow-sm">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#EAB308] font-semibold uppercase">
                ESTABLISHED MMIV
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium leading-[1.15] text-white tracking-tight mb-6">
            Elite <span className="italic text-[#EAB308] font-normal">Gastronomy</span> for <br className="hidden sm:inline" />
            Distinguished Moments
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light mb-8">
            Curating bespoke culinary experiences delivered in exquisite packaging. Elevate your corporate events and private gatherings with ATTA&apos;s signature snack boxes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onViewCollection}
              className="px-7 py-3.5 text-xs font-bold tracking-widest text-black bg-[#EAB308] hover:bg-[#CA8A04] transition-all rounded-md shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] cursor-pointer uppercase"
            >
              VIEW THE COLLECTION
            </button>
            <button
              onClick={onOpenStory}
              className="px-7 py-3.5 text-xs font-semibold tracking-widest text-gray-200 border border-white/20 hover:border-white/50 bg-black/20 hover:bg-white/5 transition-all rounded-md cursor-pointer uppercase"
            >
              OUR STORY
            </button>
          </div>
        </div>

        {/* Hero Image Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#EAB308]/20 via-transparent to-[#4ADE80]/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-700" />
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121319] shadow-2xl">
            <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1600&auto=format&fit=crop"
                alt="ATTA Premium Luxury Snack Box"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-black/30" />
              
              {/* Floating watermark logo preview overlay */}
              <div className="absolute top-6 right-6 px-4 py-2 bg-black/75 backdrop-blur-md rounded-xl border border-white/15 flex items-center gap-3">
                <AttaLogo size="sm" />
                <div className="text-right">
                  <span className="font-sans font-bold text-xs tracking-wider text-[#EAB308] block uppercase">ATTA</span>
                  <span className="text-[9px] text-gray-300 tracking-widest uppercase block">SNACK BOX</span>
                </div>
              </div>

              {/* Floating badge bottom left */}
              <div className="absolute bottom-6 left-6 max-w-md hidden sm:block">
                <span className="px-2.5 py-1 bg-[#EAB308] text-black text-[10px] font-bold tracking-widest uppercase rounded mb-2 inline-block">
                  Bespoke Packaging
                </span>
                <p className="text-xs text-gray-200 font-light drop-shadow">
                  Each box features our signature gold foil embossing and heat-sealed fresh guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
