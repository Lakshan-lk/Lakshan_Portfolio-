"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons import කරගත්තා

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    // Menu එක Open ද නැද්ද කියලා බලන්න State එකක්
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[92%] md:max-w-3xl"
        >
            {/* Main Navbar Bar */}
            <div className="glass-nav rounded-full px-6 py-4 flex items-center justify-between shadow-lg shadow-purple-500/10 border border-white/10 bg-white/5 backdrop-blur-xl relative z-50">
                
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter" onClick={() => setIsOpen(false)}>
                    Lakshan<span className="text-cyan-400">.LK</span>
                </Link>

                {/* Desktop Menu (Hidden on Mobile) */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-base font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button (Toggle) */}
                <button 
                    className="md:hidden text-white p-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full mt-4 p-4 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col gap-4 text-center">
                            {navLinks.map((link, index) => (
                                <motion.li 
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="block text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                        onClick={() => setIsOpen(false)} // Link එක Click කළාම Menu එක වැහෙනවා
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}