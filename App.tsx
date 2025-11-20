import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useAuth } from './context/AppContext';
import { Navbar, Footer, AIChatBubble } from './components/LayoutComponents';
import { LandingPage, CatalogPage, ProductDetailsPage, CartPage, OrdersPage } from './pages/BuyerPages';
import { AdminDashboard } from './pages/AdminPages';
import { LoginPage, RegisterPage } from './pages/AuthPages';

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow bg-gray-50">
      <Outlet />
    </main>
    <AIChatBubble />
    <Footer />
  </div>
);

// Fix children prop type to React.ReactNode to resolve type errors where children were missing in type check
const PrivateRoute = ({ roles, children }: { roles: string[], children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Buyer Routes */}
        <Route path="/cart" element={<PrivateRoute roles={['buyer']}><CartPage /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute roles={['buyer']}><OrdersPage /></PrivateRoute>} />
      </Route>

      {/* Admin Routes - No Footer/AIChat usually, but simplified here */}
      <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;