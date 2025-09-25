import React from "react";
import {useNavigate } from "react-router-dom";

function Body() {
  const navigate=useNavigate();


  function gotoProduct(){
    navigate('/AllProducts')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full flex justify-center items-center h-16 bg-black shadow-md sticky top-0 z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center px-4">
          SHOP THE BEST TECH
        </h1>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              src: "https://d1ncau8tqf99kp.cloudfront.net/converted/103364_original_local_1200x1050_v3_converted.webp",
              alt: "One Year",
              title: "Over the Year",
            },
            {
              src: "https://d1ncau8tqf99kp.cloudfront.net/converted/74782_original_local_1200x1050_v3_converted.webp",
              alt: "Over the Year",
              title: "On The Hear",
            },
            {
              src: "https://d1ncau8tqf99kp.cloudfront.net/converted/115577_original_local_1200x1050_v3_converted.webp",
              alt: "In the Year",
              title: "In the Hear",
            },
            {
              src: "https://d1ncau8tqf99kp.cloudfront.net/converted/125024_original_local_1200x1050_v3_converted.webp",
              alt: "Speakers",
              title: "Speakers",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col items-center hover:scale-105"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mb-3 sm:mb-4"
              />
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 text-center">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-[50vh] sm:min-h-screen bg-gray-100 flex items-center justify-center py-8 sm:py-0">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center px-4 sm:px-6">
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-2 md:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-800 text-center md:text-left">
              "The best way to predict the future is to create it."
            </h1>
            <p className="text-base sm:text-lg text-gray-600 text-center md:text-left">
              Discover the best tech products designed to make your life
              smarter, faster, and more enjoyable.
            </p>
            <div className="flex justify-center md:justify-start">
              <button onClick={gotoProduct} className="px-5 py-2.5 sm:px-6 sm:py-3 w-fit bg-amber-500 text-white text-sm sm:text-lg rounded-lg shadow-md hover:bg-amber-600 transition transform hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>

          <div className="relative flex justify-center order-1 md:order-2">
            <img
              src="https://d1ncau8tqf99kp.cloudfront.net/converted/103364_original_local_1200x1050_v3_converted.webp"
              alt="Product"
              className="w-48 sm:w-64 md:w-80 lg:w-[400px] h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col lg:flex-row">
        <div className="flex-1 flex bg-[#8eb780] justify-center items-center py-8 sm:py-12 lg:py-0">
          <div className="w-full max-w-md mx-4 sm:mx-auto lg:mx-0 lg:w-[400px] xl:w-[500px] h-auto sm:h-[300px] flex flex-col bg-black py-6 sm:py-8 lg:py-10 px-4 sm:px-6 justify-center items-center text-center">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
              JBL TOUR ONE <br />
              M3 + SMART TX
            </h1>
            <p className="text-white text-sm sm:text-base mb-4 sm:mb-6">
              Premium over-ear headphones with Hi-Res Audio, Adaptive Noise
              Cancelling, and JBL Spatial 360 sound
            </p>
            <button className="bg-orange-600 text-white px-4 py-2 text-sm sm:text-base border border-transparent hover:bg-black hover:border-white transition transform hover:scale-105">
              SHOP NOW
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] relative">
          <iframe
            className="w-full h-full rounded-none lg:rounded-lg"
            src="https://www.youtube.com/embed/nT_QBS1MFgw?autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&playlist=nT_QBS1MFgw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0"></div>
        </div>
      </section>

      <section className="w-full flex py-4 sm:py-6 justify-center relative bg-gray-900">
        <div className="relative w-full max-w-6xl flex justify-center">
          <img
            src="https://www.boat-lifestyle.com/cdn/shop/files/NIrvana-Strips_1600x.png?v=1758277296"
            alt="BoAt nirvana"
            className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]  object-contain"
          />
        </div>
      </section>
      <div className="w-full flex justify-center bg-gray-900">
        <div className="flex flex-col justify-between w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 rounded shadow">
              <div className="relative w-60 h-44">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/zqStIveTwwo?autoplay=1&mute=1&controls=0&loop=1&playlist=zqStIveTwwo&modestbranding=1&rel=0"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0"></div>
              </div>
              <p className="mt-2 text-white text-sm text-center">
                "Unleash the Nirvana within"
              </p>
            </div>

            <div className="flex flex-col items-center p-4 rounded shadow">
              <div className="relative w-60 h-44">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/J4osOV_tFcc?autoplay=1&mute=1&controls=0&loop=1&playlist=J4osOV_tFcc&modestbranding=1&rel=0"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0"></div>
              </div>
              <p className="mt-2 text-white text-sm text-center">
                "Feel the true sound"
              </p>
            </div>

            <div className="flex flex-col items-center p-4 rounded shadow">
              <div className="relative w-60 h-44">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/FWIyI2qIRRk?autoplay=1&mute=1&controls=0&loop=1&playlist=FWIyI2qIRRk&modestbranding=1&rel=0"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0"></div>
              </div>
              <p className="mt-2 text-white text-sm text-center">
                "Every beat, every moment"
              </p>
            </div>

            <div className="flex flex-col items-center p-4 rounded shadow">
              <div className="relative w-60 h-44">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/925iZ62j4E4?autoplay=1&mute=1&controls=0&loop=1&playlist=925iZ62j4E4&modestbranding=1&rel=0"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0"></div>
              </div>
              <p className="mt-2 text-white text-sm text-center">
                "Plug into happiness"
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="w-40 h-10 p-3 bg-transparent text-white border border-white hover:bg-black transition transform hover:scale-105">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
