import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Cart from './pages/Cart';
import Fav from './pages/Fav';
import Login from './pages/Login';
import Allproduct from './pages/Allproduct';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { AppProvider } from './pages/context';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App bg-[#0b0c10] min-h-screen text-gray-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Fav" element={<Fav />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AllProducts" element={<Allproduct />} />
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