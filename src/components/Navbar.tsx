import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, CheckCircle, MessageSquare } from 'lucide-react';
import { AttaLogo } from './AttaLogo';

interface NavbarProps {
  onOpenKatalog: () => void;
  onOpenBayar: () => void;
  onOpenStatus: () => void;
  onOpenOrderModal: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenKatalog,
  onOpenBayar,
  onOpenStatus,
  onOpenOrderModal,
  cartCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('Halo Admin ATTA Snack Box (085263150282), saya ingin bertanya mengenai pemesanan snack box / catering.');
    window.open('https://wa.me/6285263150282?text=' + text, '_blank');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0C10]/95 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <AttaLogo size="md" className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm tracking-wide font-bold text-white uppercase group-hover:text-[#EAB308] transition-colors">
                Atta Snack Box
              </span>
            </div>
            <p className="text-[9px] tracking-widest text-gray-400 uppercase font-medium">
              TERATAS KARENA KUALITAS
            </p>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider text-gray-300 uppercase">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#4ADE80] transition-colors cursor-pointer py-1 text-[#4ADE80]"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection('daftar-menu')}
            className="hover:text-[#4ADE80] transition-colors cursor-pointer py-1"
          >
            SNACK BOX
          </button>
          <button
            onClick={() => scrollToSection('nasi-box')}
            className="hover:text-[#EAB308] text-[#EAB308] font-bold transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            NASI BOX
          </button>
          <button
            onClick={onOpenKatalog}
            className="hover:text-[#4ADE80] transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            KATALOG
          </button>
          <button
            onClick={onOpenBayar}
            className="hover:text-[#4ADE80] transition-colors cursor-pointer py-1"
          >
            BAYAR
          </button>
          <button
            onClick={onOpenStatus}
            className="hover:text-[#4ADE80] transition-colors cursor-pointer py-1 relative"
          >
            STATUS
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
          </button>
          <button
            onClick={() => scrollToSection('secure-date')}
            className="hover:text-[#4ADE80] transition-colors cursor-pointer py-1"
          >
            KONTAK
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenKatalog}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-gray-200 border border-white/20 rounded-lg hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
          >
            LIHAT KATALOG
          </button>

          <button
            onClick={onOpenOrderModal}
            className="relative px-5 py-2 text-xs font-bold tracking-wider uppercase text-[#0B0C10] bg-[#4ADE80] hover:bg-[#38C172] rounded-full transition-all shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            ORDER VIA WA
            {cartCount > 0 && (
              <span className="bg-[#0B0C10] text-[#4ADE80] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenOrderModal}
            className="px-3 py-1.5 text-xs font-bold text-[#0B0C10] bg-[#4ADE80] rounded-full flex items-center gap-1"
          >
            WA {cartCount > 0 && `(${cartCount})`}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-3 px-2 pb-3 bg-[#111218] rounded-xl text-sm">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-[#4ADE80] font-semibold"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection('daftar-menu')}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-gray-200 font-semibold"
          >
            DAFTAR SNACK BOX
          </button>
          <button
            onClick={() => scrollToSection('nasi-box')}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-[#EAB308] font-bold flex items-center justify-between"
          >
            <span>NASI BOX ATTA</span>
            <span className="text-[10px] bg-[#EAB308]/20 text-[#EAB308] px-2 py-0.5 rounded-full font-bold">Bonus Air Mineral</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenKatalog();
            }}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-gray-200"
          >
            KATALOG DIGITAL
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBayar();
            }}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-gray-200"
          >
            METODE PEMBAYARAN
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenStatus();
            }}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-gray-200 flex items-center justify-between"
          >
            <span>STATUS PESANAN</span>
            <span className="text-[10px] bg-[#4ADE80]/20 text-[#4ADE80] px-2 py-0.5 rounded-full font-bold">Lacak</span>
          </button>
          <button
            onClick={() => scrollToSection('secure-date')}
            className="text-left py-2 px-3 hover:bg-white/5 rounded text-gray-200"
          >
            RESERVASI & KONTAK
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKatalog();
              }}
              className="w-full py-2 text-xs font-semibold uppercase text-gray-200 border border-white/20 rounded-lg text-center"
            >
              LIHAT KATALOG
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-2 text-xs font-bold uppercase text-[#0B0C10] bg-[#4ADE80] rounded-lg text-center"
            >
              ORDER VIA WHATSAPP
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
