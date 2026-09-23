export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: 'birthday' | 'anniversary' | 'wedding' | 'love' | 'best-friend' | 'corporate' | 'festivals' | 'just-because';
  filterTags: ('ALL' | 'BESTSELLERS' | 'PERSONALIZED' | 'FOR HER' | 'FOR HIM' | 'COUPLES')[];
  occasions: string[];
  recipient: ('Partner' | 'Friend' | 'Family' | 'Colleague')[];
  budgetCategory: 'under-1000' | '1000-2000' | '2000-5000' | '5000-plus';
  isBestseller?: boolean;
  isPersonalized?: boolean;
  badge?: 'BESTSELLER' | 'LIMITED' | 'NEW' | 'POPULAR';
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage: string;
  gallery: string[];
  description: string;
  perfectFor: string[];
  whatsInside: string[];
  deliveryInfo: string;
  inStock: boolean;
  canPersonalize?: boolean;
}

export interface PersonalizationData {
  recipientName?: string;
  customMessage?: string;
  date?: string;
  boxColor?: string;
  ribbonColor?: string;
  photoUrl?: string;
}

export interface CartItem {
  id: string; // unique item id (combines product id + personalization hash)
  product: Product;
  quantity: number;
  personalization?: PersonalizationData;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  slug: string;
  accentQuote?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  productName: string;
  rating: number;
  verified: boolean;
  date: string;
  avatar?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  giftMessage?: string;
  deliveryDate?: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}
