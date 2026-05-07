'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactNewsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const sectionRef = useRef(null);
    const imageGridRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Cinematic Content Reveal
            gsap.from(contentRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // 2. 3D Scroll Animation for Images
            const images = imageGridRef.current.querySelectorAll('.parallax-img');
            
            images.forEach((img, i) => {
                gsap.fromTo(img, 
                    { 
                        rotationY: -20, 
                        rotationX: 10, 
                        z: -100,
                        opacity: 0.3 
                    },
                    {
                        rotationY: 10,
                        rotationX: -5,
                        z: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: i * 0.5 + 1, // Different scrub speeds for parallax effect
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const { error } = await supabase.from('newsletter_subs').insert([{ email }]);
            if (error) throw error;
            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
        }
    };

    const images = [
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        "https://images.unsplash.com/photo-1558655146-d09347e92766",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    ];

    return (
        <section 
            ref={sectionRef} 
            className="relative bg-[#050505] text-white py-24 overflow-hidden"
            style={{ perspective: '1200px' }} // Critical for 3D depth
        >
            {/* Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-orange-600/10 blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
                
                {/* LEFT: Content */}
                <div ref={contentRef} className="lg:col-span-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex text-orange-500">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-xs tracking-[0.2em] text-white/40 uppercase">Premium Tech Solutions</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-light leading-[1.1] mb-8">
                        Design the <br />
                        <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text font-medium">
                            Future
                        </span>
                    </h1>

                    <p className="text-white/50 max-w-md mb-10 text-lg leading-relaxed">
                        We build high-end digital products for forward-thinking brands. Join our network today.
                    </p>

                    <form onSubmit={handleSubscribe} className="max-w-md">
                        <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl p-2 backdrop-blur-3xl focus-within:border-orange-500/50 transition-all duration-500">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-3 outline-none text-sm"
                                required
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-transform active:scale-95">
                                {status === 'loading' ? '...' : 'Connect'}
                                <Send size={14} />
                            </button>
                        </div>
                        {status === 'success' && <p className="text-green-400 text-sm mt-4 flex items-center gap-2"><CheckCircle size={16}/> Success!</p>}
                    </form>
                </div>

                {/* RIGHT: 3D Image Grid */}
                <div 
                    ref={imageGridRef}
                    className="lg:col-span-6 grid grid-cols-2 gap-6 h-[600px]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {images.map((src, i) => (
                        <div 
                            key={i} 
                            className={`parallax-img relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl ${i % 2 !== 0 ? 'mt-12' : ''}`}
                        >
                            <img
                                src={src}
                                alt="Project"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ContactNewsletter;