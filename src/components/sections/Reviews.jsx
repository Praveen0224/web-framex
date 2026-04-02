'use client';
import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
    { name: "Adrian K.", role: "CTO, Neuralink", text: "The architecture is clean, fast, and futuristic. Exactly what we needed.", rating: 5 },
    { name: "Sarah Chen", role: "Product Design", text: "Unbelievable attention to detail. The best UI kit I've used in years.", rating: 5 },
    { name: "Marcus V.", role: "Founder, Helios", text: "Professional, reliable, and the code quality is top-tier. 10/10.", rating: 5 },
    { name: "Elena R.", role: "Design Lead", text: "Smooth integration and beautiful components. Saved us weeks of work.", rating: 5 }
];

const Reviews = () => {
    const duplicatedReviews = [...reviews, ...reviews, ...reviews];

    return (
        <section id="reviews" className="relative w-full bg-[#030303] text-white py-20 overflow-hidden border-t border-white/5 font-sans">
            
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                
                {/* --- REVIEWS SECTION --- */}
                <div className="px-6 mb-10">
                    <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-12 leading-[0.85] uppercase">
                        Wall of <br /> 
                        <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent text-5xl">Trusted words</span> <br />
                    </h2>
                    <p className="text-white/40 text-xs md:text-sm mt-1">Trusted by builders worldwide.</p>
                </div>

                <div className="relative">
                    {/* Gradient Fades */}
                    <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

                    {/* MOBILE: snap-x ensures one card per "page" view */}
                    <div className="flex overflow-x-auto md:overflow-hidden snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
                        <div className="flex gap-4 px-6 md:px-0 animate-marquee-slow hover:[animation-play-state:paused] py-4">
                            {duplicatedReviews.map((rev, i) => (
                                <div 
                                    key={i}
                                    className="snap-center min-w-[calc(100vw-48px)] md:min-w-[320px] p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-white/10"
                                >
                                    <div>
                                        <div className="flex gap-0.5 mb-4">
                                            {[...Array(5)].map((_, index) => (
                                                <Star key={index} size={10} className="text-white/60" fill="currentColor" />
                                            ))}
                                        </div>
                                        
                                        <p className="text-sm md:text-base font-light text-white/70 leading-relaxed mb-6">
                                            "{rev.text}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">
                                            {rev.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/90">{rev.name}</h4>
                                            <p className="text-[8px] text-white/30 uppercase tracking-widest">{rev.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* Hide scrollbar */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }

                .animate-marquee-slow {
                    animation: marquee 40s linear infinite;
                }

                @media (max-width: 768px) {
                    .animate-marquee-slow {
                        animation: marquee 30s linear infinite;
                    }
                }
            `}</style>
        </section>
    );
};

export default Reviews;