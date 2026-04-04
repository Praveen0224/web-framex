'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationForm from '@/components/ApplicationForm';
import { 
    ArrowLeft, Zap, CreditCard, 
    CheckCircle2, ArrowRight,
    Sparkles, Target, Layers,
    Clock, ShieldCheck, Stars
} from 'lucide-react';

const DescriptionContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const type = searchParams.get('type') || 'internship';
    const [activeCat, setActiveCat] = useState('fullstack');
    const [activePlan, setActivePlan] = useState('pro'); 
    const [isFormOpen, setIsFormOpen] = useState(false);

    const contentMap = {
        internship: {
            fullstack: {
                title: "Full-Stack Engineer",
                tagline: "BUILD_SHIP_SCALE",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000", // Coding image
                desc: "Go beyond basic tutorials. Learn to architect and deploy production-grade applications using the industry-standard T3 stack.",
                color: "from-orange-500 to-purple-600",
                accent: "#f97316",
                stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Tailwind", "Docker"],
                whoIsItFor: ["Final year students", "Aspiring Web Developers", "Open-source enthusiasts"],
                curriculum: [
                    { week: "01-04", topic: "Frontend Mastery", details: "Server Components, Partial Prerendering, and Advanced Framer Motion animations." },
                    { week: "05-08", topic: "Backend & Data", details: "Type-safe APIs with tRPC, Zod validation, Schema Migrations, and Redis Caching." },
                    { week: "09-12", topic: "Deployment Ops", details: "AWS S3 integration, Vercel Edge functions, and CI/CD Pipeline automation." }
                ],
                perks: ["Industry-Ready Portfolio", "Internship Experience Letter", "Direct 1-on-1 Code Reviews"]
            },
            uiux: {
                title: "Product Designer",
                tagline: "PIXEL_PERFECT_UX",
                image: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?q=80&w=1000", // Design image
                desc: "Master the psychology of design. Learn how to solve complex user problems and create stunning high-fidelity interfaces.",
                color: "from-purple-500 to-orange-500",
                accent: "#a855f7",
                stack: ["Figma", "Adobe CC", "Spline 3D", "Framer", "Design Systems", "Prototyping"],
                whoIsItFor: ["Creative minds", "Career Switchers", "Visual Artists"],
                curriculum: [
                    { week: "01-04", topic: "UX Strategy", details: "User Interviews, Problem Statements, and Information Architecture logic." },
                    { week: "05-08", topic: "Visual Systems", details: "Typography, Grid Systems, and Scalable Component Libraries for Devs." },
                    { week: "09-12", topic: "Interaction", details: "Micro-animations, 3D Design integration, and professional Dev Handoff." }
                ],
                perks: ["Case Study for Global Roles", "Design Portfolio Audit", "Certificate of Completion"]
            }
        },
        mentorship: {
            fullstack: {
                title: "Senior Dev Mentor",
                tagline: "CAREER_ACCELERATOR",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000", // Mentorship image
                desc: "Skip years of trial and error. Get personalized guidance on high-level system design and senior career growth.",
                color: "from-orange-600 to-purple-600",
                accent: "#2563eb",
                stack: ["System Design", "Microservices", "Scalability", "Clean Architecture", "Leadership"],
                whoIsItFor: ["Junior Developers", "Freelancers", "Tech Lead Aspirants"],
                curriculum: [
                    { week: "Phase 1", topic: "Technical Audit", details: "Deep dive into your current code and architecture skills." },
                    { week: "Phase 2", topic: "Architecture", details: "Building for millions: Load balancing, Horizontal scaling, & DB tuning." },
                    { week: "Phase 3", topic: "Career Launch", details: "Salary negotiation, LinkedIn Branding, and Global Referrals." }
                ],
                perks: ["Lifetime Alumni Access", "Direct Job Referrals", "Senior Portfolio Review"]
            }
        }
    };

    const currentTypeData = contentMap[type] || contentMap.internship;
    const data = currentTypeData[activeCat] || currentTypeData.fullstack;

    return (
        <div className="min-h-screen bg-white text-black font-sans py-12 lg:py-20 px-6 lg:px-24 selection:bg-orange-500 selection:text-white">
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <motion.button 
                        whileHover={{ x: -5 }}
                        onClick={() => router.push('/')} 
                        className="group flex items-center gap-3 text-black/30 hover:text-orange-600 transition-all uppercase tracking-[0.4em] text-[10px] font-black"
                    >
                        <ArrowLeft size={16} /> Exit_View
                    </motion.button>

                    <div className="bg-zinc-50 p-1.5 rounded-2xl flex gap-1 self-center md:self-auto border border-zinc-200">
                        {['fullstack', 'uiux'].map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === cat ? 'bg-white text-black shadow-md' : 'text-black/30 hover:text-black'}`}
                            >
                                {cat === 'fullstack' ? 'Fullstack' : 'UI/UX Design'}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Side: Content Area */}
                    <motion.div 
                        key={activeCat + type}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="space-y-6 mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-zinc-200 shadow-sm">
                                <Zap size={12} className="text-orange-500" />
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                                    {data.tagline}
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] text-zinc-900">
                                {data.title}
                            </h1>
                            
                            <p className="text-xl text-zinc-500 font-normal leading-relaxed max-w-xl">
                                {data.desc}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 pt-4">
                                {data.stack.map((s) => (
                                    <span key={s} className="px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Image Showcase Card */}
                        <div className="mb-16 relative aspect-video rounded-[2rem] overflow-hidden border border-zinc-200 shadow-2xl">
                            <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-t ${data.color} mix-blend-overlay opacity-30`} />
                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-lg">
                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1">Live Environment</p>
                                <p className="text-sm font-bold text-black">Master production-grade workflows</p>
                            </div>
                        </div>

                        {/* Who is it for? */}
                        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.whoIsItFor.map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50 group hover:border-orange-200 transition-all">
                                    <Stars size={16} className="text-orange-500 mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Target_Audience</p>
                                    <p className="text-[13px] font-bold text-zinc-800">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Curriculum Path */}
                        <div className="space-y-8">
                            <h2 className="text-[10px] uppercase tracking-[0.5em] text-black/20 font-black">Syllabus_Structure</h2>
                            <div className="space-y-2">
                                {data.curriculum.map((item, i) => (
                                    <div key={i} className="group p-8 rounded-3xl border border-zinc-100 hover:border-orange-100 hover:bg-orange-50/30 transition-all flex flex-col md:flex-row gap-8 items-start">
                                        <div className={`text-3xl font-black bg-gradient-to-br ${data.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-100 transition-opacity min-w-[100px]`}>
                                            {item.week}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 text-zinc-900 group-hover:text-orange-600 transition-colors">{item.topic}</h3>
                                            <p className="text-zinc-500 font-normal text-sm leading-relaxed">{item.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Payment/Admission Card */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className={`p-[1px] rounded-[3rem] bg-gradient-to-b ${data.color} shadow-2xl shadow-orange-500/10`}>
                            <div className="bg-white rounded-[2.95rem] p-10 md:p-12 relative overflow-hidden">
                                
                                <div className="flex items-center justify-between mb-10 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Seats Available</span>
                                    </div>
                                    <Clock size={16} className="text-zinc-300" />
                                </div>

                                {/* Plan Toggle with Color */}
                                <div className="flex bg-zinc-100 p-1 rounded-2xl mb-10 border border-zinc-200">
                                    <button 
                                        onClick={() => setActivePlan('basic')}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activePlan === 'basic' ? 'bg-white text-black shadow-sm' : 'text-zinc-400'}`}
                                    >
                                        Basic
                                    </button>
                                    <button 
                                        onClick={() => setActivePlan('pro')}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activePlan === 'pro' ? 'bg-white text-black shadow-sm' : 'text-zinc-400'}`}
                                    >
                                        Mastery
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activePlan}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-8 relative z-10"
                                    >
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-6xl font-black tracking-tighter bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                                                {activePlan === 'basic' ? '₹5,000' : '₹10,000'}
                                            </span>
                                            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                                / {activePlan === 'basic' ? '2 months' : '3 months'}
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            {(activePlan === 'basic' ? data.perks.slice(0, 2) : data.perks).map((p, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                                                    <CheckCircle2 size={16} className="text-orange-500" />
                                                    <span className="text-[11px] font-bold uppercase tracking-tight text-zinc-600">{p}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <motion.button 
                                    whileHover={{ y: -3, shadow: "0 20px 40px rgba(249, 115, 22, 0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsFormOpen(true)}
                                    className={`w-full mt-10 py-6 rounded-2xl bg-zinc-900 text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-zinc-300`}
                                >
                                    Proceed to Apply <ArrowRight size={16} className="text-orange-500" />
                                </motion.button>

                                <div className="mt-10 pt-8 border-t border-zinc-100 flex flex-col gap-4 relative z-10">
                                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-[0.1em]">
                                        <CreditCard size={14} className="text-orange-500/50" /> Installments Available
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-[0.1em]">
                                        <ShieldCheck size={14} className="text-purple-500/50" /> ISO Certified Program
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extra Floating Badge */}
                        <div className="mt-6 p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 flex items-center gap-5 group">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${data.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <Target size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Industry Quality</p>
                                <p className="text-xs font-bold text-zinc-800">100% Portfolio Focused</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ApplicationForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                type={type} 
                category={activeCat} 
            />
        </div>
    );
};

export default function DescriptionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center text-black font-black uppercase tracking-widest">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span>Syncing_Data...</span>
                </div>
            </div>
        }>
            <DescriptionContent />
        </Suspense>
    );
}