export interface MenuItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  asinGurih: string;
  manis: string;
  minuman: string;
  customNotes?: string;
  isCustom?: boolean;
  popular?: boolean;
}

export interface CateringTier {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  actionText: string;
  itemsIncluded: string[];
  minOrder: string;
}

export interface GoldProduct {
  id: string;
  title: string;
  priceFormatted: string;
  priceUsd: string;
  numericPrice: number;
  rating: number;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

export interface CartItem {
  item: MenuItem | GoldProduct;
  quantity: number;
  customNotes?: string;
}

export interface CustomSnackItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: 'asin' | 'manis' | 'buah_camilan';
}

export interface CustomBoxSelection {
  selectedItems: { item: CustomSnackItem; count: number }[];
  drinkOption?: { name: string; price: number };
  boxQuantity: number;
}

export interface OrderTrack {
  id: string;
  customerName: string;
  date: string;
  status: 'received' | 'preparing' | 'delivering' | 'completed';
  itemsSummary: string;
  totalAmount: string;
  deliveryAddress: string;
}

