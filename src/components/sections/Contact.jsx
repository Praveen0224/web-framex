'use client';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Mail, Phone, Send, User, MessageSquare, Zap, MapPin, 
    ArrowUpRight, Instagram, Twitter, Linkedin, Github, Star 
} from 'lucide-react'

// 1. REVIEWS DATA
const reviews = [
    { name: "Adrian K.", role: "CTO, Neuralink", text: "The architecture is clean, fast, and futuristic. Exactly what we needed.", rating: 5 },
    { name: "Sarah Chen", role: "Product Design", text: "Unbelievable attention to detail. The best UI kit I've used in years.", rating: 5 },
    { name: "Marcus V.", role: "Founder, Helios", text: "Professional, reliable, and the code quality is top-tier. 10/10.", rating: 5 }
];

const ModernInput = ({ icon: Icon, label, children, isFocused, optional }) => (
    <div className="relative group mb-6 md:mb-8">
        <div className="flex items-center gap-4 pb-2">
            <Icon size={16} className={`${isFocused ? 'text-orange-600' : 'text-black/20'} transition-colors duration-500`} />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className={`text-[9px] uppercase tracking-[0.3em] font-bold mb-1 transition-colors ${isFocused ? 'text-orange-600' : 'text-black/40'}`}>
                        {label}
                    </p>
                    {optional && <span className="text-[8px] text-black/20 tracking-widest uppercase italic font-light">Optional</span>}
                </div>
                {children}
            </div>
        </div>
        <div className="relative h-[1px] w-full bg-black/5 overflow-hidden">
            <motion.div
                initial={false}
                animate={{ x: isFocused ? 0 : '-100%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-orange-600"
            />
        </div>
    </div>
);

const Contact = () => {
    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const socialLinks = [
        { icon: Instagram, href: "#" },
        { icon: Linkedin, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Github, href: "#" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => { setSubmitStatus('success'); setIsSubmitting(false); }, 2000);
    };

    return (
        /* FIXED: Removed min-h-screen to prevent section jumping, added better overflow handling */
        <section id="contact" className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden font-sans border-t border-white/5">
            
            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                
                {/* 1. USER REVIEWS */}
                <div className="mb-20 md:mb-32">
                    <div className="flex items-center gap-4 mb-10 opacity-30">
                        <div className="h-[1px] w-12 bg-white" />
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Client Feedback</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                        {reviews.map((rev, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-sm"
                            >
                                <div className="flex gap-1 mb-4 text-orange-500">
                                    {[...Array(5)].map((_, index) => <Star key={index} size={10} fill="currentColor" />)}
                                </div>
                                <p className="text-sm md:text-base font-light text-white/70 italic mb-6 leading-relaxed">
                                    "{rev.text}"
                                </p>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest">{rev.name}</h4>
                                    <p className="text-[9px] text-orange-500/60 uppercase tracking-widest">{rev.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* 2. LEFT SIDE: TYPOGRAPHY PITCH */}
                    <div className="lg:col-span-5">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 text-orange-500 mb-8">
                                <Zap size={14} fill="currentColor" />
                                <span className="text-[10px] tracking-[0.5em] uppercase font-black">Transmission_Unit</span>
                            </div>
                            <h2 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.8] mb-8 uppercase">
                                REACH <br /> <span className="text-white/5">OUT.</span>
                            </h2>
                            <p className="text-[11px] md:text-sm text-white/40 font-light max-w-sm leading-relaxed mb-12 uppercase tracking-[0.2em]">
                                Connect with our core architecture team to initiate your next high-end build.
                            </p>
                            <div className="space-y-10 mb-12">
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-orange-500/50 mb-1 font-bold">HQ_EMAIL</p>
                                    <p className="text-xl md:text-2xl font-light tracking-tight group-hover:text-orange-500 transition-colors">hello@nexus.studio</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-orange-500/50 mb-1 font-bold">LOCATION</p>
                                    <p className="text-xl md:text-2xl font-light tracking-tight group-hover:text-orange-500 transition-colors">Tamil Nadu, India</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center border-t border-white/5 pt-10">
                                {socialLinks.map((Social, i) => (
                                    <motion.a key={i} href={Social.href} whileHover={{ y: -3, color: '#f97316' }} className="text-white/30 transition-colors">
                                        <Social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 3. RIGHT SIDE: THE FORM */}
                    <div className="lg:col-span-7 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative bg-white p-8 md:p-14 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                        >
                            <form onSubmit={handleSubmit} className="text-black">
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                                    <ModernInput icon={User} label="Name" isFocused={focusedField === 'name'}>
                                        <input onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" placeholder="John Doe" required />
                                    </ModernInput>
                                    <ModernInput icon={Mail} label="Email" isFocused={focusedField === 'email'}>
                                        <input onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" placeholder="john@studio.com" type="email" required />
                                    </ModernInput>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                                    <ModernInput icon={Phone} label="Phone No" optional isFocused={focusedField === 'phone'}>
                                        <input onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" placeholder="+91" />
                                    </ModernInput>
                                    <ModernInput icon={MapPin} label="Location" isFocused={focusedField === 'location'}>
                                        <input onFocus={() => setFocusedField('location')} onBlur={() => setFocusedField(null)} className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" placeholder="Chennai, India" required />
                                    </ModernInput>
                                </div>
                                <ModernInput icon={MessageSquare} label="Brief Description" isFocused={focusedField === 'msg'}>
                                    <textarea onFocus={() => setFocusedField('msg')} onBlur={() => setFocusedField(null)} rows="2" className="w-full bg-transparent outline-none text-black text-lg font-medium resize-none placeholder:text-black/10" placeholder="Describe your vision..." required />
                                </ModernInput>
                                <motion.button
                                    whileHover={{ scale: 1.01, backgroundColor: '#000', color: '#fff' }}
                                    whileTap={{ scale: 0.99 }}
                                    className="relative w-full py-6 bg-orange-600 text-white font-bold uppercase tracking-[0.4em] text-[10px] rounded-2xl mt-4 transition-all duration-300 shadow-lg"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? "TRANSMITTING..." : "Send Transmission"} <ArrowUpRight size={16} />
                                    </span>
                                </motion.button>
                            </form>
                            
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-10 rounded-[2.5rem]">
                                        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-6">
                                            <Send size={30} className="text-orange-600" />
                                        </div>
                                        <h2 className="text-4xl font-bold text-black mb-2 uppercase tracking-tighter">Sent.</h2>
                                        <button onClick={() => setSubmitStatus('')} className="bg-black text-white px-8 py-3 rounded-full font-bold text-[9px] tracking-[0.4em] uppercase">Dismiss</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;