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
        { id: '01', name: 'Services', section: 'services', icon: <LayoutGrid size={22} /> },
        { id: '02', name: 'Portfolio', section: 'portfolio', icon: <Sparkles size={22} /> },
        { id: '03', name: 'About', section: 'about', icon: <User size={22} /> },
        { id: '04', name: 'Contact', section: 'contact', icon: <Mail size={22} /> }
    ]

    return (
        <>
            {/* TOP NAV */}
            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 md:px-16 transition-all duration-500 ${
                    isScrolled 
                    ? 'h-24 bg-[var(--background)]/50 backdrop-blur-xl border-b border-white/10' 
                    : 'h-32 bg-transparent'
                }`}
            >
                {/* 🔥 LOGO (INCREASED SIZE) */}
                <div 
                    className="flex items-center cursor-pointer group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        setActiveTab('home')
                        onNavClick('home')
                    }}
                >
                    <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                        <img 
                            src="/framexlogo.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                        />
                    </div>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-10 py-4 rounded-full backdrop-blur-xl">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                setActiveTab(link.section)
                                onNavClick(link.section)
                            }}
                            className="relative text-[14px] font-semibold uppercase tracking-[0.18em] transition-all"
                        >
                            {/* Active Indicator */}
                            {activeTab === link.section && (
                                <motion.span
                                    layoutId="activeTab"
                                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-orange-500"
                                />
                            )}

                            <span className={`transition-all ${
                                activeTab === link.section
                                ? 'text-orange-500 opacity-100'
                                : 'text-[var(--foreground)] opacity-50 hover:opacity-100'
                            }`}>
                                {link.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            setActiveTab('contact')
                            onNavClick('contact')
                        }}
                        className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[12px] md:text-[14px] tracking-[0.15em] uppercase rounded-xl md:rounded-2xl shadow-[0_10px_25px_rgba(249,115,22,0.4)] active:scale-95 transition-all"
                    >
                        BOOK A CALL
                    </button>
                </div>
            </motion.nav>

            {/* 🔥 MOBILE DOCK */}
            <div className="lg:hidden fixed bottom-8 left-0 w-full z-[1001] flex justify-center px-6">
                <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center justify-around w-full max-w-[420px] bg-white/10 backdrop-blur-2xl border border-white/10 p-3 rounded-[28px] shadow-2xl"
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                setActiveTab(link.section)
                                onNavClick(link.section)
                            }}
                            className="relative flex items-center justify-center w-14 h-14"
                        >
                            <AnimatePresence>
                                {activeTab === link.section && (
                                    <motion.div 
                                        layoutId="mobileActive"
                                        className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl"
                                    />
                                )}
                            </AnimatePresence>

                            <span className={`relative z-10 transition-all ${
                                activeTab === link.section
                                ? 'text-orange-500 scale-110'
                                : 'opacity-40'
                            }`}>
                                {link.icon}
                            </span>
                        </button>
                    ))}
                </motion.div>
            </div>
        </>
    )
}

export default Navbar