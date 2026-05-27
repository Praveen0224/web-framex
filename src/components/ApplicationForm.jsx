'use client';

import React, { useState, useMemo } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import {
    X, ChevronRight, ChevronLeft, Clock, User,
    MessageSquare, Globe, ArrowRight, CheckCircle2, ShieldCheck
} from 'lucide-react';
// import { supabase } from '@/lib/supabaseClient'; // Temporarily commented out

const ApplicationForm = ({ isOpen, onClose, type, category }) => {
    const [step, setStep] = useState(1);

    // --- CALENDAR STATES ---
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [customTime, setCustomTime] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        whoYouAre: 'student',
        language: 'Tamil',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // --- GENERATE CIRCULAR MONTH GRID ---
    const { daysInMonth, blankDays } = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const blanks = Array(firstDayIndex).fill(null);
        const days = Array.from({ length: totalDays }, (_, i) => i + 1);

        return { daysInMonth: days, blankDays: blanks };
    }, [currentDate]);

    const handleMonthChange = (direction) => {
        setCurrentDate(prev => {
            const nextDate = new Date(prev);
            nextDate.setMonth(prev.getMonth() + direction);
            return nextDate;
        });
    };

    const handleDateSelect = (dayNum) => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(dayNum).padStart(2, '0');
        setSelectedDate(`${year}-${month}-${day}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (step === 1 && (!selectedDate || !customTime)) return;
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    // --- WHATSAPP REDIRECTION LOGIC ---
    const sendWhatsAppRedirect = (date, time, finalData) => {
        const targetPhoneNumber = "919384844109";

        const textMessage = `*🔥 NEW APPLICATION SUBMISSION*
----------------------------------
*📌 Program Profile:*
• Type: ${type || 'Not Specified'}
• Category: ${category || 'Not Specified'}

*📅 Booking Details:*
• Date: ${date}
• Time: ${time}

*👤 Identity Profile:*
• Name: ${finalData.fullName}
• Email: ${finalData.email}
• Phone: ${finalData.phone}
• Location: ${finalData.location}
• Category: ${finalData.whoYouAre.toUpperCase()}
• Language: ${finalData.language}

*💬 Remarks & Targets:*
"${finalData.message}"
----------------------------------`;

        const encodedMessage = encodeURIComponent(textMessage);
        const whatsappUrl = `https://wa.me/919384844109?text=${encodedMessage}`; window.open(whatsappUrl, '_blank');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsSuccess(true);
            sendWhatsAppRedirect(selectedDate, customTime, formData);

            setTimeout(() => {
                setIsSuccess(false);
                setStep(1);
                setSelectedDate('');
                setCustomTime('');
                setFormData({ fullName: '', email: '', phone: '', location: '', whoYouAre: 'student', language: 'Tamil', message: '' });
                onClose();
            }, 2500);
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
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                <m.div
                    initial={{ opacity: 0, rotateX: 8, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -8, y: -20, scale: 0.98 }}
                    transition={{ type: "spring", damping: 30, stiffness: 160 }}
                    className="w-full max-w-md bg-[#fcfcfd] border border-gray-200/80 rounded-[2rem] relative z-10 shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden"
                >
                    {/* WHATSAPP TRUST BANNER */}
                    {!isSuccess && (
                        <div className="bg-emerald-50/60 border-b border-emerald-100/50 px-6 py-2.5 flex items-center gap-2 text-emerald-700">
                            <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
                            <p className="text-[10px] font-medium tracking-wide uppercase">
                                Chat With Us on WhatsApp                            </p>
                        </div>
                    )}

                    <div className="p-5 md:p-7 relative z-20">
                        <button onClick={onClose} className="absolute right-5 top-5 text-gray-400 hover:text-gray-900 transition-colors p-1.5 rounded-full hover:bg-gray-100">
                            <X size={16} />
                        </button>

                        {isSuccess ? (
                            <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 flex flex-col items-center justify-center">
                                <m.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                                    <CheckCircle2 size={30} />
                                </m.div>
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Redirecting to WhatsApp...</h3>
                                <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-widest">Schedule backup locked safely</p>
                            </m.div>
                        ) : (
                            <>
                                <header className="mb-5 pr-10">
                                    <div className="flex items-center gap-2.5 mb-1.5">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((s) => (
                                                <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-4 bg-orange-500' : 'w-1.5 bg-gray-200'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-orange-500">Stage {step} of 3</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900 tracking-tight uppercase">
                                        {step === 1 && "Select Date & Time"}
                                        {step === 2 && "Identity Profile"}
                                        {step === 3 && "Brief Description"}
                                    </h2>
                                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                                        Your completed details will launch seamlessly via WhatsApp to instant-lock your desk confirmation.
                                    </p>
                                </header>

                                {errorMessage && (
                                    <div className="mb-4 p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-500 text-xs">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* STAGE 1: ULTRA COMPACT CALENDAR CARD */}
                                {step === 1 && (
                                    <m.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3.5">
                                        <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-xl p-3 max-w-[280px] mx-auto w-full">
                                            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-50">
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-800">
                                                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </span>
                                                <div className="flex gap-0.5">
                                                    <button type="button" onClick={() => handleMonthChange(-1)} className="p-1 rounded bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                                                        <ChevronLeft size={10} />
                                                    </button>
                                                    <button type="button" onClick={() => handleMonthChange(1)} className="p-1 rounded bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                                                        <ChevronRight size={10} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(wd => (
                                                    <span key={wd} className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">{wd}</span>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-0.5 text-center">
                                                {blankDays.map((_, idx) => (
                                                    <div key={`blank-${idx}`} className="aspect-square" />
                                                ))}
                                                {daysInMonth.map((day) => {
                                                    const targetString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                                    const isSelected = selectedDate === targetString;

                                                    return (
                                                        <button
                                                            key={`day-${day}`}
                                                            type="button"
                                                            onClick={() => handleDateSelect(day)}
                                                            className={`relative aspect-square rounded-full text-[10px] font-medium transition-all flex items-center justify-center p-1 ${isSelected
                                                                ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                                }`}
                                                        >
                                                            {day}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-bold ml-0.5 flex items-center gap-1">
                                                <Clock size={10} className="text-orange-500" /> Preferred Time
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g., 11:30 AM / Evening 4 PM"
                                                value={customTime}
                                                onChange={(e) => setCustomTime(e.target.value)}
                                                className="w-full bg-white border border-gray-200/80 rounded-xl py-3 px-4 text-xs text-gray-800 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-300"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            disabled={!selectedDate || !customTime}
                                            onClick={handleNextStep}
                                            className="w-full py-3.5 bg-orange-500 text-white disabled:bg-gray-100 disabled:text-gray-400 rounded-xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all mt-2 shadow-sm shadow-orange-500/5"
                                        >
                                            Continue <ArrowRight size={13} />
                                        </button>
                                    </m.div>
                                )}

                                {/* STAGE 2: IDENTITY PROFILE */}
                                {step === 2 && (
                                    <m.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                                        <input required name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full bg-white border border-gray-200/80 rounded-xl py-3 px-4 text-xs text-gray-800 focus:outline-none focus:border-orange-500/50 transition-all" />

                                        <div className="grid grid-cols-2 gap-2.5">
                                            <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-white border border-gray-200/80 rounded-xl py-3 px-4 text-xs text-gray-800 focus:outline-none focus:border-orange-500/50 transition-all" />
                                            <input required name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-gray-200/80 rounded-xl py-3 px-4 text-xs text-gray-800 focus:outline-none focus:border-orange-500/50 transition-all" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-bold ml-0.5"><User size={9} className="inline mr-1 text-gray-400" /> Who you are</label>
                                            <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                                {['student', 'client', 'others'].map((opt) => (
                                                    <button key={opt} type="button" onClick={() => setFormData(prev => ({ ...prev, whoYouAre: opt }))} className={`py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${formData.whoYouAre === opt ? 'bg-white shadow-sm border border-gray-100 text-orange-500 font-extrabold' : 'text-gray-400 hover:text-gray-600'}`}>{opt}</button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-bold ml-0.5"><Globe size={9} className="inline mr-1 text-gray-400" /> Preferred Language</label>
                                            <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                                {['Tamil', 'English', 'Other'].map((lang) => (
                                                    <button key={lang} type="button" onClick={() => setFormData(prev => ({ ...prev, language: lang }))} className={`py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${formData.language === lang ? 'bg-white shadow-sm border border-gray-100 text-gray-900 font-extrabold' : 'text-gray-400 hover:text-gray-600'}`}>{lang}</button>
                                                ))}
                                            </div>
                                        </div>

                                        <input required name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} className="w-full bg-white border border-gray-200/80 rounded-xl py-3 px-4 text-xs text-gray-800 focus:outline-none focus:border-orange-500/50 transition-all" />

                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <button type="button" onClick={handlePrevStep} className="py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-bold text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-0.5 transition-all">
                                                <ChevronLeft size={13} /> Back
                                            </button>
                                            <button
                                                type="button"
                                                disabled={!formData.fullName || !formData.email || !formData.phone || !formData.location}
                                                onClick={handleNextStep}
                                                className="py-3 bg-gray-900 hover:bg-gray-800 text-white disabled:bg-gray-100 disabled:text-gray-400 rounded-xl font-bold text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-0.5 transition-all"
                                            >
                                                Next <ChevronRight size={13} />
                                            </button>
                                        </div>
                                    </m.div>
                                )}

                                {/* STAGE 3: MESSAGE SUBMISSION */}
                                {step === 3 && (
                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-bold ml-0.5"><MessageSquare size={9} className="inline mr-1 text-gray-400" /> Remarks</label>
                                            <textarea name="message" required rows="4" placeholder="Share your absolute target goal or requirements..." value={formData.message} onChange={handleChange} className="w-full bg-white border border-gray-200/80 rounded-xl py-3 px-4 text-xs text-gray-800 focus:outline-none focus:border-orange-500/50 transition-all resize-none" />
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 pt-1">
                                            <button type="button" onClick={handlePrevStep} className="col-span-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-bold text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-0.5 transition-all">
                                                <ChevronLeft size={13} /> Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !formData.message}
                                                className="col-span-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm shadow-orange-500/10"
                                            >
                                                {isSubmitting ? "Processing..." : "Submit via WhatsApp"}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </m.div>
            </div>
        </AnimatePresence>
    );
};

export default ApplicationForm;