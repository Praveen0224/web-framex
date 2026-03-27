import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, User, Mail, Sparkles } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navbar = ({ onNavClick, setIsHovered }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeTab, setActiveTab] = useState('home')

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { id: '01', name: 'Services', section: 'services', icon: <LayoutGrid size={20} /> },
        { id: '02', name: 'Portfolio', section: 'portfolio', icon: <Sparkles size={20} /> },
        { id: '03', name: 'About', section: 'about', icon: <User size={20} /> },
        { id: '04', name: 'Contact', section: 'contact', icon: <Mail size={20} /> }
    ]

    return (
        <>
            {/* TOP NAV */}
            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
                    isScrolled 
                    ? 'h-20 bg-[var(--background)]/70 backdrop-blur-xl border-b border-white/5' 
                    : 'h-24 bg-transparent'
                }`}
            >
                {/* LOGO - Optimized size */}
                <div 
                    className="flex items-center cursor-pointer group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        setActiveTab('home')
                        onNavClick('home')
                    }}
                >
                    <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <img 
                            src="/framexlogo.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain filter brightness-110"
                        />
                    </div>
                </div>

                {/* DESKTOP MENU - Compact padding & font */}
                <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-8 py-3 rounded-full backdrop-blur-2xl shadow-inner">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                setActiveTab(link.section)
                                onNavClick(link.section)
                            }}
                            className="relative text-[12px] font-bold uppercase tracking-[0.15em] transition-all"
                        >
                            {activeTab === link.section && (
                                <motion.span
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-orange-500"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}

                            <span className={`transition-all duration-300 ${
                                activeTab === link.section
                                ? 'text-orange-500 opacity-100'
                                : 'text-[var(--foreground)] opacity-40 hover:opacity-100'
                            }`}>
                                {link.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/* RIGHT SIDE - Sleek Button */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block scale-90">
                        <ThemeToggle />
                    </div>

                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            setActiveTab('contact')
                            onNavClick('contact')
                        }}
                        className="px-5 md:px-6 py-2.5 md:py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] md:text-[12px] tracking-widest uppercase rounded-lg md:rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                    >
                        BOOK A CALL
                    </button>
                </div>
            </motion.nav>

            {/* MOBILE DOCK - Slimmer version */}
            <div className="lg:hidden fixed bottom-6 left-0 w-full z-[1001] flex justify-center px-6">
                <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center justify-around w-full max-w-[360px] bg-black/20 dark:bg-white/5 backdrop-blur-3xl border border-white/10 p-2 rounded-[22px] shadow-2xl"
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                setActiveTab(link.section);
                                onNavClick(link.section);
                            }}
                            className="relative flex items-center justify-center w-12 h-12"
                        >
                            <AnimatePresence>
                                {activeTab === link.section && (
                                    <motion.div 
                                        layoutId="mobileActive"
                                        className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-xl border border-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                            </AnimatePresence>

                            <span className={`relative z-10 transition-all duration-300 ${
                                activeTab === link.section
                                ? 'text-orange-500 scale-105'
                                : 'text-[var(--foreground)] opacity-30'
                            }`}>
                                {React.cloneElement(link.icon, { size: 18 })}
                            </span>
                        </button>
                    ))}
                </motion.div>
            </div>
        </>
    )
}

export default Navbar