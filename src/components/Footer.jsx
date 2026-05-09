'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ArrowUpRight, Zap, X, Mail, Copy, Check } from 'lucide-react';

const Footer = ({ onApply }) => {
    const currentYear = new Date().getFullYear();
    const [modalContent, setModalContent] = useState(null);
    const [copied, setCopied] = useState(false);

    const email = "framextechfarm@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                { name: 'PRIVACY', href: 'privacy' },
                { name: 'TERMS', href: 'terms' }
            ]
        }
    ];

    return (
        <footer className="relative bg-[#050505] text-white pt-16 pb-8 overflow-hidden border-t border-white/5">
            
            {/* AMBIENCE - Reduced opacity for cleaner look */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-10">
                    
                    {/* LEFT: BRANDING */}
                    <div className="lg:max-w-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Zap size={14} className="text-orange-500 fill-orange-500" />
                            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-white/30">Unit_Active</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95] uppercase">
                            Build <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">the future</span> <br />
                            with us
                        </h2>

                        {/* EMAIL COMPACT CARD */}
                        <div 
                            className="group relative inline-flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer" 
                            onClick={copyToClipboard}
                        >
                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                {copied ? <Check size={16} /> : <Mail size={16} />}
                            </div>
                            <p className="text-white/80 font-mono text-sm">{email}</p>
                            <Copy size={12} className="text-white/20 group-hover:text-white/60 transition-colors ml-2" />
                        </div>
                    </div>

                    {/* RIGHT: CTA & NAV */}
                    <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onApply}
                            className="group relative px-8 py-4 bg-orange-500 text-black font-bold rounded-full overflow-hidden mb-12 flex items-center gap-3 uppercase text-[11px] tracking-widest transition-all"
                        >
                            <span className="relative z-10">Initiate Project</span>
                            <ArrowUpRight size={18} className="relative z-10 group-hover:rotate-45 transition-transform" />
                            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                        </motion.button>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left w-full lg:min-w-[500px]">
                            {footerLinks.map((section) => (
                                <div key={section.title}>
                                    <h4 className="text-[9px] font-bold tracking-[0.2em] mb-4 text-orange-500/60 uppercase">
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-2">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <button 
                                                    onClick={() => (link.href === 'privacy' || link.href === 'terms') ? setModalContent(link.href) : null}
                                                    className="text-white/40 hover:text-white transition-all duration-200 text-[10px] tracking-widest flex items-center gap-2 group"
                                                >
                                                    <span className="w-0 h-[1px] bg-orange-500 group-hover:w-3 transition-all" />
                                                    {link.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[9px] tracking-[0.2em] text-white/20 uppercase font-medium">
                        © {currentYear} FrameX-Tech Farm | All Rights Reserved
                    </p>

                    <div className="flex gap-3">
                        {[
                            { Icon: Linkedin, url: "https://www.linkedin.com/in/..." },
                            { Icon: Instagram, url: "https://www.instagram.com/..." }
                        ].map((social, index) => (
                            <a 
                                key={index}
                                href={social.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg border border-white/5 flex items-center justify-center text-white/30 hover:text-orange-500 hover:border-orange-500/20 transition-all bg-white/[0.02]"
                            >
                                <social.Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL SYSTEM */}
            <AnimatePresence>
                {modalContent && (
                    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0a0a0f] border border-white/10 p-6 rounded-2xl max-w-md w-full relative"
                        >
                            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-white/20 hover:text-white"><X size={20}/></button>
                            <h3 className="text-lg font-bold mb-3 uppercase tracking-tighter text-orange-500">{modalContent}</h3>
                            <div className="text-white/60 text-xs leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                                [Content goes here...]
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;