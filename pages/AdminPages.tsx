import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockStorage';
import { Product, Order } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Package, Users, DollarSign, ShoppingBag, Sparkles, Trash, Edit } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0 });
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
        const orders = await mockApi.getOrders();
        const products = await mockApi.getProducts();
        
        const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
        setStats({
            sales: totalSales,
            orders: orders.length,
            products: products.length
        });

        // Mock data for chart
        setSalesData([
            { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 },
            { name: 'Mar', sales: 2000 }, { name: 'Apr', sales: 2780 },
            { name: 'May', sales: 1890 }, { name: 'Jun', sales: 2390 },
        ]);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-red-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold">DITO Admin</div>
            <nav className="flex-1 px-2 space-y-2">
                <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'dashboard' ? 'bg-red-900' : 'hover:bg-red-700'}`}>
                    <DollarSign className="mr-3 h-5 w-5" /> Dashboard
                </button>
                <button onClick={() => setActiveTab('products')} className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'products' ? 'bg-red-900' : 'hover:bg-red-700'}`}>
                    <Package className="mr-3 h-5 w-5" /> Products
                </button>
                <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'orders' ? 'bg-red-900' : 'hover:bg-red-700'}`}>
                    <ShoppingBag className="mr-3 h-5 w-5" /> Orders
                </button>
            </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
            {activeTab === 'dashboard' && (
                <div className="space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">${stats.sales.toFixed(2)}</dd>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.orders}</dd>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Active Products</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.products}</dd>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Analytics</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#dc2626" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'orders' && <AdminOrders />}
        </div>
    </div>
  );
};

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => mockApi.getProducts().then(setProducts);

    const handleDelete = async (id: string) => {
        if(confirm("Delete this product?")) {
            await mockApi.deleteProduct(id);
            loadProducts();
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const productToSave = {
            ...currentProduct,
            id: currentProduct.id || Date.now().toString(),
            stock: Number(currentProduct.stock),
            price: Number(currentProduct.price),
            image: currentProduct.image || `https://picsum.photos/400/400?random=${Date.now()}`
        } as Product;
        
        await mockApi.saveProduct(productToSave);
        setIsEditing(false);
        setCurrentProduct({});
        loadProducts();
    };

    const handleGenerateDesc = async () => {
        if(!currentProduct.name || !currentProduct.category) {
            alert("Please enter Name and Category first");
            return;
        }
        setGenerating(true);
        const desc = await generateProductDescription(currentProduct.name, currentProduct.category);
        setCurrentProduct(prev => ({...prev, description: desc}));
        setGenerating(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                <button onClick={() => { setCurrentProduct({}); setIsEditing(true); }} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Add Product</button>
            </div>

            {isEditing ? (
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">{currentProduct.id ? 'Edit Product' : 'New Product'}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={currentProduct.name || ''} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={currentProduct.category || ''} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input required type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input required type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={currentProduct.stock || ''} onChange={e => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <button type="button" onClick={handleGenerateDesc} disabled={generating} className="text-xs text-red-600 hover:text-red-800 flex items-center">
                                    <Sparkles className="w-3 h-3 mr-1" /> {generating ? 'Generating...' : 'Auto-Generate with Gemini'}
                                </button>
                            </div>
                            <textarea required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={3} value={currentProduct.description || ''} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md">Save</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full object-cover" src={p.image} alt="" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${p.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => { setCurrentProduct(p); setIsEditing(true); }} className="text-red-600 hover:text-red-900 mr-4"><Edit className="w-4 h-4"/></button>
                                        <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900"><Trash className="w-4 h-4"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => mockApi.getOrders().then(setOrders);

    const handleStatusChange = async (id: string, status: Order['status']) => {
        await mockApi.updateOrderStatus(id, status);
        loadOrders();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {orders.map(order => (
                        <li key={order.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-red-600">Order #{order.id}</div>
                                    <div className="text-sm text-gray-500">{order.items.length} items • ${order.total.toFixed(2)}</div>
                                    <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                        className="block w-32 pl-3 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                    >
                                        {['Pending', 'Processing', 'Shipped', 'Delivered'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        </li>
                    ))}
                    {orders.length === 0 && <li className="px-6 py-4 text-gray-500">No orders found.</li>}
                </ul>
            </div>
        </div>
    );
};