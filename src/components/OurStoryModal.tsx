import React from 'react';
import { X, Award, Shield, HeartHandshake } from 'lucide-react';
import { AttaLogo } from './AttaLogo';

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OurStoryModal: React.FC<OurStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#14151C] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#14151C] z-10">
          <div className="flex items-center gap-3">
            <AttaLogo size="sm" />
            <div>
              <h3 className="text-lg font-serif-display font-bold text-white uppercase tracking-wide">
                Our Story - ATTA Snack Box
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">
                ESTABLISHED MMIV (2004)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-gray-300 leading-relaxed">
          <div className="aspect-[21/9] rounded-xl overflow-hidden relative border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop"
              alt="ATTA Master Bakery Kitchen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14151C] via-transparent to-transparent" />
          </div>

          <p>
            Didirikan sejak tahun 2004 (MMIV), <strong className="text-white">ATTA Snack Box</strong> lahir dari komitmen mendalam terhadap seni kuliner dan penyajian catering premium. Kami meyakini bahwa setiap pertemuan bisnis, gala korporat, dan momen keluarga berhak mendapatkan hidangan berkualitas tinggi dengan estetika visual yang anggun.
          </p>

          <p>
            Dapur artisanal kami menggunakan bahan-bahan segar berkualitas ekspor, mentega asli Prancis, serta kemasan heat-sealed higienis berstempel gold foil yang menjadi identitas kebanggaan kami.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#0B0C10] p-4 rounded-xl border border-white/5 text-center space-y-2">
              <Award size={20} className="text-[#EAB308] mx-auto" />
              <h4 className="font-bold text-white">Bahan Premium</h4>
              <p className="text-[10px] text-gray-400">100% Mentega Prancis & bahan segar tanpa pengawet.</p>
            </div>

            <div className="bg-[#0B0C10] p-4 rounded-xl border border-white/5 text-center space-y-2">
              <Shield size={20} className="text-[#4ADE80] mx-auto" />
              <h4 className="font-bold text-white">Jaminan Higienis</h4>
              <p className="text-[10px] text-gray-400">Kemasan tersegel rapat & pengerjaan standar ISO.</p>
            </div>

            <div className="bg-[#0B0C10] p-4 rounded-xl border border-white/5 text-center space-y-2">
              <HeartHandshake size={20} className="text-[#EAB308] mx-auto" />
              <h4 className="font-bold text-white">Ketepatan Waktu</h4>
              <p className="text-[10px] text-gray-400">Pengiriman armada berpendingin tiba tepat waktu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
