import React from 'react';
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import { FaSlidersH } from 'react-icons/fa';
import { useAllProducts } from './hooks/useAllProducts';
import { DesktopFilterSidebar } from './components/DesktopFilterSidebar';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { ProductGrid } from './components/ProductGrid';

function Allproduct() {
  const {
    products,
    loading,
    categories,
    searchVal,
    setSearchVal,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
    showMobileFilters,
    setShowMobileFilters,
    wishlist,
    addingId,
    searchParams,
    setSearchParams,
    applyFilters,
    clearFilters,
    handleAddToCart,
    handleAddToWishlist
  } = useAllProducts();

  return (
    <div className="bg-bg-base text-text-main min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-grow">
        
        {/* Header Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border-subtle pb-4 mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-main tracking-tight">EXPLORE CATALOG</h1>
            <p className="text-xs text-text-muted mt-1">Found {products.length} premium audio systems</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-bg-card border border-border-subtle rounded-lg text-sm w-full text-text-main"
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
              className="bg-bg-card text-text-main text-sm px-4 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-brand-primary w-full sm:w-48"
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
          <DesktopFilterSidebar
            categories={categories}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />

          {/* 2. Products Grid */}
          <div className="flex-grow">
            <ProductGrid
              products={products}
              loading={loading}
              wishlist={wishlist}
              addingId={addingId}
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
            />
          </div>

        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <MobileFilterDrawer
          categories={categories}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          setShowMobileFilters={setShowMobileFilters}
        />
      )}

      <Footer />
    </div>
  );
}

export default Allproduct;
