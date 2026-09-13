"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animate each direct child in sequence instead of the wrapper as one block. */
  stagger?: boolean;
  /** How far (px) the content slides up from as it fades in. */
  y?: number;
  /** Extra delay (s) before the animation starts, for layering multiple Reveals. */
  delay?: number;
  /** Wrapper element tag — use "ul"/"ol" when wrapping list items so screen readers still get correct list semantics. */
  as?: "div" | "ul" | "ol";
}

/**
 * Fades + slides its children into view the first time they scroll into
 * the viewport. Wrap any section/block on the page with this instead of
 * hand-rolling ScrollTrigger boilerplate everywhere.
 *
 * <Reveal stagger> animates each direct child one after another (good for
 * grids of cards); without `stagger` the whole block animates as one unit.
 */
export function Reveal({ children, className, stagger = false, y = 32, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : [el];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  const Tag = as;

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
