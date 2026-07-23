import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './modules/user/pages/Home';
import Cart from './modules/user/pages/Cart';
import Fav from './modules/user/pages/Fav';
import Login from './modules/user/pages/Login';
import AllProducts from './modules/user/pages/AllProducts';
import ProductDetail from './modules/user/pages/ProductDetail';
import Checkout from './modules/user/pages/Checkout';
import Profile from './modules/user/pages/Profile';
import AdminDashboard from './modules/admin/pages/Dashboard';
import { AppProvider } from './context/AppContext';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <AppProvider>
      <Router>
        <div className="App bg-bg-base min-h-screen text-text-main transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Fav" element={<Fav />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AllProducts" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
