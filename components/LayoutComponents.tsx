import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useCart } from '../context/AppContext';
import { ShoppingCart, User as UserIcon, Menu, X, Package, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-red-600">DITO Home Wifi</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</Link>
              <Link to="/catalog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Shop</Link>
              {user?.role === 'admin' && (
                 <Link to="/admin" className="border-transparent text-red-500 hover:border-red-700 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"><LayoutDashboard className="w-4 h-4 mr-1"/> Admin</Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user?.role === 'buyer' && (
              <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-500">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">{cartCount}</span>
                )}
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-3">
                 {user.role === 'buyer' && <Link to="/orders" className="text-sm text-gray-700 hover:text-red-600">My Orders</Link>}
                 <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600">
                  <LogOut className="w-4 h-4 mr-1"/> Logout
                 </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">Sign up</Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-red-50 border-red-500 text-red-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Home</Link>
            <Link to="/catalog" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Shop</Link>
            <Link to="/cart" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Cart ({cartCount})</Link>
            {user ? (
                <>
                 {user.role === 'admin' && <Link to="/admin" className="block pl-3 pr-4 py-2 text-base font-medium text-red-600">Admin Dashboard</Link>}
                 {user.role === 'buyer' && <Link to="/orders" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600">My Orders</Link>}
                 <button onClick={handleLogout} className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600">Login</Link>
                    <Link to="/register" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600">Register</Link>
                </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <p className="text-gray-400 text-sm">&copy; 2024 DITO Home Wifi. All rights reserved.</p>
      <div className="flex space-x-4">
        <span className="text-gray-400 text-sm hover:text-gray-500 cursor-pointer">Privacy Policy</span>
        <span className="text-gray-400 text-sm hover:text-gray-500 cursor-pointer">Terms of Service</span>
      </div>
    </div>
  </footer>
);

export const AIChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'user'|'bot', text: string}[]>([
    {sender: 'bot', text: 'Hi! I am your AI shopping assistant. How can I help you today?'}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleSend = async () => {
    if(!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {sender: 'user', text: userMsg}]);
    setInput("");
    setLoading(true);
    
    const response = await chatWithAI(userMsg, location.pathname);
    
    setMessages(prev => [...prev, {sender: 'bot', text: response}]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all">
          <Sparkles className="w-6 h-6" />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-red-600 p-3 flex justify-between items-center text-white">
            <h3 className="font-medium flex items-center"><Sparkles className="w-4 h-4 mr-2"/> AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400 italic">AI is thinking...</div>}
          </div>
          <div className="p-3 border-t border-gray-200 bg-white flex">
            <input 
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-red-700 disabled:bg-red-400">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};