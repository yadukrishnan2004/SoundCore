import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaArrowLeft, FaTruck, FaUndo, FaTag } from 'react-icons/fa';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import api from '../../../../api/axios';
import { API_ROUTES } from '../../../../api/routes';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useCartStore } from '../../../../store/useCartStore';
import { useWishlistStore } from '../../../../store/useWishlistStore';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlist, addToWishlist } = useWishlistStore();

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
        const res = await api.get(API_ROUTES.USER_PRODUCT_DETAIL(id));
        if (res.data && res.data.status === 200) {
          const data = res.data.data;
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setActiveImg(data.images[0]);
          } else {
            setActiveImg(data.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop");
          }

          // Fetch related products by category
          if (data.category) {
            const relRes = await api.get(API_ROUTES.USER_ALL_PRODUCTS + `?category=${data.category}&limit=4`);
            if (relRes.data && relRes.data.status === 200) {
              setRelated(relRes.data.data.filter((p: any) => p.id !== data.id));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setCartAdding(true);
      await addToCart(product.id, quantity);
      alert(`Added ${quantity} ${product.name} to cart!`);
    } catch (err: any) {
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
    } catch (err: any) {
      alert(err.message || "Failed to add to wishlist");
    }
  };

  const inWishlist = wishlist?.item?.some((item: any) => item.product_id === product?.id || item.id === product?.id);

  if (loading) {
    return (
      <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-heading font-bold text-text-main">Product Not Found</h2>
          <p className="text-sm text-text-muted mt-2">The product you are looking for does not exist or has been removed.</p>
          <Link to="/AllProducts" className="mt-6 px-6 py-2.5 bg-brand-primary text-black font-bold text-xs rounded-full">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const imagesList = product.images && product.images.length > 0 ? product.images : [activeImg];

  return (
    <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-grow space-y-12">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          className="text-xs text-text-muted hover:text-text-main flex items-center gap-2 group transition"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full h-96 sm:h-[450px] bg-bg-card border border-border-subtle rounded-3xl p-6 flex items-center justify-center overflow-hidden relative shadow-2xl">
              <img
                src={activeImg}
                alt={product.name}
                className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail selector bar */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {imagesList.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-20 rounded-xl bg-bg-card border p-2 flex items-center justify-center shrink-0 transition-all ${
                      activeImg === img ? 'border-brand-primary scale-105' : 'border-border-subtle hover:border-text-muted'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <span className="text-xs font-extrabold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-black text-text-main tracking-tight mt-3 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} className="text-sm text-brand-primary" />
                  ))}
                  <span className="text-xs text-text-muted ml-1">4.9 (120 reviews)</span>
                </div>
                <span className="text-text-muted">|</span>
                <span className={`text-xs font-bold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted">Special Price</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-heading font-black text-text-main">₹{product.price}</span>
                  {product.offerprice > 0 && (
                    <span className="text-base text-text-muted line-through">₹{product.offerprice}</span>
                  )}
                </div>
              </div>
              {product.offer && (
                <div className="bg-brand-primary text-black px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5">
                  <FaTag /> {product.offer}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-heading font-bold text-text-main uppercase tracking-wider">Product Highlights</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">{product.desc || product.description}</p>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 border-b border-border-subtle pb-6">
                <span className="text-sm font-bold text-text-main uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-bg-input border border-border-subtle rounded-full px-2">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg hover:text-brand-primary transition-colors text-text-main"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-text-main">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg hover:text-brand-primary transition-colors text-text-main"
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
                    className="flex-1 py-4 bg-bg-card text-text-main border border-border-subtle hover:bg-brand-primary hover:text-black font-extrabold text-sm rounded-full transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg text-center cursor-pointer"
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
                  className="w-full py-4 bg-bg-input text-text-muted font-extrabold text-sm rounded-full cursor-not-allowed border border-border-subtle"
                >
                  OUT OF STOCK
                </button>
              )}

              <button
                onClick={handleAddToWishlist}
                className={`p-4 rounded-full border transition flex items-center justify-center ${
                  inWishlist 
                    ? "bg-red-500/10 border-red-500/30 text-red-500" 
                    : "border-border-subtle text-text-muted hover:border-red-500 hover:text-red-500"
                }`}
                aria-label="Add to wishlist"
              >
                <FaHeart className="text-lg" />
              </button>
            </div>

            {/* Badges Info */}
            <div className="grid grid-cols-2 gap-4 border-t border-border-subtle pt-6 text-xs text-text-muted">
              <div className="flex items-center gap-3">
                <FaTruck className="text-brand-primary text-base" />
                <div>
                  <p className="font-bold text-text-main">Free Secure Shipping</p>
                  <p className="text-[10px] text-text-muted">Delivered within 3-5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUndo className="text-brand-primary text-base" />
                <div>
                  <p className="font-bold text-text-main">7-Day Easy Returns</p>
                  <p className="text-[10px] text-text-muted">100% money back guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="border-t border-border-subtle pt-12">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-text-main tracking-tight mb-8">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className="bg-bg-card border border-border-subtle rounded-2xl p-4 flex flex-col justify-between hover:border-brand-primary/20 transition duration-300 cursor-pointer shadow-lg group"
                >
                  <div>
                    <div className="w-full h-36 flex items-center justify-center bg-bg-input rounded-xl mb-3 overflow-hidden p-2">
                      <img 
                        src={prod.images && prod.images.length > 0 ? prod.images[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"} 
                        alt={prod.name} 
                        className="max-h-28 object-contain group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-text-main group-hover:text-brand-primary transition-colors truncate text-sm">{prod.name}</h3>
                    <p className="text-xs text-text-muted line-clamp-1 mt-1">{prod.desc || prod.description}</p>
                  </div>
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="font-heading font-bold text-text-main text-sm">₹{prod.price}</span>
                    <span className="text-[10px] text-brand-primary font-bold uppercase">{prod.category}</span>
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
