'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

// --- IMAGE COLUMN ---
const ImageColumn = ({ images, speed = 25, reverse = false }) => (
    <div className="flex flex-col gap-4 overflow-hidden h-full">
        <motion.div
            animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-4"
        >
            {[...images, ...images].map((src, i) => (
                <div key={i} className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
                    <img
                        src={src}
                        className="w-full h-full object-cover opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-700"
                    />
                </div>
            ))}
        </motion.div>
    </div>
)

const ContactNewsletter = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const { error } = await supabase
                .from('newsletter_subs')
                .insert([{ email }])

            if (error) throw error

            setStatus('success')
            setEmail('')
        } catch {
            setStatus('error')
        }
    }

    const images1 = [
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8"
    ]

    const images2 = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        "https://images.unsplash.com/photo-1558655146-d09347e92766",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    ]

    return (
        <section className="relative bg-[#050505] text-white py-12 ">

            {/* Glow */}
            <div className="absolute w-[700px] h-[700px] bg-purple-600/10 blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">

                {/* LEFT */}
                <div className="lg:col-span-7">

                    {/* TRUST */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex text-orange-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-xs tracking-[0.25em] text-white/40 uppercase">
                            Trusted by founders & startups
                        </span>
                    </div>

                    {/* HEADLINE */}
                    <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
                        Build something{" "}
                        <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text font-medium">
                            extraordinary
                        </span>
                    </h1>

                    {/* SUBTEXT */}
                    <p className="text-white/40 max-w-xl mb-10 text-lg leading-relaxed">
                        We design and build premium digital experiences. Drop your email — let’s turn your idea into something impactful.
                    </p>

                    {/* FORM */}
                    <form onSubmit={handleSubscribe} className="max-w-md">

                        <div className="relative group">

                            <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-2xl p-2 backdrop-blur-xl group-focus-within:border-orange-500/50 transition">

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent px-4 py-3 outline-none text-sm placeholder:text-white/30"
                                />

                                <button
                                    className="bg-white text-black px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition"
                                >
                                    {status === 'loading' ? "..." : "Start"}
                                    <Send size={14} />
                                </button>
                            </div>

                            {/* STATUS */}
                            {status === 'success' && (
                                <p className="flex items-center gap-2 text-green-400 text-sm mt-3">
                                    <CheckCircle size={16} /> You're in! We'll contact you soon.
                                </p>
                            )}

                            {status === 'error' && (
                                <p className="text-red-400 text-sm mt-3">
                                    Something went wrong. Try again.
                                </p>
                            )}
                        </div>

                    </form>

                    {/* EXTRA TRUST */}
                    <p className="text-white/20 text-xs mt-6">
                        No spam. Only high-value communication.
                    </p>

                </div>

                {/* RIGHT VISUAL */}
                <div className="lg:col-span-5 h-[500px] md:h-[650px] flex gap-4 skew-y-6 rotate-3 overflow-hidden">

                    <div className="flex-1 -mt-16">
                        <ImageColumn images={images1} speed={40} />
                    </div>

                    <div className="flex-1 mt-16">
                        <ImageColumn images={images2} speed={35} reverse />
                    </div>

                    {/* FADES */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent" />

                </div>

            </div>
        </section>
    )
}

export default ContactNewsletter