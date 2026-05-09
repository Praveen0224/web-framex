'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ArrowUpRight, Zap, Send, X } from 'lucide-react';

const Footer = ({ onApply }) => {
    const currentYear = new Date().getFullYear();
    const [modalContent, setModalContent] = useState(null); // 'terms' | 'privacy' | null

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
        <footer className="relative bg-[#050505] text-white pt-16 pb-8 overflow-hidden font-sans border-t border-white/5">
            
            {/* --- BACKGROUND AMBIENCE --- */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
            
    
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10">
                    
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
                            together
                        </h2>
                     {/* SOCIALS */}
<div className="flex gap-5">
    {[
        { Icon: Linkedin, url: "https://www.linkedin.com/in/framex-tech-farm-453b513b6/" }, // Unga LinkedIn URL inga kudunga
        { Icon: Instagram, url: "https://www.instagram.com/framex_techfarm/" }    // Unga Instagram URL inga kudunga
    ].map((social, index) => (
        <motion.a 
            key={index}
            href={social.url} 
            target="_blank"           // Puthiya tab-la open aaga
            rel="noopener noreferrer" // Security purpose-kaga
            whileHover={{ y: -5, scale: 1.1 }}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-all duration-500 hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-white group"
        >
            <social.Icon size={22} className="group-hover:rotate-[360deg] transition-transform duration-700" />
        </motion.a>
    ))}
</div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
                        

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onApply}
                            className="group relative px-12 py-4 bg-white text-black font-black rounded-full overflow-hidden mb-24 flex items-center gap-4 uppercase text-[12px] tracking-widest"
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
                                                {link.name === 'PRIVACY' || link.name === 'TERMS' ? (
                                                    <button 
                                                        onClick={() => setModalContent(link.name === 'PRIVACY' ? 'privacy' : 'terms')}
                                                        className="text-white/50 hover:text-orange-500 transition-all duration-300 text-[11px] tracking-widest flex items-center gap-2 group"
                                                    >
                                                        <span className="w-0 h-[1px] bg-orange-500 group-hover:w-3 transition-all" />
                                                        {link.name}
                                                    </button>
                                                ) : (
                                                    <a href={link.href} className="text-white/50 hover:text-orange-500 transition-all duration-300 text-[11px] tracking-widest flex items-center gap-2 group">
                                                        <span className="w-0 h-[1px] bg-orange-500 group-hover:w-3 transition-all" />
                                                        {link.name}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <p className="text-[11px] font tracking-[0.2em] text-white/20">
                            © {currentYear} FrameX-Tech Farm. All rights reserved.
                        </p>
                        <div className="h-1 w-1 bg-white/20 rounded-full hidden md:block" />
                        <div className="flex items-center gap-4 text-[11px] font tracking-[0.2em] text-white/40">
                            <button 
                                onClick={() => setModalContent('terms')}
                                className="hover:text-amber-500 transition-colors uppercase"
                            >
                                Terms & Conditions
                            </button>
                            <div className="h-1 w-1 bg-white/20 rounded-full" />
                            <button 
                                onClick={() => setModalContent('privacy')}
                                className="hover:text-amber-500 transition-colors uppercase"
                            >
                                Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* LEGAL MODALS */}
            <AnimatePresence>
                {modalContent && (
                    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalContent(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative z-10 w-full max-w-2xl max-h-[80vh] bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h3 className="text-xl font-bold tracking-tight uppercase">
                                    {modalContent === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
                                </h3>
                                <button onClick={() => setModalContent(null)} className="p-2 text-white/40 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-8 overflow-y-auto text-white/60 text-sm leading-relaxed space-y-6">
                                {modalContent === 'terms' ? (
                                    <>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">01. Acceptance of Terms</h4>
                                            <p>By accessing and using FrameX-Tech Farm services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our platform.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">02. Scope of Services</h4>
                                            <p>We provide digital solutions including web development, UI/UX design, and mentorship programs. We reserve the right to modify or discontinue services at any time without prior notice.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">03. User Obligations</h4>
                                            <p>Users must provide accurate information when applying for projects or mentorship. Any misuse of the platform or unauthorized access is strictly prohibited.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">04. Intellectual Property</h4>
                                            <p>All content, designs, and code provided by FrameX are protected by intellectual property laws. Users may not reproduce or distribute materials without explicit consent.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">05. Limitation of Liability</h4>
                                            <p>FrameX-Tech Farm is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.</p>
                                        </section>
                                    </>
                                ) : (
                                    <>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">01. Data Collection</h4>
                                            <p>We collect personal information such as your name, email, and location only when you voluntarily submit it through our application or contact forms.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">02. Use of Information</h4>
                                            <p>Your data is used solely for processing your applications, improving our services, and communicating relevant updates. We do not sell your personal information to third parties.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">03. Security Measures</h4>
                                            <p>We implement industry-standard security protocols to protect your data from unauthorized access, alteration, or destruction. However, no digital transmission is 100% secure.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">04. Cookie Policy</h4>
                                            <p>Our website may use cookies to enhance user experience and analyze traffic patterns. You can manage your cookie preferences through your browser settings.</p>
                                        </section>
                                        <section>
                                            <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">05. Policy Updates</h4>
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