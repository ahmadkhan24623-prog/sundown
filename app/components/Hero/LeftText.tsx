"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LeftTextProps {
  isLoaded: boolean;
}

export default function LeftText({ isLoaded }: LeftTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isLoaded) return;

      const words = gsap.utils.toArray<HTMLElement>(".left-word");

      // Set initial hidden state immediately
      gsap.set(words, { opacity: 0, y: 60 });

      // Animate into view
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    {
      scope: containerRef,
      dependencies: [isLoaded],
    }
  );

  return (
    <div ref={containerRef} className="max-w-xl">
      <p className="text-2xl font-bold leading-[1.2] text-zinc-900 md:text-3xl lg:text-4xl">
        <span className="left-word inline-block">Sundown</span>{" "}
        <span className="left-word inline-block">is</span>{" "}
        <span className="left-word inline-block">a</span>{" "}
        <span className="left-word inline-block">multi-disciplinary</span>{" "}
        <br />

        <span className="left-word inline-block">studio</span>{" "}
        <span className="left-word inline-block">focused</span>{" "}
        <span className="left-word inline-block">on</span>{" "}
        <span className="left-word inline-block">creating</span>{" "}
        <br />

        <span className="left-word inline-block">unique,</span>{" "}
        <span className="left-word inline-block">end-to-end</span>{" "}
        <span className="left-word inline-block">experiences</span>{" "}
        <br />

        <span className="left-word inline-block">and</span>{" "}
        <span className="left-word inline-block">environments.</span>
      </p>
    </div>
  );
}