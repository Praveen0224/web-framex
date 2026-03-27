'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield } from 'lucide-react';

const projects = [
    { 
        id: '01', 
        title: 'Neural Interface', 
        brand: 'N', 
        tagline: 'Deep Intelligence', 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
        color: 'from-orange-600/80'
    },
    { 
        id: '02', 
        title: 'Quantum System', 
        brand: 'Q', 
        tagline: 'DeFi Security', 
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
        color: 'from-blue-600/80'
    },
    { 
        id: '03', 
        title: 'Spatial OS', 
        brand: 'S', 
        tagline: 'Mixed Reality', 
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200',
        color: 'from-zinc-800/80'
    },
    { 
        id: '04', 
        title: 'Helios Engine', 
        brand: 'H', 
        tagline: 'Core Rendering', 
        image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200',
        color: 'from-red-600/80'
    }
];

const Portfolio = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const headingWords = ["Selected", "Studio", "Works."];

    // Detect screen size for layout switching
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide, isPaused]);

    return (
        <div className="bg-[#f4f4f4] text-black font-sans overflow-x-hidden min-h-screen">
            
            {/* 1. SYSTEM HEADING SECTION */}
            <section className="pt-24 md:pt-32 px-6 lg:px-20">
                <div className="max-w-[95%] md:max-w-[80%] mx-auto w-full mb-8 md:mb-12">
                    <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 0.4, x: 0 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.8em] mb-4 md:mb-6 font-light border-l border-orange-500 pl-4"
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
                                    ${i === 2 ? 'text-black/10' : 'text-black'}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. SALOMON STYLE CAROUSEL (Adaptive Direction) */}
            <section 
                className="relative h-[550px] md:h-[650px] flex flex-col justify-center items-center overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Container logic: Mobile uses absolute stacking for vertical motion */}
                <div className="flex items-center justify-center w-full relative h-full">
                    {projects.map((p, i) => {
                        const isCenter = i === activeIndex;
                        const isPrev = i === (activeIndex - 1 + projects.length) % projects.length;
                        const isNext = i === (activeIndex + 1) % projects.length;

                        if (!isCenter && !isPrev && !isNext) return null;

                        return (
                            <motion.div
                                key={p.id}
                                onClick={() => setActiveIndex(i)}
                                animate={{
                                    // VERTICAL for mobile, HORIZONTAL for System View
                                    y: isMobile ? (isCenter ? 0 : (isPrev ? -120 : 120)) : 0,
                                    x: isMobile ? 0 : (isCenter ? 0 : (isPrev ? -80 : 80)),
                                    scale: isCenter ? 1 : 0.75,
                                    zIndex: isCenter ? 30 : 10,
                                    opacity: isCenter ? 1 : 0.4,
                                    filter: isCenter ? 'blur(0px)' : 'blur(4px)'
                                }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute md:relative w-[85vw] md:w-[450px] aspect-square overflow-hidden cursor-pointer 
                                ${isCenter ? 'shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]' : 'shadow-none'}`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${p.image})` }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-b ${p.color} to-black/90 mix-blend-multiply`} />
                                </div>

                                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white">
                                    <div className="mb-4">
                                        <div className="w-8 h-8 border-2 border-white flex items-center justify-center font-black text-xs mb-2">
                                            {p.brand}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold leading-none tracking-tight mb-1 uppercase">{p.title}</h3>
                                        <p className="text-[10px] md:text-sm font-medium opacity-80 uppercase tracking-widest">{p.tagline}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Salomon Style Footer Controls */}
                <div className="mt-8 md:mt-16 flex flex-col items-center gap-4 md:gap-6 z-40">
                    <div className="flex gap-4 items-baseline">
                        {projects.map((_, i) => (
                            <span 
                                key={i} 
                                className={`transition-all duration-500 font-bold ${activeIndex === i ? 'text-4xl md:text-6xl text-black' : 'text-sm md:text-sm text-black/20'}`}
                            >
                                {i + 1}
                            </span>
                        ))}
                        <span className="text-black/10 text-xs ml-2">/ 0{projects.length}</span>
                    </div>
                    <div className="w-48 md:w-64 h-[2px] bg-black/5 relative">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-red-600"
                            animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </section>

            {/* 3. CTA SECTION */}
            <section className="py-24 md:py-40 px-6 lg:px-20 border-t border-black/5 relative overflow-hidden bg-white">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-8xl font-light mb-10 tracking-tighter uppercase leading-none text-black">
                        Ready to <br/><span className="text-black/10">Initiate?</span>
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 md:px-16 py-5 md:py-6 border border-black/10 text-black text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] rounded-full transition-all duration-500"
                    >
                        Start Build Sequence
                    </motion.button>
                </div>
            </section>

         
        </div>
    );
};

export default Portfolio;