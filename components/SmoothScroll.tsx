"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis strictly on the client side
    const lenis = new Lenis({
      duration: 1.2,          // ලැප් එකේ scroll වෙන වේගය (1.2 කියන්නේ පට්ට smooth ගාණක්)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,           // PC එකට Smooth scroll On කරනවා
      mouseMultiplier: 1,     // Mouse wheel එකේ වේගය
      
      // 👇 මේ ටික තමයි ෆෝන් එකට අදාළ වෙන්නේ!
      smoothTouch: false,     // ෆෝන් එකේ (touch) Smooth scroll Off කරනවා (Native scroll එක වැඩ කරන්න දෙනවා)
      touchMultiplier: 1,     // බැරිවෙලා හරි smoothTouch: true කළොත්, මේක 1 කට වගේ අඩු කරන්න (කලින් 2 වගේ තිබ්බ නිසා වෙන්න ඇති වේගෙන් ගියේ)
    } as any);

    // Request Animation Frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};
