import React, { useState } from "react";
import useApi from "../api/Api";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideRight } from "../utility/Animation";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

function Hero() {
  const { product1 } = useApi();
  const [currslide, setCurrslide] = useState(0);

  const prevslide = () => {
    setCurrslide(currslide === 0 ? product1.length - 1 : currslide - 1);
  };

  const nextslide = () => {
    setCurrslide(currslide === product1.length - 1 ? 0 : currslide + 1);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
          {/* Slider Container */}
          <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[650px]">
            {product1.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                  index === currslide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  transform: `translateX(${(index - currslide) * 100}%)`,
                }}
              >
                {/* Content Grid */}
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Text Content */}
                  <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-4 sm:p-6 md:p-8 lg:p-10 order-2 lg:order-1">
                    <div className="max-w-md lg:max-w-lg xl:max-w-xl space-y-4 sm:space-y-6">
                      <motion.p
                        variants={slideRight(0.4)}
                        initial="hidden"
                        animate={index === currslide ? "visible" : "hidden"}
                        className="text-black uppercase font-semibold text-sm sm:text-base"
                      >
                        100% Satisfaction Guarantee
                      </motion.p>
                      
                      <motion.h1
                        variants={slideRight(0.6)}
                        initial="hidden"
                        animate={index === currslide ? "visible" : "hidden"}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight"
                      >
                        {item.name}
                      </motion.h1>
                      
                      <motion.p
                        variants={slideRight(0.8)}
                        initial="hidden"
                        animate={index === currslide ? "visible" : "hidden"}
                        className="text-gray-600 text-base sm:text-lg"
                      >
                        {item.description}
                      </motion.p>

                      {/* Buttons */}
                      <motion.div
                        variants={slideRight(1)}
                        initial="hidden"
                        animate={index === currslide ? "visible" : "hidden"}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center mt-4 sm:mt-6"
                      >
                        <button className="primery-btn w-full sm:w-auto px-6 py-3 text-sm sm:text-base">
                          ADD TO CART
                        </button>
                        <button className="flex justify-center items-center gap-2 font-semibold text-sm sm:text-base w-full sm:w-auto">
                          <span className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-300 rounded-full flex justify-center items-center flex-shrink-0">
                            <FaPlay className="text-white text-xs sm:text-sm" />
                          </span>
                          CHECK IT OUT
                        </button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center items-center p-4 sm:p-6 md:p-8 order-1 lg:order-2">
                    <motion.img
                      initial={{ opacity: 0, x: 200 }}
                      animate={
                        index === currslide
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: 200 }
                      }
                      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                      src={item.images[0]}
                      alt={item.name}
                      className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex justify-between items-center px-2 sm:px-4 lg:px-6 z-20">
            <button 
              onClick={prevslide} 
              className="p-2 sm:p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <HiArrowCircleLeft className="text-2xl sm:text-3xl md:text-4xl text-gray-800" />
            </button>
            <button 
              onClick={nextslide} 
              className="p-2 sm:p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <HiArrowCircleRight className="text-2xl sm:text-3xl md:text-4xl text-gray-800" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {product1.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrslide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currslide ? "bg-white scale-125" : "bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;