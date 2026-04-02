'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, ArrowUpRight, Zap, Send } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'DIRECTORY',
            links: [
                { name: 'ABOUT', href: '#' },
                { name: 'SERVICES', href: '#services' },
                { name: 'PORTFOLIO', href: '#portfolio' },
                { name: 'CONTACT', href: '#contact' }
            ]
        },
        {
            title: 'CORE_SPECS',
            links: [
                { name: 'WEB_DEV', href: '#' },
                { name: 'UI/UX_DESIGN', href: '#' },
                { name: 'SOFTWARE_SOL', href: '#' },
                { name: 'STRATEGY', href: '#' }
            ]
        },
        {
            title: 'LEGAL_UNIT',
            links: [
                { name: 'PRIVACY', href: '#' },
                { name: 'TERMS', href: '#' }
            ]
        }
    ];

    return (
        <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden font-sans border-t border-white/5">
            
            {/* --- BACKGROUND AMBIENCE --- */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
            
    
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-20">
                    
                    {/* LEFT SECTION */}
                    <div className="lg:max-w-2xl">
                        <div className="flex items-center gap-3 mb-10">
                            <motion.div 
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Zap size={16} className="text-orange-500 fill-orange-500" />
                            </motion.div>
                            <span className="text-[10px] tracking-[0.6em] uppercase font-black text-white/40">Transmission_Unit_Active</span>
                        </div>
                        
                        <h2 className="text-6xl md:text-8xl font-light tracking-tighter mb-12 leading-[0.85] uppercase">
                            Let's build <br /> 
                            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent font-medium">the future</span> <br />
                            together.
                        </h2>
                        
                        {/* SOCIALS */}
                        <div className="flex gap-5">
                            {[Linkedin, Facebook, Instagram].map((Icon, index) => (
                                <motion.a 
                                    key={index}
                                    href="#" 
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-all duration-500 hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-white group"
                                >
                                    <Icon size={22} className="group-hover:rotate-[360deg] transition-transform duration-700" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
                        

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = '#contact'}
                            className="group relative px-12 py-6 bg-white text-black font-black rounded-full overflow-hidden mb-24 flex items-center gap-4 uppercase text-[12px] tracking-widest"
                        >
                            <span className="relative z-10">Start a project</span>
                            <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            {/* Animated Background Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-white group-hover:text-white" />
                        </motion.button>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-left w-full lg:w-auto">
                            {footerLinks.map((section) => (
                                <div key={section.title}>
                                    <h4 className="text-[10px] font-black tracking-[0.4em] mb-8 text-white/30 uppercase">
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-4">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <a href={link.href} className="text-white/50 hover:text-orange-500 transition-all duration-300 text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 group">
                                                    <span className="w-0 h-[1px] bg-orange-500 group-hover:w-3 transition-all underline-offset-4" />
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <p className="text-[11px] font tracking-[0.4em] text-white/20  ">
                            © {currentYear} FrameX-Tech Farm 
                        </p>
                        <div className="h-1 w-1 bg-white/20 rounded-full hidden md:block" />
                        <p className="text-[11px] font tracking-[0.4em] text-white/20 ">
                            Crafted in the Digital Ether
                        </p>
                    </div>
                    
                    <div className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
                         <p className="text-[11px] font-black tracking-[0.4em] text-white/40  flex items-center gap-3">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                            System_Status: <span className="text-white">Operational</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;