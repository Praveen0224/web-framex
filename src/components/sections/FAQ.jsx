'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "What services do you provide?",
    answer: "We provide UI/UX design, website development, branding, and digital solutions for businesses."
  },
  {
    question: "How long will it take to complete a website?",
    answer: "Usually 5–15 working days depending on project size and features."
  },
  {
    question: "Do you create mobile responsive websites?",
    answer: "Yes, all our websites are fully responsive and optimized for mobile, tablet, and desktop devices."
  },
  {
    question: "Can I request custom designs?",
    answer: "Absolutely. Every project can be customized based on your business needs and brand identity."
  },
  {
    question: "Do you provide website maintenance?",
    answer: "Yes, we provide support, updates, and maintenance services after project completion."
  },
  {
    question: "How can I contact your team?",
    answer: "You can contact us through WhatsApp, email, or the contact form available on our website."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full min-h-[70vh] bg-[#020202] text-white py-24 overflow-hidden border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/10 bg-orange-500/[0.03] mb-6 backdrop-blur-sm"
          >
            <MessageCircleQuestion size={13} className="text-orange-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-orange-200/80">
              Got Questions?
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6"
          >
            Frequently Asked <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-purple-500">Questions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/40 text-sm md:text-base font-light max-w-lg mx-auto"
          >
            Everything you need to know about our modern digital solutions, timelines, and tailored design frameworks.
          </motion.p>
        </div>

        {/* Accordion Wrapper */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                animate={{ 
                  borderColor: isOpen ? "rgba(249, 115, 22, 0.3)" : "rgba(255, 255, 255, 0.08)",
                  backgroundColor: isOpen ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)"
                }}
                whileHover={{ 
                  borderColor: isOpen ? "rgba(249, 115, 22, 0.4)" : "rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)"
                }}
                className="border rounded-2xl overflow-hidden backdrop-blur-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 flex items-center justify-between gap-6 text-left transition-colors relative"
                >
                  <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-orange-400' : 'text-white/80'}`}>
                    {faq.question}
                  </span>
                  
                  <motion.div
                    animate={{ 
                      rotate: isOpen ? 180 : 0,
                      scale: isOpen ? 1.1 : 1,
                      color: isOpen ? "#f97316" : "#a3a3a3"
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.25, delay: 0.08 }}
                        className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4 font-light tracking-wide"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;