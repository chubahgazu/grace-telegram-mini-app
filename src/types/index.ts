export type Role = 'customer' | 'admin';

export type Size = 'S' | 'M' | 'L' | 'XL';

export type Category = 'Верхняя одежда' | 'Кашемир и трикотаж' | 'Худи и рубашки' | 'Брюки' | 'Аксессуары';

export interface User {
  id: string;
  telegramId: number;
  username?: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
  role: Role;
  createdAt: string;
}

export interface SeasonDrop {
  id: string;
  title: string;
  code: string;
  isCurrent: boolean;
  bannerUrl: string;
  description: string;
  releaseDate: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  dropId: string;
  category: Category;
  description: string;
  composition: string;
  images: string[];
  stock: Record<Size, number>;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  image: string;
  size: Size;
  price: number;
  quantity: number;
}

export type OrderStatus = 'new' | 'paid' | 'in_delivery' | 'completed' | 'cancelled';
export type PaymentMethod = 'sbp' | 'sber' | 'tbank' | 'card';
export type DeliveryMethod = 'cdek_pvz' | 'cdek_courier' | 'express';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  telegramId: number;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  recipientName: string;
  recipientPhone: string;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
