import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Hotels from './pages/Hotels';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/Dashboard';
import AdminReports from './pages/admin/Reports';
import CreateHotel from './pages/admin/CreateHotel';
import CreateProduct from './pages/admin/CreateProduct';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/create-hotel" element={<CreateHotel />} />
              <Route path="/admin/create-product" element={<CreateProduct />} />
            </Routes>
          </main>
          <Toaster position="top-center" />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;