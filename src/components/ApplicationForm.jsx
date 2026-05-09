'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle, ChevronRight, User, Mail, Phone, MapPin, Fingerprint, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ApplicationForm = ({ isOpen, onClose, type, category }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        whoYouAre: 'student', // student, fresher, other
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('applications').insert([{
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                qualification: formData.whoYouAre, // Mapping "Who you are" to qualification column
                message: formData.message,
                application_type: type,
                program_category: category
            }]);
            if (error) throw error;
            setIsSuccess(true);
            setTimeout(() => { setIsSuccess(false); onClose(); }, 2500);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 perspective-[1000px]">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/70 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, rotateX: 20, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -20, y: -50, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="w-full max-w-lg bg-[#0f0f12] border border-white/10 rounded-[3rem] relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    {/* Interactive Glow Follower Effect */}
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="p-8 md:p-12 relative z-20">
                        <button onClick={onClose} className="absolute right-8 top-8 text-white/20 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        {isSuccess ? (
                            <div className="text-center py-20">
                                <motion.div animate={{ rotateY: 360 }} transition={{ duration: 1 }} className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                                    <Send size={32} />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white">Sent Successfully</h3>
                            </div>
                        ) : (
                            <>
                                <header className="mb-10">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tighter uppercase">Let’s Connect</h2>
                                    <p className="text-white/40 text-sm font-medium mt-1 tracking-widest uppercase">{category} • {type}</p>
                                </header>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="relative group">
                                            <input required name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all shadow-inner" />
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <input required type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500/50 transition-all shadow-inner text-sm" />
                                            <input required name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500/50 transition-all shadow-inner text-sm" />
                                        </div>

                                        {/* WHO YOU ARE - 3D Selection */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold ml-2">Who you are</label>
                                            <div className="grid grid-cols-3 gap-2 bg-black/40 p-1.5 rounded-[1.5rem] border border-white/5">
                                                {['student', 'fresher', 'other'].map((opt) => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, whoYouAre: opt }))}
                                                        className={`py-3 rounded-xl text-xs font-bold uppercase transition-all ${formData.whoYouAre === opt ? 'bg-white text-black shadow-lg scale-[1.02]' : 'text-white/40 hover:text-white'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <input required name="location" placeholder="Your City" value={formData.location} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500/50 transition-all shadow-inner" />

                                        <textarea name="message" required rows="3" placeholder="Tell us something interesting..." value={formData.message} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500/50 transition-all resize-none shadow-inner" />
                                    </div>

                                    <button 
                                        disabled={isSubmitting}
                                        className="group relative w-full py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(234,88,12,0.3)]"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? "Syncing..." : "Push to FrameX"}
                                            {!isSubmitting && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ApplicationForm;