'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Rocket, 
  Coffee, 
  Heart, 
  Zap,
  ChevronRight,
  X,
  Instagram,
  MessageCircle // Using this for WhatsApp icon
} from 'lucide-react';

const StudentGuidance = () => {
  const [activeTab, setActiveTab] = useState('mentorship');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const cardRef = useRef(null);

  // GSAP Smooth 3D Tilt Logic
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const multiplier = 20; 
    const rotateX = (y - rect.height / 2) / multiplier;
    const rotateY = (rect.width / 2 - x) / multiplier;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 1200
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.6)"
    });
  };

  // Logic to handle card click
  const handleCardClick = () => {
    if (activeTab === 'community') {
      setIsPopupOpen(true);
    }
  };

  const content = {
    mentorship: {
      title: "Level up your skills with our team",
      subtitle: "Personalized Coaching",
      desc: "Forget boring lectures. Get a coding buddy to help you master Fullstack or UI/UX through actual building.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
      icon: <Rocket className="text-orange-500" />
    },
    projects: {
      title: "Don't build alone anymore friend",
      subtitle: "Brainstorming Sessions",
      desc: "Stuck on a bug at 2 AM? We've got your back. Let's hop on a call and ship that project together.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
      icon: <Coffee className="text-purple-500" />
    },
    community: {
      title: "Join the coolest tech family now",
      subtitle: "Namma Tech Community",
      desc: "Connect with 500+ peers. No formal stuff—just hackathons, meetups, and sharing what we learn.",
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000",
      icon: <Heart className="text-pink-500" />
    }
  };

  const tabs = [
    { id: 'mentorship', label: 'Mentorship', icon: <Zap size={14} /> },
    { id: 'projects', label: 'Projects', icon: <Coffee size={14} /> },
    { id: 'community', label: 'Community', icon: <Heart size={14} /> }
  ];

  return (
    <section className="py-20 bg-white text-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* HEADING */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Adapted for the way <br />
            <span className="font-light">you </span>
            <span className="font-light bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              learn and grow
            </span>
          </motion.h2>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center items-center gap-2 mb-12 w-full">
          <div className="flex bg-gray-100/50 p-1 rounded-2xl border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl transition-all duration-500 text-xs md:text-sm font-bold ${
                  activeTab === tab.id 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-400 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* HIGH-PERFORMANCE INTERACTIVE CARD */}
        <div className="perspective-2000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleCardClick}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 1.05 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20, 
                mass: 1 
              }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row min-h-[500px] cursor-pointer will-change-transform"
            >
              {/* IMAGE SIDE */}
              <div className="lg:w-1/2 relative h-[250px] lg:h-auto overflow-hidden">
                <img 
                  src={content[activeTab].img} 
                  alt={activeTab}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
              </div>

              {/* TEXT SIDE */}
              <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="mb-4 transform transition-transform duration-700 group-hover:scale-125 origin-left">
                    {content[activeTab].icon}
                  </div>
                  <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-3">
                    {content[activeTab].subtitle}
                  </h4>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-700">
                    {content[activeTab].title}
                  </h3>
                  <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
                    {content[activeTab].desc}
                  </p>
                  
                  <button className="flex items-center gap-2 font-bold text-sm group/btn">
                    Explore Now <ChevronRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* COMMUNITY POPUP */}
        <AnimatePresence>
  {isPopupOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* 1. Professional Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsPopupOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      />
      
      {/* 2. Content Container */}
      <div className="relative w-full max-w-lg flex items-center justify-center min-h-[450px]">
        
        {/* CENTER CIRCLE - Main Identity */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative z-20 w-36 h-36 md:w-44 md:h-44 rounded-full bg-white shadow-2xl flex items-center justify-center flex-col text-center border border-gray-100"
        >
          <div className="p-3 bg-gray-50 rounded-2xl mb-2">
            <Rocket size={24} className="text-orange-500" />
          </div>
          <h3 className="text-sm font-bold text-black tracking-tight">FrameX <br/> Tech Farm</h3>
          
          <button 
            onClick={() => setIsPopupOpen(false)}
            className="absolute -top-2 -right-2 p-1.5 bg-white border border-gray-100 text-gray-400 hover:text-red-500 rounded-full shadow-md transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>

        {/* BOX 1: WHATSAPP (Clean White Design) */}
        <motion.a 
          href="https://chat.whatsapp.com/Gz9bnrh97btCxVHHbff3lu" target="_blank"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ 
            x: window.innerWidth < 768 ? -80 : -160, 
            y: window.innerWidth < 768 ? -130 : -80, 
            opacity: 1 
          }}
          whileHover={{ y: window.innerWidth < 768 ? -135 : -85, scale: 1.02 }}
          className="absolute z-30 bg-white p-4 rounded-[2rem] shadow-xl border border-gray-50 flex items-center gap-3 min-w-[160px] group transition-all"
        >
          <div className="bg-[#25D366]/10 p-2.5 rounded-xl text-[#25D366]">
            <MessageCircle size={20} fill="currentColor" className="opacity-20" />
            <MessageCircle size={20} className="absolute top-6.5" /> 
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left">Community</p>
            <p className="text-xs font-bold text-black">WhatsApp Group</p>
          </div>
        </motion.a>

        {/* BOX 2: INSTAGRAM (Minimalist Gradient) */}
        <motion.a 
          href="https://www.instagram.com/framex_techfarm" target="_blank"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ 
            x: window.innerWidth < 768 ? 80 : 160, 
            y: window.innerWidth < 768 ? 130 : 80, 
            opacity: 1 
          }}
          whileHover={{ y: window.innerWidth < 768 ? 135 : 85, scale: 1.02 }}
          className="absolute z-30 bg-white p-4 rounded-[2rem] shadow-xl border border-gray-50 flex items-center gap-3 min-w-[160px] group transition-all"
        >
          <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2.5 rounded-xl text-white shadow-md">
            <Instagram size={20} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Updates</p>
            <p className="text-xs font-bold text-black">Follow Us</p>
          </div>
        </motion.a>

        {/* THANGLISH MESSAGE: Professional & Friendly */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            x: window.innerWidth < 768 ? 110 : 180, 
            y: window.innerWidth < 768 ? -60 : -150, 
            opacity: 1, rotate: 8
          }}
          className="absolute bg-orange-50 px-5 py-3 rounded-full border border-orange-100 shadow-sm"
        >
          <p className="text-xs font-semibold text-orange-600 whitespace-nowrap italic">
            "Vera level-ah padikalaam!"
          </p>
        </motion.div>

        {/* THANGLISH MESSAGE 2 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            x: window.innerWidth < 768 ? -110 : -180, 
            y: window.innerWidth < 768 ? 60 : 150, 
            opacity: 1, rotate: -8
          }}
          className="absolute bg-purple-50 px-5 py-3 rounded-full border border-purple-100 shadow-sm"
        >
          <p className="text-xs font-semibold text-purple-600 whitespace-nowrap italic">
            "Build pannu nanba!"
          </p>
        </motion.div>

      </div>
    </div>
  )}
</AnimatePresence>
      </div>
      
      <style jsx>{`
        .perspective-2000 { perspective: 2000px; }
        .will-change-transform { will-change: transform, opacity; }
      `}</style>
    </section>
  );
};

export default StudentGuidance;