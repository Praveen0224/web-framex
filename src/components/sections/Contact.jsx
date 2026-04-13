'use client';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Mail, Phone, Send, User, MessageSquare, Zap, MapPin, 
    ArrowUpRight, Instagram, Linkedin, AlertCircle 
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

/**
 * ModernInput Component
 * Renders a stylized input field with an icon, label, and animated underline.
 */
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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Updated: Removed Twitter and Github
    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/framex_techfarm/" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/framex-tech-farm-453b513b6/" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        location: formData.location,
                        description: formData.message,
                    }
                ]);

            if (error) throw error;

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                message: ''
            });

        } catch (error) {
            console.error('Submission Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden font-sans border-t border-white/5">
            
            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* LEFT SIDE: TYPOGRAPHY PITCH */}
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
                            <h2 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.8] mb-8 uppercase">
                                REACH <br /> <span className="text-white/5 bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">OUT</span>
                            </h2>
                            <p className="text-[11px] md:text-sm text-white/40 font-light max-w-sm leading-relaxed mb-12 uppercase tracking-[0.2em]">
                                Connect with our core architecture team to initiate your next high-end build.
                            </p>
                            <div className="space-y-2 mb-12">
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-orange-500/50 mb-1 font-bold">EMAIL</p>
                                    <p className="text-xl md:text-2xl font-light tracking-tight group-hover:text-orange-500 transition-colors">framextechfarm@gmail.com</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-orange-500/50 mb-1 font-bold">LOCATION</p>
                                    {/* Updated: Added Nagercoil and Virtual Platform context */}
                                    <p className="text-xl md:text-2xl font-light tracking-tight group-hover:text-orange-500 transition-colors">Nagercoil (Virtual Platform)</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center border-t border-white/5 pt-5">
                                {socialLinks.map((Social, i) => (
                                    <motion.a key={i} href={Social.href} whileHover={{ y: -3, color: '#f97316' }} className="text-white/30 transition-colors">
                                        <Social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: THE FORM */}
                    <div className="lg:col-span-7 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative bg-white/80 p-8 md:p-14 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                        >
                            <form onSubmit={handleSubmit} className="text-black">
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                                    <ModernInput icon={User} label="Name" isFocused={focusedField === 'name'}>
                                        <input 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')} 
                                            onBlur={() => setFocusedField(null)} 
                                            className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" 
                                            placeholder="John Doe" 
                                            required 
                                        />
                                    </ModernInput>
                                    <ModernInput icon={Mail} label="Email" isFocused={focusedField === 'email'}>
                                        <input 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')} 
                                            onBlur={() => setFocusedField(null)} 
                                            className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" 
                                            placeholder="john@studio.com" 
                                            type="email" 
                                            required 
                                        />
                                    </ModernInput>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                                    <ModernInput icon={Phone} label="Phone No" optional isFocused={focusedField === 'phone'}>
                                        <input 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('phone')} 
                                            onBlur={() => setFocusedField(null)} 
                                            className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" 
                                            placeholder="+91" 
                                        />
                                    </ModernInput>
                                    <ModernInput icon={MapPin} label="Location" isFocused={focusedField === 'location'}>
                                        <input 
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('location')} 
                                            onBlur={() => setFocusedField(null)} 
                                            className="w-full bg-transparent outline-none text-black text-lg font-medium placeholder:text-black/10" 
                                            placeholder="Nagercoil, India" 
                                            required 
                                        />
                                    </ModernInput>
                                </div>
                                <ModernInput icon={MessageSquare} label="Brief Description" isFocused={focusedField === 'msg'}>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('msg')} 
                                        onBlur={() => setFocusedField(null)} 
                                        rows="2" 
                                        className="w-full bg-transparent outline-none text-black text-lg font-medium resize-none placeholder:text-black/10" 
                                        placeholder="Describe your vision..." 
                                        required 
                                    />
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

                                {submitStatus === 'error' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-[10px] flex items-center gap-3 font-bold uppercase tracking-widest"
                                    >
                                        <AlertCircle size={14} />
                                        Error Transmitting Data. Please check your connection.
                                    </motion.div>
                                )}
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