import React from 'react';
import { FaHeadphones, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-bg-base text-text-muted border-t border-border-subtle pt-12 pb-6 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaHeadphones className="text-brand-primary text-xl" />
            <span className="text-xl font-heading font-extrabold text-text-main tracking-wider">SOUNDCORE</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Crafting premium acoustic hardware, spatial wireless headsets, and studio sound systems engineered for purists.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-text-main font-heading font-bold mb-4 text-sm uppercase tracking-wider">Categories</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/AllProducts?category=wireless" className="hover:text-brand-primary transition-colors">Wireless Headphones</Link></li>
            <li><Link to="/AllProducts?category=earbuds" className="hover:text-brand-primary transition-colors">True Wireless Earbuds</Link></li>
            <li><Link to="/AllProducts?category=studio" className="hover:text-brand-primary transition-colors">Studio & Monitors</Link></li>
            <li><Link to="/AllProducts?category=neckband" className="hover:text-brand-primary transition-colors">Sports Neckbands</Link></li>
            <li><Link to="/AllProducts?category=luxury" className="hover:text-brand-primary transition-colors">Luxury Sound Systems</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-text-main font-heading font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/profile" className="hover:text-brand-primary transition-colors">My Account</Link></li>
            <li><Link to="/cart" className="hover:text-brand-primary transition-colors">Shopping Cart</Link></li>
            <li><Link to="/Fav" className="hover:text-brand-primary transition-colors">Wishlist</Link></li>
            <li><Link to="/AllProducts" className="hover:text-brand-primary transition-colors">Browse Catalog</Link></li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h3 className="text-text-main font-heading font-bold mb-4 text-sm uppercase tracking-wider">Contact & Support</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-brand-primary shrink-0" /> SoundCore HQ, San Francisco, CA</li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-brand-primary shrink-0" /> support@soundcore.audio</li>
            <li className="flex items-center gap-2"><FaPhone className="text-brand-primary shrink-0" /> +1 (800) 555-SOUND</li>
          </ul>
        </div>

      </div>

      {/* Copyright Bottom */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-border-subtle text-center text-xs text-text-muted flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} SoundCore Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-text-main transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text-main transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
