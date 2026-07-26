"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState("Environment");

  useEffect(() => {
    const words = ["Environment", "Experiences", "Content"];
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < words.length) {
        setCurrentWord(words[index]);
      } else {
        clearInterval(interval);
      }
    }, 600); // Changes word every 600ms

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Total duration before sliding up loader (3 words * 600ms = 1800ms)
      const timer = setTimeout(() => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      }, 2000);

      return () => clearTimeout(timer);
    },
    { scope: loaderRef }
  );

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black
        text-white
      "
    >
      <h1
        className="
          text-5xl
          font-bold
          tracking-tight
          text-[#FE330A]
          transition-opacity
          duration-300

          sm:text-7xl
          md:text-8xl
        "
      >
        {currentWord}
      </h1>
    </div>
  );
}