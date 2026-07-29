import React from 'react';
import { Globe, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { AttaLogo } from './AttaLogo';

interface FooterProps {
  onOpenStory: () => void;
  onOpenKatalog: () => void;
  onOpenBayar: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStory, onOpenKatalog, onOpenBayar }) => {
  return (
    <footer className="bg-[#07080B] text-gray-400 py-16 px-4 lg:px-8 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AttaLogo size="sm" />
            <span className="font-sans font-bold text-white tracking-widest text-sm uppercase">
              ATTA SNACK BOX
            </span>
          </div>

          <p className="text-gray-400 font-light text-[11px] leading-relaxed max-w-sm">
            Crafting elite snack boxes and premium catering solutions for Jakarta&apos;s most distinguished corporate and private events.
          </p>
        </div>

        {/* Information Links */}
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-[11px]">
            INFORMATION
          </h4>
          <ul className="space-y-2.5 text-[11px]">
            <li>
              <button onClick={onOpenStory} className="hover:text-[#4ADE80] transition-colors cursor-pointer">
                Privacy Policy & Terms
              </button>
            </li>
            <li>
              <button onClick={onOpenKatalog} className="hover:text-[#4ADE80] transition-colors cursor-pointer">
                Digital Catalog Brochure
              </button>
            </li>
            <li>
              <button onClick={onOpenBayar} className="hover:text-[#4ADE80] transition-colors cursor-pointer">
                Bank Payment Guidelines
              </button>
            </li>
            <li>
              <a href="https://wa.me/6285263150282" target="_blank" rel="noopener noreferrer" className="hover:text-[#4ADE80] transition-colors flex items-center gap-1">
                Contact CS WA (085263150282)
              </a>
            </li>
          </ul>
        </div>

        {/* Socials & Copyright */}
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-widest uppercase text-[11px]">
            SOCIALS
          </h4>
          
          <div className="flex items-center gap-3">
            <a
              href="https://attasnackbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#4ADE80] hover:border-[#4ADE80] transition-colors"
              aria-label="Website"
            >
              <Globe size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#4ADE80] hover:border-[#4ADE80] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
          </div>

          <p className="text-[10px] text-gray-500 font-mono pt-4 border-t border-white/5">
            © 2024 ATTA SNACK BOX. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
