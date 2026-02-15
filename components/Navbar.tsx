"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-4xl"
        >
            <div className="glass-nav rounded-full px-8 py-3 flex items-center justify-between shadow-lg shadow-purple-500/10 border border-white/10 bg-white/5 backdrop-blur-xl">
                <Link href="/" className="text-2xl font-bold tracking-tighter" data-magnetic>
                    Lakshan<span className="text-cyan-400">.LK</span>
                </Link>

                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-base font-medium text-gray-300 hover:text-white transition-colors relative group"
                                data-magnetic
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        </li>
                    ))}
                </ul>

                <button className="md:hidden text-white font-medium text-base">Menu</button>
            </div>
        </motion.nav>
    );
}

