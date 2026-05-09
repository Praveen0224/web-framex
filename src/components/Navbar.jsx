'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onNavClick, onApply }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', section: 'home' },
        { name: 'About', section: 'about' },
        { name: 'Guidance', section: 'guidance' },
        { name: 'Services', section: 'services' },
        { name: 'Portfolio', section: 'portfolio' },

    ];

    const handleLinkClick = (section) => {
        setActiveTab(section);
        onNavClick(section);
        setIsMobileMenuOpen(false);
    };

    return (
        // Changed: Removed "relative w-full" from header to prevent it from 
        // taking up space in the document flow that might interfere with fixed positioning.
        <header>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                // Fix: Ensure "left-0 right-0" is used with "w-full" and "box-border"
                // Added "box-border" to ensure padding doesn't add to the width.
                className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-20 transition-all duration-500 box-border ${
                    isScrolled 
                    ? 'h-16 md:h-20 bg-black/90 backdrop-blur-xl border-b border-white/5' 
                    : 'h-20 md:h-28 bg-transparent'
                }`}
            >
                {/* 1. LOGO */}
                <div 
                    className="flex items-center cursor-pointer relative z-[1001]"
                    onClick={() => handleLinkClick('home')}
                >
                    <img 
                        src="/framexlogo.png" 
                        alt="Logo" 
                        className="h-40 md:h-56 w-auto object-contain transition-transform active:scale-95" 
                    />
                </div>

                {/* 2. DESKTOP LINKS */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleLinkClick(link.section)}
                            className={`text-[14px] font-medium transition-colors ${
                                activeTab === link.section ? 'text-orange-500' : 'text-white/50 hover:text-white'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* 3. RIGHT ACTIONS */}
                <div className="flex items-center gap-3 relative z-[1001]">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                    
                    <button
                        onClick={onApply}
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-bold text-[12px] rounded-lg shadow-lg shadow-orange-500/20"
                    >
                        Book a Call <Zap size={14} fill="currentColor" />
                    </button>

                    {/* BURGER BUTTON */}
                    <button 
                        className="lg:hidden text-white p-2 flex items-center justify-center outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </motion.nav>

            {/* 4. MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }} // Animation from the right feels more natural
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 w-full h-screen bg-black z-[999] lg:hidden flex flex-col items-center justify-center overflow-hidden"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />
                        
                        <div className="relative flex flex-col items-center gap-4 px-6 w-full max-w-xs text-center">
                            {navLinks.map((link, idx) => (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={link.name}
                                    onClick={() => handleLinkClick(link.section)}
                                    className={`text-3xl font-light tracking-tight ${
                                        activeTab === link.section ? 'text-orange-500 font-medium' : 'text-white/70'
                                    }`}
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                            
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                onClick={onApply}
                                className="w-full mt-4 py-4 bg-orange-500 text-white font-bold rounded-xl text-lg flex items-center justify-center gap-2"
                            >
                                Book a Call <Zap size={20} fill="currentColor" />
                            </motion.button>
                            
                            <div className="mt-4">
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;