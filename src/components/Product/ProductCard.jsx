import React from "react";

function ProductCard({ data, onAddToCart, onAddToFavorites }) {
  const product = data;

  return (
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 
                    flex flex-col items-center text-center p-6 w-full max-w-xs">
      
      {/* Image box (fixed height for uniform cards) */}
      <div className="w-full h-52 flex items-center justify-center bg-gray-50 rounded-lg mb-4 overflow-hidden">
        <img
          // src={product.images[0]}
          alt={product.name}
          className="max-h-44 object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-3">
        {product.description?.substring(0, 50)}...
      </p>

      {/* Price */}
      <span className="text-2xl font-bold text-gray-900 mb-4">
        ₹{product.price}
      </span>

      {/* Actions */}
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 bg-black text-white py-2 rounded-full hover:bg-gray-800 transition"
          onClick={() => onAddToCart?.(product)}
        >
          Buy Now
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition"
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
