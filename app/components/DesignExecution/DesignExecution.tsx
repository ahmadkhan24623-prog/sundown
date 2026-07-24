"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignExecution() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleLines = gsap.utils.toArray<HTMLElement>(".title-line");
      const paragraph = document.querySelector(".design-description");

      // Initial states
      gsap.set(containerRef.current, {
        opacity: 0,
        y: 80,
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        x: -80,
      });

      gsap.set(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.set(titleLines, {
        opacity: 0,
        y: 60,
      });

      gsap.set(paragraph, {
        opacity: 0,
        y: 30,
      });

      gsap.set(imageWrapperRef.current, {
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.set(imageRef.current, {
        scale: 1.25,
      });

      // Main animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        // Main black container
        .to(containerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })

        // Left content
        .to(
          contentRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5",
        )

        // Accent line
        .to(
          lineRef.current,
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.7",
        )

        // Title lines
        .to(
          titleLines,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.7",
        )

        // Paragraph
        .to(
          paragraph,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        )

        // Image reveal
        .to(
          imageWrapperRef.current,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            ease: "power4.inOut",
          },
          "-=1.2",
        )

        // Image zoom out
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
          },
          "<",
        );

      // Parallax image effect while scrolling
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Hover image zoom
      const imageWrapper = imageWrapperRef.current;

      if (imageWrapper && imageRef.current) {
        const handleMouseEnter = () => {
          gsap.to(imageRef.current, {
            scale: 1.08,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        imageWrapper.addEventListener("mouseenter", handleMouseEnter);
        imageWrapper.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          imageWrapper.removeEventListener("mouseenter", handleMouseEnter);
          imageWrapper.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#EFEAE2] px-6 py-20 md:px-16"
    >
      <div
        ref={containerRef}
        className="
          grid
          w-full
          grid-cols-1
          items-center
          overflow-hidden
          rounded-3xl
          bg-black
          shadow-2xl
          lg:grid-cols-12
        "
      >
        {/* Left Black Content Panel */}
        <div
          ref={contentRef}
          className="
            relative
            flex
            flex-col
            justify-center
            px-8
            py-24
            md:px-16
            md:py-28
            lg:col-span-5
          "
        >
          {/* Vertical Accent Line */}
          <div
            ref={lineRef}
            className="
              absolute
              bottom-24
              left-8
              top-24
              w-[2px]
              origin-top
              bg-gradient-to-b
              from-zinc-400
              via-zinc-700
              to-transparent
              md:left-16
            "
          />

          <div className="pl-6 md:pl-8">
            {/* Title */}
            <h2 className="text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
              <span className="title-line block">Design</span>

              <span className="title-line block font-semibold text-zinc-300">
                Project
              </span>

              <span className="title-line block font-bold text-white">
                Execution
              </span>
            </h2>

            {/* Description */}
            <p className="design-description mt-8 max-w-sm text-xs leading-relaxed text-zinc-400 md:text-sm">
              Our team works with our clients to refine an idea and concept
              into an executable design. We create a final design that
              encompasses the brand narrative to bring stories to life and
              provide end-to-end design solutions from concept, design, and
              architectural drawings to 3D renderings.
            </p>
          </div>
        </div>

        {/* Right Image Panel */}
        <div
          className="
            relative
            h-[500px]
            w-full
            p-5
            md:h-[700px]
            md:p-10
            lg:col-span-7
            lg:h-[850px]
          "
        >
          <div
            ref={imageWrapperRef}
            className="
              relative
              h-full
              w-full
              overflow-hidden
              rounded-2xl
              shadow-inner
            "
          >
            <Image
              ref={imageRef}
              src="/Images/DesignExecution.webp"
              alt="Design Project Execution"
              fill
              priority
              className="
                object-cover
                will-change-transform
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}