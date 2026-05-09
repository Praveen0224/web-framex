'use client';

import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/sections/Home';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Projects';
import Reviews from '../components/sections/Reviews';
import Footer from '../components/Footer';
import StudentGuidance from '../components/sections/Student';
import ApplicationForm from '../components/ApplicationForm';
import { useState } from 'react';


export default function Page() {
    const sections = useRef({
        home: useRef(null),
        about: useRef(null),
        services: useRef(null),
        portfolio: useRef(null),
        reviews: useRef(null),
        contact: useRef(null)
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formConfig, setFormConfig] = useState({ type: 'call', category: 'general' });

    const openForm = (type = 'call', category = 'general') => {
        setFormConfig({ type, category });
        setIsFormOpen(true);
    };

    const scrollToSection = (section) => {
        const element = sections.current[section]?.current;
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Navbar scroll handler (pass to Navbar)
    const handleNavClick = (path) => {
        const sectionKey = path.replace('/', '') || 'home';
        scrollToSection(sectionKey);
        // Update URL hash for bookmarking
        if (typeof window !== 'undefined') {
            window.location.hash = sectionKey;
        }
    };

    return (
        <div className="app-container">
            <Navbar onNavClick={handleNavClick} onApply={() => openForm('call', 'general')} />

            {/* All sections with refs */}
            <section ref={sections.current.home} id="home" className="page-section">
                <Home />
            </section>

            <section ref={sections.current.about} id="about" className="page-section">
                <About onApply={() => openForm('build', 'collaboration')} />
            </section>
            <section ref={sections.current.guidance} id="guidance" className="page-section">
                <StudentGuidance />
            </section>

            <section ref={sections.current.services} id="services" className="page-section">
                <Services />
            </section>

            <section ref={sections.current.portfolio} id="portfolio" className="page-section">
                <Portfolio />
            </section>

            <section ref={sections.current.reviews} id="reviews" className="page-section">
                <Reviews />
            </section>

          

            <Footer onApply={() => openForm('project', 'development')} />

            <ApplicationForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                type={formConfig.type} 
                category={formConfig.category} 
            />
        </div>
    );
}
