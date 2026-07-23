import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

interface DesktopFilterSidebarProps {
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
}

export const DesktopFilterSidebar: React.FC<DesktopFilterSidebarProps> = ({
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
  clearFilters
}) => {
  return (
    <aside className="hidden lg:block w-64 shrink-0 bg-bg-card border border-border-subtle rounded-2xl p-6 h-fit sticky top-28">
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold font-heading text-text-main flex items-center gap-2">
          <FaFilter className="text-brand-primary text-sm" /> FILTER OPTIONS
        </span>
        <button onClick={clearFilters} className="text-xs text-brand-primary hover:underline">
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Search input */}
        <div className="space-y-2">
          <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Keyword..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full bg-bg-input text-text-main text-xs px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-brand-primary"
            />
            <FaSearch className="absolute right-3 top-2.5 text-text-muted text-xs" />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Categories</label>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cat-all"
                name="category"
                checked={!selectedCategory}
                onChange={() => setSelectedCategory('')}
                className="accent-brand-primary"
              />
              <label htmlFor="cat-all" className="text-xs text-text-main capitalize cursor-pointer">
                All Categories
              </label>
            </div>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`cat-${cat}`}
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="accent-brand-primary"
                />
                <label htmlFor={`cat-${cat}`} className="text-xs text-text-main capitalize cursor-pointer">
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
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

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={applyFilters}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs rounded-lg transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DesktopFilterSidebar;
