import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DaftarMenu } from './components/DaftarMenu';
import { BespokeTiers } from './components/BespokeTiers';
import { GoldSelection } from './components/GoldSelection';
import { Testimonials } from './components/Testimonials';
import { SecureDate } from './components/SecureDate';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { KatalogModal } from './components/KatalogModal';
import { BayarModal } from './components/BayarModal';
import { StatusModal } from './components/StatusModal';
import { OurStoryModal } from './components/OurStoryModal';

import { CustomCatalogSection } from './components/CustomCatalogSection';
import { NasiBoxSection } from './components/NasiBoxSection';
import { WhatsAppBotWidget } from './components/WhatsAppBotWidget';
import { MenuItem, CateringTier, GoldProduct, CartItem } from './types';
import { INITIAL_MENU_LIST, CATERING_TIERS, GOLD_SELECTION_ITEMS, TESTIMONIALS } from './data/mockData';

export default function App() {
  const [menuList, setMenuList] = useState<MenuItem[]>(INITIAL_MENU_LIST);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modals state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isKatalogModalOpen, setIsKatalogModalOpen] = useState(false);
  const [isBayarModalOpen, setIsBayarModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  // Add menu item or gold product to cart
  const handleAddToCart = (item: MenuItem | GoldProduct, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { item, quantity }];
    });
    setIsOrderModalOpen(true);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#E2E8F0] font-sans-body selection:bg-[#4ADE80] selection:text-[#0B0C10]">
      {/* Navigation */}
      <Navbar
        onOpenKatalog={() => setIsKatalogModalOpen(true)}
        onOpenBayar={() => setIsBayarModalOpen(true)}
        onOpenStatus={() => setIsStatusModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onViewCollection={() => {
            const el = document.getElementById('daftar-menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStory={() => setIsStoryModalOpen(true)}
        />

        {/* Daftar Menu Grid (6 items from design) */}
        <DaftarMenu
          menuList={menuList}
          onOrderMenu={(item, qty) => handleAddToCart(item, qty)}
          onUpdateMenu={(updated) => setMenuList(updated)}
        />

        {/* Complete Custom Snack Catalog & Pricelist (50+ Items) */}
        <CustomCatalogSection
          onOpenKatalog={() => setIsKatalogModalOpen(true)}
        />

        {/* Nasi Box Spesial ATTA Section */}
        <NasiBoxSection
          onOrderNasiBox={(title, priceFormatted, numericPrice) => {
            const item: MenuItem = {
              id: `nb-${Date.now()}`,
              title: title,
              price: priceFormatted,
              numericPrice: numericPrice,
              asinGurih: 'Nasi Putih + Lauk Utama',
              manis: 'Pelengkap + Perkedel / Mie',
              minuman: 'Bonus Air Mineral Gelas AQUA'
            };
            handleAddToCart(item, 1);
          }}
        />

        {/* Bespoke Catering Tiers */}
        <BespokeTiers
          tiers={CATERING_TIERS}
          onSelectTier={(tier) => {
            setIsOrderModalOpen(true);
          }}
        />

        {/* The Gold Selection Carousel */}
        <GoldSelection
          items={GOLD_SELECTION_ITEMS}
          onOrderGoldItem={(product) => handleAddToCart(product, 1)}
        />

        {/* Testimonials */}
        <Testimonials testimonials={TESTIMONIALS} />

        {/* Secure Your Date Form */}
        <SecureDate />
      </main>

      {/* Footer */}
      <Footer
        onOpenStory={() => setIsStoryModalOpen(true)}
        onOpenKatalog={() => setIsKatalogModalOpen(true)}
        onOpenBayar={() => setIsBayarModalOpen(true)}
      />

      {/* Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <KatalogModal
        isOpen={isKatalogModalOpen}
        onClose={() => setIsKatalogModalOpen(false)}
        onOpenOrder={() => setIsOrderModalOpen(true)}
      />

      <BayarModal
        isOpen={isBayarModalOpen}
        onClose={() => setIsBayarModalOpen(false)}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />

      <OurStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      {/* Floating Interactive WhatsApp Chatbot Widget */}
      <WhatsAppBotWidget
        onOpenKatalog={() => setIsKatalogModalOpen(true)}
        onOpenBayar={() => setIsBayarModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />
    </div>
  );
}
