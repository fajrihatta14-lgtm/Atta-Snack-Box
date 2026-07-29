import { MenuItem, CateringTier, GoldProduct, Testimonial, OrderTrack } from '../types';

export const INITIAL_MENU_LIST: MenuItem[] = [
  {
    id: 'snack-box-premium',
    title: 'Snack Box Premium',
    price: 'Rp 18.000',
    numericPrice: 18000,
    asinGurih: 'Asin/Gurih 1 pcs',
    manis: 'Manis 3 pcs',
    minuman: 'Minuman 1 pcs',
    popular: true
  },
  {
    id: 'snack-box-vip',
    title: 'Snack Box VIP',
    price: 'Rp 16.000',
    numericPrice: 16000,
    asinGurih: 'Asin/Gurih 1 pcs',
    manis: 'Manis 2 pcs',
    minuman: 'Minuman 1 pcs'
  },
  {
    id: 'snack-box-bisnis',
    title: 'Snack Box Bisnis',
    price: 'Rp 14.000',
    numericPrice: 14000,
    asinGurih: 'Asin/Gurih 1 pcs',
    manis: 'Manis 2 pcs',
    minuman: 'Minuman 1 pcs'
  },
  {
    id: 'snack-box-ekonomis',
    title: 'Snack Box Ekonomis',
    price: 'Rp 11.000',
    numericPrice: 11000,
    asinGurih: 'Asin/Gurih 1 pcs',
    manis: 'Manis 2 pcs',
    minuman: 'Minuman 1 pcs'
  },
  {
    id: 'snack-box-hemat',
    title: 'Snack Box Hemat',
    price: 'Rp 7.000',
    numericPrice: 7000,
    asinGurih: 'Asin/Gurih 1 pcs',
    manis: 'Manis 1 pcs',
    minuman: 'Minuman 1 pcs'
  },
  {
    id: 'snack-box-custom',
    title: 'Snack Box Custom',
    price: 'Hubungi admin',
    numericPrice: 0,
    asinGurih: 'Snack & minuman bisa request',
    manis: 'Minimal 25 box per item kue',
    minuman: 'Cocok untuk acara kantor & keluarga',
    isCustom: true
  }
];

export const CATERING_TIERS: CateringTier[] = [
  {
    id: 'atta-snack-box',
    badge: 'OUR SIGNATURE',
    title: 'The ATTA Snack Box',
    description: 'Artisanal bites curated for elite corporate gatherings and networking events.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
    actionText: 'EXPLORE TIER →',
    itemsIncluded: [
      'Gourmet Savory Pastries (Quiche, Risoles Smoked Beef)',
      'Artisanal Sweets (Eclair, French Macaron, Opera Cake Slice)',
      'Premium Cold Brew / Organic Fresh Juice',
      'Luxury Textured Box Packaging with Gold Embossed Seal'
    ],
    minOrder: '20 Box'
  },
  {
    id: 'signature-nasi-box',
    badge: 'SIGNATURE',
    title: 'Signature Nasi Box',
    description: 'A modern elevation of traditional Indonesian cuisine.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    actionText: 'VIEW MENU →',
    itemsIncluded: [
      'Nasi Begana / Nasi Jeruk Rempah / Nasi Liwet Wangi',
      'Ayam Goreng Lengkuas / Empal Gepuk Daging Sapi',
      'Sambal Goreng Udang Petai / Cumi Cabai Hijau',
      'Kerupuk Udang Super & Sambal Bajak Signature',
      'Sendok Kayu Ramah Lingkungan & Tisue Premium'
    ],
    minOrder: '15 Box'
  }
];

export const GOLD_SELECTION_ITEMS: GoldProduct[] = [
  {
    id: 'gold-leaf-croissant',
    title: 'Gold-Leaf Croissant',
    priceFormatted: 'Rp 120.000',
    priceUsd: '$12.00',
    numericPrice: 120000,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
    description: 'Fresh French butter croissant topped with edible 24K gold leaf and filled with vanilla bean cream.'
  },
  {
    id: 'signature-truffle-box',
    title: 'Signature Truffle Box',
    priceFormatted: 'Rp 450.000',
    priceUsd: '$45.00',
    numericPrice: 450000,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted Valrhona dark chocolate truffles infused with hazelnut praline and gold dust flakes.'
  },
  {
    id: 'artisanal-macaron-collection',
    title: 'Artisanal Macaron Collection',
    priceFormatted: 'Rp 250.000',
    priceUsd: '$25.00',
    numericPrice: 250000,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop',
    description: 'Set of 12 delicate French macarons with pistachio, salted caramel, Earl Grey, and raspberry ganache.'
  },
  {
    id: 'diamond-opera-cake-box',
    title: 'Diamond Opera Cake Box',
    priceFormatted: 'Rp 380.000',
    priceUsd: '$38.00',
    numericPrice: 380000,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    description: 'Layers of almond sponge cake soaked in coffee syrup, layered with ganache and coffee buttercream.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    stars: 5,
    quote: 'ATTA provided the catering for our annual luxury gala. The attention to detail in the packaging was as impressive as the food itself.',
    author: 'Eleanor Sterling',
    title: 'Director, Sterling & Co.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'testi-2',
    stars: 5,
    quote: 'The Nasi Box elevation is spectacular. It\'s difficult to find traditional flavors presented with such sophisticated modern flair.',
    author: 'Marcus Thorne',
    title: 'Private Client',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

export const SAMPLE_ORDER_TRACKS: OrderTrack[] = [
  {
    id: 'ATTA-8821',
    customerName: 'Bapak Hendra (PT Bank Mega)',
    date: 'Hari ini, 10:30 WIB',
    status: 'delivering',
    itemsSummary: '50x Snack Box Premium, 2x Signature Truffle Box',
    totalAmount: 'Rp 1.800.000',
    deliveryAddress: 'Gedung Menara Mandiri Lt. 18, Jl. Jend Sudirman, Jakarta Selatan'
  },
  {
    id: 'ATTA-8822',
    customerName: 'Ibu Ratna Sterling',
    date: 'Kemarin, 14:00 WIB',
    status: 'completed',
    itemsSummary: '100x Snack Box VIP',
    totalAmount: 'Rp 1.600.000',
    deliveryAddress: 'The Langham Jakarta, Ballroom 2'
  }
];
