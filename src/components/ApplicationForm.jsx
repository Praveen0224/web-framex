'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { sendConfirmationEmail } from '@/app/actions/sendEmail';

const ApplicationForm = ({ isOpen, onClose, type, category }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        qualification: '',
        resume: null,
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            let resumeUrl = null;

            // 1. Upload Resume if exists
            if (formData.resume) {
                const fileExt = formData.resume.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${type}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('resumes')
                    .upload(filePath, formData.resume);

                if (uploadError) throw new Error(`Resume upload failed: ${uploadError.message}`);

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('resumes')
                    .getPublicUrl(filePath);
                
                resumeUrl = publicUrl;
            }

            // 2. Insert Application Data
            const { error: insertError } = await supabase
                .from('applications')
                .insert([
                    {
                        full_name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        location: formData.location,
                        qualification: formData.qualification,
                        resume_url: resumeUrl,
                        message: formData.message,
                        application_type: type,
                        program_category: category
                    }
                ]);

            if (insertError) throw new Error(`Submission failed: ${insertError.message}`);

            // 3. Send Confirmation Email (Background task, don't block UI if it fails)
            sendConfirmationEmail({
                email: formData.email,
                fullName: formData.fullName,
                type: type,
                category: category
            }).catch(err => console.error("Email deferred error:", err));

            setIsSuccess(true);
            
            // Reset after success
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 2000);

        } catch (error) {
            console.error("Submission Error:", error);
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                                <span className="text-white/10 mx-1">/</span>
                                <span className="text-purple-400 font-medium capitalize">{category}</span>
                            </h2>
                            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                                Talent Acquisition Portal
                            </p>
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
                                <p className="text-white/50">
                                    Our team will review your profile and get back to you shortly.
                                </p>
                            </motion.div>
                        ) : (
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {errorMessage && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs flex items-center gap-3"
                                    >
                                        <AlertCircle size={16} />
                                        {errorMessage}
                                    </motion.div>
                                )}

                                {/* Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                            Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                            Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Phone + Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 9876543210"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Your city"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Qualification */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                        Qualification
                                    </label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        placeholder="B.Tech / MCA / etc."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none"
                                    />
                                </div>

                                {/* Resume */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                        Resume (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        name="resume"
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-sm"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Tell us about yourself..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-orange-500/50 focus:bg-white/[0.05] transition-all outline-none resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    disabled={isSubmitting}
                                    className="w-full py-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Submit Application
                                            <Send size={18} />
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