'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviewsData = [
    { 
        name: "Yazan & Mawaheb", 
        role: "Client",
        text: "We boosted our sales pipeline by 80% with automated proposals and high-end UI.", 
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
        color: "from-blue-500/20 to-transparent"
    },
    { 
        name: "Cheri Lasota", 
        role: "Student",
        text: "I halved my admin workload to focus on my passion for learning modern design.", 
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000",
        color: "from-rose-500/20 to-transparent"
    },
    { 
        name: "Antoine Thomas", 
        role: "Client",
        text: "I used dashboards to reduce client support calls by 90%. Exceptional code quality.", 
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
        color: "from-orange-500/20 to-transparent"
    },
    { 
        name: "Priya Sharma", 
        role: "Student",
        text: "The mentorship transformed how I approach fullstack development. Simply the best.", 
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
        color: "from-purple-500/20 to-transparent"
    }
];

const ReviewCard = ({ rev }) => (
    <div className={`relative shrink-0 w-[280px] md:w-[320px] group overflow-hidden rounded-[1.5rem]  bg-[#0A0A0B] p-5 flex flex-col justify-end min-h-[240px]`}>
        <div className="absolute inset-0 z-0">
            <img 
                src={rev.img} 
                alt={rev.name} 
                className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
        </div>

        <div className="relative z-10">
            <p className="text-white/70 font-normal leading-snug mb-4 text-xs md:text-sm">
                "{rev.text}"
            </p>
            
            <div className="flex flex-col">
                <span className="text-white text-xs font-semibold">{rev.name}</span>
                <span className="text-orange-500/80 text-[9px] uppercase tracking-wider font-bold">{rev.role}</span>
            </div>
        </div>
    </div>
);

const CompactInfiniteReviews = () => {
    const marqueeData = [...reviewsData, ...reviewsData];

    return (
        <section className="relative w-full bg-[#050508] text-white py-12 overflow-hidden">
            
            {/* CLEAN HEADING SECTION */}
            <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-light tracking-tighter mb-3"
                >
                    Stories Behind <span className="bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent font-medium">Our Success</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 text-sm max-w-xl mx-auto font-normal"
                >
                    Real stories from the students and clients who have scaled their vision with us.
                </motion.p>
            </div>

            {/* CONTINUOUS SCROLLING ROW */}
            <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050508] to-transparent z-20" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050508] to-transparent z-20" />

                <motion.div 
                    className="flex gap-4 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        duration: 25, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                >
                    {marqueeData.map((rev, idx) => (
                        <ReviewCard key={idx} rev={rev} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CompactInfiniteReviews;