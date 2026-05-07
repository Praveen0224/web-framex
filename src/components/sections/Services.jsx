'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { 
    id: "01", 
    title: "Web Design", 
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000",
    desc: "We build bold, cohesive brand identities that leave a lasting impression." 
  },
  { 
    id: "02", 
    title: "Brand Design", 
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000",
    desc: "Crafting unique visual identities for modern brands." 
  },
  { 
    id: "03", 
    title: "Logo Design", 
    image: "https://images.unsplash.com/photo-1626785774625-ddc7c8241520?q=80&w=1000",
    desc: "Memorable symbols that define your brand's essence." 
  }
];

const ServicesSection = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#ececec] text-black py-12 md:py-20 overflow-hidden font-sans select-none">
      
      {/* 1. MINIMALIST HEADER */}
      <div className="container mx-auto px-6 md:px-12 relative z-30">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2 block">(Services)</span>
          <h2 className="text-5xl md:text-8xl font-light tracking-tight leading-[1.1]">
            What we <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent font-medium">do</span>
          </h2>
        </div>
        
        {/* NAV TABS - Clean spacing */}
        <div className="flex flex-row justify-between md:justify-start md:gap-24 border-t border-black/10 pt-6">
          {services.map((s, i) => (
            <button
              key={s.id}
              onMouseEnter={() => { setIndex(i); setIsHovered(true); }}
              onMouseLeave={() => setIsHovered(false)}
              className="group flex items-center gap-2 transition-all"
            >
              <motion.div 
                animate={{ scale: index === i ? 1 : 0 }}
                className="w-1.5 h-1.5 rounded-full bg-orange-600"
              />
              <span className={`text-[10px] md:text-sm font-medium transition-colors ${
                index === i ? "text-black" : "text-gray-400"
              }`}>
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. BACKGROUND MARQUEE - Scales for Mobile */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-10">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[25vw] md:text-[20vw] font-bold uppercase text-orange-600/90 pr-20 tracking-tighter">
              {services[index].title}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. CENTRAL IMAGE CARD - Responsive Sizing */}
      <div className="relative z-20 flex justify-center items-center h-[40vh] md:h-[50vh] mt-10 md:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="w-[85vw] h-[250px] md:w-[500px] md:h-[350px] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50"
          >
            <img 
              src={services[index].image} 
              alt={s => s.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. FOOTER DESCRIPTION */}
      <div className="container mx-auto px-6 mt-8 md:mt-12 relative z-30 text-center">
        <AnimatePresence mode="wait">
          <motion.p 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs md:text-sm text-gray-600 max-w-md mx-auto leading-relaxed"
          >
            {services[index].desc}
          </motion.p>
        </AnimatePresence>
      </div>

    </section>
  );
};

export default ServicesSection;