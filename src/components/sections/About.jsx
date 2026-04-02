import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, GraduationCap, ChevronDown, Rocket, Users } from 'lucide-react'

const About = () => {
    const headingWords = ["High", "End", "Solutions."];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };
                                                                            
    return (
        <div className="bg-[#050505] text-white font-sans selection:bg-gradient-to-r from-purple-400 to-pink-500 overflow-x-hidden relative">
            
            {/* BACKGROUND DECORATION - Original */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
                <div 
                    className="absolute inset-0 opacity-[0.15]" 
                    style={{ 
                        backgroundImage: `linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                    }} 
                />
                
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            {/* 1. HERO SECTION - Original */}
            <section className="min-h-screen flex flex-col justify-center px-6 lg:px-20 relative pt-20 pb-20">
                <div className="max-w-7xl mx-auto w-full z-10">
                    <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 0.4, x: 0 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.8em] mb-6 font-light border-l border-orange-500 pl-4"
                    >
                        Engineering Excellence
                    </motion.p>

                    <div className="mb-8 flex flex-wrap">
                        {headingWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, delay: i * 0.1, ease: [0.2, 0, 0.2, 1] }}
                                className={`inline-block text-6xl md:text-8xl lg:text-[10rem] font-light tracking-[-0.04em] leading-[0.9] mr-4 md:mr-8 
                                    ${i === 2 ? 'text-white/20' : 'text-white'}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end gap-8"
                    >
                        <p className="text-lg md:text-xl max-w-md leading-relaxed font-light text-white/60">
                            Crafting high-performance digital architectures with complex backend logic and fluid frontend glassmorphism.
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => window.location.href = '#contact'}
                                className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-black font-bold rounded-full flex items-center gap-2 hover:bg-orange-400 transition-all active:scale-95 text-sm uppercase tracking-wider"
                            >
                                Start Project <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest rotate-90 mb-4">Scroll</span>
                    <ChevronDown size={20} className="animate-bounce" />
                </motion.div>
            </section>

            {/* 2. UNIFIED CONTENT SECTION - Original */}
            <section className="py-20 px-6 lg:px-20 border-t border-white/5 bg-[#080808]/50 backdrop-blur-sm relative">
                <div 
                    className="absolute inset-0 opacity-[0.1] pointer-events-none" 
                    style={{ 
                        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }} 
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 md:mb-32">
                        
                        <div className="lg:col-span-7">
                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={itemVariants}
                                className="mb-16"
                            >
                                <h2 className="text-4xl md:text-7xl font-light tracking-tighter leading-[1.1]">
                                    "Plant Your Ideas. <br />
                                    <span className="text-white/20">We Grow the Technology"</span>
                                </h2>
                            </motion.div>

                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={containerVariants}
                                className="grid grid-cols-3 gap-4 border-y border-white/5 py-10"
                            >
                                {[
                                    { val: "5+", label: "Projects" },
                                    { val: "10+", label: "Clients" },
                                    { val: "20+", label: "Mentored" }
                                ].map((stat, i) => (
                                    <motion.div key={i} variants={itemVariants} className="text-center md:text-left">
                                        <h3 className="text-3xl md:text-5xl font-light text-orange-500 tracking-tighter">{stat.val}</h3>
                                        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="lg:col-span-5 flex flex-col gap-4"
                        >
                            {[
                                { 
                                    icon: <Code2 className="text-orange-500" size={28} strokeWidth={1} />, 
                                    title: "Tech Development", 
                                    desc: "Immersive UI/UX and scalable code architectures." 
                                },
                                { 
                                    icon: <GraduationCap className="text-orange-500" size={28} strokeWidth={1} />, 
                                    title: "Mentorship", 
                                    desc: "Empowering developers through 1-on-1 expert coaching." 
                                }
                            ].map((service, i) => (
                                <motion.div 
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                    className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all duration-300 backdrop-blur-md"
                                >
                                    <div className="mb-4">{service.icon}</div>
                                    <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                                    <p className="text-white/50 text-sm font-light leading-relaxed">
                                        {service.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* NEW POSTER SECTION */}
                    <motion.section 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="py-16 md:py-24 px-8 md:px-12 rounded-[2rem] border border-white/10 bg-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute -top-1/2 -right-1/4 w-[60%] h-[150%] bg-purple-500/10 blur-[150px] rounded-full group-hover:bg-purple-500/15 transition-all duration-1000" />
                        
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                            
                            <div className="md:col-span-7">
                                <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.6em] mb-4 text-orange-500 font-bold opacity-80">Nexus Talent Initiative</motion.p>
                                <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.9] mb-8 uppercase">
                                    <span className="text-white">Internship &</span> <br /> 
                                    <span className="text-white/20 ">Mentorship</span>
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-lg text-white/60 font-light leading-relaxed max-w-xl">
                                    Engineering the next generation of digital architects. Master technical precision and bold designs alongside experts.
                                </motion.p>
                            </div>

                            <div className="md:col-span-5 flex flex-col gap-4">
                                {[
                                    { icon: <Rocket size={20}/>, label: "Apply Internship", desc: "Launch Your Career", color: "bg-orange-600" },
                                    { icon: <Users size={20}/>, label: "Apply Mentorship", desc: "1-on-1 Sessions", color: "bg-purple-600" }
                                ].map((cta) => (
                                    <Link 
                                        href={`/description?type=${cta.label.toLowerCase().includes('internship') ? 'internship' : 'mentorship'}`} 
                                        key={cta.label}
                                        className="w-full"
                                    >
                                        <motion.div 
                                            variants={itemVariants}
                                            whileHover={{ y: -5, borderColor: '#f97316' }}
                                            className="p-6 rounded-2xl bg-black border border-white/10 flex items-center gap-5 cursor-pointer transition-all duration-300 group/item"
                                        >
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${cta.color}`}>
                                                {cta.icon}
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-white/50 mb-1">{cta.desc}</p>
                                                <h4 className="font-medium text-base text-white">{cta.label}</h4>
                                            </div>
                                            <ArrowUpRight size={16} className="text-white/30 ml-auto group-hover/item:text-white group-hover/item:translate-x-1" />
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                </div>
            </section>
        </div>
    );
};

export default About;