import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      bgColor: "bg-blue-700",
      image: "/images/koliosbig.png",
      alt: "greek yogurt",
      // title: "Fresh Dairy Products",
      // quantity: 5,
      // size: "150G",
      // price: "7,799.00",
      // availability: "In Stock",
    },
    {
      bgColor: "bg-green-800",
      image: "/images/organicmilkandcheese.png",
      alt: "Organic Milk and Cheese",
    
    },
    {
      bgColor: "bg-gray-500",
      image: "/images/mugg_bean_coffee_beans_250g.png",
      alt: "Coffee Beans",
    
    },
    {
      bgColor: "bg-amber-200",
      image: "/images/kerrygold_salted_butter_250g.png",
      alt: "Fresh Butter",
  
    },
    {
      bgColor: "bg-red-800",
      image: "/images/freshcream.png",
      alt: "Fresh Cream",
   
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const currentSlide = slides[currentIndex];
  return (
    <div
      className={`min-h-screen transition-colors duration-1000 overflow-hidden ${currentSlide.bgColor}`}
    >
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 h-[calc(90vh-80px)] flex items-center justify-center">
        <div className="relative group w-full flex justify-center items-center">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <span className="text-[15rem] md:text-[12rem] lg:text-[17rem] font-bold text-black/20 select-none whitespace-nowrap animate-pulse uppercase tracking-widest">
              delis
            </span>
          </div>
          <div
            className="relative z-10 animate-float"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="300"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              // quantity={currentSlide.quantity}
              // size={currentSlide.size}
              // price={currentSlide.price}
              // availability={currentSlide.availability}
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] rotate-12 transition-all duration-1000 ease-in-out object-contain cursor-pointer hover:scale-105 hover:rotate-0 relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
