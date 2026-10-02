"use client";

import { useEffect, useState } from "react";

const GLYPHS = "0123456789abcdef";

/**
 * Resolves `target` left-to-right out of random hex glyphs whenever it changes.
 * Reduced-motion users get the final string immediately.
 */
export function useScramble(target: string, duration = 900) {
  const [text, setText] = useState(target);

  useEffect(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = instant ? 1 : Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * target.length);
      let next = target.slice(0, settled);
      for (let i = settled; i < target.length; i++) {
        const ch = target[i];
        next += /[\s·…:.]/.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setText(next);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return text;
}
