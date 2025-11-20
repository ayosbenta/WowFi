import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Product } from '../types';
import { mockApi } from '../services/mockStorage';

// Auth Context
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cart Context
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('lumina_auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('lumina_auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumina_auth_user');
    setCartItems([]); // Clear cart on logout usually
  };

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
      const storedCart = localStorage.getItem('lumina_cart');
      if(storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
      localStorage.setItem('lumina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, qty: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ items: cartItems, addToCart, removeFromCart, clearCart, total, cartCount }}>
        {children}
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AppProvider');
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within AppProvider');
  return context;
};
