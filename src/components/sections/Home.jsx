import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

// Array of diverse tech/design images
const images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400",
    "https://images.unsplash.com/photo-1581291518655-9523bb99a9f0?w=400",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
];

const ImageColumn = ({ reverse = false, speed = 40 }) => (
    <div className="flex-1 min-w-[18vw] md:min-w-[12vw] h-full overflow-hidden">
        <motion.div 
            animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-2 md:gap-3"
        >
            {[...images, ...images, ...images].map((img, i) => (
                <div key={i} className="w-full aspect-square bg-neutral-900 rounded-lg md:rounded-xl overflow-hidden border border-white/10 shadow-inner">
                    {/* Changed opacity from 40 to 80 and removed grayscale */}
                    <img src={img} alt="work" className="w-full h-full object-cover opacity-80" />
                </div>
            ))}
        </motion.div>
    </div>
);

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const springConfig = { stiffness: 45, damping: 25 };
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

    return (
        <div className="relative min-h-screen w-full bg-[#020202] font-sans text-white overflow-hidden flex flex-col items-center justify-center">
            
            {/* 1. DENSE 5-COLUMN BACKGROUND - FULLY RESPONSIVE */}
            {/* Increased container opacity from 0.18 to 0.4 for better visibility */}
            <div className="absolute inset-0 z-0 flex justify-center gap-2 md:gap-4 px-2 opacity-[0.4] pointer-events-none">
                <ImageColumn speed={55} />
                <ImageColumn reverse speed={48} />
                <ImageColumn speed={62} />
                <ImageColumn reverse speed={52} />
                <ImageColumn speed={58} />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202] z-10" />
            </div>

            {/* 2. AMBIENT BACKGROUND GLOW */}
            <div className="fixed inset-0 z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[50vw] h-[50vw] bg-purple-600/10 blur-[80px] rounded-full animate-pulse" />
            </div>

            {/* 3. MAIN CONTENT */}
            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 flex flex-col items-center w-full max-w-7xl px-4 md:px-6 text-center pt-10"
            >
              <h1 className="text-[2.5rem] md:text-7xl lg:text-[7.5rem] font-light tracking-tighter leading-[1] mb-6 md:mb-8">
    The{" "}
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">
        next-gen
    </span>
    <br />
    freelance tech partner
</h1>

                <p className="text-white/60 text-xs md:text-lg font-light max-w-xl md:max-w-2xl leading-relaxed mb-10 md:mb-14 tracking-wide px-4">
                    Helping brands build high-performance digital products with 
                    immersive design and scalable full-stack architectures.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-16 md:mb-24 w-full sm:w-auto">
                    <button className="group relative w-[80%] sm:w-auto px-10 md:px-12 py-3.5 md:py-4 rounded-full bg-white text-black text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase overflow-hidden transition-all active:scale-95 shadow-xl">
                        <span className="relative z-10">Start Project</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <button className="w-[80%] sm:w-auto px-10 md:px-12 py-3.5 md:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                        Our Work
                    </button>
                </div>

                <div className="px-6 md:px-10 py-4 md:py-5 bg-neutral-950/80 border border-white/5 rounded-2xl md:rounded-[2.5rem] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-4 md:gap-8 mb-10">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(id => (
                            <img key={id} src={`https://i.pravatar.cc/100?u=${id+5}`} className="w-8 h-8 md:w-11 md:h-11 rounded-full border-2 border-black" alt="client" />
                        ))}
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-white/10" />
                    <div className="text-center sm:text-left">
                        <div className="flex justify-center sm:justify-start gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 md:w-4 h-3 md:h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                        </div>
                        <p className="text-white/30 text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase">Trusted by 50+ founders</p>
                    </div>
                </div>
            </motion.main>

            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
        </div>
    )
}

export default Home