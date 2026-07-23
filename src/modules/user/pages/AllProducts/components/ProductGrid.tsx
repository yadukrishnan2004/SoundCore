import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaShoppingCart } from 'react-icons/fa';

interface ProductGridProps {
  products: any[];
  loading: boolean;
  wishlist: any[];
  addingId: any;
  handleAddToCart: (productId: any) => void;
  handleAddToWishlist: (productId: any) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  wishlist,
  addingId,
  handleAddToCart,
  handleAddToWishlist
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-bg-card border border-border-subtle rounded-2xl p-4 h-80 animate-pulse flex flex-col justify-between">
            <div className="bg-bg-input h-44 rounded-xl"></div>
            <div className="space-y-2">
              <div className="bg-bg-input h-4 rounded w-3/4"></div>
              <div className="bg-bg-input h-4 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 text-center bg-bg-card border border-border-subtle rounded-3xl space-y-3">
        <p className="text-lg font-bold text-text-main font-heading">No Products Found</p>
        <p className="text-xs text-text-muted">Try loosening your search keywords or price filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const isWishlisted = wishlist?.some((item: any) => item.product_id === product.id || item.id === product.id);

        return (
          <div
            key={product.id}
            className="bg-bg-card border border-border-subtle hover:border-brand-primary/20 rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300 relative shadow-md"
          >
            {/* Top Wishlist badge */}
            <button
              onClick={() => handleAddToWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-bg-input text-text-muted hover:text-red-500"
              }`}
            >
              <FaHeart className="text-xs" />
            </button>

            <div>
              {/* Product Image */}
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full h-48 bg-bg-input rounded-xl mb-4 flex items-center justify-center p-4 cursor-pointer overflow-hidden relative"
              >
                <img
                  src={
                    product.images?.[0] ||
                    product.image ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={product.name}
                  className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3 
                onClick={() => navigate(`/product/${product.id}`)}
                className="font-heading font-bold text-text-main group-hover:text-brand-primary transition-colors line-clamp-1 cursor-pointer"
              >
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} className="text-xs text-brand-primary" />
                ))}
                <span className="text-[10px] text-text-muted ml-1">(4.8)</span>
              </div>

              <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
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
                <span className="text-xl font-heading font-extrabold text-text-main">₹{product.price}</span>
                {product.offerprice > 0 && (
                  <span className="text-xs text-text-muted line-through">₹{product.offerprice}</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingId === product.id || product.stock === 0}
                  className="flex-grow bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <FaShoppingCart />
                  {addingId === product.id ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="px-3 bg-bg-input hover:bg-bg-card text-text-main rounded-xl border border-border-subtle text-xs font-semibold"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
