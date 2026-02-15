"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Mail, ArrowUpRight, MapPin, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaBehance, FaTwitter, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export const Contact = () => {
    
    // --- Configuration ---
    const SOCIAL_LINKS = [
        { name: "GitHub", icon: FaGithub, url: "https://github.com/ekanayaka" },
        { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/lakshan-ekanayaka" },
        { name: "Behance", icon: FaBehance, url: "https://behance.net/" },
        { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.me/94712345678" },
        { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/" },
        { name: "Facebook", icon: FaFacebook, url: "https://facebook.com/" },
    ];

    const NAV_LINKS = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" }, // Ensure Projects.tsx has id="projects"
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

                        <div className="bg-slate-950/80 backdrop-blur-md rounded-[22px] p-8 md:p-16 border border-white/10 relative overflow-hidden">
                            
                            {/* Inner Card Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                                    Let&apos;s create something <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">extraordinary.</span>
                                </h2>
                                <p className="text-slate-400 text-lg md:text-xl max-w-2xl">
                                    I&apos;m currently available for freelance projects and internships. Got an idea? Let&apos;s turn it into a digital reality.
                                </p>

                                {/* Say Hello Button */}
                                <motion.a
                                    href="mailto:ekanayakalakshan211@gmail.com"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full text-lg flex items-center gap-3 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all duration-300 group/btn"
                                >
                                    <Mail className="w-5 h-5 group-hover/btn:animate-bounce" />
                                    <span>Say Hello</span>
                                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </motion.a>

                                {/* Contact Details Row */}
                                <div className="mt-10 pt-10 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-slate-400 text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-white/5 border border-white/10">
                                            <MapPin className="w-4 h-4 text-cyan-400" />
                                        </div>
                                        <span>Colombo, Sri Lanka</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-white/5 border border-white/10">
                                            <Mail className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="font-mono">ekanayakalakshan211@gmail.com</span>
                                    </div>
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