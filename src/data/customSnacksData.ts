import { CustomSnackItem } from '../types';

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount).replace('IDR', 'Rp').trim();
};

export const CUSTOM_SNACK_ITEMS: CustomSnackItem[] = [
  // --- ASIN DAN GURIH ---
  { id: 'asin-1', name: 'Risoles Sayur', price: 3000, formattedPrice: 'Rp 3.000', category: 'asin' },
  { id: 'asin-2', name: 'Risoles Ayam', price: 5000, formattedPrice: 'Rp 5.000', category: 'asin' },
  { id: 'asin-3', name: 'Risoles Sosis Mayo', price: 5000, formattedPrice: 'Rp 5.000', category: 'asin' },
  { id: 'asin-4', name: 'Pastel Sayur', price: 3000, formattedPrice: 'Rp 3.000', category: 'asin' },
  { id: 'asin-5', name: 'Pastel Ayam', price: 5000, formattedPrice: 'Rp 5.000', category: 'asin' },
  { id: 'asin-6', name: 'Tahu Crispy', price: 3000, formattedPrice: 'Rp 3.000', category: 'asin' },
  { id: 'asin-7', name: 'Tahu Schotel', price: 3000, formattedPrice: 'Rp 3.000', category: 'asin' },
  { id: 'asin-8', name: 'Tahu Sarang Burung', price: 4000, formattedPrice: 'Rp 4.000', category: 'asin' },
  { id: 'asin-9', name: 'Tahu Walik', price: 4000, formattedPrice: 'Rp 4.000', category: 'asin' },
  { id: 'asin-10', name: 'Lumpia Semarang', price: 10000, formattedPrice: 'Rp 10.000', category: 'asin' },
  { id: 'asin-11', name: 'Lumpia Sayur', price: 5000, formattedPrice: 'Rp 5.000', category: 'asin' },
  { id: 'asin-12', name: 'Samosa', price: 9000, formattedPrice: 'Rp 9.000', category: 'asin' },
  { id: 'asin-13', name: 'Bakwan', price: 3000, formattedPrice: 'Rp 3.000', category: 'asin' },
  { id: 'asin-14', name: 'Bakwan Udang', price: 5000, formattedPrice: 'Rp 5.000', category: 'asin' },
  { id: 'asin-15', name: 'Kroket Kentang', price: 8000, formattedPrice: 'Rp 8.000', category: 'asin' },
  { id: 'asin-16', name: 'Sosis Solo', price: 7000, formattedPrice: 'Rp 7.000', category: 'asin' },
  { id: 'asin-17', name: 'Goreng Pisang', price: 3000, formattedPrice: 'Rp 3.000', category: 'asin' },
  { id: 'asin-18', name: 'Macaroni Schotel Panggang', price: 10000, formattedPrice: 'Rp 10.000', category: 'asin' },
  { id: 'asin-19', name: 'Macaroni Schotel Goreng', price: 5000, formattedPrice: 'Rp 5.000', category: 'asin' },

  // --- MANIS DAN DESSERT ---
  { id: 'manis-1', name: 'Kue Lumpur', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-2', name: 'Lemper Ayam', price: 8000, formattedPrice: 'Rp 8.000', category: 'manis' },
  { id: 'manis-3', name: 'Onde-onde Wijen', price: 4000, formattedPrice: 'Rp 4.000', category: 'manis' },
  { id: 'manis-4', name: 'Bolu Potong', price: 4000, formattedPrice: 'Rp 4.000', category: 'manis' },
  { id: 'manis-5', name: 'Brownies Potong', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-6', name: 'Bolu Gulung', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-7', name: 'Brownies Gulung', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-8', name: 'Klepon', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-9', name: 'Putu Ayu', price: 3500, formattedPrice: 'Rp 3.500', category: 'manis' },
  { id: 'manis-10', name: 'Cantik Manis', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-11', name: 'Lepat Bugis', price: 4000, formattedPrice: 'Rp 4.000', category: 'manis' },
  { id: 'manis-12', name: 'Lepat Nagasari', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-13', name: 'Boleh Pisang', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-14', name: 'Puding', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-15', name: 'Puding Oreo', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-16', name: 'Puding Buah', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-17', name: 'Pie Buah', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-18', name: 'Kue Soes', price: 4000, formattedPrice: 'Rp 4.000', category: 'manis' },
  { id: 'manis-19', name: 'Kue Soes Buah', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-20', name: 'Eclair Vanilla', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-21', name: 'Eclair Coklat', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-22', name: 'Talam Abon', price: 4000, formattedPrice: 'Rp 4.000', category: 'manis' },
  { id: 'manis-23', name: 'Singkong Thailand', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-24', name: 'Serabi', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-25', name: 'Roti Jala', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-26', name: 'Lupis', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-27', name: 'Roti Sosis', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-28', name: 'Roti Unyil', price: 4000, formattedPrice: 'Rp 4.000', category: 'manis' },
  { id: 'manis-29', name: 'Ketan Luwo', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-30', name: 'Lamang Golek Besar', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },
  { id: 'manis-31', name: 'Bolu Sakura', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-32', name: 'Pinukuik', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-33', name: 'Dadar Gulung Original', price: 3000, formattedPrice: 'Rp 3.000', category: 'manis' },
  { id: 'manis-34', name: 'Dadar Gulung Coklat Pisang', price: 5000, formattedPrice: 'Rp 5.000', category: 'manis' },

  // --- BUAH, KACANG & CAMILAN ---
  { id: 'bc-1', name: 'Buah Potong Mayonaise', price: 8000, formattedPrice: 'Rp 8.000', category: 'buah_camilan' },
  { id: 'bc-2', name: 'Jeruk', price: 5000, formattedPrice: 'Rp 5.000', category: 'buah_camilan' },
  { id: 'bc-3', name: 'Pisang', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
  { id: 'bc-4', name: 'Salak', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
  { id: 'bc-5', name: 'Melon Potong', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
  { id: 'bc-6', name: 'Nenas Potong', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
  { id: 'bc-7', name: 'Kacang Telur', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
  { id: 'bc-8', name: 'Kacang Lihin', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
  { id: 'bc-9', name: 'Kue Bawang', price: 4000, formattedPrice: 'Rp 4.000', category: 'buah_camilan' },
];

export const DRINK_OPTIONS = [
  { id: 'drink-none', name: 'Tanpa Minuman', price: 0 },
  { id: 'drink-air-gelas', name: 'Air Mineral Gelas', price: 1000 },
  { id: 'drink-air-botol', name: 'Air Mineral Botol', price: 3000 },
  { id: 'drink-teh-kotak', name: 'Teh Kotak', price: 4000 },
];

export const CERTIFICATIONS = [
  { name: 'Sertifikat Halal MUI', badge: '🏅 Halal MUI' },
  { name: 'Sertifikat Halal Kemenag RI', badge: '🏅 Halal Kemenag RI' }
];

export const FACEBOOK_URL = 'https://www.facebook.com/ATTASnackBoc/';
export const MIN_ORDER_BOXES = 25;
export const WA_PHONE_NUMBER = '6285263150282';
export const DISPLAY_WA_NUMBER = '085263150282';
