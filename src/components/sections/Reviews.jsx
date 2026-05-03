'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Star, ChevronRight } from 'lucide-react';

const reviewsData = [
    { name: "Alex Rivera", text: "The most intuitive dashboard I've ever used. Clean and powerful.", time: "Just now" },
    { name: "Samantha J.", text: "Finally a UI kit that understands modern design patterns. 10/10.", time: "2m ago" },
    { name: "Jordan Smith", text: "Code quality is exceptional. Integration was seamless.", time: "15m ago" },
    { name: "Liam Chen", text: "Saved our team weeks of development time. Worth every penny.", time: "1h ago" },
    { name: "Maria Garcia", text: "The attention to detail in these components is breathtaking.", time: "3h ago" },
    { name: "Olivia Martinez", text: "Finally a UI kit that understands modern design patterns. 10/10.", time: "2m ago" },
];

const BackgroundRow = ({ items, duration, reverse = false }) => (
    <div className="flex w-full overflow-hidden mb-4 md:mb-8 opacity-50"> 
        <motion.div 
            initial={{ x: reverse ? "-50%" : "0%" }}
            animate={{ x: reverse ? "0%" : "-50%" }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-8 whitespace-nowrap"
        >
            {[...items, ...items, ...items, ...items].map((rev, i) => (
                <div 
                    key={i} 
                    className="min-w-[200px] md:min-w-[320px] bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-2"
                >
                    <span className="text-[10px] font-bold uppercase text-white/40">{rev.name}</span>
                    <p className="text-[11px] text-white/30 whitespace-normal line-clamp-1 italic">"{rev.text}"</p>
                </div>
            ))}
        </motion.div>
    </div>
);

const FinalInteractiveReviews = () => {
    const [index, setIndex] = useState(0);

    const nextReview = () => {
        setIndex((prev) => (prev + 1) % reviewsData.length);
    };

    return (
        <section className="relative w-full min-h-screen bg-[#020202] text-white py-10 flex flex-col items-center justify-center overflow-hidden font-sans">
            
            {/* 1. ANIMATED BACKGROUND - NOW WITH 6 ROWS */}
            <div className="absolute inset-0 z-0 flex flex-col justify-center rotate-[-8deg] scale-125 pointer-events-none opacity-70">
                <BackgroundRow items={reviewsData} duration={50} />
                <BackgroundRow items={reviewsData} duration={70} reverse />
                <BackgroundRow items={reviewsData} duration={60} />
                <BackgroundRow items={reviewsData} duration={85} reverse />
                {/* Added 2 more rows here to make it 6 total */}
                <BackgroundRow items={reviewsData} duration={55} />
                <BackgroundRow items={reviewsData} duration={75} reverse />
                
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10" />
            </div>

            {/* 2. HEADER AREA */}
            <div className="relative z-30 text-center mb-10 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6"
                >
                    <Star size={14} className="text-orange-500 fill-orange-500" />
                    <span className="text-[11px] uppercase tracking-widest font-bold text-white/80">User Testimonials</span>
                </motion.div>
                <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4">
                    Trusted by <span className="text-orange-500">thousands.</span>
                </h2>
            </div>

            {/* 3. ENHANCED MOBILE CARD */}
            <div className="relative z-40 w-full max-w-[440px] px-5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative group"
                    >
                        {/* Glow Effect behind card */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-20 transition duration-1000"></div>
                        
                        <div className="relative bg-black/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                            
                            {/* Mobile-optimized Icon */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-4 rounded-2xl shadow-lg shadow-orange-500/20">
                                    <Bell className="text-white fill-white" size={20} />
                                </div>
                            </div>

                            <div className="mt-6 text-center md:text-left">
                                <div className="flex justify-center md:justify-start items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                    <span>{reviewsData[index].time}</span>
                                    <span className="h-1 w-1 bg-white/20 rounded-full" />
                                    <span>Verified</span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold mb-4 leading-snug">
                                    {reviewsData[index].name}
                                </h3>

                                <p className="text-white/70 font-medium leading-relaxed mb-10 text-base md:text-lg italic">
                                    "{reviewsData[index].text}"
                                </p>

                                {/* GRADIENT BUTTONS */}
                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={nextReview}
                                        className="w-full bg-gradient-to-r from-[#FF4D00] via-[#FF007A] to-[#7000FF] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-pink-500/10"
                                    >
                                        Next Story
                                        <ChevronRight size={18} />
                                    </button>
                                    <button className="w-full bg-white/5 hover:bg-white/10 text-white/60 font-semibold py-4 rounded-2xl border border-white/5 transition-colors">
                                        View All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FinalInteractiveReviews;