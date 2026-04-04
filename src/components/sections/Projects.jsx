'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield } from 'lucide-react';

const projects = [
    { 
        id: '01', 
        title: 'Privielle ', 
        brand: 'E', 
        tagline: 'Ecommerce Website', 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
        color: 'from-orange-600/80'
    },
    { 
        id: '02', 
        title: 'R3k Shots', 
        brand: 'W', 
        tagline: 'Studio Website', 
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
        color: 'from-blue-600/80'
    },
    { 
        id: '03', 
        title: 'SMR Holidays', 
        brand: 'T', 
        tagline: 'Tourism Website', 
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

const clients = [
    { name: "Neuralink", logo: "NEURALINK" },
    { name: "Helios", logo: "HELIOS" },
    { name: "Tesla", logo: "TESLA" },
    { name: "SpaceX", logo: "SPACEX" },
    { name: "OpenAI", logo: "OPENAI" },
];

const Portfolio = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    // Updated Heading Words
    const headingWords = ["Selected", "Works"];

    const duplicatedClients = [...clients, ...clients, ...clients];

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
            <section className="pt-12 md:pt-16 px-6 lg:px-20">
                <div className="max-w-[95%] md:max-w-[80%] mx-auto w-full mb-4 md:mb-6">
                    <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 0.4, x: 0 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.8em] mb-2 md:mb-3 font-light border-l border-orange-500 pl-4"
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
                                className={`inline-block text-4xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.9] mr-4 md:mr-8 
                                    ${i === 1 ? 'bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent' : 'text-black'}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. SALOMON STYLE CAROUSEL */}
            <section 
                className="relative h-[400px] md:h-[500px] flex flex-col justify-center items-center overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
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
                                    y: isMobile ? (isCenter ? 0 : (isPrev ? -100 : 100)) : 0,
                                    x: isMobile ? 0 : (isCenter ? 0 : (isPrev ? -60 : 60)),
                                    scale: isCenter ? 1 : 0.7,
                                    zIndex: isCenter ? 30 : 10,
                                    opacity: isCenter ? 1 : 0.4,
                                    filter: isCenter ? 'blur(0px)' : 'blur(4px)'
                                }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute md:relative w-[75vw] md:w-[350px] aspect-square overflow-hidden cursor-pointer 
                                ${isCenter ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]' : 'shadow-none'}`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${p.image})` }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-b ${p.color} to-black/90 mix-blend-multiply`} />
                                </div>

                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                                    <div className="mb-2">
                                        <div className="w-6 h-6 border border-white flex items-center justify-center font-black text-[10px] mb-2">
                                            {p.brand}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold leading-none tracking-tight mb-1 uppercase">{p.title}</h3>
                                        <p className="text-[9px] md:text-xs font-medium opacity-80 uppercase tracking-widest">{p.tagline}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-4 md:mt-8 flex flex-col items-center gap-3 md:gap-4 z-40">
                    <div className="flex gap-4 items-baseline">
                        {projects.map((_, i) => (
                            <span 
                                key={i} 
                                className={`transition-all duration-500 font-bold ${activeIndex === i ? 'text-3xl md:text-5xl text-black' : 'text-xs md:text-xs text-black/20'}`}
                            >
                                {i + 1}
                            </span>
                        ))}
                        <span className="text-black/10 text-[10px] ml-1">/ 0{projects.length}</span>
                    </div>
                    <div className="w-32 md:w-48 h-[2px] bg-black/5 relative">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-red-600"
                            animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </section>

            {/* 3. CTA SECTION */}
            <section className="pt-16 md:pt-24 pb-8 md:pb-12 px-6 lg:px-20 border-t border-black/5 relative overflow-hidden bg-white">
                <div className="max-w-4xl mx-auto text-center relative z-10 mb-12">
                    <h2 className="text-2xl md:text-4xl font-light mb-6 tracking-tighter uppercase leading-none text-black">
                        Ready to <br/><span className="text-black/10">Initiate?</span>
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '#contact'}
                        className="px-10 md:px-14 py-4 md:py-5 border border-black/10 text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] rounded-full transition-all duration-500"
                    >
                        Book your project
                    </motion.button>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <span className="text-[8px] uppercase tracking-[0.5em] text-black font-bold">Trusted Clients</span>
                    </div>
                    <div className="relative flex overflow-hidden">
                         <div className="flex whitespace-nowrap animate-marquee-reverse">
                            {duplicatedClients.map((client, index) => (
                                <div key={index} className="flex items-center justify-center mx-4 md:mx-10">
                                    <span className="text-xs md:text-lg font-bold tracking-tighter text-black/70 hover:text-black/40 transition-colors duration-500 uppercase">
                                        {client.logo}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes marquee-reverse {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 25s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Portfolio;