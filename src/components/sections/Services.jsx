'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";

const services = [
  { id: "01", title: "Fullstack Development", desc: "We build fast, secure, and scalable websites and applications." },
  { id: "02", title: "Content Creation", desc: "We create engaging content that connects with people." },
  { id: "03", title: "Experience Designing", desc: "We design simple and user-friendly interfaces for better user experience.", highlight: true },
  { id: "04", title: "Digital Marketing", desc: "We help your business grow online through SEO and ads." },
  { id: "05", title: "Expert Mentoring", desc: "We guide and support you with personal mentoring to improve your skills." }
];

const Services = () => {
  const headingWords = ["Our", "Expert", "Services"];
  const [hoveredIndex, setHoveredIndex] = useState(2);

  return (
    <section className="bg-[#050505] text-white py-24 px-4 md:px-10 relative overflow-hidden font-sans">
      
      {/* 1. HEADING SECTION */}
      <div className="max-w-[80%] mx-auto w-full mb-20">
        <motion.p 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.4, x: 0 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.8em] mb-6 font-light border-l border-orange-500 pl-4"
        >
          Engineering Excellence
        </motion.p>

        <div className="flex flex-wrap">
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.2, 0, 0.2, 1] }}
              viewport={{ once: true }}
              className={`inline-block text-5xl md:text-8xl lg:text-9xl font-light tracking-[-0.04em] leading-[0.9] mr-4 md:mr-8 
                ${i === 2 ? 'bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent' : 'text-white'}`}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 2. ROADMAP CONTAINER - Increased width to 95% */}
      <div className="max-w-[80%] mx-auto w-full flex flex-col md:flex-row min-h-[600px] relative">
        
        {/* DASHED LINE */}
        <div className="absolute top-0 left-4 md:left-0 md:top-1/2 w-[1px] md:w-full h-full md:h-[1px] border-l md:border-l-0 md:border-t border-dashed border-white/20 z-0" />

        {services.map((service, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            className="relative flex-1 flex flex-col justify-end p-8 md:p-12 border-b md:border-b-0 md:border-l border-white/5 cursor-pointer overflow-hidden min-h-[300px] md:min-h-[550px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
               flex: hoveredIndex === index ? 1.8 : 1 // Active card expands horizontally
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* HOVER GRADIENT */}
            <motion.div 
              className="absolute inset-0 z-0 bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70]"
              animate={{ 
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? 0 : 50
              }}
              transition={{ duration: 0.5 }}
            />

            {/* TIMELINE DOT */}
            <div className="absolute top-1/2 left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div 
                animate={{ 
                  scale: hoveredIndex === index ? 1.8 : 1,
                  backgroundColor: hoveredIndex === index ? "#fff" : "rgba(255,255,255,0.2)",
                  boxShadow: hoveredIndex === index ? "0 0 25px rgba(255,255,255,0.6)" : "none"
                }}
                className="w-3 h-3 md:w-4 md:h-4 rounded-full border-4 border-[#050505]"
              />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 pl-6 md:pl-0">
              <motion.div
                animate={{ y: hoveredIndex === index ? 0 : 15 }}
                className="transition-all duration-500"
              >
                <span className={`text-2xl font-bold block mb-4 ${hoveredIndex === index ? 'text-black' : 'text-orange-500'}`}>
                  Q{service.id}
                </span>
                
                <h3 className={`text-2xl md:text-4xl font-light mb-4 leading-tight ${hoveredIndex === index ? 'text-black' : 'text-white'}`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm md:text-lg leading-relaxed max-w-[320px] ${hoveredIndex === index ? 'text-black/80' : 'text-white/40'}`}>
                  {service.desc}
                </p>
              </motion.div>
            </div>

            {/* "ACTIVE" LABEL */}
            {hoveredIndex === index && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-12 left-14 md:left-12 z-10"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-black/40">Current Goal</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* FOOTER DECOR */}
      <div className="mt-24 text-center opacity-10">
        <p className="text-[8px] uppercase tracking-[1.5em]">System Interactive Roadmap</p>
      </div>
    </section>
  );
};

export default Services; 