import React, { useState } from 'react';
import { X, CreditCard, Copy, Check, ShieldCheck, QrCode } from 'lucide-react';

interface BayarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BayarModal: React.FC<BayarModalProps> = ({ isOpen, onClose }) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#14151C] border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#14151C] z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/40 flex items-center justify-center text-[#4ADE80]">
              <CreditCard size={16} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                Informasi Pembayaran
              </h3>
              <p className="text-[11px] text-gray-400">
                Rekening resmi ATTA SNACK BOX untuk pelunasan / DP.
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
        <div className="p-6 space-y-4">
          {/* Bank BNI */}
          <div className="bg-[#0B0C10] border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#EAB308] uppercase block mb-1">
                BANK BNI
              </span>
              <p className="text-base font-mono font-bold text-white tracking-wider">
                1865849588
              </p>
              <p className="text-xs text-gray-400">a/n Susi Taherawati</p>
            </div>

            <button
              onClick={() => copyToClipboard('1865849588', 'BNI')}
              className="px-3 py-1.5 bg-[#1F222E] hover:bg-[#2A2E3E] text-xs font-bold text-gray-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              {copiedBank === 'BNI' ? (
                <>
                  <Check size={14} className="text-[#4ADE80]" />
                  <span className="text-[#4ADE80]">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Bank BRI */}
          <div className="bg-[#0B0C10] border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#60A5FA] uppercase block mb-1">
                BANK BRI
              </span>
              <p className="text-base font-mono font-bold text-white tracking-wider">
                546401001857504
              </p>
              <p className="text-xs text-gray-400">a/n Susi Taherawati, SE</p>
            </div>

            <button
              onClick={() => copyToClipboard('546401001857504', 'BRI')}
              className="px-3 py-1.5 bg-[#1F222E] hover:bg-[#2A2E3E] text-xs font-bold text-gray-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              {copiedBank === 'BRI' ? (
                <>
                  <Check size={14} className="text-[#4ADE80]" />
                  <span className="text-[#4ADE80]">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Bank BSI */}
          <div className="bg-[#0B0C10] border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#4ADE80] uppercase block mb-1">
                BANK BSI (SYARIAH)
              </span>
              <p className="text-base font-mono font-bold text-white tracking-wider">
                7158291180
              </p>
              <p className="text-xs text-gray-400">a/n Susi Taherawati</p>
            </div>

            <button
              onClick={() => copyToClipboard('7158291180', 'BSI')}
              className="px-3 py-1.5 bg-[#1F222E] hover:bg-[#2A2E3E] text-xs font-bold text-gray-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              {copiedBank === 'BSI' ? (
                <>
                  <Check size={14} className="text-[#4ADE80]" />
                  <span className="text-[#4ADE80]">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* QRIS Card with Image Display */}
          <div className="bg-[#0B0C10] border border-[#4ADE80]/30 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-lg flex items-center justify-center text-[#4ADE80]">
                  <QrCode size={22} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block uppercase tracking-wide">
                    QRIS All Payment (Scan Barcode)
                  </span>
                  <p className="text-[11px] text-gray-400">
                    BCA, Mandiri, BNI, BRI, GoPay, OVO, ShopeePay, Dana, LinkAja
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-[#4ADE80]/20 text-[#4ADE80] px-2.5 py-1 rounded-full font-bold">
                Scan & Bayar
              </span>
            </div>

            {/* QRIS Image Box */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center gap-2 w-full max-w-[280px] mx-auto shadow-2xl border border-gray-200">
              <img
                src="/qris.jpg"
                alt="QRIS ATTA Snack Box Susi Taherawati"
                className="w-full h-auto object-contain rounded-xl border border-gray-100 shadow-sm"
              />
              <p className="text-[11px] text-gray-700 font-bold text-center mt-0.5">
                Scan QRIS di atas untuk semua M-Banking & E-Wallet
              </p>
            </div>
          </div>

          {/* Verification Warning */}
          <div className="bg-[#1A1C23] p-4 rounded-xl border border-white/5 flex flex-col gap-3 text-xs text-gray-300">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#4ADE80] shrink-0 mt-0.5" />
              <p>
                Mohon selalu sertakan foto/bukti transfer ke Admin WhatsApp setelah melakukan pembayaran agar pesanan dapat segera diproses oleh tim dapur.
              </p>
            </div>

            <button
              onClick={() => {
                const text = encodeURIComponent('Halo Admin ATTA (085263150282), saya ingin mengirimkan bukti transfer pembayaran pesanan Snack Box.');
                window.open('https://wa.me/6285263150282?text=' + text, '_blank');
              }}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(37,211,102,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2 uppercase"
            >
              Kirim Bukti Transfer via WA (085263150282)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};