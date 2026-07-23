import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface MobileFilterDrawerProps {
  categories: string[];
  searchVal: string;
  setSearchVal: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  setShowMobileFilters: (show: boolean) => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  categories,
  searchVal,
  setSearchVal,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  applyFilters,
  clearFilters,
  setShowMobileFilters
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-80 h-full bg-bg-card p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold font-heading text-text-main flex items-center gap-2">
              <FaFilter className="text-brand-primary text-sm" /> FILTER OPTIONS
            </span>
            <button onClick={() => setShowMobileFilters(false)} className="text-text-muted hover:text-text-main">
              <FaTimes />
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Search</label>
              <input
                type="text"
                placeholder="Keyword..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-bg-input text-text-main text-xs px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Categories</label>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="m-cat-all"
                    name="m-category"
                    checked={!selectedCategory}
                    onChange={() => setSelectedCategory('')}
                    className="accent-brand-primary"
                  />
                  <label htmlFor="m-cat-all" className="text-xs text-text-main capitalize">
                    All Categories
                  </label>
                </div>
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`m-cat-${cat}`}
                      name="m-category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-brand-primary"
                    />
                    <label htmlFor={`m-cat-${cat}`} className="text-xs text-text-main capitalize">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Price Range (₹)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="bg-bg-input text-text-main text-xs px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-brand-primary text-center"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-bg-input text-text-main text-xs px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-brand-primary text-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-6">
          <button
            onClick={applyFilters}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold text-sm rounded-lg"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="w-full py-3 bg-bg-input border border-border-subtle text-text-main font-bold text-sm rounded-lg"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
