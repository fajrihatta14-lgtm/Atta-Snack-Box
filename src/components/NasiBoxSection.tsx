import React, { useState } from 'react';
import { 
  Utensils, CheckCircle2, Sparkles, Send, Award, Gift, ShieldCheck, Tag, Eye
} from 'lucide-react';
import { WA_PHONE_NUMBER, DISPLAY_WA_NUMBER } from '../data/customSnacksData';

interface NasiBoxSectionProps {
  onOrderNasiBox?: (title: string, priceFormatted: string, numericPrice: number) => void;
}

export const NasiBoxSection: React.FC<NasiBoxSectionProps> = ({ onOrderNasiBox }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | '1-protein' | '1.5-protein' | '2-protein'>('all');
  const [isPosterZoomOpen, setIsPosterZoomOpen] = useState(false);

  const nasiBoxPackages = [
    // 1 Protein
    {
      id: 'nb-1p-1',
      category: '1-protein',
      categoryLabel: '1 Protein',
      title: 'Nasi Box Dendeng / Rendang / Kalio',
      menuDetail: 'Nasi Putih + 1 Pilihan Daging Sapi Premium (Dendeng Batokok / Rendang / Kalio) + Perkedel / Mie Goreng + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 36.000',
      numericPrice: 36000,
      badge: 'Spesial Rendang'
    },
    {
      id: 'nb-1p-2',
      category: '1-protein',
      categoryLabel: '1 Protein',
      title: 'Nasi Box Ayam / Ikan',
      menuDetail: 'Nasi Putih + 1 Pilihan Ayam Goreng / Ikan Goreng Balado + Pelengkap Perkedel / Mie + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 32.000',
      numericPrice: 32000,
      badge: 'Ekonomis Favorit'
    },

    // 1.5 Protein
    {
      id: 'nb-15p-1',
      category: '1.5-protein',
      categoryLabel: '1½ Protein',
      title: 'Rendang / Dendeng / Kalio + Telur Balado',
      menuDetail: 'Nasi Putih + Daging Sapi (Rendang / Dendeng / Kalio) + Telur Balado + Perkedel / Mie + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 43.000',
      numericPrice: 43000,
      badge: 'Kombinasi Nikmat'
    },
    {
      id: 'nb-15p-2',
      category: '1.5-protein',
      categoryLabel: '1½ Protein',
      title: 'Ikan / Ayam + Telur Balado',
      menuDetail: 'Nasi Putih + Ayam / Ikan + Telur Balado + Perkedel / Mie Goreng + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 40.000',
      numericPrice: 40000,
      badge: 'Populer Rapat'
    },

    // 2 Protein
    {
      id: 'nb-2p-1',
      category: '2-protein',
      categoryLabel: '2 Protein',
      title: 'Dendeng + Rendang / Kalio',
      menuDetail: 'Nasi Putih + Double Daging Sapi Premium (Dendeng + Rendang / Kalio) + Perkedel / Mie + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 48.000',
      numericPrice: 48000,
      badge: 'Double Daging Sapi'
    },
    {
      id: 'nb-2p-2',
      category: '2-protein',
      categoryLabel: '2 Protein',
      title: 'Dendeng / Rendang / Kalio + Ayam',
      menuDetail: 'Nasi Putih + Daging Sapi (Rendang / Dendeng / Kalio) + Ayam Goreng Balado + Perkedel / Mie + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 47.000',
      numericPrice: 47000,
      badge: 'Mewah Lengkap'
    },
    {
      id: 'nb-2p-3',
      category: '2-protein',
      categoryLabel: '2 Protein',
      title: 'Dendeng / Rendang / Kalio + Ikan',
      menuDetail: 'Nasi Putih + Daging Sapi (Rendang / Dendeng / Kalio) + Ikan Goreng Balado + Perkedel / Mie + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 47.000',
      numericPrice: 47000,
      badge: 'Favorit Acara'
    },
    {
      id: 'nb-2p-4',
      category: '2-protein',
      categoryLabel: '2 Protein',
      title: 'Ayam + Ikan',
      menuDetail: 'Nasi Putih + Ayam Goreng Balado + Ikan Goreng Balado + Perkedel / Mie + Buah + Kerupuk + Sambal',
      priceFormatted: 'Rp 46.000',
      numericPrice: 46000,
      badge: 'Double Lauk Mantap'
    }
  ];

  const filteredPackages = selectedCategory === 'all'
    ? nasiBoxPackages
    : nasiBoxPackages.filter(p => p.category === selectedCategory);

  const handleSendWA = (title: string, priceFormatted: string) => {
    const text = `Halo Admin ATTA Snack Box (${DISPLAY_WA_NUMBER}), saya mau pesan Nasi Box:

📌 *Detail Pesanan Nasi Box:*
- Paket Menu: ${title}
- Harga per Box: ${priceFormatted}
- Bonus Included: Gratis Air Mineral Gelas AQUA

Mohon informasi minimal order dan ketersediaan tanggal pengiriman. Terima kasih!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WA_PHONE_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <section id="nasi-box" className="py-20 bg-[#0B0C10] relative border-t border-b border-white/10 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#EAB308]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#4ADE80]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/30 text-[#EAB308] text-xs font-bold tracking-widest uppercase">
            <Sparkles size={14} />
            TERATAS KARENA KUALITAS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Menu Nasi Box <span className="text-[#EAB308]">Spesial ATTA</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Sajian Nasi Box lezat khas Minang & Nusantara mulai <span className="text-[#4ADE80] font-bold">Rp 32.000</span>.
            Daging Rendang Empuk, Ayam/Ikan Balado Gurih, komplit dengan <span className="text-[#EAB308] font-bold">Bonus Air Mineral Gelas Gratis</span>!
          </p>
        </div>

        {/* Featured Poster Banner & Category Filter Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Poster Highlight (User Image) */}
          <div className="lg:col-span-5 bg-[#14151C] border border-[#EAB308]/30 rounded-2xl p-4 flex flex-col items-center gap-4 shadow-2xl relative">
            <div className="w-full flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#EAB308] uppercase flex items-center gap-1.5 tracking-wider">
                <Tag size={14} />
                Poster Resmi Nasi Box ATTA
              </span>
              <span className="text-[10px] bg-[#EAB308]/20 text-[#EAB308] px-2.5 py-0.5 rounded-full font-bold">
                Mulai 32K
              </span>
            </div>

            <div 
              onClick={() => setIsPosterZoomOpen(true)}
              className="relative group cursor-pointer w-full rounded-xl overflow-hidden border border-white/10 shadow-xl"
            >
              <img
                src="/src/assets/images/nasi_box_rendang_poster_1785307285865.jpg"
                alt="Poster Nasi Box Spesial Rendang ATTA"
                className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="text-xs font-bold bg-black/80 text-white px-3.5 py-2 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                  <Eye size={14} />
                  Lihat Gambar Poster
                </span>
              </div>
            </div>

            {/* Poster Highlight Card Footer */}
            <div className="w-full bg-[#0B0C10] p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Gift className="text-[#EAB308] shrink-0" size={18} />
                <div>
                  <p className="font-bold text-white text-[11px]">BONUS AIR MINERAL GELAS</p>
                  <p className="text-[10px] text-gray-400">Setiap pemesanan Nasi Box ATTA</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#4ADE80] font-bold">100% Halal</span>
            </div>
          </div>

          {/* Right Menu Selection Grid */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter Tabs */}
            <div className="bg-[#14151C] p-1.5 rounded-2xl border border-white/10 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedCategory === 'all'
                    ? 'bg-[#EAB308] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Semua Pilihan
              </button>
              <button
                onClick={() => setSelectedCategory('1-protein')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedCategory === '1-protein'
                    ? 'bg-[#EAB308] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                1 Protein (32K - 36K)
              </button>
              <button
                onClick={() => setSelectedCategory('1.5-protein')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedCategory === '1.5-protein'
                    ? 'bg-[#EAB308] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                1½ Protein (40K - 43K)
              </button>
              <button
                onClick={() => setSelectedCategory('2-protein')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedCategory === '2-protein'
                    ? 'bg-[#EAB308] text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                2 Protein (46K - 48K)
              </button>
            </div>

            {/* Menu Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPackages.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#14151C] border border-white/10 hover:border-[#EAB308]/60 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 bg-white/10 text-gray-300 font-mono text-[10px] rounded-md uppercase font-bold">
                        {item.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 bg-[#EAB308]/20 text-[#EAB308] text-[10px] font-bold rounded-md">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-[#EAB308] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                      {item.menuDetail}
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-mono">Harga per Box:</span>
                      <span className="text-xl font-black text-[#4ADE80] font-mono">
                        {item.priceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleSendWA(item.title, item.priceFormatted)}
                      className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Send size={13} />
                      Pesan via WA
                    </button>
                    {onOrderNasiBox && (
                      <button
                        onClick={() => onOrderNasiBox(item.title, item.priceFormatted, item.numericPrice)}
                        className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 transition-colors cursor-pointer"
                        title="Tambah ke Keranjang"
                      >
                        + Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Poster Zoom Modal */}
      {isPosterZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-xl w-full max-h-[90vh] bg-[#14151C] border border-white/20 rounded-2xl overflow-hidden p-2 flex flex-col items-center">
            <button
              onClick={() => setIsPosterZoomOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <img
              src="/src/assets/images/nasi_box_rendang_poster_1785307285865.jpg"
              alt="Poster Zoom Nasi Box Spesial Rendang"
              className="max-h-[82vh] w-auto object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
