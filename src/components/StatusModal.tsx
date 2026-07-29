import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, Truck, Package, Utensils } from 'lucide-react';
import { OrderTrack } from '../types';
import { SAMPLE_ORDER_TRACKS } from '../data/mockData';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose }) => {
  const [searchId, setSearchId] = useState('ATTA-8821');
  const [activeOrder, setActiveOrder] = useState<OrderTrack | null>(SAMPLE_ORDER_TRACKS[0]);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = SAMPLE_ORDER_TRACKS.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );

    if (found) {
      setActiveOrder(found);
      setNotFound(false);
    } else {
      // Create a simulated live order for any typed ID
      const newSimulated: OrderTrack = {
        id: searchId.toUpperCase(),
        customerName: 'Pemesan (Verified Customer)',
        date: 'Hari ini (Dalam Proses)',
        status: 'preparing',
        itemsSummary: 'Snack Box Catering Package',
        totalAmount: 'Rp 850.000',
        deliveryAddress: 'Alamat Tujuan Pemesan'
      };
      setActiveOrder(newSimulated);
      setNotFound(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#14151C] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#14151C] z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/40 flex items-center justify-center text-[#4ADE80]">
              <Clock size={16} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                Lacak Status Pesanan
              </h3>
              <p className="text-[11px] text-gray-400">
                Masukkan Kode Order untuk memantau status pembuatan & pengiriman.
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
        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="text"
                required
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Contoh: ATTA-8821"
                className="w-full bg-[#0B0C10] border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#4ADE80]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#4ADE80] text-[#0B0C10] font-bold text-xs rounded-xl hover:bg-[#38C172] transition-colors cursor-pointer uppercase"
            >
              Cari
            </button>
          </form>

          {/* Sample quick tags */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span>Contoh ID:</span>
            {SAMPLE_ORDER_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSearchId(t.id);
                  setActiveOrder(t);
                }}
                className="px-2 py-0.5 bg-[#1F222E] hover:bg-[#2A2E3E] text-white rounded font-mono text-[10px]"
              >
                {t.id}
              </button>
            ))}
          </div>

          {/* Order Details Display */}
          {activeOrder && (
            <div className="bg-[#0B0C10] border border-white/10 rounded-xl p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#EAB308] uppercase block">ORDER ID</span>
                  <h4 className="text-lg font-mono font-bold text-white">{activeOrder.id}</h4>
                  <p className="text-xs text-gray-400">{activeOrder.customerName}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">Total Pembayaran</span>
                  <span className="text-sm font-bold text-[#4ADE80]">{activeOrder.totalAmount}</span>
                </div>
              </div>

              {/* Status Timeline Progress */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Timeline Status Pengiriman
                </h5>

                <div className="grid grid-cols-4 gap-2 relative">
                  {/* Step 1: Pesanan Diterima */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-9 h-9 rounded-full bg-[#4ADE80]/20 border-2 border-[#4ADE80] text-[#4ADE80] flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-white">Diterima</span>
                  </div>

                  {/* Step 2: Dapur */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${
                      ['preparing', 'delivering', 'completed'].includes(activeOrder.status)
                        ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                        : 'bg-[#181920] border-gray-700 text-gray-500'
                    }`}>
                      <Utensils size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-white">Diproses</span>
                  </div>

                  {/* Step 3: Kurir */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${
                      ['delivering', 'completed'].includes(activeOrder.status)
                        ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                        : 'bg-[#181920] border-gray-700 text-gray-500'
                    }`}>
                      <Truck size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-white">Pengiriman</span>
                  </div>

                  {/* Step 4: Selesai */}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${
                      activeOrder.status === 'completed'
                        ? 'bg-[#4ADE80]/20 border-[#4ADE80] text-[#4ADE80]'
                        : 'bg-[#181920] border-gray-700 text-gray-500'
                    }`}>
                      <Package size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-white">Selesai</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#151720] p-3 rounded-lg text-xs space-y-1 text-gray-300">
                <p><span className="font-bold text-white">Ringkasan Item:</span> {activeOrder.itemsSummary}</p>
                <p><span className="font-bold text-white">Alamat:</span> {activeOrder.deliveryAddress}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
