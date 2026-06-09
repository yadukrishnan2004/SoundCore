import React, { useEffect, useState, useContext } from 'react';
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../pages/context';

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, cart, wishlist } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Top announcements bar
  const announcements = [
    '⚡ FREE SHIPPING ON ORDERS OVER ₹1000 ⚡',
    '🎧 EXPERIENCE STUDIO-QUALITY AUDIO 🎧',
    '🏷️ CHOOSE NO-COST EMI UP TO 12 MONTHS 🏷️',
    '⭐ GET EXTRA 5% MEMBERSHIP POINTS ⭐'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/AllProducts?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="w-full h-8 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center overflow-hidden">
        <div key={currentIndex} className="text-black font-bold text-xs uppercase tracking-wider animate-pulse">
          {announcements[currentIndex]}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-black/90 backdrop-blur-md text-white border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300">
              SOUNDCORE.
            </span>
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search premium audio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b1c22] text-sm text-gray-200 pl-4 pr-10 py-2 rounded-full border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-gray-500"
            />
            <button type="submit" className="absolute right-3 text-gray-400 hover:text-amber-500 transition-colors">
              <FaSearch className="text-base" />
            </button>
          </form>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Wishlist */}
            <Link to="/Fav" className="relative p-1 text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center">
              <FaHeart className="text-xl" />
              {wishlist.count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {wishlist.count}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-1 text-gray-400 hover:text-amber-500 transition-all duration-300 flex items-center">
              <FaShoppingCart className="text-2xl" />
              {cart.count > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.count}
                </span>
              )}
            </Link>

            {/* User Dropdown / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-amber-500 focus:outline-none transition-colors"
                >
                  <FaUser className="text-lg" />
                  <span className="text-sm font-medium max-w-[100px] truncate">{user?.name}</span>
                  <FaChevronDown className={`text-xs transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#15161b] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-xs text-gray-400">Logged in as</p>
                      <p className="text-sm font-bold text-gray-200 truncate">{user?.name}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-amber-500 transition-colors"
                    >
                      My Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-amber-500 hover:bg-white/5 transition-colors font-semibold"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-500 transition-colors flex items-center gap-2 border-t border-white/5"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/Login" className="flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border border-white/20 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
                <FaUser className="text-xs" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburguer & Quick Stats */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/Fav" className="relative p-1 text-gray-400 hover:text-red-500">
              <FaHeart className="text-lg" />
              {wishlist.count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {wishlist.count}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-1 text-gray-400 hover:text-amber-500">
              <FaShoppingCart className="text-xl" />
              {cart.count > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-black text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {cart.count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-3 pb-2 animate-slideDown">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1b1c22] text-sm text-gray-200 pl-4 pr-10 py-2 rounded-full border border-white/10 focus:outline-none focus:border-amber-500"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                <FaSearch className="text-sm" />
              </button>
            </form>
            
            <div className="flex flex-col gap-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-amber-500">
                    👤 My Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-amber-500 font-semibold">
                      ⚙️ Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="text-left w-full py-2 text-sm text-red-400 flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Sign Out ({user?.name})
                  </button>
                </>
              ) : (
                <Link to="/Login" onClick={() => setIsOpen(false)} className="block text-center py-2 text-sm text-amber-500 font-semibold border border-amber-500/20 rounded-lg bg-amber-500/5">
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;