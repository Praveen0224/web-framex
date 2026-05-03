import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Code2, Layout, GraduationCap, Target, MousePointer2, Sparkles } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Ultra-smooth spring configuration for that "fluid" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Card split transforms
  const card1X = useTransform(smoothProgress, [0.2, 0.5], [0, -420]);
  const card1Rotate = useTransform(smoothProgress, [0.2, 0.5], [0, -15]);
  const card4X = useTransform(smoothProgress, [0.2, 0.5], [0, 420]);
  const card4Rotate = useTransform(smoothProgress, [0.2, 0.5], [0, 15]);

  const keyCards = [
    { 
      title: "Skilled Team", 
      desc: "Interface architects & full-stack ninjas working as one.", 
      icon: <Code2 size={22} />, 
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500",
      x: card1X, rotate: card1Rotate
    },
    { 
      title: "Freelance", 
      desc: "Tailored digital experiences for global startups.", 
      icon: <Layout size={22} />, 
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=500",
      x: useTransform(smoothProgress, [0.2, 0.5], [0, -140]), rotate: -5
    },
    { 
      title: "Quality Focus", 
      desc: "Scalable systems built with pixel-perfect precision.", 
      icon: <Target size={22} />, 
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500",
      x: useTransform(smoothProgress, [0.2, 0.5], [0, 140]), rotate: 5
    },
    { 
      title: "Mentorship", 
      desc: "Empowering students to lead the future of tech.", 
      icon: <GraduationCap size={22} />, 
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=500",
      x: card4X, rotate: card4Rotate
    },
  ];

  // Floating Glass Taglines
  const floatingTags = [
    { text: "Namma Ooru Tech", top: "15%", left: "10%", delay: 0 },
    { text: "Design-la Mass", top: "25%", right: "8%", delay: 0.2 },
    { text: "Next Gen Creators", bottom: "20%", left: "12%", delay: 0.4 },
    { text: "Quality Mattum Thaan", bottom: "15%", right: "10%", delay: 0.6 },
  ];

  return (
    <section ref={containerRef} className="min-h-[200vh] bg-[#020202] py-24 px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />

      {/* Floating Glass Boxes (Tanglish Taglines) */}
      {floatingTags.map((tag, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
          className="absolute z-20 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hidden lg:flex items-center gap-2"
        >
          <Sparkles size={12} className="text-orange-500" />
          <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase">{tag.text}</span>
        </motion.div>
      ))}

      <div className="sticky top-20 flex flex-col items-center">
        
        {/* Header - No Italics, Reduced Size */}
        <div className="text-center mb-20 max-w-4xl">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6">
            <MousePointer2 size={12} className="text-orange-500" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-orange-200">The Creative Powerhouse</span>
          </motion.div>

          <motion.h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-10 leading-tight">
            Digital <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Craftsmanship</span>
          </motion.h2>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
              Our team operates with a singular mission: to bridge the gap between complex code and artistic expression. We build digital ecosystems that are scalable, modern, and high-performing.
            </p>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              While we deliver tailored solutions for startups and global brands, we are equally committed to nurturing the next wave of tech talent through hands-on mentorship.
            </p>
          </div>
        </div>

        {/* Animated Card Stack */}
        <div className="relative w-full max-w-5xl h-[450px] flex justify-center items-center">
          {keyCards.map((card, i) => (
            <motion.div
              key={i}
              style={{ x: card.x, rotate: card.rotate, zIndex: 4 - i }}
              className="absolute w-[260px] md:w-[320px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl group"
            >
              <div className="relative h-3/5 overflow-hidden">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
              </div>

              <div className="p-8 flex flex-col h-2/5 justify-between">
                <div>
                  <div className="text-orange-500 mb-3">{card.icon}</div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
                  <p className="text-white/40 text-xs mt-2 font-light">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div className="mt-28">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 bg-white text-black font-black rounded-full flex items-center gap-3 transition-all"
          >
            START A PROJECT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default About;