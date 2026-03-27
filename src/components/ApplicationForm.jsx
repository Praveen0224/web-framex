'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, ExternalLink, MessageSquare } from 'lucide-react';

const ApplicationForm = ({ isOpen, onClose, type }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset after success
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl shadow-orange-500/10"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div>
                            <h2 className="text-2xl font-light tracking-tight">
                                Apply for <span className="text-orange-500 font-medium capitalize">{type}</span>
                            </h2>
                            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Talent Acquisition Portal</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {isSuccess ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-2xl font-medium mb-2">Application Sent!</h3>
                                <p className="text-white/50">Our team will review your profile and get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                            <input 
                                                required
                                                type="text" 
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                            <input 
                                                required
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">LinkedIn Profile</label>
                                        <div className="relative">
                                            <ExternalLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                            <input 
                                                type="url" 
                                                name="linkedin"
                                                value={formData.linkedin}
                                                onChange={handleChange}
                                                placeholder="linkedin.com/in/username"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Why should we select you?</label>
                                    <div className="relative">
                                        <MessageSquare size={16} className="absolute left-4 top-6 text-white/20" />
                                        <textarea 
                                            required
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Tell us about your passion and goals..."
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none resize-none"
                                        />
                                    </div>
                                </div>

                                <button 
                                    disabled={isSubmitting}
                                    className="w-full py-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-orange-950/20"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Submit Application
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ApplicationForm;
