import React, { useState, useEffect, useContext } from "react";
import { FaPlay, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { slideRight } from '../../../utils/animation';
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import { API_ROUTES } from '../../../api/routes';
import { AppContext } from '../../../context/AppContext';

function Hero() {
  const navigate = useNavigate();
  const { addToCart, isAuthenticated } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [currslide, setCurrslide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartAdding, setCartAdding] = useState(null);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        setLoading(true);
        // Get all products and take the first few for the slideshow
        const res = await api.get(API_ROUTES.USER_ALL_PRODUCTS + '?limit=5');
        if (res.data && res.data.status === 200) {
          setProducts(res.data.data || []);
        }
      } catch (err) {
        console.error("Hero products fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroProducts();
  }, []);

  const prevslide = () => {
    setCurrslide(currslide === 0 ? products.length - 1 : currslide - 1);
  };

  const nextslide = () => {
    setCurrslide(currslide === products.length - 1 ? 0 : currslide + 1);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setCartAdding(productId);
      await addToCart(productId, 1);
      alert("Added to cart successfully!");
    } catch (err) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setCartAdding(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-[#0b0c10]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex justify-center bg-[#0b0c10] py-6 sm:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1d24] to-[#121319] border border-white/5 shadow-2xl">
          
          {/* Slider Container */}
          <div className="relative h-[550px] sm:h-[600px] md:h-[550px] lg:h-[500px]">
            {products.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex items-center ${
                  index === currslide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Content Grid */}
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 sm:px-12 py-10">
                  
                  {/* Text Content */}
                  <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1 space-y-4 sm:space-y-6">
                    <div>
                      <span className="inline-block bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                        {item.category}
                      </span>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        {item.name}
                      </h1>
                    </div>
                    
                    <p className="text-gray-400 text-sm sm:text-base line-clamp-3 leading-relaxed">
                      {item.desc || item.description}
                    </p>

                    <div className="flex items-baseline justify-center md:justify-start gap-3">
                      <span className="text-3xl font-black text-amber-500">₹{item.price}</span>
                      {item.offerprice > 0 && (
                        <span className="text-lg text-gray-500 line-through">₹{item.offerprice}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        disabled={cartAdding === item.id}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-amber-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <FaShoppingCart />
                        {cartAdding === item.id ? "Adding..." : "ADD TO CART"}
                      </button>
                      
                      <Link
                        to={`/product/${item.id}`}
                        className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base rounded-full border border-white/10 hover:border-white/20 transition text-center flex items-center justify-center gap-2"
                      >
                        <FaInfoCircle />
                        DETAILS
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center items-center order-1 md:order-2 h-48 sm:h-64 md:h-80 lg:h-96 relative">
                    <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
                    <img
                      src={item.images && item.images.length > 0 ? item.images[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"}
                      alt={item.name}
                      className="max-h-40 sm:max-h-56 md:max-h-72 lg:max-h-80 w-auto object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 z-20 pointer-events-none">
            <button 
              onClick={prevslide} 
              className="p-2 sm:p-3 bg-[#15161b]/80 hover:bg-amber-500 hover:text-black text-gray-300 rounded-full border border-white/5 shadow-lg transition pointer-events-auto hover:scale-110 active:scale-95"
              aria-label="Previous slide"
            >
              <HiArrowCircleLeft className="text-2xl sm:text-3xl" />
            </button>
            <button 
              onClick={nextslide} 
              className="p-2 sm:p-3 bg-[#15161b]/80 hover:bg-amber-500 hover:text-black text-gray-300 rounded-full border border-white/5 shadow-lg transition pointer-events-auto hover:scale-110 active:scale-95"
              aria-label="Next slide"
            >
              <HiArrowCircleRight className="text-2xl sm:text-3xl" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrslide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  index === currslide ? "bg-amber-500 w-6" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;