import React, { useState } from 'react';
import { MenuItem, GoldProduct, CartItem } from '../types';
import { X, Plus, Minus, Trash2, MessageSquare, Check, Calendar, MapPin, User, Phone } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = 'numericPrice' in item.item ? item.item.numericPrice : 0;
      return acc + price * item.quantity;
    }, 0);
  };

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(calculateTotal());

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let orderListText = '';
    if (cartItems.length > 0) {
      orderListText = cartItems
        .map((ci) => {
          const priceFormatted = 'price' in ci.item ? ci.item.price : ci.item.priceFormatted;
          return `• ${ci.quantity}x ${ci.item.title} (${priceFormatted})`;
        })
        .join('\n');
    } else {
      orderListText = '• Pemesanan/Konsultasi Snack Box Custom';
    }

    const message = `*PEMESANAN ATTA SNACK BOX*
----------------------------------------
*Nama:* ${customerName || '-'}
*No. WhatsApp:* ${phoneNum || '-'}
*Tanggal Acara:* ${eventDate || 'Segera'}
*Alamat Pengiriman:* ${deliveryAddress || 'Diambil Sendiri'}

*Rincian Pesanan:*
${orderListText}

*Catatan Tambahan:* ${notes || 'Tidak ada'}
*Estimasi Total:* ${calculateTotal() > 0 ? formattedTotal : 'Hubungi Admin'}
----------------------------------------
Mohon konfirmasi ketersediaan slot dan instruksi pembayarannya. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open('https://wa.me/6285263150282?text=' + encoded, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#14151C] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#14151C] z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/40 flex items-center justify-center text-[#4ADE80]">
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                Formulir Pemesanan WhatsApp
              </h3>
              <p className="text-[11px] text-gray-400">
                Lengkapi rincian acara untuk konfirmasi instan.
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

        <form onSubmit={handleSendWhatsApp} className="p-6 space-y-6 flex-1">
          {/* Cart Items Summary */}
          <div className="bg-[#0B0C10] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-gray-300 uppercase">Item Dipesan</span>
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[10px] text-red-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} />
                  Kosongkan
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-2">
                Belum ada item yang dipilih. Anda dapat memesan menu custom langsung lewat form ini.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {cartItems.map((ci) => (
                  <div key={ci.item.id} className="flex items-center justify-between bg-[#181A22] p-2.5 rounded-lg text-xs">
                    <div>
                      <h4 className="font-bold text-white">{ci.item.title}</h4>
                      <p className="text-[11px] text-[#EAB308]">
                        {'price' in ci.item ? ci.item.price : ci.item.priceFormatted}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-[#0B0C10] px-2 py-1 rounded border border-white/10">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(ci.item.id, -1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center font-bold text-white">{ci.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(ci.item.id, 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(ci.item.id)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {calculateTotal() > 0 && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                <span>Estimasi Subtotal:</span>
                <span className="text-[#4ADE80] text-sm">{formattedTotal}</span>
              </div>
            )}
          </div>

          {/* Customer Input Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Nama Pemesan *
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Bapak Hendra"
                    className="w-full bg-[#0B0C10] border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Nomor WhatsApp *
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="tel"
                    required
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full bg-[#0B0C10] border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Tanggal Acara / Pengiriman
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#0B0C10] border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Alamat Pengiriman
                </label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Gedung / Jalan / Area"
                    className="w-full bg-[#0B0C10] border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                Catatan Tambahan / Request Kue Special
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Request tanpa kacang, minta pita warna gold, dsb."
                className="w-full bg-[#0B0C10] border border-white/15 rounded-lg p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4ADE80]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 text-xs font-bold tracking-wider text-[#0B0C10] bg-[#4ADE80] hover:bg-[#38C172] rounded-xl transition-all shadow-[0_0_20px_rgba(74,222,128,0.3)] uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={16} className="fill-[#0B0C10]" />
            Kirim Pesanan Sekarang via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
