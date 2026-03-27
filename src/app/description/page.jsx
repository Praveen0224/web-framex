'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationForm from '@/components/ApplicationForm';
import { 
    ArrowLeft, Code2, Layout, Zap, CreditCard, 
    CheckCircle2, Laptop, Palette, ArrowRight,
    Terminal, Globe, Shield, FastForward, Cpu, MousePointer2
} from 'lucide-react';

const DescriptionContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get('type') || 'internship';
    const [activeCat, setActiveCat] = useState('fullstack');
    const [isFormOpen, setIsFormOpen] = useState(false);

    const contentMap = {
        internship: {
            fullstack: {
                title: "Full-Stack Engineer",
                tagline: "BUILD_SHIP_SCALE",
                desc: "Go beyond basic tutorials. Learn to architect and deploy production-grade applications using the industry-standard T3 stack.",
                color: "from-orange-500 to-red-600",
                shadow: "shadow-orange-500/20",
                stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Tailwind", "Docker"],
                whoIsItFor: ["Final year students", "Aspiring Web Developers", "Open-source enthusiasts"],
                curriculum: [
                    { week: "01-04", topic: "Frontend Mastery", details: "Server Components, Partial Prerendering, and Advanced Framer Motion." },
                    { week: "05-08", topic: "Backend & Data", details: "Type-safe APIs with tRPC/Zod, Schema Migrations, and Redis Caching." },
                    { week: "09-12", topic: "Deployment Ops", details: "AWS S3, Vercel Edge functions, and CI/CD Pipeline automation." }
                ],
                perks: ["Industry-Ready Portfolio", "Internship Experience Letter", "Direct 1-on-1 Code Reviews"]
            },
            uiux: {
                title: "Product Designer",
                tagline: "PIXEL_PERFECT_UX",
                desc: "Master the psychology of design. Learn how to solve complex user problems and create stunning high-fidelity interfaces.",
                color: "from-purple-500 to-indigo-600",
                shadow: "shadow-purple-500/20",
                stack: ["Figma", "Adobe CC", "Spline 3D", "Framer", "Design Systems", "Prototyping"],
                whoIsItFor: ["Creative minds", "Career Switchers", "Visual Artists"],
                curriculum: [
                    { week: "01-04", topic: "UX Strategy", details: "User Interviews, Problem Statements, and Information Architecture." },
                    { week: "05-08", topic: "Visual Systems", details: "Typography, Grid Systems, and Scalable Component Libraries." },
                    { week: "09-12", topic: "Advanced Interaction", details: "Micro-animations, 3D Design integration, and Dev Handoff." }
                ],
                perks: ["Case Study for Global Roles", "Design Portfolio Audit", "Certificate of Completion"]
            }
        },
        mentorship: {
            fullstack: {
                title: "Senior Dev Mentor",
                tagline: "CAREER_ACCELERATOR",
                desc: "Skip years of trial and error. Get personalized guidance on high-level system design and career growth.",
                color: "from-blue-500 to-cyan-600",
                shadow: "shadow-blue-500/20",
                stack: ["System Design", "Microservices", "Scalability", "Clean Architecture", "Leadership"],
                whoIsItFor: ["Junior Developers", "Freelancers", "Tech Lead Aspirants"],
                curriculum: [
                    { week: "Phase 1", topic: "Technical Audit", details: "Deep dive into your current code and architecture skills." },
                    { week: "Phase 2", topic: "Architecture", details: "Building for millions: Load balancing, Horizontal scaling, & DB tuning." },
                    { week: "Phase 3", topic: "Career Launch", details: "Salary negotiation, LinkedIn Branding, and Global Referrals." }
                ],
                perks: ["Lifetime Alumni Access", "Direct Job Referrals", "Senior Portfolio Review"]
            },
            uiux: {
                title: "Design Lead Mentor",
                tagline: "DESIGN_STRATEGIST",
                desc: "Transition from a designer to a Product Strategist. Learn to lead teams and design for business impact.",
                color: "from-emerald-500 to-teal-600",
                shadow: "shadow-emerald-500/20",
                stack: ["Product Thinking", "Business ROI", "Lead Design", "Workshops", "Stakeholder Mgmt"],
                whoIsItFor: ["Graphic Designers", "Junior UI Designers", "Creative Leads"],
                curriculum: [
                    { week: "Phase 1", topic: "Product Strategy", details: "Understanding Business KPIs and conversion-driven design." },
                    { week: "Phase 2", topic: "System Thinking", details: "Building Enterprise Design Systems like Polaris or Material UI." },
                    { week: "Phase 3", topic: "Lead Presence", details: "Presentation skills, Agency workflow, and Personal Branding." }
                ],
                perks: ["Elite Design Portfolio", "Interview Prep", "1-on-1 Feedback Loops"]
            }
        }
    };

    const data = contentMap[type][activeCat];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans py-12 lg:py-20 px-6 lg:px-24 selection:bg-white selection:text-black">
            {/* Background Mesh */}
            <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b ${data.color} opacity-[0.07] blur-[120px] pointer-events-none`} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Navbar Area */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
                    <button onClick={() => router.push('/')} className="group flex items-center gap-3 text-white/40 hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] font-black">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back_Main
                    </button>

                    {/* Pro Toggle */}
                    <div className="bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-3xl flex gap-2 self-center md:self-auto">
                        {['fullstack', 'uiux'].map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === cat ? 'bg-white text-black shadow-xl' : 'text-white/30 hover:text-white'}`}
                            >
                                {cat === 'fullstack' ? 'Fullstack' : 'UI/UX Design'}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeCat}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16"
                    >
                        {/* Left: Content */}
                        <div className="lg:col-span-7">
                            <div className="space-y-6 mb-16">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                                    <Zap size={10} className="text-white" /> {data.tagline}
                                </div>
                                <h1 className="text-7xl md:text-[100px] font-light tracking-tighter leading-[0.85]">{data.title}</h1>
                                <p className="text-xl text-white/40 font-light leading-relaxed max-w-xl">{data.desc}</p>
                                
                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {data.stack.map((s) => (
                                        <span key={s} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] text-white/60 font-medium">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Who is this for? */}
                            <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {data.whoIsItFor.map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 mb-4" />
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{item}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Syllabus */}
                            <div className="space-y-6">
                                <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black mb-8">Roadmap_Execution</h2>
                                {data.curriculum.map((item, i) => (
                                    <div key={i} className="group p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row gap-10">
                                            <div className="text-4xl font-extralight text-white/10">{item.week}</div>
                                            <div>
                                                <h3 className="text-2xl font-medium mb-2">{item.topic}</h3>
                                                <p className="text-white/40 font-light">{item.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Pricing Card */}
                        <div className="lg:col-span-5">
                            <div className={`sticky top-24 p-[1px] rounded-[3.5rem] bg-gradient-to-b from-white/20 to-transparent ${data.shadow}`}>
                                <div className="bg-[#0a0a0a] rounded-[3.4rem] p-10 md:p-14 backdrop-blur-3xl">
                                    <div className="text-center mb-12">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Program_Admission</h3>
                                        <p className="text-xs text-white/40">Secure your spot in the next cohort</p>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Standard Plan */}
                                        <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] group hover:border-white/20 transition-all cursor-pointer">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-white/30">Essential</p>
                                                    <h4 className="text-xl font-bold">2 Months</h4>
                                                </div>
                                                <div className="text-2xl font-black italic">₹5,000</div>
                                            </div>
                                            <button onClick={() => setIsFormOpen(true)} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Start_Basic</button>
                                        </div>

                                        {/* Pro Plan */}
                                        <div className="p-10 rounded-[2.8rem] bg-white text-black relative shadow-2xl scale-105">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full">Recommended</div>
                                            <div className="flex justify-between items-start mb-8">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase opacity-40">Pro Mastery</p>
                                                    <h4 className="text-2xl font-black">3 Months</h4>
                                                </div>
                                                <div className="text-3xl font-black italic">₹10,000</div>
                                            </div>
                                            <ul className="space-y-4 mb-10">
                                                {data.perks.map((p, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-tight opacity-80">
                                                        <CheckCircle2 size={14} className="text-green-600" /> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button onClick={() => setIsFormOpen(true)} className="w-full py-5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2">
                                                Apply_Now <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                                        <div className="flex items-center gap-3 text-orange-500 font-black text-[10px] uppercase tracking-widest">
                                            <CreditCard size={18} /> Flexible EMI
                                        </div>
                                        <p className="text-[10px] text-white/30 uppercase leading-relaxed">
                                            Initial deposit of ₹2,500 required. Pay the rest in 30 days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} type={type} category={activeCat} />
        </div>
    );
};

export default function DescriptionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-black animate-pulse">BOOTING_SYSTEM...</div>}>
            <DescriptionContent />
        </Suspense>
    );
}