import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, PhoneCall, Sparkles, CheckCheck, 
  ExternalLink, ShoppingBag, CreditCard, ShieldCheck, HelpCircle, ChevronRight
} from 'lucide-react';
import { AttaLogo } from './AttaLogo';
import { WA_PHONE_NUMBER, DISPLAY_WA_NUMBER, MIN_ORDER_BOXES, FACEBOOK_URL } from '../data/customSnacksData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickAction?: { label: string; action: () => void };
}

interface WhatsAppBotWidgetProps {
  onOpenKatalog: () => void;
  onOpenBayar: () => void;
  onOpenOrderModal: () => void;
}

export const WhatsAppBotWidget: React.FC<WhatsAppBotWidgetProps> = ({
  onOpenKatalog,
  onOpenBayar,
  onOpenOrderModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Halo! 👋 Selamat datang di ATTA Snack Box (Teratas Karena Kualitas).\n\nSaya CS Assistant Otomatis ATTA. Ada yang bisa saya bantu untuk kebutuhan snack box & catering acara Anda?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const openWhatsAppDirect = (customText?: string) => {
    const text = customText || `Halo Admin ATTA Snack Box (${DISPLAY_WA_NUMBER}), saya mau konsultasi / pesan snack box.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WA_PHONE_NUMBER}?text=${encoded}`, '_blank');
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Process Bot Response after small delay
    setTimeout(() => {
      let botResponseText = '';
      const lower = text.toLowerCase();

      if (lower.includes('nasi') || lower.includes('nasi box') || lower.includes('rendang') || lower.includes('dendeng')) {
        botResponseText = `🍱 *Daftar Harga Nasi Box ATTA (Bonus Air Mineral Gelas):*\n\n*1 Protein:*\n• Dendeng / Rendang / Kalio: Rp 36.000,-\n• Ayam / Ikan: Rp 32.000,-\n\n*1½ Protein:*\n• Rendang/Dendeng/Kalio + Telur Balado: Rp 43.000,-\n• Ikan/Ayam + Telur Balado: Rp 40.000,-\n\n*2 Protein:*\n• Dendeng + Rendang/Kalio: Rp 48.000,-\n• Dendeng/Rendang/Kalio + Ayam: Rp 47.000,-\n• Dendeng/Rendang/Kalio + Ikan: Rp 47.000,-\n• Ayam + Ikan: Rp 46.000,-\n\nSetiap Nasi Box dilengkapi Nasi Putih, Perkedel/Mie, Buah, Kerupuk, Sambal & Bonus Air Mineral Gelas. Hubungi CS di ${DISPLAY_WA_NUMBER} untuk pemesanan!`;
      } else if (lower.includes('harga') || lower.includes('menu') || lower.includes('katalog') || lower.includes('variasi')) {
        botResponseText = `📋 *Daftar Menu & Harga ATTA Snack Box:*\n\n• *Asin & Gurih* (mulai Rp 3.000): Risoles, Pastel, Lumpia, Samosa, Tahu Schotel, Kroket, Macaroni, dll.\n• *Manis & Dessert* (mulai Rp 3.000): Kue Lumpur, Lemper Ayam, Brownies, Pie Buah, Puding, Eclair, Klepon, Putu Ayu, dll.\n• *Buah & Camilan* (mulai Rp 4.000): Buah Potong, Jeruk, Pisang, Salak, Kacang Telur, Kue Bawang.\n\nKlik tombol di bawah untuk membuka Katalog Digital lengkap & simulasi Custom Box!`;
      } else if (lower.includes('minimal') || lower.includes('min') || lower.includes('box') || lower.includes('jumlah')) {
        botResponseText = `📦 *Ketentuan Minimal Pemesanan:*\n\nMinimal pemesanan Snack Custom ATTA adalah *${MIN_ORDER_BOXES} Box*.\nAnda bebas mencampur varian kue asin, gurih, manis, maupun buah dalam 1 box sesuai budget acara Anda.`;
      } else if (lower.includes('minuman') || lower.includes('air') || lower.includes('teh')) {
        botResponseText = `🥤 *Pilihan Minuman Tambahan:*\n\n• Air Mineral Gelas (+Rp 1.000/box)\n• Air Mineral Botol (+Rp 3.000/box)\n• Teh Kotak (+Rp 4.000/box)\n\nMinuman dipacking rapi bersama snack box Anda.`;
      } else if (lower.includes('halal') || lower.includes('sertifikat') || lower.includes('jaminan')) {
        botResponseText = `🏅 *Jaminan Kehalalan & Kualitas ATTA:*\n\nATTA Snack Box telah mengantongi:\n1. Sertifikat Halal MUI\n2. Sertifikat Halal Kemenag RI\n\nDijamin 100% Halal, higienis, dan menggunakan bahan baku premium berkualitas tinggi.`;
      } else if (lower.includes('bayar') || lower.includes('rekening') || lower.includes('bni') || lower.includes('bri') || lower.includes('bsi') || lower.includes('transfer')) {
        botResponseText = `💳 *Metode Pembayaran Resmi ATTA Snack Box:*\n\n1. *Bank BNI:* 1865849588 (a/n Susi Taherawati)\n2. *Bank BRI:* 546401001857504 (a/n Susi Taherawati, SE)\n3. *Bank BSI:* 7158291180 (a/n Susi Taherawati)\n4. *QRIS All Payment:* Gopay, OVO, ShopeePay, Dana, LinkAja\n\nMohon kirimkan foto/bukti transfer setelah melakukan pembayaran ke WA CS kami di ${DISPLAY_WA_NUMBER}.`;
      } else {
        botResponseText = `Terima kasih pesan Anda! 😊\n\nUntuk respon paling cepat dan pemesanan langsung, silakan klik tombol di bawah ini untuk terhubung langsung dengan Customer Service ATTA di WhatsApp (*${DISPLAY_WA_NUMBER}*).`;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto animate-fade-in">
        {!isOpen && unreadCount > 0 && (
          <div className="bg-[#14151C] border border-[#4ADE80]/50 px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce text-xs font-bold text-[#4ADE80]">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
            CS Online ({DISPLAY_WA_NUMBER})
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center"
          aria-label="WhatsApp CS Bot"
        >
          {isOpen ? (
            <X size={26} className="text-black" />
          ) : (
            <>
              <MessageSquare size={26} className="fill-black text-black" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-[#0B0C10]">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Box Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] max-h-[580px] h-[82vh] bg-[#14151C] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#111218] p-4 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AttaLogo size="md" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ADE80] border-2 border-[#111218] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                  CS ATTA Snack Box
                  <span className="text-[10px] bg-[#4ADE80]/20 text-[#4ADE80] px-1.5 py-0.2 rounded font-mono font-bold">
                    OFFICIAL
                  </span>
                </h4>
                <p className="text-[11px] text-gray-400 font-mono">
                  WhatsApp: <span className="text-[#4ADE80] font-bold">{DISPLAY_WA_NUMBER}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => openWhatsAppDirect()}
                className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors cursor-pointer"
                title="Direct Chat WhatsApp"
              >
                <PhoneCall size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0D0E12]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#EAB308] text-black font-medium rounded-tr-none'
                      : 'bg-[#1C1E2A] text-gray-200 border border-white/10 rounded-tl-none space-y-2'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="p-2.5 bg-[#111218] border-t border-white/10 flex items-center gap-1.5 overflow-x-auto shrink-0">
            <button
              onClick={() => {
                handleSendMessage('Daftar harga menu snack');
                onOpenKatalog();
              }}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShoppingBag size={12} className="text-[#EAB308]" />
              Katalog Menu
            </button>

            <button
              onClick={() => handleSendMessage('Berapa minimal pemesanan snack box?')}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer"
            >
              📦 Min 25 Box
            </button>

            <button
              onClick={() => {
                handleSendMessage('Info rekening pembayaran');
                onOpenBayar();
              }}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
            >
              <CreditCard size={12} className="text-[#4ADE80]" />
              Rekening Bayar
            </button>

            <button
              onClick={() => handleSendMessage('Apakah produk ATTA Halal MUI?')}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck size={12} className="text-[#EAB308]" />
              Halal MUI
            </button>
          </div>

          {/* Direct WhatsApp Callout Button */}
          <div className="px-3 py-2 bg-[#181A24] border-t border-white/5 flex items-center justify-between shrink-0">
            <span className="text-[10px] text-gray-400">
              Langsung dengan Admin:
            </span>
            <button
              onClick={() => openWhatsAppDirect()}
              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              Chat WA {DISPLAY_WA_NUMBER}
              <ExternalLink size={12} />
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#111218] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pertanyaan / pesan Anda..."
              className="flex-1 bg-[#0D0E12] text-white text-xs px-3 py-2 rounded-xl border border-white/10 focus:border-[#4ADE80] outline-none"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#4ADE80] hover:bg-[#38C172] text-black font-bold rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
