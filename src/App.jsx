
import './App.css'
import Cart from './pages/Cart';
import Fav from './pages/Fav';
import Home from './pages/Home/Home'
// App.js (main component)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Allproduct from './pages/Allproduct';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Fav" element={<Fav />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AllProducts" element={<Allproduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;