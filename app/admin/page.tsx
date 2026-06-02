"use client";

import React, { useActionState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, User, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(loginAdmin, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
            router.refresh();
        }
    }, [state, router]);

    return (
        <main className="relative min-h-screen bg-slate-950 flex items-center justify-center px-4 overflow-hidden select-none">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Glassmorphic Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-md p-1 bg-gradient-to-br from-cyan-500/25 via-purple-500/20 to-cyan-500/10 rounded-3xl backdrop-blur-2xl shadow-2xl z-10"
            >
                {/* Floating Ring around card */}
                <div className="absolute -inset-0.5 rounded-[26px] bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-lg opacity-50 pointer-events-none" />

                <div className="bg-slate-950/85 backdrop-blur-md rounded-[22px] p-8 md:p-10 border border-white/10 relative overflow-hidden text-center">
                    
                    {/* Security Badge Header */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
                    >
                        <ShieldCheck className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">
                        Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Center</span>
                    </h1>
                    <p className="text-slate-400 text-sm mb-8 font-medium">
                        Authenticate to access your portfolio CMS dashboard.
                    </p>

                    {/* LoginForm */}
                    <form action={formAction} className="flex flex-col gap-6 text-left">
                        {/* Username Field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-xs font-mono text-cyan-400 uppercase tracking-widest pl-1">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="Enter username"
                                    autoComplete="off"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] placeholder:text-gray-600 text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-xs font-mono text-cyan-400 uppercase tracking-widest pl-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] placeholder:text-gray-600 text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full mt-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed group/btn text-sm"
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Log In securely</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {/* Error Alert Display */}
                        <AnimatePresence>
                            {state && !state.success && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center leading-relaxed"
                                >
                                    {state.error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>
        </main>
    );
}
