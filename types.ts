export type UserRole = 'admin' | 'buyer' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // In a real app, never store plain text
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  images?: string[]; // Gallery support
  specs?: string[]; // Specifications list
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}