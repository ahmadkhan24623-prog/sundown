"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import LeftText from "./Lefttext";
import OrangeCircle from "./OrangeCircle";
import RightText from "./RightText";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const featuredLabel = section.querySelector(".featured-label");
      const heading = section.querySelector(".featured-heading");
      const orangeCircle = section.querySelector(".orange-circle");
      const imageCard = section.querySelector(".featured-image");
      const image = section.querySelector(".featured-image img");
      const description = section.querySelector(".featured-description");

      /*
      |--------------------------------------------------------------------------
      | Initial States
      |--------------------------------------------------------------------------
      */

      gsap.set(featuredLabel, {
        opacity: 0,
        y: 30,
      });

      gsap.set(heading, {
        opacity: 0,
        x: -100,
      });

      gsap.set(orangeCircle, {
        opacity: 0,
        scale: 0,
        rotation: -90,
      });

      gsap.set(imageCard, {
        opacity: 0,
        y: 80,
        clipPath: "inset(100% 0 0 0)",
      });

      gsap.set(image, {
        scale: 1.3,
      });

      gsap.set(description, {
        opacity: 0,
        y: 40,
      });

      /*
      |--------------------------------------------------------------------------
      | Main Scroll Animation
      |--------------------------------------------------------------------------
      */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        // Bottom label
        .to(featuredLabel, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })

        // Main heading
        .to(
          heading,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        )

        // Orange circle
        .to(
          orangeCircle,
          {
            opacity: 0.9,
            scale: 1,
            rotation: 0,
            duration: 1.3,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        )

        // Image reveal
        .to(
          imageCard,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
          },
          "-=0.8",
        )

        // Image zoom out
        .to(
          image,
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<",
        )

        // Description
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.7",
        );

      /*
      |--------------------------------------------------------------------------
      | Orange Circle Floating Animation
      |--------------------------------------------------------------------------
      */

      gsap.to(orangeCircle, {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /*
      |--------------------------------------------------------------------------
      | Image Parallax
      |--------------------------------------------------------------------------
      */

      gsap.to(image, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /*
      |--------------------------------------------------------------------------
      | Image Hover Zoom
      |--------------------------------------------------------------------------
      */

      const handleMouseEnter = () => {
        gsap.to(image, {
          scale: 1.08,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      imageCard?.addEventListener("mouseenter", handleMouseEnter);
      imageCard?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        imageCard?.removeEventListener("mouseenter", handleMouseEnter);
        imageCard?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#EFEAE2]
        px-6
        py-24
        md:px-16
        md:py-32
      "
    >
      {/* Featured Projects Label */}
      <div
        className="
          featured-label
          absolute
          bottom-6
          left-6
          z-20
          flex
          items-center
          gap-2
          md:left-16
        "
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#FE330A]" />

        <span className="text-xs font-bold uppercase tracking-widest text-zinc-800">
          FEATURED PROJECTS
        </span>
      </div>

      {/* Main Grid */}
      <div
        className="
          relative
          z-10
          grid
          w-full
          grid-cols-1
          items-center
          gap-16
          lg:grid-cols-12
          lg:gap-12
        "
      >
        <LeftText />

        <OrangeCircle />

        <RightText />
      </div>
    </section>
  );
}