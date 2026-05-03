'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

// --- HELPER COMPONENT: SCROLLING COLUMN ---
const ImageColumn = ({ images, speed = 25, reverse = false }) => (
    <div className="flex flex-col gap-3 overflow-hidden h-full relative">
        <motion.div 
            className="flex flex-col gap-3"
            animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
            {[...images, ...images].map((src, i) => (
                <div key={i} className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                    <img 
                        src={src} 
                        alt="Premium Work" 
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" 
                    />
                </div>
            ))}
        </motion.div>
    </div>
);

const ContactNewsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); 

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const { error } = await supabase.from('newsletter_subs').insert([{ email }]);
            if (error) throw error;
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
        }
    };

    const column1 = [
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"
    ];
    const column2 = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop"
    ];

    return (
        <section className="relative w-full bg-[#050505] text-white py-20 md:py-32 overflow-hidden border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-orange-500">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Trusted by 50+ founders</span>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-extralight tracking-tight leading-[1.1] mb-8">
                            Ready to transform your <br />
                            <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
                                digital vision?
                            </span>
                        </h2>

                        <p className="text-white/40 text-base md:text-lg max-w-lg mb-10 font-light leading-relaxed">
                            Drop your email below. Our architecture team will reach out to discuss your next high-end build.
                        </p>

                        <form onSubmit={handleSubscribe} className="relative max-w-md">
                            <div className="flex items-center p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-orange-500/50 transition-all duration-500 backdrop-blur-md">
                                <input 
                                    type="email" 
                                    placeholder="yourname@work.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white text-sm placeholder:text-white/20"
                                    required
                                />
                                <button 
                                    disabled={status === 'submitting'}
                                    className="bg-white text-black hover:bg-orange-500 hover:text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs uppercase tracking-wider"
                                >
                                    {status === 'submitting' ? '...' : (
                                        <>Contact Me <Send size={14} /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT CONTENT: SCROLLING GRID WITH IMPROVED SHADOWS */}
                    <div className="lg:col-span-5 h-[400px] md:h-[650px] flex gap-3 relative skew-y-3 lg:skew-y-6 lg:rotate-3 transform-gpu overflow-hidden">
                        <div className="flex-1 -mt-10 md:-mt-20">
                            <ImageColumn images={column1} speed={40} />
                        </div>
                        <div className="flex-1 pt-10 md:pt-20">
                            <ImageColumn images={column2} speed={35} reverse />
                        </div>
                        
                        {/* TOP SHADOW EFFECT */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-20" />
                        
                        {/* BOTTOM SHADOW EFFECT */}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
                        
                        {/* LEFT SIDE FADE (Desktop only) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent lg:block hidden pointer-events-none z-20" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactNewsletter;