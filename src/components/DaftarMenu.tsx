import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Edit2, Check, Plus, Minus, ShoppingCart, Sparkles, MessageSquare } from 'lucide-react';

interface DaftarMenuProps {
  menuList: MenuItem[];
  onOrderMenu: (item: MenuItem, qty: number) => void;
  onUpdateMenu?: (updatedList: MenuItem[]) => void;
}

export const DaftarMenu: React.FC<DaftarMenuProps> = ({
  menuList,
  onOrderMenu,
  onUpdateMenu
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<MenuItem | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const handleQtyChange = (id: string, delta: number) => {
    setSelectedQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const saveEditing = () => {
    if (editForm && onUpdateMenu) {
      const updated = menuList.map((m) => (m.id === editForm.id ? editForm : m));
      onUpdateMenu(updated);
    }
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <section id="daftar-menu" className="py-20 px-4 lg:px-8 bg-[#0B0C10] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/30 text-[#4ADE80] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles size={14} />
            PAKET SNACK BOX RESMI ATTA
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Daftar Menu <span className="text-[#4ADE80]">Snack Box</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Paket Snack Box Komplit, Lezat, & Higienis. Anda dapat langsung memesan atau menekan tombol pensil <span className="text-[#4ADE80] font-bold">Edit</span> untuk menyesuaikan rincian isi menu!
          </p>
        </div>

        {/* Grid of 6 Snack Box Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuList.map((item) => {
            const qty = selectedQuantities[item.id] || 1;
            const isEditing = editingId === item.id;

            return (
              <div
                key={item.id}
                className="relative bg-[#1A1C23] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#4ADE80]/40 transition-all duration-300 group shadow-lg"
              >
                {/* Popular badge */}
                {item.popular && (
                  <div className="absolute -top-3 right-6 bg-[#EAB308] text-black text-[10px] font-bold tracking-wider px-3 py-0.5 rounded-full uppercase flex items-center gap-1 shadow">
                    <Sparkles size={11} />
                    Paling Laris
                  </div>
                )}

                <div>
                  {/* Card Title & Edit Trigger */}
                  <div className="flex items-start justify-between mb-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm?.title || ''}
                        onChange={(e) => setEditForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="bg-[#242732] text-white px-2 py-1 text-base font-bold rounded border border-[#4ADE80] w-full mr-2"
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                    )}

                    {onUpdateMenu && (
                      <button
                        onClick={() => isEditing ? saveEditing() : startEditing(item)}
                        className="text-gray-400 hover:text-[#4ADE80] p-1 transition-colors cursor-pointer"
                        title={isEditing ? 'Simpan' : 'Edit Menu'}
                      >
                        {isEditing ? <Check size={16} className="text-[#4ADE80]" /> : <Edit2 size={14} />}
                      </button>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm?.price || ''}
                        onChange={(e) => setEditForm(prev => prev ? { ...prev, price: e.target.value } : null)}
                        className="bg-[#242732] text-[#4ADE80] px-2 py-1 text-base font-bold rounded border border-[#4ADE80] w-full"
                      />
                    ) : (
                      <span className="text-xl font-bold text-[#EAB308]">
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* Bullet points / inclusions */}
                  <div className="space-y-2 mb-8 text-xs text-gray-300">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editForm?.asinGurih || ''}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, asinGurih: e.target.value } : null)}
                          className="bg-[#242732] text-gray-200 px-2 py-1 rounded text-xs w-full"
                        />
                        <input
                          type="text"
                          value={editForm?.manis || ''}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, manis: e.target.value } : null)}
                          className="bg-[#242732] text-gray-200 px-2 py-1 rounded text-xs w-full"
                        />
                        <input
                          type="text"
                          value={editForm?.minuman || ''}
                          onChange={(e) => setEditForm(prev => prev ? { ...prev, minuman: e.target.value } : null)}
                          className="bg-[#242732] text-gray-200 px-2 py-1 rounded text-xs w-full"
                        />
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                          <span>{item.asinGurih}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                          <span>{item.manis}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                          <span>{item.minuman}</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Order Button */}
                <div>
                  {!item.isCustom && (
                    <div className="flex items-center justify-between bg-[#111218] px-3 py-1.5 rounded-lg mb-3 border border-white/5">
                      <span className="text-[11px] text-gray-400">Jumlah Box:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-white w-6 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.id, 1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => onOrderMenu(item, qty)}
                    className="w-full py-3 text-xs font-bold tracking-wider text-[#0B0C10] bg-[#4ADE80] hover:bg-[#38C172] rounded-xl transition-all shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] cursor-pointer uppercase flex items-center justify-center gap-2 active:scale-98"
                  >
                    <MessageSquare size={14} className="fill-[#0B0C10]" />
                    Order Menu Ini
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
