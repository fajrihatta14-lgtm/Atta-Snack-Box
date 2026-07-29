import React, { useState, useMemo } from 'react';
import { 
  X, Download, BookOpen, Search, Check, Plus, Minus, 
  ShoppingBag, ShieldCheck, ExternalLink, Award, Sparkles, AlertCircle, MessageSquare
} from 'lucide-react';
import { AttaLogo } from './AttaLogo';
import { 
  CUSTOM_SNACK_ITEMS, 
  DRINK_OPTIONS, 
  CERTIFICATIONS, 
  FACEBOOK_URL, 
  MIN_ORDER_BOXES, 
  formatRupiah 
} from '../data/customSnacksData';
import { CustomSnackItem } from '../types';

interface KatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: () => void;
}

export const KatalogModal: React.FC<KatalogModalProps> = ({ isOpen, onClose, onOpenOrder }) => {
  const [activeTab, setActiveTab] = useState<'daftar' | 'builder' | 'info'>('daftar');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'asin' | 'manis' | 'buah_camilan'>('all');

  // Custom Box Builder State
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>('drink-none');
  const [boxQuantity, setBoxQuantity] = useState<number>(MIN_ORDER_BOXES);

  if (!isOpen) return null;

  // Filter items
  const filteredItems = CUSTOM_SNACK_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Builder calculations
  const selectedDrink = DRINK_OPTIONS.find((d) => d.id === selectedDrinkId) || DRINK_OPTIONS[0];

  const entries = Object.entries(selectedItems) as [string, number][];
  const values = Object.values(selectedItems) as number[];

  const snackCostPerBox = entries.reduce((sum, [itemId, count]) => {
    const item = CUSTOM_SNACK_ITEMS.find((s) => s.id === itemId);
    if (!item || count <= 0) return sum;
    return sum + item.price * count;
  }, 0);

  const drinkCostPerBox = selectedDrink.price;
  const totalCostPerBox = snackCostPerBox + drinkCostPerBox;
  const grandTotal = totalCostPerBox * boxQuantity;

  const totalItemsInBox = values.reduce((a, b) => a + b, 0);

  const handleAddItemToBox = (item: CustomSnackItem) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemoveItemFromBox = (itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const handleDownloadPdf = () => {
    alert('Brochure Katalog Digital ATTA Snack Box (PDF) resmi berhasil diunduh!');
  };

  const handleSendWhatsAppOrder = () => {
    if (boxQuantity < MIN_ORDER_BOXES) {
      alert(`Minimal pemesanan Snack Box Custom adalah ${MIN_ORDER_BOXES} box.`);
      return;
    }

    if (totalItemsInBox === 0) {
      alert('Pilih minimal 1 varian snack untuk dimasukkan ke dalam Snack Box Custom Anda.');
      return;
    }

    const itemDetailsList = entries
      .map(([itemId, count]) => {
        const item = CUSTOM_SNACK_ITEMS.find((s) => s.id === itemId);
        if (!item || count <= 0) return null;
        return `• ${item.name} (${count}x @ ${item.formattedPrice})`;
      })
      .filter(Boolean)
      .join('\n');

    const drinkText = selectedDrink.id !== 'drink-none' 
      ? `\n• Minuman: ${selectedDrink.name} (+${formatRupiah(selectedDrink.price)})`
      : '\n• Minuman: Tanpa Minuman';

    const text = 
`Halo ATTA Snack Box, saya ingin pesan Custom Snack Box:

*Detail Isian Per Box:*
${itemDetailsList}${drinkText}

*Estimasi Harga Per Box:* ${formatRupiah(totalCostPerBox)}
*Jumlah Box:* ${boxQuantity} Box
*TOTAL ESTIMASI:* ${formatRupiah(grandTotal)}

Mohon info ketersediaan dan konfirmasi tanggal pengiriman. Terima kasih!`;

    const encoded = encodeURIComponent(text);
    window.open('https://wa.me/6285263150282?text=' + encoded, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#14151C] border border-white/15 rounded-2xl w-full max-w-4xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#111218] shrink-0">
          <div className="flex items-center gap-3">
            <AttaLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  Katalog Digital ATTA Snack Box
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#EAB308] text-[10px] font-bold uppercase">
                  Daftar Menu 2024
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Pilihan snack asin, gurih, manis, dessert & camilan segar custom box.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
            >
              <ExternalLink size={12} />
              Facebook ATTA
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-white/10 bg-[#0B0C10] px-4 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('daftar')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'daftar'
                ? 'border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen size={14} />
            Daftar Menu & Harga ({CUSTOM_SNACK_ITEMS.length})
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap relative ${
              activeTab === 'builder'
                ? 'border-[#4ADE80] text-[#4ADE80] bg-[#4ADE80]/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles size={14} className="text-[#4ADE80]" />
            Simulasi Custom Box
            {totalItemsInBox > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#4ADE80] text-[#0B0C10] text-[10px] font-black">
                {totalItemsInBox}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck size={14} />
            Ketentuan & Halal
          </button>
        </div>

        {/* Tab 1: Daftar Menu & Harga */}
        {activeTab === 'daftar' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Search and Category Filter Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#181A24] p-3 rounded-xl border border-white/10">
              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari menu (ex: Risoles, Brownies, Pie...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111218] text-white text-xs pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:border-[#EAB308] outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'bg-[#EAB308] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Semua ({CUSTOM_SNACK_ITEMS.length})
                </button>

                <button
                  onClick={() => setCategoryFilter('asin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === 'asin'
                      ? 'bg-[#EAB308] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Asin & Gurih (19)
                </button>

                <button
                  onClick={() => setCategoryFilter('manis')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === 'manis'
                      ? 'bg-[#EAB308] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Manis & Dessert (34)
                </button>

                <button
                  onClick={() => setCategoryFilter('buah_camilan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === 'buah_camilan'
                      ? 'bg-[#EAB308] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Buah & Camilan (9)
                </button>
              </div>
            </div>

            {/* Minimum Order Info Banner */}
            <div className="bg-[#EAB308]/10 border border-[#EAB308]/30 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#EAB308] font-medium">
                <AlertCircle size={16} className="shrink-0" />
                <span><strong>Catatan Pemesanan Custom:</strong> Minimal Snack Custom <strong>25 Box</strong>. Belum termasuk Air Mineral/Teh Kotak.</span>
              </div>
              <button
                onClick={() => setActiveTab('builder')}
                className="px-3 py-1 bg-[#EAB308] text-black font-bold text-[11px] rounded-lg hover:bg-[#CA8A04] transition-colors cursor-pointer uppercase flex items-center gap-1"
              >
                <Sparkles size={12} />
                Mulai Custom Box
              </button>
            </div>

            {/* Menu Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-[#181A24] rounded-2xl border border-white/10 text-gray-400 space-y-2">
                <p className="text-sm">Tidak ditemukan menu dengan kata kunci "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
                  className="text-xs text-[#EAB308] underline cursor-pointer"
                >
                  Reset Pencarian & Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredItems.map((snack) => {
                  const inBoxQty = selectedItems[snack.id] || 0;

                  return (
                    <div
                      key={snack.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                        inBoxQty > 0
                          ? 'bg-[#1F2230] border-[#4ADE80]/60 shadow-[0_0_12px_rgba(74,222,128,0.15)]'
                          : 'bg-[#181A24] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 text-gray-400">
                            {snack.category === 'asin' ? 'Asin & Gurih' : snack.category === 'manis' ? 'Manis & Dessert' : 'Buah & Camilan'}
                          </span>
                          <h4 className="font-bold text-white text-sm mt-1">{snack.name}</h4>
                        </div>
                        <span className="font-bold text-[#EAB308] text-sm shrink-0 bg-[#EAB308]/10 px-2.5 py-1 rounded-lg border border-[#EAB308]/30">
                          {snack.formattedPrice}
                        </span>
                      </div>

                      {/* Add to Box controls */}
                      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                        {inBoxQty > 0 ? (
                          <div className="flex items-center justify-between w-full bg-[#111218] p-1 rounded-lg border border-[#4ADE80]/40">
                            <span className="text-[11px] text-[#4ADE80] font-bold px-2">
                              Di Custom Box: {inBoxQty}x
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleRemoveItemFromBox(snack.id)}
                                className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <button
                                onClick={() => handleAddItemToBox(snack)}
                                className="w-6 h-6 rounded bg-[#4ADE80] text-black font-bold flex items-center justify-center text-xs cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddItemToBox(snack)}
                            className="w-full py-1.5 px-3 bg-white/5 hover:bg-[#EAB308]/20 text-gray-200 hover:text-[#EAB308] font-semibold text-xs rounded-lg border border-white/10 hover:border-[#EAB308]/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Plus size={13} />
                            Tambah ke Box Custom
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Snack Box Builder */}
        {activeTab === 'builder' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Selected Items & Drink Picker */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Selected Snacks Section */}
                <div className="bg-[#181A24] p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-[#4ADE80]" />
                      <h4 className="font-bold text-white text-base">Varian Snack Terpilih dalam Box</h4>
                    </div>
                    <span className="text-xs text-gray-400">
                      Total Isian: <strong className="text-white">{totalItemsInBox} Jenis Snack</strong>
                    </span>
                  </div>

                  {totalItemsInBox === 0 ? (
                    <div className="text-center py-8 bg-[#111218] rounded-xl border border-dashed border-white/10 space-y-3">
                      <ShoppingBag size={32} className="mx-auto text-gray-500" />
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        Belum ada snack yang dipilih. Silakan pilih menu dari Katalog Daftar Harga untuk meracik Snack Box impian Anda.
                      </p>
                      <button
                        onClick={() => setActiveTab('daftar')}
                        className="px-4 py-2 bg-[#EAB308] text-black font-bold text-xs rounded-lg hover:bg-[#CA8A04] transition-colors cursor-pointer uppercase inline-flex items-center gap-1.5"
                      >
                        <BookOpen size={14} />
                        Buka Katalog Menu
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {entries.map(([itemId, count]) => {
                        const snack = CUSTOM_SNACK_ITEMS.find((s) => s.id === itemId);
                        if (!snack || count <= 0) return null;

                        return (
                          <div
                            key={itemId}
                            className="flex items-center justify-between p-3 bg-[#111218] rounded-xl border border-white/5"
                          >
                            <div>
                              <p className="font-bold text-white text-xs">{snack.name}</p>
                              <p className="text-[11px] text-[#EAB308]">{snack.formattedPrice} / pcs</p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-gray-300">
                                {formatRupiah(snack.price * count)}
                              </span>
                              <div className="flex items-center gap-1 bg-[#181A24] p-1 rounded-lg border border-white/10">
                                <button
                                  onClick={() => handleRemoveItemFromBox(itemId)}
                                  className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs cursor-pointer"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="w-5 text-center text-xs font-bold text-white">
                                  {count}
                                </span>
                                <button
                                  onClick={() => handleAddItemToBox(snack)}
                                  className="w-5 h-5 rounded bg-[#4ADE80] text-black font-bold flex items-center justify-center text-xs cursor-pointer"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {totalItemsInBox > 0 && (
                    <button
                      onClick={() => setActiveTab('daftar')}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 rounded-lg border border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} />
                      Tambah Menu Snack Lainnya
                    </button>
                  )}
                </div>

                {/* Option Minuman */}
                <div className="bg-[#181A24] p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="font-bold text-white text-sm">Pilihan Tambahan Minuman</h4>
                    <span className="text-[11px] text-gray-400">Sesuai Catatan NB</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DRINK_OPTIONS.map((drink) => (
                      <button
                        key={drink.id}
                        onClick={() => setSelectedDrinkId(drink.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          selectedDrinkId === drink.id
                            ? 'bg-[#EAB308]/15 border-[#EAB308] text-white shadow-sm'
                            : 'bg-[#111218] border-white/5 hover:border-white/15 text-gray-300'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-xs">{drink.name}</p>
                          <p className="text-[11px] text-[#EAB308]">
                            {drink.price === 0 ? 'Tanpa Tambahan' : `+${formatRupiah(drink.price)} / box`}
                          </p>
                        </div>
                        {selectedDrinkId === drink.id && (
                          <Check size={16} className="text-[#EAB308]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right 1 Col: Summary & WhatsApp Action */}
              <div className="space-y-4">
                <div className="bg-[#181A24] p-5 rounded-2xl border border-white/10 space-y-5 sticky top-0">
                  <h4 className="font-bold text-white text-base border-b border-white/10 pb-3 uppercase tracking-wider">
                    Ringkasan Custom Box
                  </h4>

                  {/* Quantity Box Stepper */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-semibold block">
                      Jumlah Pesanan Box (Min {MIN_ORDER_BOXES} Box):
                    </label>
                    <div className="flex items-center justify-between bg-[#111218] p-2 rounded-xl border border-white/10">
                      <button
                        onClick={() => setBoxQuantity((q) => Math.max(MIN_ORDER_BOXES, q - 5))}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                      >
                        -5
                      </button>
                      <div className="text-center">
                        <span className="text-lg font-bold text-[#EAB308]">{boxQuantity}</span>
                        <span className="text-[10px] text-gray-400 block">Box</span>
                      </div>
                      <button
                        onClick={() => setBoxQuantity((q) => q + 5)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                      >
                        +5
                      </button>
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-2 text-xs border-t border-b border-white/10 py-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Snack per Box:</span>
                      <span className="font-bold text-white">{formatRupiah(snackCostPerBox)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minuman per Box:</span>
                      <span className="font-bold text-white">{formatRupiah(drinkCostPerBox)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-white/5">
                      <span>Harga 1 Box:</span>
                      <span className="text-[#EAB308]">{formatRupiah(totalCostPerBox)}</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="bg-[#111218] p-3.5 rounded-xl border border-[#4ADE80]/30 space-y-1">
                    <span className="text-[11px] text-gray-400 block uppercase font-mono">
                      Estimasi Total ({boxQuantity} Box):
                    </span>
                    <span className="text-2xl font-black text-[#4ADE80] block">
                      {formatRupiah(grandTotal)}
                    </span>
                  </div>

                  {/* Order via WA button */}
                  <button
                    onClick={handleSendWhatsAppOrder}
                    className="w-full py-3.5 bg-[#4ADE80] hover:bg-[#38C172] text-[#0B0C10] font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} className="fill-[#0B0C10]" />
                    Pesan Custom via WA
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">
                    Guna kepastian stok & pesanan khusus, hubungi customer service kami di WhatsApp.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Informasi Ketentuan & Halal */}
        {activeTab === 'info' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Certifications Banner */}
            <div className="bg-gradient-to-r from-[#181A24] via-[#1F2230] to-[#181A24] p-6 rounded-2xl border border-[#EAB308]/40 space-y-4 text-center relative overflow-hidden">
              <div className="flex justify-center items-center gap-3 mb-2">
                <AttaLogo size="lg" />
                <div className="text-left">
                  <h4 className="text-lg font-bold text-white">Jaminan Mutu & Kehalalan ATTA</h4>
                  <p className="text-xs text-[#EAB308] font-mono uppercase tracking-wider">Teratas Karena Kualitas</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="px-4 py-2 rounded-xl bg-black/60 border border-[#EAB308]/50 text-[#EAB308] font-bold text-xs flex items-center gap-2 shadow-inner"
                  >
                    <Award size={16} />
                    {cert.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#181A24] p-5 rounded-xl border border-white/10 space-y-2">
                <h5 className="font-bold text-[#EAB308] text-sm flex items-center gap-2">
                  <Check size={16} />
                  Ketentuan Minimum Order
                </h5>
                <p className="text-gray-300 leading-relaxed">
                  Pemesanan Snack Box Custom memiliki batas minimum sejumlah <strong>25 Box</strong>. Anda bebas mengombinasikan pilihan varian kue asin, gurih, manis, maupun buah.
                </p>
              </div>

              <div className="bg-[#181A24] p-5 rounded-xl border border-white/10 space-y-2">
                <h5 className="font-bold text-[#4ADE80] text-sm flex items-center gap-2">
                  <Check size={16} />
                  Pilihan Tambahan Minuman
                </h5>
                <p className="text-gray-300 leading-relaxed">
                  Harga dasar snack belum termasuk pilihan minuman. Anda dapat menambahkan Air Mineral Gelas, Air Mineral Botol, maupun Teh Kotak sesuai kebutuhan acara.
                </p>
              </div>

              <div className="bg-[#181A24] p-5 rounded-xl border border-white/10 space-y-2">
                <h5 className="font-bold text-[#EAB308] text-sm flex items-center gap-2">
                  <Check size={16} />
                  Kemasan Higienis & Box Premium
                </h5>
                <p className="text-gray-300 leading-relaxed">
                  Setiap kue dikemas rapi dengan standar higienis tinggi dalam kotak eksklusif ATTA Snack Box yang cocok untuk acara resmi, rapat kantor, maupun syukuran.
                </p>
              </div>

              <div className="bg-[#181A24] p-5 rounded-xl border border-white/10 space-y-2">
                <h5 className="font-bold text-[#4ADE80] text-sm flex items-center gap-2">
                  <ExternalLink size={16} />
                  Halaman Resmi Facebook
                </h5>
                <p className="text-gray-300 leading-relaxed mb-2">
                  Kunjungi Facebook resmi ATTA Snack Box untuk melihat dokumentasi acara & testimoni pelanggan:
                </p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#EAB308] hover:underline font-bold text-xs inline-flex items-center gap-1"
                >
                  facebook.com/ATTASnackBoc <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Actions footer inside info tab */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleDownloadPdf}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <Download size={14} />
                Unduh PDF Brochure Katalog
              </button>

              <button
                onClick={() => setActiveTab('builder')}
                className="px-6 py-2.5 bg-[#4ADE80] text-[#0B0C10] font-bold text-xs rounded-xl hover:bg-[#38C172] transition-colors cursor-pointer uppercase flex items-center gap-2"
              >
                <Sparkles size={14} />
                Mulai Buat Snack Box Custom
              </button>
            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#111218] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-3 text-gray-400">
            <span className="flex items-center gap-1 text-[#EAB308]">
              🏅 Halal MUI & Kemenag RI
            </span>
            <span className="hidden sm:inline">• Minimal Custom 25 Box</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-colors cursor-pointer"
          >
            Tutup Katalog
          </button>
        </div>

      </div>
    </div>
  );
};
