'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Layout,
  GraduationCap,
  MousePointer2,
  Sparkles,
  Users,
  Briefcase
} from 'lucide-react';

const About = ({ onApply }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Desktop horizontal fan-out animations
  const card1X = useTransform(smoothProgress, [0.2, 0.5], [0, -380]);
  const card4X = useTransform(smoothProgress, [0.2, 0.5], [0, 380]);

  const keyCards = [
    {
      title: "Tech Team",
      desc: "A creative group of developers, designers, and digital thinkers building modern experiences.",
      icon: <Users size={22} />,
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500",
      x: card1X,
      rotate: -12
    },
    {
      title: "Digital Solutions",
      desc: "We help businesses grow digitally through websites, branding, UI/UX, and scalable platforms.",
      icon: <Layout size={22} />,
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=500",
      x: useTransform(smoothProgress, [0.2, 0.5], [0, -120]),
      rotate: -4
    },
    {
      title: "Work With Us",
      desc: "Collaborate with our team to build impactful products and launch meaningful ideas together.",
      icon: <Briefcase size={22} />,
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500",
      x: useTransform(smoothProgress, [0.2, 0.5], [0, 120]),
      rotate: 4
    },
    {
      title: "Mentorship",
      desc: "We guide students and freshers with practical mentoring, real projects, and career support.",
      icon: <GraduationCap size={22} />,
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=500",
      x: card4X,
      rotate: 12
    }
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-[#020202] py-24 px-4 md:px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />

      <div className="flex flex-col items-center">
        {/* Tamil Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <Sparkles size={12} className="text-orange-500" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 font-bold">
              Namma Ooru Tech • Design • Development • Mentorship
            </span>
          </div>
        </motion.div>

        {/* Header Content */}
        <div className="text-center mb-16 md:mb-20 max-w-5xl">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6">
            <MousePointer2 size={12} className="text-orange-500" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-orange-200">
              Creative Tech Collective
            </span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-7xl font-light tracking-tight text-white mb-8 leading-tight">
            Building Digital
            <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
              Experiences That Matter
            </span>
          </motion.h2>
          
          <div className="space-y-6 max-w-3xl mx-auto px-4">
             <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
               We are a passionate team of developers, UI/UX designers, and tech creators helping businesses grow through innovative products.
             </p>
          </div>
        </div>

        {/* CARDS SECTION */}
        <div className="relative w-full max-w-6xl overflow-x-hidden">
          
          {/* Desktop View (Horizontal Spread) */}
          <div className="hidden md:flex relative h-[550px] justify-center items-center">
            {keyCards.map((card, i) => (
              <motion.div
                key={i}
                style={{ x: card.x, rotate: card.rotate, zIndex: 4 - i }}
                className="absolute w-[300px] aspect-[3/4] rounded-[2.5rem] overflow-hidden  bg-[#0a0a0a] shadow-2xl group"
              >
                <div className="relative h-3/5">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                </div>
                <div className="p-8 h-2/5 flex flex-col justify-center">
                  <div className="text-orange-500 mb-2">{card.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                  <p className="text-white/45 text-sm mt-2">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile View (Alternating Entrance) */}
          <div className="md:hidden flex flex-col gap-8 px-4">
            {keyCards.map((card, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  // Zigzag logic: Even starts left (-50), Odd starts right (50)
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] // Custom spring-like cubic bezier
                  }}
                  className="w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a]"
                >
                  <div className="relative h-[240px] overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                  </div>
                  <div className="p-8">
                    <div className="text-orange-500 mb-3">{card.icon}</div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{card.title}</h3>
                    <p className="text-white/45 text-sm mt-3 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div className="mt-20 md:mt-28">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onApply}
            className="group px-8 py-4 bg-white text-black font-black rounded-full flex items-center gap-3 transition-all"
          >
            LET'S BUILD TOGETHER
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;