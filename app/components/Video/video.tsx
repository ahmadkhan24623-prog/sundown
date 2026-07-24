"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 30%",
          scrub: 1.5,
        },
      });

      animation
        .fromTo(
          videoContainerRef.current,
          {
            scale: 0.8,
            opacity: 0,
            y: 100,
            borderRadius: "80px",
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            borderRadius: "24px",
            ease: "power3.out",
          }
        )
        .fromTo(
          videoContainerRef.current,
          {
            rotateX: 8,
          },
          {
            rotateX: 0,
            ease: "power2.out",
          },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 md:px-16 my-10 perspective-[1000px]"
    >
      <div
        ref={videoContainerRef}
        className="w-full h-[60vh] md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative bg-zinc-900 transform-gpu"
      >
        <video
          src="/Videos/MainVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}