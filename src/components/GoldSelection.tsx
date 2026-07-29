import React, { useState } from 'react';
import { GoldProduct } from '../types';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, MessageSquare } from 'lucide-react';

interface GoldSelectionProps {
  items: GoldProduct[];
  onOrderGoldItem: (product: GoldProduct) => void;
}

export const GoldSelection: React.FC<GoldSelectionProps> = ({ items, onOrderGoldItem }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, items.length - 2) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= items.length - 2 ? 0 : prev + 1));
  };

  const visibleItems = items.slice(startIndex, startIndex + 2);

  return (
    <section id="gold-selection" className="py-24 px-4 lg:px-8 bg-[#101117] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium italic text-white mb-2">
              The Gold Selection
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Highly-rated favorites from our master patisserie.
            </p>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 bg-[#1A1C23] hover:bg-[#252834] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous item"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 bg-[#1A1C23] hover:bg-[#252834] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next item"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleItems.map((product) => (
            <div
              key={product.id}
              className="bg-[#171821] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#EAB308]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171821] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {product.title}
                  </h3>
                  <span className="text-sm font-bold text-[#EAB308]">
                    {product.priceFormatted} <span className="text-xs font-normal text-gray-400">({product.priceUsd})</span>
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#EAB308] fill-[#EAB308]" />
                  ))}
                </div>

                <p className="text-xs text-gray-400 font-light mb-6 line-clamp-2">
                  {product.description}
                </p>

                {/* Bright green Order Now button */}
                <button
                  onClick={() => onOrderGoldItem(product)}
                  className="w-full py-3 text-xs font-bold tracking-wider text-[#0B0C10] bg-[#4ADE80] hover:bg-[#38C172] rounded-xl transition-all shadow-[0_0_15px_rgba(74,222,128,0.2)] cursor-pointer uppercase flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} className="fill-[#0B0C10]" />
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
