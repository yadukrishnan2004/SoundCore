import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { FaFilter, FaSearch, FaShoppingCart, FaHeart, FaStar, FaSlidersH, FaTimes } from 'react-icons/fa';
import api from '../../../../api/axios';
import { API_ROUTES } from '../../../../api/routes';
import { AppContext } from '../../../../context/AppContext';

function Allproduct() {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist, isAuthenticated } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['wireless', 'earbuds', 'studio', 'luxury', 'neckband', 'gaming']);
  const [addingId, setAddingId] = useState(null);

  // Read filter params from URL
  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const minPriceParam = searchParams.get('min_price') || '';
  const maxPriceParam = searchParams.get('max_price') || '';
  const sortParam = searchParams.get('sort') || 'default';
  const pageParam = parseInt(searchParams.get('page') || '1');

  // Input states for filters
  const [searchVal, setSearchVal] = useState(searchParam);
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSearchVal(searchParam);
    setSelectedCategory(categoryParam);
    setMinPrice(minPriceParam);
    setMaxPrice(maxPriceParam);
    setSelectedSort(sortParam);
  }, [searchParams]);

  // Fetch filtered products
  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pageParam,
        limit: 12,
        search: searchParam,
        category: categoryParam,
        min_price: minPriceParam ? parseFloat(minPriceParam) : 0,
        max_price: maxPriceParam ? parseFloat(maxPriceParam) : 0,
        sort: sortParam !== 'default' ? sortParam : ''
      };

      const res = await api.get(API_ROUTES.USER_FILTER, { params });
      if (res.data && res.data.status === 200) {
        setProducts(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching filtered products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchParam, categoryParam, minPriceParam, maxPriceParam, sortParam, pageParam]);

  const applyFilters = () => {
    const newParams = {};
    if (searchVal) newParams.search = searchVal;
    if (selectedCategory) newParams.category = selectedCategory;
    if (minPrice) newParams.min_price = minPrice;
    if (maxPrice) newParams.max_price = maxPrice;
    if (selectedSort !== 'default') newParams.sort = selectedSort;
    newParams.page = '1'; // Reset to page 1 on new filter
    setSearchParams(newParams);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setSearchVal('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
    setSelectedSort('default');
    setSearchParams({});
    setShowMobileFilters(false);
  };

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

  return (
    <div className="bg-[#0b0c10] text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow">
        
        {/* Header Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">EXPLORE CATALOG</h1>
            <p className="text-xs text-gray-500 mt-1">Found {products.length} premium audio systems</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-[#15161b] border border-white/5 rounded-lg text-sm w-full"
            >
              <FaSlidersH /> Filters
            </button>

            {/* Sorting select */}
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
                const current = Object.fromEntries(searchParams);
                if (e.target.value === 'default') {
                  delete current.sort;
                } else {
                  current.sort = e.target.value;
                }
                setSearchParams(current);
              }}
              className="bg-[#15161b] text-gray-300 text-sm px-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500 w-full sm:w-48"
            >
              <option value="default">Sort: Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex gap-8">
          
          {/* 1. Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 bg-[#15161b] border border-white/5 rounded-2xl p-6 h-fit sticky top-28">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-white flex items-center gap-2"><FaFilter className="text-amber-500 text-sm" /> FILTER OPTIONS</span>
              <button onClick={clearFilters} className="text-xs text-amber-500 hover:underline">Reset</button>
            </div>

            <div className="space-y-6">
              {/* Search input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Keyword..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full bg-[#0b0c10] text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500"
                  />
                  <FaSearch className="absolute right-3 top-2.5 text-gray-600 text-xs" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Categories</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  <div key="all" className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="cat-all"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory('')}
                      className="accent-amber-500"
                    />
                    <label htmlFor="cat-all" className="text-xs text-gray-300 capitalize cursor-pointer">All Categories</label>
                  </div>
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`cat-${cat}`}
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="accent-amber-500"
                      />
                      <label htmlFor={`cat-${cat}`} className="text-xs text-gray-300 capitalize cursor-pointer">{cat}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Price Range (₹)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="bg-[#0b0c10] text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500 text-center"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="bg-[#0b0c10] text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500 text-center"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={applyFilters}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-xs rounded-lg transition-all"
              >
                APPLY FILTERS
              </button>
            </div>
          </aside>

          {/* 2. Products Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-[#15161b] h-80 rounded-2xl animate-pulse border border-white/5"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-[#15161b] border border-white/5 rounded-2xl p-12 text-center max-w-lg mx-auto mt-10">
                <p className="text-lg font-bold text-white">No acoustics found</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or query keywords.</p>
                <button onClick={clearFilters} className="mt-6 px-6 py-2 bg-amber-500 text-black font-bold text-sm rounded-full">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
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
                          <span className="text-[10px] text-gray-500 ml-1">(4.8)</span>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                          {product.desc || product.description}
                        </p>
                      </div>

                      <div>
                        {/* Stock warning */}
                        {product.stock <= 5 && product.stock > 0 && (
                          <p className="text-[10px] text-orange-500 font-bold mb-1">⚠️ Low Stock: Only {product.stock} left!</p>
                        )}
                        {product.stock === 0 && (
                          <p className="text-[10px] text-red-500 font-bold mb-1">❌ Out of Stock</p>
                        )}

                        <div className="flex items-baseline justify-between mb-4">
                          <span className="text-xl font-extrabold text-white">₹{product.price}</span>
                          {product.offerprice > 0 && (
                            <span className="text-xs text-gray-500 line-through">₹{product.offerprice}</span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={addingId === product.id || product.stock === 0}
                            className="flex-grow bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-xs py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <FaShoppingCart />
                            {addingId === product.id ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
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
          </div>

        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-80 h-full bg-[#15161b] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white flex items-center gap-2"><FaFilter className="text-amber-500 text-sm" /> FILTER OPTIONS</span>
                <button onClick={() => setShowMobileFilters(false)} className="text-gray-400 hover:text-white"><FaTimes /></button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Search</label>
                  <input
                    type="text"
                    placeholder="Keyword..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full bg-[#0b0c10] text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Categories</label>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="m-cat-all"
                        name="m-category"
                        checked={!selectedCategory}
                        onChange={() => setSelectedCategory('')}
                        className="accent-amber-500"
                      />
                      <label htmlFor="m-cat-all" className="text-xs text-gray-300 capitalize">All Categories</label>
                    </div>
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`m-cat-${cat}`}
                          name="m-category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-amber-500"
                        />
                        <label htmlFor={`m-cat-${cat}`} className="text-xs text-gray-300 capitalize">{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Price Range (₹)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="bg-[#0b0c10] text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500 text-center"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="bg-[#0b0c10] text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-amber-500 text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-6">
              <button
                onClick={applyFilters}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm rounded-lg"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-lg"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Allproduct;
