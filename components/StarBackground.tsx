"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const StarBackground = () => {
    const [stars, setStars] = useState<
        {
            id: number;
            top: string;
            left: string;
            size: number;
            duration: number;
            delay: number;
            moveDuration: number;
            moveX: number;
            moveY: number;
        }[]
    >([]);

    useEffect(() => {
        // Generate stars only on client side to prevent Hydration Errors
        const generateStars = () => {
            const newStars = [];
            for (let i = 0; i < 1500; i++) {
                newStars.push({
                    id: i,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    size: Math.random() * 2 + 1, // 1px to 3px
                    duration: Math.random() * 3 + 2, // Twinkle duration
                    delay: Math.random() * 5,
                    moveDuration: Math.random() * 20 + 20, // 20s - 40s drift
                    moveX: Math.random() * 100 - 50, // Drift X
                    moveY: Math.random() * 100 - 50, // Drift Y
                });
            }
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
            
            {/* Deep Space Gradient Base */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black opacity-90" />

            {/* Violet Glows (Atmosphere) */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-violet-900/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-cyan-900/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />

            {/* Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        x: [0, star.moveX],
                        y: [0, star.moveY],
                    }}
                    transition={{
                        opacity: {
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut",
                        },
                        x: {
                            duration: star.moveDuration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        },
                        y: {
                            duration: star.moveDuration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        },
                    }}
                />
            ))}
        </div>
    );
};
