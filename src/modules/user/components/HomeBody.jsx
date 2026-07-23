import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaChevronRight, FaStar, FaVolumeUp, FaBolt, FaShieldAlt } from "react-icons/fa";
import api from '../../../api/axios';
import { API_ROUTES } from '../../../api/routes';
import { AppContext } from '../../../context/AppContext';

function Body() {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist, isAuthenticated } = useContext(AppContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Fetch products to display as featured
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

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      setAddingId(productId);
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }
    try {
      await addToWishlist(productId);
      alert("Added to wishlist!");
    } catch (err) {
      alert(err.message || "Failed to add to wishlist");
    }
  };

  const categories = [
    {
      name: "Wireless",
      slug: "wireless",
      image: "https://d1ncau8tqf99kp.cloudfront.net/converted/103364_original_local_1200x1050_v3_converted.webp",
      desc: "Over-ear comfort"
    },
    {
      name: "Earbuds",
      slug: "earbuds",
      image: "https://store.sony.com.au/dw/image/v2/ABBC_PRD/on/demandware.static/-/Sites-sony-master-catalog/default/dw9194429e/images/WF1000XM5B/WF1000XM5B_2.png?sw=710&sh=710&sm=fit",
      desc: "True wireless"
    },
    {
      name: "Studio",
      slug: "studio",
      image: "https://m.media-amazon.com/images/I/71nT-y33zyL.SX679.jpg",
      desc: "Professional monitor"
    },
    {
      name: "Luxury",
      slug: "luxury",
      image: "https://www.hifi-regler.de/images_c/fm/products/sennheiser/sennheiser_momentum_ws.p1140x855.jpg",
      desc: "Audiophile sound"
    }
  ];

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen">
      
      {/* 1. Category Browser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">SHOP BY CATEGORY</h2>
            <p className="text-gray-400 text-sm mt-1">Explore our custom-tailored acoustic ranges</p>
          </div>
          <button 
            onClick={() => navigate('/AllProducts')} 
            className="text-amber-500 hover:text-amber-400 text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            View All Products <FaChevronRight className="text-xs" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/AllProducts?category=${cat.slug}`)}
              className="group bg-[#15161b] rounded-2xl border border-white/5 p-5 flex flex-col items-center justify-between text-center cursor-pointer hover:border-amber-500/30 hover:bg-[#1b1c22] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <div className="w-28 h-28 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-black/30 p-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-24 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold group-hover:text-amber-500 transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">FEATURED ACOUSTICS</h2>
          <p className="text-gray-400 text-sm mt-1">Handpicked best sellers from SoundCore</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-[#15161b] h-80 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const inWishlist = wishlist.item?.some(i => i.product_id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-[#15161b] border border-white/5 rounded-2xl hover:border-amber-500/20 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-black/50"
                >
                  <div className="relative">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleAddToWishlist(product.id)}
                      className={`absolute top-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        inWishlist 
                          ? "bg-red-500/20 border-red-500/50 text-red-500" 
                          : "bg-black/30 border-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                      }`}
                    >
                      <FaHeart className="text-sm" />
                    </button>

                    {/* Image */}
                    <div 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-full h-44 flex items-center justify-center bg-black/20 rounded-xl mb-4 overflow-hidden p-3 cursor-pointer"
                    >
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"}
                        alt={product.name}
                        className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="font-bold text-white group-hover:text-amber-500 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    
                    {/* Rating placeholder */}
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar key={s} className="text-xs text-amber-500" />
                      ))}
                      <span className="text-[10px] text-gray-500 ml-1">(4.9)</span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {product.desc || product.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xl font-extrabold text-white">₹{product.price}</span>
                      {product.offerprice > 0 && (
                        <span className="text-xs text-gray-500 line-through">₹{product.offerprice}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={addingId === product.id}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-xs py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <FaShoppingCart />
                        {addingId === product.id ? "Adding..." : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="px-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Promo Banner Section */}
      <section className="bg-gradient-to-r from-[#1c1d24] to-[#121319] border-y border-white/5 my-12 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Acoustic Masterpiece
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              JBL TOUR ONE M3 + SMART TX
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Experience silence reimagined. Featuring True Adaptive Noise Cancelling, JBL Spatial Sound, and customizable Smart Charging case transmitter.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                <FaVolumeUp className="text-amber-500 text-lg mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">Hi-Res Audio</p>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                <FaBolt className="text-amber-500 text-lg mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">50H Playtime</p>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                <FaShieldAlt className="text-amber-500 text-lg mx-auto mb-1" />
                <p className="text-[10px] text-gray-500">ANC Hybrid</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/AllProducts')}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full transition transform hover:scale-105 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              DISCOVER MORE
            </button>
          </div>
          
          <div className="relative h-64 sm:h-80 md:h-[400px]">
            <iframe
              className="w-full h-full rounded-2xl border border-white/5 shadow-2xl"
              src="https://www.youtube.com/embed/nT_QBS1MFgw?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&playlist=nT_QBS1MFgw"
              title="Acoustic Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. Video Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">EXPERIENCE THE BEAT</h2>
          <p className="text-gray-400 text-sm mt-2">Plug into happiness with the latest audio trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: "zqStIveTwwo", title: "Unleash the Nirvana within" },
            { id: "J4osOV_tFcc", title: "Feel the true sound" },
            { id: "FWIyI2qIRRk", title: "Every beat, every moment" },
            { id: "925iZ62j4E4", title: "Plug into happiness" }
          ].map((video) => (
            <div key={video.id} className="bg-[#15161b] rounded-2xl overflow-hidden border border-white/5 shadow-xl group">
              <div className="relative aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&modestbranding=1&rel=0`}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-300 text-center">"{video.title}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Body;
