import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockApi } from '../services/mockStorage';
import { Product, Order } from '../types';
import { useCart, useAuth } from '../context/AppContext';
import { Search, Filter, Star, Plus, Minus, Trash2, CreditCard, Truck, CheckCircle, ArrowRight, Wifi, Zap, Shield } from 'lucide-react';

// --- LANDING PAGE ---
export const LandingPage: React.FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch DITO product specifically, or fallback to first
    mockApi.getProducts().then(products => {
      const dito = products.find(p => p.id === 'dito-5g-pro');
      setFeaturedProduct(dito || products[0]);
    });
  }, []);

  return (
    <div className="bg-white font-sans text-gray-700">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Unlimited 4G/5G WiFi</span>
                  <span className="block text-[#DC2626]">at Home</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Experience blazing fast speeds with the new DITO Home WoWFi Pro. Connect your entire home to the future of internet.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/catalog" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#DC2626] hover:bg-red-800 md:py-4 md:text-lg md:px-10 transition-colors">
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/product/dito-5g-pro" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#DC2626] bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10 transition-colors">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100 flex items-center justify-center">
          {featuredProduct ? (
            <img 
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full mix-blend-multiply p-8" 
              src={featuredProduct.image} 
              alt="DITO Home WoWFi Pro" 
            />
          ) : (
             <div className="h-full w-full bg-gray-200 animate-pulse" />
          )}
        </div>
      </div>

      {/* Featured Product Card Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-[#DC2626] tracking-wide uppercase">New Arrival</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Meet the Pro
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Next-generation connectivity for the modern smart home.
            </p>
          </div>

          {featuredProduct && (
            <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20 bg-gray-50 flex items-center justify-center">
                <div className="lg:self-center">
                  <img className="transform hover:scale-105 transition-transform duration-500 object-contain max-h-80" src={featuredProduct.image} alt={featuredProduct.name} />
                </div>
              </div>
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {featuredProduct.name}
                </h3>
                <p className="mt-4 text-lg text-gray-500">
                  {featuredProduct.description}
                </p>
                <div className="mt-8">
                   <div className="flex items-baseline text-gray-900">
                     <span className="text-5xl font-extrabold tracking-tight">${featuredProduct.price}</span>
                     <span className="ml-1 text-xl font-semibold text-gray-500">USD</span>
                   </div>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                   <Link to={`/product/${featuredProduct.id}`} className="flex-1 bg-[#DC2626] border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 transition-colors shadow-md">
                     Buy Now
                   </Link>
                   <Link to={`/product/${featuredProduct.id}`} className="flex-1 bg-white border border-gray-300 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                     View Details
                   </Link>
                </div>
                
                {/* Quick Feature List */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="flex items-center">
                            <Zap className="h-5 w-5 text-yellow-500 mr-2"/>
                            <dt className="text-sm font-medium text-gray-500">Ultra-Fast 5G</dt>
                        </div>
                         <div className="flex items-center">
                            <Wifi className="h-5 w-5 text-[#DC2626] mr-2"/>
                            <dt className="text-sm font-medium text-gray-500">Wi-Fi 6 Ready</dt>
                        </div>
                        <div className="flex items-center">
                            <Shield className="h-5 w-5 text-green-500 mr-2"/>
                            <dt className="text-sm font-medium text-gray-500">Secure Network</dt>
                        </div>
                    </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CATALOG PAGE ---
export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    mockApi.getProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter(p => 
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
             <h1 className="text-3xl font-bold text-gray-900">Shop Products</h1>
             <p className="text-gray-500 mt-1">Discover our full range of devices.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="focus:ring-[#DC2626] focus:border-[#DC2626] block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#DC2626] focus:border-[#DC2626] sm:text-sm rounded-md border"
            >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="group bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <div className="aspect-w-1 aspect-h-1 w-full bg-gray-50 overflow-hidden xl:aspect-w-7 xl:aspect-h-8 p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain object-center group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-medium text-[#DC2626] mb-2 uppercase tracking-wider">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <Link to={`/product/${product.id}`} className="p-2 text-[#DC2626] bg-red-50 rounded-full hover:bg-[#DC2626] hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PRODUCT DETAILS ---
export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>();
  const [activeImage, setActiveImage] = useState<string>("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
        mockApi.getProduct(id).then(p => {
            setProduct(p);
            if (p) setActiveImage(p.image);
        });
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div>
    </div>
  );

  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={activeImage} alt={product.name} className="w-full h-full object-contain object-center p-8" />
            </div>
            <div className="mt-6 grid grid-cols-4 gap-4">
                {displayImages.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveImage(img)}
                        className={`relative rounded-lg overflow-hidden h-20 bg-gray-50 border-2 ${activeImage === img ? 'border-[#DC2626]' : 'border-transparent hover:border-gray-300'} transition-colors`}
                    >
                        <img src={img} alt="" className="w-full h-full object-contain object-center" />
                    </button>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
            
            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                  <p className="text-3xl text-gray-900 font-bold mr-4">${product.price.toFixed(2)}</p>
                  <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Star className="w-3 h-3 mr-1 fill-current" /> 4.9 (128 reviews)
                  </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            
            {/* Specs List */}
            {product.specs && product.specs.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Highlights</h3>
                    <ul className="space-y-3">
                        {product.specs.map((spec, idx) => (
                            <li key={idx} className="flex items-start">
                                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                                <span className="text-gray-600 text-sm">{spec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-8">
                 <div className="flex items-center justify-between mb-4">
                     <span className={`text-sm font-medium flex items-center ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? <CheckCircle className="w-4 h-4 mr-1"/> : <Minus className="w-4 h-4 mr-1"/>}
                        {product.stock > 0 ? 'In Stock & Ready to Ship' : 'Out of Stock'}
                     </span>
                 </div>
                 
                 <div className="flex gap-4">
                     <button
                        onClick={() => { addToCart(product, 1); }}
                        disabled={product.stock === 0}
                        className="flex-1 bg-[#DC2626] border border-transparent rounded-md py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DC2626] disabled:bg-gray-300 shadow-lg transform transition-transform active:scale-95"
                     >
                       Add to Cart
                     </button>
                     <button
                         onClick={() => { addToCart(product, 1); navigate('/cart'); }}
                         disabled={product.stock === 0}
                         className="flex-1 bg-white border border-gray-300 rounded-md py-4 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-100"
                     >
                        Buy Now
                     </button>
                 </div>
                 <p className="mt-4 text-center text-xs text-gray-500">
                    Free shipping on all orders over $50. 30-day money-back guarantee.
                 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CART & CHECKOUT ---
export const CartPage: React.FC = () => {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Credit Card");

  const handleCheckout = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!user) { navigate('/login'); return; }
      
      const order: Order = {
          id: Date.now().toString(),
          userId: user.id,
          items: items,
          total: total,
          status: 'Pending',
          createdAt: new Date().toISOString(),
          shippingAddress: address,
          paymentMethod: payment
      };
      
      await mockApi.createOrder(order);
      clearCart();
      navigate('/orders');
  };

  if (items.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
             <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/catalog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#DC2626] hover:bg-red-800">
            Start Shopping
        </Link>
    </div>
  );

  if (checkingOut) {
      return (
          <div className="max-w-3xl mx-auto px-4 py-12">
              <div className="mb-8">
                <button onClick={() => setCheckingOut(false)} className="text-sm text-[#DC2626] hover:text-red-800 font-medium mb-4 flex items-center">
                    &larr; Back to Cart
                </button>
                <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form id="checkout-form" onSubmit={handleCheckout} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Shipping Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Address</label>
                            <textarea required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#DC2626] focus:border-[#DC2626]" rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St, City, Country"></textarea>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 pt-4">Payment Details</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#DC2626] focus:border-[#DC2626] sm:text-sm rounded-md" value={payment} onChange={e => setPayment(e.target.value)}>
                                <option>Credit Card</option>
                                <option>PayPal</option>
                                <option>Cash on Delivery</option>
                            </select>
                        </div>
                    </form>
                </div>
                
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                        <ul className="space-y-3 mb-6">
                             {items.map(item => (
                                 <li key={item.id} className="flex justify-between text-sm">
                                     <span className="text-gray-600">{item.quantity}x {item.name}</span>
                                     <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                 </li>
                             ))}
                        </ul>
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-6">
                            <span className="text-base font-bold text-gray-900">Total</span>
                            <span className="text-xl font-bold text-[#DC2626]">${total.toFixed(2)}</span>
                        </div>
                        <button form="checkout-form" type="submit" className="w-full bg-[#DC2626] text-white px-6 py-3 rounded-md hover:bg-red-800 font-medium shadow-md transition-colors">
                            Confirm Order
                        </button>
                    </div>
                </div>
              </div>
          </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {items.map(item => (
            <li key={item.id} className="p-6 flex items-center">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
              </div>
              <div className="ml-6 flex-1 flex flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{item.name}</h3>
                  <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                <div className="flex-1 flex items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {item.quantity}</p>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="font-medium text-red-600 hover:text-red-500 flex items-center">
                    <Trash2 className="w-4 h-4 mr-1"/> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 px-6 py-6 sm:px-6 lg:px-8 flex justify-between items-center border-t border-gray-200">
            <div>
                <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            </div>
            <div className="flex items-center">
                <div className="mr-8 text-right">
                    <span className="block text-sm font-medium text-gray-500">Subtotal</span>
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <button onClick={() => setCheckingOut(true)} className="bg-[#DC2626] text-white px-8 py-3 rounded-md hover:bg-red-800 font-medium shadow-sm transition-colors">
                    Checkout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- ORDERS PAGE ---
export const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if(user) mockApi.getOrders(user.id).then(setOrders);
  }, [user]);

  if(!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
            <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Order #{order.id}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                    </span>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Items</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                <span className="ml-2 flex-1 w-0 truncate">{item.quantity}x {item.name}</span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                            <dd className="mt-1 text-sm font-bold text-[#DC2626] sm:mt-0 sm:col-span-2">${order.total.toFixed(2)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        ))}
        {orders.length === 0 && <p className="text-gray-500">You have no past orders.</p>}
      </div>
    </div>
  );
};

// Helper icon for missing import
function ShoppingBag(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
}