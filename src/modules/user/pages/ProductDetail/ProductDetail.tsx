import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaArrowLeft, FaCheck, FaTruck, FaUndo, FaTag } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import api from '../../../../api/axios';
import { API_ROUTES } from '../../../../api/routes';
import { AppContext } from '../../../../context/AppContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist, isAuthenticated } = useContext(AppContext);

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartAdding, setCartAdding] = useState(false);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Fetch product details
        const res = await api.get(API_ROUTES.USER_PRODUCT_DETAIL(id));
        if (res.data && res.data.status === 200) {
          const prodData = res.data.data;
          setProduct(prodData);
          setQuantity(1);
          if (prodData.images && prodData.images.length > 0) {
            setActiveImg(prodData.images[0]);
          }

          // Fetch related products (using same category)
          const relatedRes = await api.get(API_ROUTES.USER_FILTER, {
            params: { category: prodData.category, limit: 4 }
          });
          if (relatedRes.data && relatedRes.data.status === 200) {
            setRelated(relatedRes.data.data.filter(p => p.id !== prodData.id) || []);
          }
        }
      } catch (err) {
        console.error("Error fetching product detail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setCartAdding(true);
      await addToCart(product.id, quantity);
      alert("Added to cart successfully!");
    } catch (err) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setCartAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    // Redirect to checkout with query params for direct purchase
    navigate(`/checkout?buy_now=true&product_id=${product.id}&quantity=${quantity}`);
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      await addToWishlist(product.id);
      alert("Added to wishlist!");
    } catch (err) {
      alert(err.message || "Failed to add to wishlist");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0b0c10] text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#0b0c10] text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xl font-bold">Product not found</p>
          <button onClick={() => navigate('/AllProducts')} className="mt-4 px-6 py-2 bg-amber-500 text-black font-bold rounded-full">
            Back to Shop
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = wishlist.item?.some(i => i.product_id === product.id);

  return (
    <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow">
        
        {/* Back link */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 group transition-colors"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-16">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="bg-[#15161b] border border-white/5 rounded-3xl p-6 h-96 lg:h-[450px] flex items-center justify-center relative overflow-hidden">
              <img
                src={activeImg || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"}
                alt={product.name}
                className="max-h-80 w-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Gallery thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-20 bg-[#15161b] border rounded-xl p-2 flex items-center justify-center shrink-0 transition-all ${
                      activeImg === img ? 'border-amber-500 bg-[#1b1c22]' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            <div>
              <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} className="text-sm text-amber-500" />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">4.9 (120 reviews)</span>
                </div>
                <span className="text-gray-600">|</span>
                <span className={`text-xs font-bold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-[#15161b] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Special Price</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-black text-white">₹{product.price}</span>
                  {product.offerprice > 0 && (
                    <span className="text-base text-gray-500 line-through">₹{product.offerprice}</span>
                  )}
                </div>
              </div>
              {product.offer && (
                <div className="bg-amber-500 text-black px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5">
                  <FaTag /> {product.offer}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Product Highlights</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">{product.desc || product.description}</p>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-[#15161b] border border-white/10 rounded-full px-2">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg hover:text-amber-500 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg hover:text-amber-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {product.stock > 0 ? (
                <>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-white text-black hover:bg-amber-500 hover:text-black font-extrabold text-sm rounded-full transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg text-center cursor-pointer"
                  >
                    BUY NOW
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={cartAdding}
                    className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-sm rounded-full transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <FaShoppingCart />
                    {cartAdding ? "Adding..." : "ADD TO CART"}
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-white/5 text-gray-500 font-extrabold text-sm rounded-full cursor-not-allowed border border-white/5"
                >
                  OUT OF STOCK
                </button>
              )}

              <button
                onClick={handleAddToWishlist}
                className={`p-4 rounded-full border transition flex items-center justify-center ${
                  inWishlist 
                    ? "bg-red-500/10 border-red-500/30 text-red-500" 
                    : "border-white/10 text-gray-400 hover:border-red-500 hover:text-red-500"
                }`}
                aria-label="Add to wishlist"
              >
                <FaHeart className="text-lg" />
              </button>
            </div>

            {/* Badges Info */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <FaTruck className="text-amber-500 text-base" />
                <div>
                  <p className="font-bold text-gray-300">Free Secure Shipping</p>
                  <p className="text-[10px] text-gray-500">Delivered within 3-5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUndo className="text-amber-500 text-base" />
                <div>
                  <p className="font-bold text-gray-300">7-Day Easy Returns</p>
                  <p className="text-[10px] text-gray-500">100% money back guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="border-t border-white/5 pt-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-8">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className="bg-[#15161b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/20 transition duration-300 cursor-pointer shadow-lg group"
                >
                  <div>
                    <div className="w-full h-36 flex items-center justify-center bg-black/20 rounded-xl mb-3 overflow-hidden p-2">
                      <img 
                        src={prod.images && prod.images.length > 0 ? prod.images[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"} 
                        alt={prod.name} 
                        className="max-h-28 object-contain group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-white group-hover:text-amber-500 transition-colors truncate text-sm">{prod.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">{prod.desc || prod.description}</p>
                  </div>
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="font-bold text-white text-sm">₹{prod.price}</span>
                    <span className="text-[10px] text-amber-500 font-bold uppercase">{prod.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;
