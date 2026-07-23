import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useWishlistStore } from '../../../../store/useWishlistStore';
import { useCartStore } from '../../../../store/useCartStore';

function Fav() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const [addingId, setAddingId] = useState<any>(null);

  const handleAddToCart = async (productId: any) => {
    try {
      setAddingId(productId);
      await addToCart(productId, 1);
      await removeFromWishlist(productId);
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center flex-grow flex flex-col items-center justify-center">
          <FaHeart className="text-text-muted text-6xl mb-6 animate-pulse" />
          <h2 className="text-2xl font-heading font-black text-text-main">Wishlist is Locked</h2>
          <p className="text-sm text-text-muted mt-2 max-w-sm">Please log in to save your favorite premium headphones, earbuds, and speakers.</p>
          <Link to="/Login" className="mt-6 px-8 py-3 bg-brand-primary hover:bg-brand-hover text-black font-extrabold rounded-full transition">
            Sign In Now
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow">
        
        {/* Title / Header */}
        <div className="flex justify-between items-center mb-8 border-b border-border-subtle pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-main tracking-tight">MY WISHLIST</h1>
            <p className="text-xs text-text-muted mt-1">Saved {wishlist.count} audio products</p>
          </div>
          {wishlist.count > 0 && (
            <button onClick={clearWishlist} className="text-sm text-red-500 hover:underline">
              Clear All Wishlist
            </button>
          )}
        </div>

        {!wishlist.item || wishlist.item.length === 0 ? (
          <div className="bg-bg-card border border-border-subtle rounded-3xl p-12 text-center max-w-lg mx-auto mt-10">
            <FaHeart className="text-text-muted text-5xl mx-auto mb-4" />
            <p className="text-lg font-heading font-bold text-text-main">Your wishlist is empty</p>
            <p className="text-sm text-text-muted mt-2">Browse the shop and tap the heart icon to save products here.</p>
            <button onClick={() => navigate('/AllProducts')} className="mt-6 px-8 py-3 bg-brand-primary text-black font-bold text-sm rounded-full transition">
              Explore Shop
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.item.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-bg-card border border-border-subtle hover:border-brand-primary/20 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-black/50 animate-fadeIn"
                >
                  <div className="relative">
                    {/* Delete wishlist button */}
                    <button
                      onClick={() => removeFromWishlist(item.product_id)}
                      className="absolute top-0 right-0 w-8 h-8 rounded-full bg-bg-input border border-border-subtle text-text-muted hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-all"
                    >
                      <FaTrash className="text-xs" />
                    </button>

                    {/* Image */}
                    <div 
                      onClick={() => navigate(`/product/${item.product_id}`)}
                      className="w-full h-44 flex items-center justify-center bg-bg-input rounded-xl mb-4 overflow-hidden p-3 cursor-pointer"
                    >
                      <img
                        src={item.images && item.images.length > 0 ? item.images[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"}
                        alt={item.name}
                        className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => navigate(`/product/${item.product_id}`)}
                      className="font-heading font-bold text-text-main group-hover:text-brand-primary transition-colors line-clamp-1 cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    
                    {/* Rating placeholder */}
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar key={s} className="text-xs text-brand-primary" />
                      ))}
                      <span className="text-[10px] text-text-muted ml-1">(4.8)</span>
                    </div>

                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Stock warning */}
                    {item.stock <= 5 && item.stock > 0 && (
                      <p className="text-[10px] text-orange-500 font-bold mb-1">⚠️ Low Stock: {item.stock} left</p>
                    )}
                    {item.stock === 0 && (
                      <p className="text-[10px] text-red-500 font-bold mb-1">❌ Out of Stock</p>
                    )}

                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xl font-heading font-extrabold text-text-main">₹{item.price}</span>
                      {item.offer_price > 0 && (
                        <span className="text-xs text-text-muted line-through">₹{item.offer_price}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item.product_id)}
                        disabled={addingId === item.product_id || item.stock === 0}
                        className="flex-grow bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <FaShoppingCart />
                        {addingId === item.product_id ? "Moving..." : item.stock === 0 ? "Out of Stock" : "Move to Cart"}
                      </button>
                      <button
                        onClick={() => navigate(`/product/${item.product_id}`)}
                        className="px-3 bg-bg-input hover:bg-bg-card text-text-main rounded-xl border border-border-subtle text-xs font-semibold"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back link */}
            <button 
              onClick={() => navigate('/AllProducts')}
              className="text-sm text-text-muted hover:text-text-main flex items-center gap-2 mt-8 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Continue Shopping
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default Fav;
