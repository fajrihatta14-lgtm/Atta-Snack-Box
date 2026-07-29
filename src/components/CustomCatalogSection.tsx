import React, { useState } from 'react';
import { 
  Search, BookOpen, Sparkles, Award, ExternalLink, ChevronRight, CheckCircle, Shield 
} from 'lucide-react';
import { 
  CUSTOM_SNACK_ITEMS, 
  CERTIFICATIONS, 
  FACEBOOK_URL, 
  MIN_ORDER_BOXES 
} from '../data/customSnacksData';

interface CustomCatalogSectionProps {
  onOpenKatalog: () => void;
}

export const CustomCatalogSection: React.FC<CustomCatalogSectionProps> = ({ onOpenKatalog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'asin' | 'manis' | 'buah_camilan'>('all');

  const filteredItems = CUSTOM_SNACK_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="katalog-digital" className="py-20 px-4 lg:px-8 bg-[#0D0E12] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181A24] border border-[#EAB308]/30 mb-2">
            <Sparkles size={13} className="text-[#EAB308]" />
            <span className="text-[11px] font-mono tracking-widest text-[#EAB308] font-bold uppercase">
              DAFTAR HARGA SNACK CUSTOM ATTA
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-white tracking-wide">
            Katalog Digital & Pilihan Menu
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Temukan 50+ varian kue tradisional, pastry gurih, dessert manis, dan buah segar pilihan. 
            Bebas racik untuk kebutuhan rapat kantor, seminar, acara syukuran, hingga pernikahan.
          </p>

          {/* Halal Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181A24] border border-[#EAB308]/30 text-[#EAB308] text-xs font-semibold"
              >
                <Award size={14} />
                {cert.name}
              </span>
            ))}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600/20 transition-colors"
            >
              <ExternalLink size={12} />
              FB ATTA Snack Box
            </a>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#14151C] p-4 rounded-2xl border border-white/10 shadow-lg">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kue (Risoles, Brownies, Pastel, Puding...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0C10] text-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:border-[#EAB308] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#EAB308] text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                  : 'bg-[#0B0C10] text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              Semua Menu (62)
            </button>

            <button
              onClick={() => setActiveCategory('asin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'asin'
                  ? 'bg-[#EAB308] text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                  : 'bg-[#0B0C10] text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              Asin & Gurih (19)
            </button>

            <button
              onClick={() => setActiveCategory('manis')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'manis'
                  ? 'bg-[#EAB308] text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                  : 'bg-[#0B0C10] text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              Manis & Dessert (34)
            </button>

            <button
              onClick={() => setActiveCategory('buah_camilan')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'buah_camilan'
                  ? 'bg-[#EAB308] text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                  : 'bg-[#0B0C10] text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              Buah & Camilan (9)
            </button>
          </div>
        </div>

        {/* Grid Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredItems.slice(0, 16).map((snack) => (
            <div
              key={snack.id}
              className="bg-[#14151C] border border-white/10 hover:border-[#EAB308]/40 p-3.5 rounded-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div>
                <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 text-gray-400 block w-max mb-1.5">
                  {snack.category === 'asin' ? 'Asin & Gurih' : snack.category === 'manis' ? 'Manis & Dessert' : 'Buah & Camilan'}
                </span>
                <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#EAB308] transition-colors">
                  {snack.name}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#EAB308]">
                  {snack.formattedPrice}
                </span>
                <button
                  onClick={onOpenKatalog}
                  className="text-[10px] text-gray-400 group-hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  Pilih <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner to open Full Interactive Catalog */}
        <div className="bg-gradient-to-r from-[#181A24] via-[#1F2230] to-[#181A24] border border-[#EAB308]/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-mono tracking-widest text-[#EAB308] font-bold uppercase block">
              SIMULASI SIMPEL & CEPAT
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white">
              Ingin Buat Kombinasi Snack Box Sendiri?
            </h3>
            <p className="text-xs text-gray-300 max-w-xl">
              Gunakan fitur <strong>Simulasi Custom Box</strong> untuk memilih varian kue, opsi minuman, menghitung estimasi biaya per box, dan langsung memesan via WhatsApp. Minimal {MIN_ORDER_BOXES} Box.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenKatalog}
              className="px-6 py-3 bg-[#EAB308] hover:bg-[#CA8A04] text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.25)] transition-all cursor-pointer uppercase flex items-center gap-2"
            >
              <Sparkles size={15} />
              Buka Katalog Digital Full (50+ Menu)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
