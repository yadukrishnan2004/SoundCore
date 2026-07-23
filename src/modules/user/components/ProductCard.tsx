import React from "react";

function ProductCard({ data, onAddToCart, onAddToFavorites }: { data: any; onAddToCart?: (prod: any) => void; onAddToFavorites?: (prod: any) => void }) {
  const product = data;

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center p-6 w-full max-w-xs">
      
      {/* Image box (fixed height for uniform cards) */}
      <div className="w-full h-52 flex items-center justify-center bg-bg-input rounded-lg mb-4 overflow-hidden">
        <img
          src={product.images?.[0] || product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop"}
          alt={product.name}
          className="max-h-44 object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-heading font-semibold text-text-main mb-1">{product.name}</h3>
      <p className="text-text-muted text-sm mb-3">
        {product.description?.substring(0, 50)}...
      </p>

      {/* Price */}
      <span className="text-2xl font-heading font-bold text-text-main mb-4">
        ₹{product.price}
      </span>

      {/* Actions */}
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 bg-brand-primary text-black font-extrabold py-2 rounded-full hover:bg-brand-hover transition"
          onClick={() => onAddToCart?.(product)}
        >
          Buy Now
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center border border-border-subtle text-text-main rounded-full hover:bg-bg-input transition"
          onClick={() => onAddToFavorites?.(product)}
          aria-label="Add to favorites"
        >
          ♡
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
