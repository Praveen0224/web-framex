'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Star, ChevronRight } from 'lucide-react';

const reviewsData = [
    { name: "Alex Rivera", text: "The most intuitive dashboard I've ever used. Clean and powerful.", time: "Just now" },
    { name: "Samantha J.", text: "Finally a UI kit that understands modern design patterns.", time: "2m ago" },
    { name: "Jordan Smith", text: "Code quality is exceptional. Integration was seamless.", time: "15m ago" },
];

const BackgroundRow = ({ items, duration, reverse = false }) => (
    <div className="flex w-full overflow-hidden mb-2 md:mb-4 opacity-10"> 
        <motion.div 
            initial={{ x: reverse ? "-50%" : "0%" }}
            animate={{ x: reverse ? "0%" : "-50%" }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 whitespace-nowrap"
        >
            {[...items, ...items, ...items, ...items].map((rev, i) => (
                <div key={i} className="min-w-[180px] md:min-w-[280px] bg-white/5 border border-white/10 p-3 rounded-lg">
                    <span className="text-[9px] font-bold uppercase text-white/40">{rev.name}</span>
                    <p className="text-[10px] text-white/30 line-clamp-1 italic">"{rev.text}"</p>
                </div>
            ))}
        </motion.div>
    </div>
);

const FinalInteractiveReviews = () => {
    const [index, setIndex] = useState(0);

    return (
        <section className="relative w-full bg-[#020202] text-white py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden font-sans">
            
            {/* 1. BACKGROUND ROWS (Tightened) */}
            <div className="absolute inset-0 z-0 flex flex-col justify-center rotate-[-5deg] scale-110 pointer-events-none">
                <BackgroundRow items={reviewsData} duration={40} />
                <BackgroundRow items={reviewsData} duration={50} reverse />
                <BackgroundRow items={reviewsData} duration={45} />
                <BackgroundRow items={reviewsData} duration={55} reverse />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10" />
            </div>

            {/* 2. COMPACT HEADER */}
            <div className="relative z-30 text-center mb-8 px-6">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4">
                    <Star size={12} className="text-orange-500 fill-orange-500" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Reviews</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight">
                    Trusted by <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">thousands.</span>
                </h2>
            </div>

            {/* 3. TIGHT STACKED CARDS */}
            <div className="relative z-40 w-full max-w-[380px] px-5 h-[380px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <div className="relative w-full h-full flex items-center justify-center">
                        
                        {/* BACK CARDS (More compact stacking) */}
                        {[1, 2, 3].map((item) => (
                            <div
                                key={`back-${item}`}
                                style={{
                                    zIndex: 10 - item,
                                    transform: `translate(${item * 10}px, ${item * 10}px) scale(${1 - (item * 0.04)})`,
                                    opacity: 0.3 - (item * 0.08)
                                }}
                                className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2rem] pointer-events-none"
                            />
                        ))}

                        {/* MAIN CARD */}
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="relative w-full bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-3 rounded-xl shadow-lg">
                                    <Bell className="text-white fill-white" size={16} />
                                </div>
                                <div className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-widest">
                                    <span>{reviewsData[index].time}</span>
                                    <span className="h-1 w-1 bg-white/20 rounded-full" />
                                    <span className="text-orange-500/80">Verified</span>
                                </div>
                            </div>

                            <h3 className="text-lg md:text-xl font-bold mb-2">{reviewsData[index].name}</h3>
                            <p className="text-white/70 font-medium leading-relaxed mb-8 text-sm md:text-base italic">
                                "{reviewsData[index].text}"
                            </p>

                            <button 
                                onClick={() => setIndex((prev) => (prev + 1) % reviewsData.length)}
                                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95"
                            >
                                Next Story
                                <ChevronRight size={16} />
                            </button>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FinalInteractiveReviews;