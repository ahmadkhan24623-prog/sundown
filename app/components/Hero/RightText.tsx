"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface RightTextProps {
  isLoaded: boolean;
}

export default function RightText({ isLoaded }: RightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isLoaded) return;

      const headingLines =
        gsap.utils.toArray<HTMLElement>(".right-heading-line");

      // Set initial hidden state immediately
      gsap.set(headingLines, { opacity: 0, x: 120, rotate: 5 });

      // Animate into view
      gsap.to(headingLines, {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    },
    {
      scope: containerRef,
      dependencies: [isLoaded],
    }
  );

  return (
    <div ref={containerRef} className="relative z-10 text-right">
      <h1 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter text-zinc-900 md:text-9xl">
        <span className="right-heading-line block">SPACES</span>

        <span className="right-heading-line block">THAT</span>

        <span className="right-heading-line block">INSPIRE</span>
      </h1>
    </div>
  );
}