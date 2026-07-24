"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const items = ["EXPERIENCES", "CONTENT", "ENVIRONMENTS"];

  useGSAP(
    () => {
      const marquee = marqueeRef.current;

      if (!marquee) return;

      const contentWidth = marquee.scrollWidth / 2;

      animationRef.current = gsap.to(marquee, {
        x: -contentWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Pause on hover
      const handleMouseEnter = () => {
        animationRef.current?.pause();
      };

      const handleMouseLeave = () => {
        animationRef.current?.play();
      };

      marquee.addEventListener("mouseenter", handleMouseEnter);
      marquee.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        marquee.removeEventListener("mouseenter", handleMouseEnter);
        marquee.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    {
      scope: marqueeRef,
    },
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#EFEAE2] py-10">
      <div
        ref={marqueeRef}
        className="flex w-max items-center will-change-transform"
      >
        {/* First Content */}
        <div className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 whitespace-nowrap text-6xl font-black uppercase tracking-tight text-zinc-900 md:text-8xl">
                {item}
              </span>

              <span className="mx-6 inline-block h-6 w-6 shrink-0 rounded-full bg-[#FE330A] md:h-10 md:w-10" />
            </div>
          ))}
        </div>

        {/* Duplicate Content */}
        <div className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <div key={`duplicate-${index}`} className="flex items-center">
              <span className="mx-6 whitespace-nowrap text-6xl font-black uppercase tracking-tight text-zinc-900 md:text-8xl">
                {item}
              </span>

              <span className="mx-6 inline-block h-6 w-6 shrink-0 rounded-full bg-[#FE330A] md:h-10 md:w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}