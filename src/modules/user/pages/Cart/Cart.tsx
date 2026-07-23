import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowRight, FaArrowLeft, FaGift } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useCartStore } from '../../../../store/useCartStore';
import api from '../../../../api/axios';
import { API_ROUTES } from '../../../../api/routes';

function Cart() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCartStore();
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const [, setLoadingImages] = useState(true);

  // Fetch all products to create an ID -> Image URL mapping
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoadingImages(true);
        const res = await api.get(API_ROUTES.USER_ALL_PRODUCTS + '?limit=100');
        if (res.data && res.data.status === 200) {
          const mapping: Record<string, string> = {};
          res.data.data.forEach((p: any) => {
            if (p.images && p.images.length > 0) {
              mapping[p.id] = p.images[0];
            }
          });
          setProductImages(mapping);
        }
      } catch (err) {
        console.error("Failed to fetch product images for cart", err);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, []);

  const handleQtyChange = async (productId: any, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartQuantity(productId, newQty);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.items ? cart.items.reduce((sum, item) => sum + item.sub_total, 0) : 0;
    const shipping = subtotal > 0 ? 50.0 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateTotals();

  if (!isAuthenticated) {
    return (
      <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center flex-grow flex flex-col items-center justify-center">
          <FaShoppingCart className="text-gray-600 text-6xl mb-6" />
          <h2 className="text-2xl font-black text-white">Your Cart is Locked</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-sm">Please log in to manage your shopping cart and complete purchase checkouts.</p>
          <Link to="/Login" className="mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-full transition">
            Sign In Now
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">SHOPPING CART</h1>

        {!cart.items || cart.items.length === 0 ? (
          <div className="bg-[#15161b] border border-white/5 rounded-3xl p-12 text-center max-w-lg mx-auto mt-10">
            <FaShoppingCart className="text-gray-600 text-5xl mx-auto mb-4" />
            <p className="text-lg font-bold text-white">Your cart is empty</p>
            <p className="text-sm text-gray-500 mt-2">Looks like you haven't added any premium acoustics to your cart yet.</p>
            <button onClick={() => navigate('/AllProducts')} className="mt-6 px-8 py-3 bg-amber-500 text-black font-bold text-sm rounded-full transition">
              Explore Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items list */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-between items-center bg-[#15161b] px-6 py-3 border border-white/5 rounded-xl text-xs text-gray-500 font-bold uppercase tracking-wider">
                <span>Products ({cart.count})</span>
                <button onClick={clearCart} className="text-red-500 hover:underline">Clear Cart</button>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-[#15161b] border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition duration-300 hover:border-white/10"
                >
                  {/* Info Column */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 bg-black/30 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={productImages[item.product_id] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop"}
                        alt={item.product_name}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1">{item.product_name}</h3>
                      <p className="text-xs text-amber-500 font-medium mt-1">₹{item.price} each</p>
                    </div>
                  </div>

                  {/* Quantity & Subtotal Column */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity selectors */}
                    <div className="flex items-center bg-black/40 border border-white/5 rounded-full px-1.5">
                      <button
                        onClick={() => handleQtyChange(item.product_id, item.quantity, -1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-amber-500"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQtyChange(item.product_id, item.quantity, 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-400 hover:text-amber-500"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm font-black text-white">₹{item.sub_total}</p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                </div>
              ))}

              {/* Back to Browse */}
              <button 
                onClick={() => navigate('/AllProducts')}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mt-4 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Continue Shopping
              </button>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-4 bg-[#15161b] border border-white/5 rounded-3xl p-6 space-y-6">
              <h2 className="text-lg font-extrabold text-white border-b border-white/5 pb-3">ORDER SUMMARY</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-white">₹{shipping}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST (10%)</span>
                  <span className="font-bold text-white">₹{tax.toFixed(1)}</span>
                </div>

                <div className="border-t border-white/5 pt-3 flex justify-between text-base font-extrabold text-white">
                  <span>Grand Total</span>
                  <span className="text-amber-500">₹{total.toFixed(1)}</span>
                </div>
              </div>

              {/* Promo code warning */}
              <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-center gap-3 text-xs text-gray-500 leading-normal">
                <FaGift className="text-amber-500 text-lg shrink-0" />
                <p>Tax is calculated based on legal regulations (10%). Shipping costs are static at ₹50.</p>
              </div>

              {/* Checkout trigger */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-sm rounded-full transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                PROCEED TO CHECKOUT <FaArrowRight />
              </button>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
