import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const springConfig = { stiffness: 50, damping: 20 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMove = (e) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [mouseX, mouseY]);

    const logoMoveX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
    const logoMoveY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);
    const streakX = useTransform(mouseX, [-0.5, 0.5], [30, -30]);

    const techFeatures = [
        { id: '01', title: 'Creative Development', desc: 'Crafting high-end web experiences' },
        { id: '02', title: 'Scalable Architecture', desc: 'Building robust tech foundations' },
        { id: '03', title: 'UI/UX Innovation', desc: 'Psychology-driven design patterns' }
    ];

    return (
        <div className="relative min-h-screen w-full bg-[#020202] font-sans text-white overflow-hidden flex flex-col">
            
            {/* BACKGROUND ENGINE */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div 
                    style={{ x: streakX }}
                    className="absolute -bottom-[15%] -right-[5%] w-[110%] h-[110%] opacity-20"
                >
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#8b5cf6,_#ec4899,_transparent_70%)] blur-[130px]" />
                </motion.div>
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>

            {/* MAIN CONTENT WRAPPER - Tightened gap-y */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-7xl mx-auto w-full gap-y-0 md:gap-y-2">
                
                {/* LOGO - Removed pb and added negative margin to bring headline closer */}
                <motion.div 
                    style={{ x: logoMoveX, y: logoMoveY }}
                    className="w-full flex justify-center mb-[-1rem] md:mb-[-2rem]"
                >
                    <AnimatePresence>
                        {isLoaded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98, filter: 'blur(15px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-[60vw] md:w-[32vw] lg:w-[26vw]"
                            >
                                <img 
                                    src="/framexlogo.png" 
                                    alt="Frame X Logo" 
                                    className="w-full h-auto drop-shadow-[0_0_50px_rgba(236,72,153,0.15)] brightness-110"
                                /> 
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* HEADLINE & DESCRIPTION - Reduced margins and vertical spacing */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center w-full z-20"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight mb-3 leading-[1.1]">
                        Your Visionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Tech Partner</span>
                    </h1>
                    <p className="text-white/40 text-[10px] md:text-xs font-light tracking-wide max-w-md mx-auto mb-8">
                        Building high-performance digital products with cutting-edge 
                        animations and scalable full-stack architectures.
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => window.location.href = '#contact'}
                            className="px-8 py-3 rounded-full bg-white text-black text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-pink-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                        >
                            Start Project
                        </button>
                        <button 
                            onClick={() => window.location.href = '#contact'}
                            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all active:scale-95"
                        >
                            Our Work
                        </button>
                    </div>
                </motion.div>

                {/* BENTO FEATURE STRIP - Reduced padding and top margin */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 border-t border-white/5 pt-8 mt-12 md:mt-16"
                >
                    {techFeatures.map((item) => (
                        <div key={item.id} className="group flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-pink-500 font-mono text-[9px] font-bold px-1.5 py-0.5 bg-pink-500/10 rounded">
                                    {item.id}
                                </span>
                                <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-pink-400 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[11px] text-white/20 leading-relaxed group-hover:text-white/40 transition-colors max-w-[200px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </main>

           

            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
        </div>
    )
}

export default Home