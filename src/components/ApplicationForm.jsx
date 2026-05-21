'use client';

import React, { useState, useMemo } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { 
  X, Send, ChevronRight, ChevronLeft, Calendar, 
  Clock, User, MessageSquare, Globe, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

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
        
        const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday etc.
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('applications').insert([{
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                qualification: formData.whoYouAre, 
                preferred_language: formData.language,
                booking_date: selectedDate,
                booking_time: customTime, 
                message: formData.message,
                application_type: type,
                program_category: category
            }]);
            
            if (error) throw error;
            setIsSuccess(true);
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
                    className="absolute inset-0 bg-black/85 backdrop-blur-xl"
                />

                <m.div
                    initial={{ opacity: 0, rotateX: 12, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -12, y: -30, scale: 0.97 }}
                    transition={{ type: "spring", damping: 28, stiffness: 140 }}
                    className="w-full max-w-xl bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden"
                >
                    {/* Glow Accents */}
                    <div className="absolute top-0 left-1/4 w-[50%] h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-[1px]" />
                    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="p-6 md:p-9 relative z-20">
                        <button onClick={onClose} className="absolute right-6 top-6 text-white/30 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                            <X size={18} />
                        </button>

                        {isSuccess ? (
                            <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 flex flex-col items-center justify-center">
                                <m.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                    <CheckCircle2 size={36} />
                                </m.div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Application Sent</h3>
                                <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Schedule locked perfectly</p>
                            </m.div>
                        ) : (
                            <>
                                <header className="mb-6 pr-10">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((s) => (
                                                <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-5 bg-gradient-to-r from-orange-500 to-pink-500' : 'w-1.5 bg-white/10'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[9px] uppercase tracking-[0.2em] font-black text-orange-500/80">Stage {step} of 3</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                                        {step === 1 && "Select Date & Time"}
                                        {step === 2 && "Identity Profile"}
                                        {step === 3 && "Brief Description"}
                                    </h2>
                                </header>

                                {errorMessage && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* STAGE 1: CIRCULAR CALENDAR GRID & MANUAL TIME */}
                                {step === 1 && (
                                    <m.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                        
                                        {/* Classic Header & Month Selector */}
                                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                                <span className="text-xs font-black uppercase tracking-wider text-white/90">
                                                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </span>
                                                <div className="flex gap-1">
                                                    <button type="button" onClick={() => handleMonthChange(-1)} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                                        <ChevronLeft size={14} />
                                                    </button>
                                                    <button type="button" onClick={() => handleMonthChange(1)} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                                        <ChevronRight size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Weekday Labels */}
                                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(wd => (
                                                    <span key={wd} className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{wd}</span>
                                                ))}
                                            </div>

                                            {/* Circular Days Grid */}
                                            <div className="grid grid-cols-7 gap-1.5 text-center">
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
                                                            className={`relative aspect-square rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                                                                isSelected 
                                                                ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white font-black shadow-lg shadow-orange-500/20 scale-105' 
                                                                : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
                                                            }`}
                                                        >
                                                            {day}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Flexible Dynamic Custom Time Fields */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold ml-1 flex items-center gap-1.5">
                                                <Clock size={11} className="text-pink-500" /> Enter Your Preferred Time
                                            </label>
                                            <input 
                                                type="text"
                                                required
                                                placeholder="e.g., 11:30 AM / Evening 4 PM"
                                                value={customTime}
                                                onChange={(e) => setCustomTime(e.target.value)}
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-pink-500/40 transition-all placeholder:text-white/20"
                                            />
                                        </div>

                                        <button 
                                            type="button"
                                            disabled={!selectedDate || !customTime}
                                            onClick={handleNextStep}
                                            className="w-full py-4 bg-white text-black disabled:bg-white/10 disabled:text-white/30 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all mt-4"
                                        >
                                            Continue <ArrowRight size={14} />
                                        </button>
                                    </m.div>
                                )}

                                {/* STAGE 2: IDENTITY PROFILE */}
                                {step === 2 && (
                                    <m.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                        <input required name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all" />
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-orange-500/40 transition-all text-sm" />
                                            <input required name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-orange-500/40 transition-all text-sm" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold ml-1"><User size={10} className="inline mr-1"/> Who you are</label>
                                            <div className="grid grid-cols-3 gap-2 bg-black/40 p-1 rounded-2xl border border-white/5">
                                                {['student', 'client', 'others'].map((opt) => (
                                                    <button key={opt} type="button" onClick={() => setFormData(prev => ({ ...prev, whoYouAre: opt }))} className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${formData.whoYouAre === opt ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' : 'text-white/40 hover:text-white'}`}>{opt}</button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold ml-1"><Globe size={10} className="inline mr-1"/> Preferred Language</label>
                                            <div className="grid grid-cols-3 gap-2 bg-black/40 p-1 rounded-2xl border border-white/5">
                                                {['Tamil', 'English', 'Other'].map((lang) => (
                                                    <button key={lang} type="button" onClick={() => setFormData(prev => ({ ...prev, language: lang }))} className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${formData.language === lang ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}>{lang}</button>
                                                ))}
                                            </div>
                                        </div>

                                        <input required name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all" />

                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <button type="button" onClick={handlePrevStep} className="py-4 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-1 transition-all">
                                                <ChevronLeft size={14} /> Back
                                            </button>
                                            <button 
                                                type="button"
                                                disabled={!formData.fullName || !formData.email || !formData.phone || !formData.location}
                                                onClick={handleNextStep}
                                                className="py-4 bg-white text-black disabled:bg-white/10 disabled:text-white/30 rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-1 transition-all"
                                            >
                                                Next <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </m.div>
                                )}

                                {/* STAGE 3: MESSAGE SUBMISSION */}
                                {step === 3 && (
                                    <m.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold ml-1"><MessageSquare size={10} className="inline mr-1" /> Remarks</label>
                                            <textarea name="message" required rows="5" placeholder="Share your absolute target goal or requirements..." value={formData.message} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all resize-none" />
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 pt-2">
                                            <button type="button" onClick={handlePrevStep} className="col-span-1 py-4 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-1 transition-all">
                                                <ChevronLeft size={14} /> Back
                                            </button>
                                            <button 
                                                type="submit"
                                                disabled={isSubmitting || !formData.message}
                                                onClick={handleSubmit}
                                                className="col-span-2 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-orange-500/10"
                                            >
                                                {isSubmitting ? "Processing..." : "Submit Project"}
                                            </button>
                                        </div>
                                    </m.div>
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