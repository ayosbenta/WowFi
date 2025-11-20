import { Product, User, Order } from '../types';

const PRODUCTS_KEY = 'lumina_products';
const USERS_KEY = 'lumina_users';
const ORDERS_KEY = 'lumina_orders';

// Seed Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'dito-5g-pro',
    name: 'DITO Home WoWFi Pro',
    description: 'Experience the future of home connectivity with the DITO Home WoWFi Pro. Powered by true 5G technology, this device delivers ultra-fast speeds, low latency, and reliable coverage for your entire household. Perfect for 4K streaming, gaming, and smart home devices.',
    price: 199.99,
    category: 'Networking',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1640955014216-75201063265b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1640955014216-75201063265b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Router front
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Lifestyle/Home
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Detail
    ],
    specs: [
      'True 5G & 4G LTE connectivity',
      'Wi-Fi 6 (802.11ax) Dual Band',
      'Connect up to 32 devices simultaneously',
      'High-gain internal antennas for wider coverage',
      'Plug and play installation',
      'Gigabit Ethernet LAN ports'
    ]
  },
  {
    id: '1',
    name: 'Modern Wireless Headphones',
    description: 'Experience crystal clear sound with our premium noise-cancelling headphones.',
    price: 149.99,
    category: 'Electronics',
    stock: 15,
    image: 'https://picsum.photos/400/400?random=1',
    specs: ['Active Noise Cancellation', '30-hour battery life', 'Bluetooth 5.2']
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with this fully adjustable ergonomic mesh chair.',
    price: 249.50,
    category: 'Furniture',
    stock: 8,
    image: 'https://picsum.photos/400/400?random=2',
    specs: ['Lumbar support', 'Adjustable height', 'Breathable mesh']
  },
  {
    id: '3',
    name: 'Minimalist Watch',
    description: 'A sleek, timeless design for the modern professional.',
    price: 120.00,
    category: 'Accessories',
    stock: 25,
    image: 'https://picsum.photos/400/400?random=3'
  },
];

const INITIAL_USERS: User[] = [
  { id: 'admin1', name: 'Admin User', email: 'admin', password: 'admin', role: 'admin' },
  { id: 'user1', name: 'John Doe', email: 'user', password: 'user', role: 'buyer' }
];

// Helpers
const getStorage = <T,>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// API Methods
export const mockApi = {
  getProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
    return getStorage<Product[]>(PRODUCTS_KEY, INITIAL_PRODUCTS);
  },

  getProduct: async (id: string): Promise<Product | undefined> => {
    const products = getStorage<Product[]>(PRODUCTS_KEY, INITIAL_PRODUCTS);
    return products.find(p => p.id === id);
  },

  saveProduct: async (product: Product): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = getStorage<Product[]>(PRODUCTS_KEY, INITIAL_PRODUCTS);
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }
    setStorage(PRODUCTS_KEY, products);
  },

  deleteProduct: async (id: string): Promise<void> => {
    const products = getStorage<Product[]>(PRODUCTS_KEY, INITIAL_PRODUCTS);
    setStorage(PRODUCTS_KEY, products.filter(p => p.id !== id));
  },

  login: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getStorage<User[]>(USERS_KEY, INITIAL_USERS);
    // Simple check for either email or username matching the stored 'email' field which now holds usernames for defaults
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    const users = getStorage<User[]>(USERS_KEY, INITIAL_USERS);
    if (users.find(u => u.email === email)) throw new Error("User exists");
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'buyer'
    };
    users.push(newUser);
    setStorage(USERS_KEY, users);
    return newUser;
  },

  getOrders: async (userId?: string): Promise<Order[]> => {
    const orders = getStorage<Order[]>(ORDERS_KEY, []);
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    return orders;
  },

  createOrder: async (order: Order): Promise<void> => {
    const orders = getStorage<Order[]>(ORDERS_KEY, []);
    orders.push(order);
    setStorage(ORDERS_KEY, orders);
  },
  
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<void> => {
     const orders = getStorage<Order[]>(ORDERS_KEY, []);
     const idx = orders.findIndex(o => o.id === orderId);
     if (idx !== -1) {
         orders[idx].status = status;
         setStorage(ORDERS_KEY, orders);
     }
  }
};