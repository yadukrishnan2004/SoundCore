import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaChevronRight, FaStar, FaVolumeUp, FaBolt, FaShieldAlt } from "react-icons/fa";
import api from '../../../api/axios';
import { API_ROUTES } from '../../../api/routes';
import { useAuthStore } from '../../../store/useAuthStore';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';

function Body() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlist, addToWishlist } = useWishlistStore();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await api.get(API_ROUTES.USER_ALL_PRODUCTS + '?limit=4');
        if (res.data && res.data.status === 200) {
          setFeaturedProducts(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleAddToCart = async (productId: any) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setAddingId(productId);
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  const handleAddToWishlist = async (productId: any) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      await addToWishlist(productId);
      alert("Added to wishlist!");
    } catch (err: any) {
      alert(err.message || "Failed to add to wishlist");
    }
  };

  const categories = [
    { title: "Wireless Headphones", cat: "wireless", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop" },
    { title: "True Wireless Earbuds", cat: "earbuds", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop" },
    { title: "Studio Monitors", cat: "studio", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop" },
    { title: "Luxury Speakers", cat: "luxury", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full bg-bg-base text-text-main py-16 space-y-24 transition-colors duration-300">
      
      {/* 1. Category Tiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 border-b border-border-subtle pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-main tracking-tight">EXPLORE BY CATEGORY</h2>
            <p className="text-xs text-text-muted mt-1">Curated acoustic systems tailored for every sound profile</p>
          </div>
          <button
            onClick={() => navigate('/AllProducts')}
            className="text-xs text-brand-primary hover:text-brand-hover font-bold flex items-center gap-1 transition"
          >
            View All Catalog <FaChevronRight className="text-[10px]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/AllProducts?category=${item.cat}`)}
              className="group relative h-64 bg-bg-card border border-border-subtle rounded-3xl overflow-hidden p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 hover:border-brand-primary/30 hover:-translate-y-1 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
              
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              />

              <div className="relative z-20">
                <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2.5 py-1 rounded-full border border-brand-primary/20">
                  Collection
                </span>
              </div>

              <div className="relative z-20">
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-brand-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-300 mt-1 flex items-center gap-1">
                  Shop Now <FaChevronRight className="text-[9px] group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Feature Highlights Section */}
      <section className="bg-bg-card border-y border-border-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 space-y-3 bg-bg-input rounded-2xl border border-border-subtle">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto text-xl">
              <FaVolumeUp />
            </div>
            <h3 className="text-base font-heading font-bold text-text-main">Spatial High-Res Drivers</h3>
            <p className="text-xs text-text-muted leading-relaxed">Precision tuned titanium diaphragms for crystal clear highs and deep bass response.</p>
          </div>

          <div className="p-6 space-y-3 bg-bg-input rounded-2xl border border-border-subtle">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto text-xl">
              <FaBolt />
            </div>
            <h3 className="text-base font-heading font-bold text-text-main">Ultra-Low Latency</h3>
            <p className="text-xs text-text-muted leading-relaxed">Bluetooth 5.4 tech ensuring synchronized audio streaming for high performance gaming.</p>
          </div>

          <div className="p-6 space-y-3 bg-bg-input rounded-2xl border border-border-subtle">
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto text-xl">
              <FaShieldAlt />
            </div>
            <h3 className="text-base font-heading font-bold text-text-main">2-Year Limited Warranty</h3>
            <p className="text-xs text-text-muted leading-relaxed">Comprehensive coverage against hardware defects with hassle free door-step replacements.</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 border-b border-border-subtle pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-main tracking-tight">TRENDING ACOUSTICS</h2>
            <p className="text-xs text-text-muted mt-1">Top-rated audio products loved by sound purists</p>
          </div>
          <button
            onClick={() => navigate('/AllProducts')}
            className="text-xs text-brand-primary hover:text-brand-hover font-bold flex items-center gap-1 transition"
          >
            Explore Catalog <FaChevronRight className="text-[10px]" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-bg-card rounded-2xl h-80 animate-pulse border border-border-subtle"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => {
              const isWishlisted = wishlist?.item?.some((item: any) => item.product_id === prod.id || item.id === prod.id);

              return (
                <div
                  key={prod.id}
                  className="bg-bg-card border border-border-subtle hover:border-brand-primary/20 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1 relative"
                >
                  <button
                    onClick={() => handleAddToWishlist(prod.id)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
                      isWishlisted ? "bg-red-500 text-white" : "bg-bg-input text-text-muted hover:text-red-500"
                    }`}
                  >
                    <FaHeart className="text-xs" />
                  </button>

                  <div>
                    <div
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="w-full h-44 bg-bg-input rounded-xl mb-4 flex items-center justify-center p-3 cursor-pointer overflow-hidden"
                    >
                      <img
                        src={prod.images?.[0] || prod.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"}
                        alt={prod.name}
                        className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <h3
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="font-bold text-text-main group-hover:text-brand-primary transition-colors line-clamp-1 cursor-pointer text-sm font-heading"
                    >
                      {prod.name}
                    </h3>

                    <div className="flex items-center gap-1 mt-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar key={s} className="text-xs text-brand-primary" />
                      ))}
                      <span className="text-[10px] text-text-muted ml-1">(4.9)</span>
                    </div>

                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
                      {prod.desc || prod.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-lg font-extrabold text-text-main font-heading">₹{prod.price}</span>
                      <span className="text-[10px] text-brand-primary uppercase font-bold">{prod.category}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(prod.id)}
                      disabled={addingId === prod.id || prod.stock === 0}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <FaShoppingCart />
                      {addingId === prod.id ? "Adding..." : prod.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}

export default Body;
