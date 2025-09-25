import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


function Navbar() {
  const navigate=useNavigate();

  function gotoCart(){
    navigate('/cart')
  }
  function gotoFav(){
    navigate('/Fav')
  }
  function gotoLogin(){
    navigate('/Login')
  }
  
  const quat = [
    'Easy Returns.',
    'Starting 0% APR.',
    'PICK UP AS EARLY AS TODAY.',
    'SPECIAL DISCOUNTS WITH ID.ME AT CHECKOUT',
    'UP TO 5% BACK IN POINTS FOR MY SONY MEMBERS'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quat.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <div className="w-full h-10 bg-blue-400 flex items-center justify-center overflow-hidden">
      <div
        key={currentIndex}
        className="text-white font-semibold text-sm animate-fade"
      >
        {quat[currentIndex]}
      </div>
    </div>
       <nav className="bg-black text-white px-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={'/'}>
        <div className="text-xl font-bold">SoundCore.</div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <div className='relative'>

          <input
            type="text"
            placeholder= "Search..." 
            className="px-3 py-1 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          <FaSearch  className='text-gray-600 dark:text-gray-400 absolute right-4 top-2 '/>
            </div>

            <div className='relative flex'>
          <FaHeart
          onClick={gotoFav}
           className="hover:text-red-500 cursor-pointer transition duration-200 text-2xl " />
            <div className='absolute w-5 h-5 top-0 left-2   rounded-full text-black'>
              1
            </div>
            </div>
            <div className='relative '>

          <FaShoppingCart 
          onClick={gotoCart}
           className="hover:text-red-500 cursor-pointer transition duration-200 text-3xl" />
           <div className='absolute bottom-1 left-2 text-black '>
            1
           </div>
            </div>
          <FaUser
          onClick={gotoLogin}
           className="hover:text-red-500 cursor-pointer transition duration-200 text-2xl" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <div className="flex space-x-4 px-2">
            <FaHeart
             onClick={gotoFav}
            
             className="hover:text-red-500 cursor-pointer transition duration-200" />
            <FaShoppingCart
             onClick={gotoCart}
             className="hover:text-red-500 cursor-pointer transition duration-200" />
            <FaUser 
            onClick={gotoLogin}
            className="hover:text-red-500 cursor-pointer transition duration-200" />
          </div>
        </div>
      )}
    </nav>

    </div>
  );
}

export default Navbar;