import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, GraduationCap, Users, ArrowRight, Clock, 
    MapPin, ArrowLeft, Zap, ShieldCheck, Heart, Coffee, Globe 
} from 'lucide-react';

const Careers = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialFilter = searchParams.get('filter') || 'job';
    const [filter, setFilter] = useState(initialFilter);

    useEffect(() => {
        const type = searchParams.get('filter');
        if (type) setFilter(type);
    }, [searchParams]);

    const positions = [
        { id: 1, type: 'job', title: 'Senior Frontend Developer', location: 'Remote / Chennai', duration: 'Full-time', icon: <Briefcase size={20} />, desc: 'Lead our UI initiatives using Next.js 14 and advanced animation libraries.' },
        { id: 2, type: 'internship', title: 'Product Design Intern', location: 'Remote', duration: '3 Months', icon: <GraduationCap size={20} />, desc: 'Work directly with our lead designers on high-end SaaS products.' },
        { id: 3, type: 'mentorship', title: 'Full Stack Roadmap', location: 'Online', duration: 'Flexible', icon: <Users size={20} />, desc: 'A structured path to becoming a production-ready engineer.' }
    ];

    const perks = [
        { icon: <Globe size={18} />, title: "Remote First", desc: "Work from anywhere in the world." },
        { icon: <Zap size={18} />, title: "Latest Tech", desc: "We use the cutting-edge stacks." },
        { icon: <Heart size={18} />, title: "Health Cover", desc: "Comprehensive insurance for you." },
        { icon: <Coffee size={18} />, title: "Learning Credits", desc: "We pay for your books & courses." },
    ];

    const filteredPositions = positions.filter(pos => pos.type === filter);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-10 pb-20 relative z-10">
                {/* NAVIGATION */}
                <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => router.push('/')}
                    className="group flex items-center gap-3 text-white/40 hover:text-white transition-all mb-16 uppercase tracking-[0.4em] text-[10px]"
                >
                    <div className="p-2 rounded-full border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Back to Hub
                </motion.button>

                {/* HERO SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-32">
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 0.5, x: 0 }}
                            className="text-[10px] uppercase tracking-[0.8em] text-orange-500 font-bold block mb-6"
                        >
                            Nexus Ecosystem
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.85]"
                        >
                            Build the <br />
                            <span className="bg-gradient-to-r from-white to-white/30 bg-clip-text text-transparent">Future with Us.</span>
                        </motion.h1>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg font-light leading-relaxed text-white/60 border-l border-white/10 pl-8"
                    >
                        We don’t just hire employees; we curate a team of visionaries. 
                        Whether you are a seasoned pro or a rising talent, 
                        your journey starts here.
                    </motion.p>
                </div>

                {/* CULTURE SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                    {[
                        { t: "Innovation", d: "We push the boundaries of what's possible in web tech." },
                        { t: "Autonomy", d: "Own your projects from discovery to deployment." },
                        { t: "Growth", d: "Dedicated mentorship for every stage of your career." }
                    ].map((v, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
                            <h4 className="text-orange-500 uppercase tracking-widest text-xs mb-4 font-bold tracking-[0.3em]">// 0{i+1}</h4>
                            <h3 className="text-2xl font-light mb-4">{v.t}</h3>
                            <p className="text-sm text-white/40 leading-relaxed">{v.d}</p>
                        </div>
                    ))}
                </div>

                {/* FILTER & JOBS SECTION */}
                <section className="relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <h2 className="text-3xl font-light tracking-tight">Openings <span className="text-white/20">({filteredPositions.length})</span></h2>
                        
                        <div className="flex p-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md">
                            {['job', 'internship', 'mentorship'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`px-8 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all ${
                                        filter === tab 
                                        ? 'bg-orange-500 text-black font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                                        : 'text-white/40 hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode='wait'>
                            {filteredPositions.map((pos) => (
                                <motion.div
                                    key={pos.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group p-8 rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-orange-500/40 transition-all flex flex-col relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:text-orange-500 transition-all uppercase text-[8px] tracking-[0.5em] font-bold">
                                        {pos.type}
                                    </div>

                                    <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-orange-500 mb-8 shadow-xl">
                                        {pos.icon}
                                    </div>
                                    <h3 className="text-2xl font-light mb-4 tracking-tight leading-tight">{pos.title}</h3>
                                    <p className="text-white/50 text-sm font-light leading-relaxed mb-8 flex-grow">
                                        {pos.desc}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] text-[9px] text-white/60 uppercase tracking-widest border border-white/5">
                                            <MapPin size={12} className="text-orange-500" /> {pos.location}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] text-[9px] text-white/60 uppercase tracking-widest border border-white/5">
                                            <Clock size={12} className="text-orange-500" /> {pos.duration}
                                        </div>
                                    </div>

                                    <button className="w-full py-4 rounded-2xl bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-orange-500 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                        View Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredPositions.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                            <p className="text-white/20 text-sm uppercase tracking-[0.5em]">No active openings in this path</p>
                        </motion.div>
                    )}
                </section>

                {/* PERKS SECTION */}
                <section className="mt-40 pt-20 border-t border-white/5">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-light mb-4">Perks of the Nexus</h2>
                        <p className="text-white/40 font-light italic">Design your life while you design the future.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {perks.map((perk, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
                                    {perk.icon}
                                </div>
                                <h4 className="text-sm font-medium mb-2">{perk.title}</h4>
                                <p className="text-[11px] text-white/30 uppercase tracking-widest leading-loose">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Careers;