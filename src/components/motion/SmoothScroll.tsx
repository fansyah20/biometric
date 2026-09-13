"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount once near the top of a page to enable buttery-smooth scrolling.
 * Lenis drives the actual scroll physics; GSAP's ticker is hijacked to
 * step Lenis every frame, and ScrollTrigger is told to re-measure on
 * every Lenis scroll event so scroll-linked animations stay perfectly
 * in sync instead of drifting or feeling laggy.
 *
 * Renders nothing — it's a side-effect-only component.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // Respect the OS/browser setting — no inertia scrolling.

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
