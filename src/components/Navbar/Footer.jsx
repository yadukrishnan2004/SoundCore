import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaHeadphones } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#0b0c10] text-gray-400 border-t border-white/5 pt-12 pb-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <FaHeadphones className="text-amber-500 text-2xl" />
            <span className="text-xl font-bold text-white tracking-wider">SOUNDCORE.</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Crafting industry-leading wireless, studio, and luxury sound products for true audiophiles. Experience music exactly the way artists intended.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-amber-500 transition-colors"><FaFacebook className="text-lg" /></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><FaInstagram className="text-lg" /></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><FaTwitter className="text-lg" /></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><FaYoutube className="text-lg" /></a>
          </div>
        </div>

        {/* Shop Columns */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/AllProducts?category=wireless" className="hover:text-white transition-colors">Wireless Headphones</Link></li>
            <li><Link to="/AllProducts?category=earbuds" className="hover:text-white transition-colors">True Wireless Earbuds</Link></li>
            <li><Link to="/AllProducts?category=studio" className="hover:text-white transition-colors">Studio & Monitors</Link></li>
            <li><Link to="/AllProducts?category=neckband" className="hover:text-white transition-colors">Sports Neckbands</Link></li>
            <li><Link to="/AllProducts?category=luxury" className="hover:text-white transition-colors">Luxury Sound Systems</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            <li><Link to="/Fav" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link to="/AllProducts" className="hover:text-white transition-colors">Browse Catalog</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact & Support</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>📞 Toll-Free: 1800-SOUND-CORE</li>
            <li>✉️ Support: support@soundcore.com</li>
            <li>📍 HQ: 101 Soundwaves Ave, Bengaluru, IN</li>
            <li className="pt-2 text-xs text-amber-500">🛡️ 1-Year Brand Warranty Included</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 text-center text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} SoundCore Ltd. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
