"use client";

import React, { useActionState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, MapPin, ArrowUp, Phone } from "lucide-react"; // Phone icon added here
import { FaGithub, FaLinkedin, FaBehance, FaTwitter, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { submitContactForm } from "@/app/actions/messages";

export const Contact = () => {
    const [state, formAction, isPending] = useActionState(submitContactForm, null);

    // --- Configuration ---
    const SOCIAL_LINKS = [
        { name: "GitHub", icon: FaGithub, url: "https://github.com/Lakshan-lk" },
        { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/lakshan-ekanayaka" },
        { name: "Behance", icon: FaBehance, url: "https://behance.net/lakshanekanayaka" },
        { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.me/94767919361" },
        { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/lakshan_lk_" },
        { name: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/lakshan.ekanayaka.12" },
    ];

    const NAV_LINKS = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Services", href: "#services" },
        { name: "Skills", href: "#skills" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // --- Animation Variants ---
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 10 },
        },
    };

    return (
        <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden min-h-screen flex flex-col justify-between">

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center space-y-12"
                >
                    {/* --- Headline --- */}
                    <motion.div variants={itemVariants} className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-8 h-[2px] bg-cyan-400" />
                            <h3 className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Contact</h3>
                            <div className="w-8 h-[2px] bg-cyan-400" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Touch</span>
                        </h2>
                    </motion.div>

                    {/* --- CTA Card --- */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full max-w-4xl p-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl backdrop-blur-xl relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="bg-slate-950/80 backdrop-blur-md rounded-[22px] p-8 md:p-12 border border-white/10 relative overflow-hidden">

                            {/* Inner Card Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                                {/* Left Side: Text and Details (5 columns) */}
                                <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
                                            Let&apos;s create something <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">extraordinary.</span>
                                        </h2>
                                        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                            I&apos;m currently available for freelance projects, internships, and full-time opportunities. Got an idea? Let&apos;s turn it into a digital reality.
                                        </p>
                                    </div>

                                    {/* Contact Info List */}
                                    <div className="flex flex-col gap-5 text-slate-300">
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover/item:border-cyan-500/50 group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Location</p>
                                                <p className="text-sm font-medium">Kandy, Sri Lanka</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 group/item">
                                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-400 group-hover/item:border-green-500/50 group-hover/item:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Phone</p>
                                                <a href="tel:+94767919361" className="text-sm font-medium hover:text-white transition-colors">+94 76 791 9361</a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 group/item">
                                            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-purple-400 group-hover/item:border-purple-500/50 group-hover/item:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Email</p>
                                                <a href="mailto:ekanayakalakshan211@gmail.com" className="text-sm font-medium font-mono hover:text-white transition-colors">ekanayakalakshan211@gmail.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Dynamic Form (7 columns) */}
                                <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md relative flex flex-col justify-center">
                                    <form action={formAction} className="w-full flex flex-col gap-5 text-left">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {/* Name Input */}
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="name" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Name</label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] placeholder:text-gray-600 text-sm"
                                                />
                                            </div>
                                            {/* Email Input */}
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="email" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Email</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="your.email@example.com"
                                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] placeholder:text-gray-600 text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject Input */}
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="subject" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Subject</label>
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                placeholder="What is this regarding?"
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] placeholder:text-gray-600 text-sm"
                                            />
                                        </div>

                                        {/* Message Input */}
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="message" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={4}
                                                placeholder="Tell me about your project..."
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] placeholder:text-gray-600 resize-none text-sm"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed group/btn text-sm"
                                        >
                                            {isPending ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Mail className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    <span>Send Message</span>
                                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        {/* Status Message Overlay */}
                                        <AnimatePresence>
                                            {state && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className={`mt-2 p-3.5 rounded-xl border text-xs font-medium text-center ${
                                                        state.success
                                                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                                                            : "bg-red-500/10 border-red-500/30 text-red-400"
                                                    }`}
                                                >
                                                    {state.success ? state.message : state.error}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- Footer Bottom Section --- */}
            <div className="relative z-10 w-full mt-24 border-t border-white/10 bg-slate-950/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Brand & Copyright */}
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl font-bold text-white mb-2">Lakshan<span className="text-cyan-400">.LK</span></h4>
                        <p className="text-slate-500 text-sm">
                            © 2026 Lakshan Ekanayaka. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
                        {NAV_LINKS.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="hover:text-cyan-400 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Socials & Back to Top */}
                    <div className="flex items-center gap-4">
                        {SOCIAL_LINKS.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}

                        {/* Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="ml-4 p-3 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all duration-300 group"
                            aria-label="Back to Top"
                        >
                            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};