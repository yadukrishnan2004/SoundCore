import React, { useState, useEffect } from "react";
import { FaPlay, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { slideRight } from '../../../utils/animation';
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import { API_ROUTES } from '../../../api/routes';
import { useAuthStore } from '../../../store/useAuthStore';
import { useCartStore } from '../../../store/useCartStore';

function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);
  const [products, setProducts] = useState<any[]>([]);
  const [currslide, setCurrslide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cartAdding, setCartAdding] = useState<any>(null);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(API_ROUTES.USER_ALL_PRODUCTS + '?limit=5');
        if (res.data && res.data.status === 200) {
          setProducts(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch hero products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => {
      setCurrslide((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [products]);

  const handleAddToCart = async (prodId: any) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setCartAdding(prodId);
      await addToCart(prodId, 1);
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setCartAdding(null);
    }
  };

  if (loading || products.length === 0) {
    return (
      <section className="relative w-full h-[500px] sm:h-[600px] bg-bg-base flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </section>
    );
  }

  const currentItem = products[currslide];

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] bg-bg-base overflow-hidden flex items-center justify-center px-4 sm:px-8 border-b border-border-subtle transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10"
        >
          {/* Text Content */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <motion.div
              variants={slideRight(0.2)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 rounded-full text-brand-primary text-xs font-black uppercase tracking-widest"
            >
              <FaPlay className="text-[10px]" /> Featured Flagship Acoustic
            </motion.div>

            <motion.h1
              variants={slideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl font-heading font-black text-text-main tracking-tight leading-none capitalize"
            >
              {currentItem.name}
            </motion.h1>

            <motion.p
              variants={slideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base text-text-muted line-clamp-2 max-w-xl font-light leading-relaxed mx-auto md:mx-0"
            >
              {currentItem.desc || currentItem.description || "Immerse yourself in precision tuned spatial drivers and active noise suppression."}
            </motion.p>

            <motion.div
              variants={slideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center md:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => handleAddToCart(currentItem.id)}
                disabled={cartAdding === currentItem.id}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs rounded-full transition transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <FaShoppingCart /> {cartAdding === currentItem.id ? "Adding..." : `ADD TO CART • ₹${currentItem.price}`}
              </button>

              <button
                onClick={() => navigate(`/product/${currentItem.id}`)}
                className="px-6 py-3.5 bg-bg-card hover:bg-bg-input text-text-main font-bold text-xs rounded-full border border-border-subtle transition flex items-center gap-2"
              >
                <FaInfoCircle /> View Specs
              </button>
            </motion.div>
          </div>

          {/* Image */}
          <div className="md:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
              <img
                src={
                  currentItem.images?.[0] ||
                  currentItem.image ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                }
                alt={currentItem.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 sm:right-12 flex items-center gap-2 z-20">
        <button
          onClick={() => setCurrslide((prev) => (prev === 0 ? products.length - 1 : prev - 1))}
          className="text-text-muted hover:text-brand-primary text-3xl transition"
        >
          <HiArrowCircleLeft />
        </button>
        <button
          onClick={() => setCurrslide((prev) => (prev + 1) % products.length)}
          className="text-text-muted hover:text-brand-primary text-3xl transition"
        >
          <HiArrowCircleRight />
        </button>
      </div>
    </section>
  );
}

export default Hero;