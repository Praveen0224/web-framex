'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, User, Mail, Sparkles, Briefcase, Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onNavClick, setIsHovered }) => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', section: 'home' },
        { name: 'Services', section: 'services' },
        { name: 'Portfolio', section: 'portfolio' },
        { name: 'About', section: 'about' }
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLinkClick = (section) => {
        setActiveTab(section);
        onNavClick(section);
        setIsMobileMenuOpen(false);
    };

    return (
        <header>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 md:px-20 transition-all duration-500 ${
                    isScrolled 
                    ? 'h-20 bg-black/95 backdrop-blur-md border-b border-white/5' 
                    : 'h-28 bg-transparent'
                }`}
            >
                {/* LOGO SECTION - Large and Text-Free */}
                <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleLinkClick('home')}
                >
                    <img 
                        src="/framexlogo.png" 
                        alt="Logo" 
                        className="h-40 md:h-45 w-auto object-contain transition-transform hover:scale-105" 
                    />
                </div>

                {/* DESKTOP NAV LINKS */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleLinkClick(link.section)}
                            className={`text-[14px] font-medium transition-all duration-300 ${
                                activeTab === link.section 
                                ? 'text-orange-500' 
                                : 'text-white/50 hover:text-white'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* RIGHT SECTION: Theme + CTA + Burger */}
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                    
                    <button
                        onClick={() => handleLinkClick('contact')}
                        className="hidden sm:flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[13px] rounded-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    >
                        Book a Call
                        <Zap size={14} fill="currentColor" />
                    </button>

                    {/* MOBILE BURGER ICON */}
                    <button 
                        className="lg:hidden text-white p-2"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* MOBILE OVERLAY MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-20 left-0 w-full bg-black/95 z-[999] lg:hidden border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleLinkClick(link.section)}
                                    className={`text-left text-lg font-medium ${
                                        activeTab === link.section ? 'text-orange-500' : 'text-white/70'
                                    }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button
                                onClick={() => handleLinkClick('contact')}
                                className="w-full py-4 bg-orange-500 text-white font-bold rounded-lg text-center"
                            >
                                Book a Call
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;