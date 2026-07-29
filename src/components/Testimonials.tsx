import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-24 px-4 lg:px-8 bg-[#0B0C10] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Heading & Copy */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif-display font-medium text-white leading-tight mb-4">
              Voices of the <br />
              <span className="italic text-[#EAB308] font-normal">Distinguished</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-sm">
              Join the elite circle of companies and families who trust ATTA for their most significant milestones.
            </p>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-[#151720] border border-white/10 rounded-2xl p-7 relative flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
              >
                {/* 5 Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testi.stars)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#EAB308] fill-[#EAB308]" />
                    ))}
                  </div>
                  <span className="text-[#EAB308]/30 font-serif text-3xl font-bold leading-none select-none">
                    &rdquo;
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs text-gray-200 font-light italic leading-relaxed mb-8">
                  &ldquo;{testi.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src={testi.avatar}
                    alt={testi.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#EAB308]/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      {testi.author}
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      {testi.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
