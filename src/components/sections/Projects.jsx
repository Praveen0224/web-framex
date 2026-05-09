'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
    { 
        id: '01', 
        title: 'Privielle', 
        tagline: 'Ecommerce Website', 
        desc: 'A premium digital storefront focused on high-end luxury aesthetics.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
        color: '#121212'
    },
    { 
        id: '02', 
        title: 'R3k Shots', 
        tagline: 'Studio Website', 
        desc: 'Minimalist portfolio for a high-fidelity photography studio.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
        color: '#0d0d0d'
    },
    { 
        id: '03', 
        title: 'SMR Holidays', 
        tagline: 'Tourism Website', 
        desc: 'Experience the beauty of Kodaikanal through a seamless travel interface.',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200',
        color: '#111111'
    },
    { 
        id: '04', 
        title: 'Helios Engine', 
        tagline: 'Core Rendering', 
        desc: 'Advanced graphics engine built for real-time visualization.',
        image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200',
        color: '#0a0a0a'
    }
];

const Card = ({ i, title, tagline, desc, image, color, progress, range, targetScale }) => {
    const container = useRef(null);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
            <motion.div 
                style={{ 
                    scale, 
                    backgroundColor: color,
                    top: `calc(2vh + ${i * 20}px)` 
                }} 
                className="relative h-[480px] md:h-[650px] w-full max-w-[1100px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl origin-top"
            >
                <div className="h-full w-full relative group">
                    <img 
                        src={image} 
                        alt={title} 
                        className="object-cover w-full h-full opacity-40 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 text-white max-w-lg">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="w-8 h-[1px] bg-orange-500"></span>
                           <span className="text-orange-500 font-mono text-[10px] tracking-[0.3em] uppercase">0{i + 1} / Selected Work</span>
                        </div>
                        <h3 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">{title}</h3>
                        <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-2">{tagline}</p>
                        <p className="text-white/60 text-sm md:text-lg font-light leading-relaxed hidden md:block">
                            {desc}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Portfolio = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <main ref={container} className="bg-[#050505] relative">
            {/* COMPACT CENTERED HEADING */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col justify-center items-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <p className="text-[10px] uppercase tracking-[0.6em] text-orange-500 mb-4 font-bold">
                        Selected Archive
                    </p>
                    <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none mb-6">
                        Works <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent font-medium">we done</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
                        A curated collection of digital experiences, ranging from high-performance web engines 
                        to immersive brand storytelling.
                    </p>
                </motion.div>
            </section>

            {/* STACKING CARDS - STARTING CLOSER TO HEADER */}
            <section className="px-2 md:px-10 mt-[-20px]">
                {projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return (
                        <Card 
                            key={project.id} 
                            i={i} 
                            {...project} 
                            progress={scrollYProgress} 
                            range={[i * 0.25, 1]} 
                            targetScale={targetScale}
                        />
                    );
                })}
            </section>

            <div className="h-[20vh]" />
        </main>
    );
};

export default Portfolio;