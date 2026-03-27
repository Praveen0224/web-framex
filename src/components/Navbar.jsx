import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const Navbar = ({ onNavClick, setIsHovered }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { id: '01', name: 'SERVICES', section: 'services' },
        { id: '02', name: 'PORTFOLIO', section: 'portfolio' },
        { id: '03', name: 'ABOUT', section: 'about' },
        { id: '04', name: 'CONTACT', section: 'contact' }
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${isScrolled ? 'h-20 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--glass-border)]' : 'h-28 bg-transparent'
                }`}
        >
            {/* 1. BRANDING */}
            <div
                className="flex items-center gap-4 cursor-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onNavClick('home')}
            >
                {/* Changed the orange box to your logo image */}
                <div className="w-45 h-45 flex items-center justify-center overflow-hidden">
                    <img 
                        src="/framexlogo.png" 
                        alt="Logo" 
                        className="w-full h-full object-contain"
                    />
                </div>
                
                
            </div>

            {/* 2. CENTERED NAV LINKS (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                    <motion.button
                        key={link.name}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => onNavClick(link.section)}
                        className="group relative px-6 py-2 overflow-hidden"
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-mono text-orange-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {link.id}
                            </span>
                            <span className="text-[11px] font-black tracking-[0.2em] text-[var(--foreground)] opacity-50 group-hover:opacity-100 transition-colors">
                                {link.name}
                            </span>
                        </div>
                        {/* Hover Underline */}
                        <motion.div className="absolute bottom-0 left-0 w-full h-[1px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.button>
                ))}
            </div>

            {/* 3. SYSTEM STATUS & ACTION */}
            <div className="flex items-center gap-6">
                <div className="hidden xl:flex flex-col text-right">
                    <div className="text-[9px] font-mono text-[var(--foreground)] opacity-30 tracking-widest uppercase">Uptime</div>
                    <div className="text-[10px] text-green-500 font-mono">99.98% OPS</div>
                </div>

                <ThemeToggle />

                <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative px-6 py-3 border border-[var(--glass-border)] text-[var(--foreground)] font-black text-[10px] tracking-widest uppercase hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
                >
                    LAUNCH_PROJ
                </button>

                {/* Mobile Menu Trigger */}
                <button
                    className="lg:hidden w-10 h-10 bg-[var(--foreground)] opacity-5 flex flex-col items-center justify-center gap-1"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="w-5 h-[1px] bg-[var(--foreground)]" />
                    <span className="w-5 h-[1px] bg-orange-500" />
                </button>
            </div>

            {/* 4. MOBILE DRAWER */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30 }}
                        className="fixed inset-0 bg-[var(--background)] z-[1001] p-10 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <span className="text-[var(--foreground)] font-black">MENU</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-orange-500 font-mono">CLOSE_X</button>
                        </div>
                        <div className="flex flex-col gap-10">
                            {navLinks.map(link => (
                                <button
                                    key={link.name}
                                    className="text-left group"
                                    onClick={() => { onNavClick(link.section); setMobileMenuOpen(false); }}
                                >
                                    <span className="text-orange-500 font-mono text-sm mr-4">{link.id}</span>
                                    <span className="text-5xl font-black text-[var(--foreground)] group-hover:text-orange-500 transition-colors tracking-tighter">
                                        {link.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar