'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ArrowUpRight, Zap, X, Mail, Copy, Check } from 'lucide-react';

const Footer = ({ onApply }) => {
    const currentYear = new Date().getFullYear();
    const [modalContent, setModalContent] = useState(null);
    const [copied, setCopied] = useState(false);

    const email = "framextechfarm@gmail.com"; // Replace with your actual email

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
        <footer className="relative bg-[#050505] text-white pt-12 pb-6 overflow-hidden border-t border-white/5">
            
            {/* Background Ambience - Slightly tightened blur */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-8">
                    
                    {/* LEFT SECTION */}
                    <div className="lg:max-w-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Zap size={14} className="text-orange-500 fill-orange-500" />
                            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-white/30">Node_Active</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1] uppercase">
                            Build <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">the future</span> <br />
                            with us
                        </h2>

                        {/* Interactive Email Card */}
                        <div 
                            className="group relative inline-flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer" 
                            onClick={copyToClipboard}
                        >
                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                {copied ? <Check size={16} /> : <Mail size={16} />}
                            </div>
                            <p className="text-white/80 font-mono text-xs">{email}</p>
                            <Copy size={12} className="text-white/20 group-hover:text-white/60 transition-colors ml-2" />
                            
                            {/* Copy Confirmation Tooltip */}
                            <AnimatePresence>
                                {copied && (
                                    <motion.span 
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: -25 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] bg-orange-500 text-black px-2 py-0.5 rounded font-bold"
                                    >
                                        COPIED
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onApply}
                            className="group relative px-8 py-3.5 bg-orange-500 text-black font-bold rounded-full overflow-hidden mb-10 flex items-center gap-3 uppercase text-[11px] tracking-widest transition-all shadow-lg shadow-orange-500/10"
                        >
                            <span className="relative z-10">Start a project</span>
                            <ArrowUpRight size={18} className="relative z-10 group-hover:rotate-45 transition-transform" />
                            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                        </motion.button>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left w-full lg:min-w-[450px]">
                            {footerLinks.map((section) => (
                                <div key={section.title}>
                                    <h4 className="text-[9px] font-bold tracking-[0.2em] mb-4 text-white/30 uppercase">
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-2">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <button 
                                                    onClick={() => (link.name === 'PRIVACY' || link.name === 'TERMS') ? setModalContent(link.name === 'PRIVACY' ? 'privacy' : 'terms') : null}
                                                    className="text-white/40 hover:text-orange-500 transition-all duration-200 text-[10px] tracking-widest flex items-center gap-2 group"
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
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[9px] tracking-[0.2em] text-white/20 uppercase font-medium">
                        © {currentYear} FrameX-Tech Farm | All Rights Reserved
                    </p>

                    <div className="flex gap-3">
                        {[
                            { Icon: Linkedin, url: "https://www.linkedin.com/in/framex-tech-farm-453b513b6/" },
                            { Icon: Instagram, url: "https://www.instagram.com/framex_techfarm/" }
                        ].map((social, index) => (
                            <motion.a 
                                key={index}
                                href={social.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-white/30 hover:text-orange-500 hover:border-orange-500/20 transition-all"
                            >
                                <social.Icon size={16} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODALS - Text preserved exactly as provided */}
            <AnimatePresence>
                {modalContent && (
                    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalContent(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative z-10 bg-[#0a0a0f] border border-white/10 p-6 rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold uppercase tracking-tight text-orange-500">
                                    {modalContent === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
                                </h3>
                                <button onClick={() => setModalContent(null)} className="text-white/20 hover:text-white"><X size={20}/></button>
                            </div>
                            <div className="overflow-y-auto pr-2 text-white/60 text-xs leading-relaxed space-y-4">
                                {modalContent === 'terms' ? (
                                    <>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">01. Acceptance of Terms</h4>
                                            <p>By accessing and using FrameX-Tech Farm services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our platform.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">02. Scope of Services</h4>
                                            <p>We provide digital solutions including web development, UI/UX design, and mentorship programs. We reserve the right to modify or discontinue services at any time without prior notice.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">03. User Obligations</h4>
                                            <p>Users must provide accurate information when applying for projects or mentorship. Any misuse of the platform or unauthorized access is strictly prohibited.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">04. Intellectual Property</h4>
                                            <p>All content, designs, and code provided by FrameX are protected by intellectual property laws. Users may not reproduce or distribute materials without explicit consent.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">05. Limitation of Liability</h4>
                                            <p>FrameX-Tech Farm is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.</p>
                                        </section>
                                    </>
                                ) : (
                                    <>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">01. Data Collection</h4>
                                            <p>We collect personal information such as your name, email, and location only when you voluntarily submit it through our application or contact forms.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">02. Use of Information</h4>
                                            <p>Your data is used solely for processing your applications, improving our services, and communicating relevant updates. We do not sell your personal information to third parties.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">03. Security Measures</h4>
                                            <p>We implement industry-standard security protocols to protect your data from unauthorized access, alteration, or destruction. However, no digital transmission is 100% secure.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">04. Cookie Policy</h4>
                                            <p>Our website may use cookies to enhance user experience and analyze traffic patterns. You can manage your cookie preferences through your browser settings.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-1 uppercase text-[9px] tracking-widest">05. Policy Updates</h4>
                                            <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date.</p>
                                        </section>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;