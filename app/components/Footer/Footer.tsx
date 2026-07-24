"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;

      if (!footer) return;

      const links = gsap.utils.toArray<HTMLElement>(".footer-link");
      const newsletter = footer.querySelector(".newsletter");
      const footerDetails = footer.querySelector(".footer-details");
      const divider = footer.querySelector(".footer-divider");

      /*
      |--------------------------------------------------------------------------
      | Initial States
      |--------------------------------------------------------------------------
      */

      gsap.set(footer, {
        yPercent: 100,
      });

      gsap.set(links, {
        opacity: 0,
        y: 50,
      });

      gsap.set(newsletter, {
        opacity: 0,
        y: 40,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.8,
      });

      gsap.set(divider, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(footerDetails, {
        opacity: 0,
        y: 30,
      });

      /*
      |--------------------------------------------------------------------------
      | Main Footer GSAP Animation
      |--------------------------------------------------------------------------
      */

      const timeline = gsap.timeline({
        delay: 0.2,
      });

      timeline
        // Footer comes from bottom
        .to(footer, {
          yPercent: 0,
          duration: 1.3,
          ease: "power4.out",
        })

        // Navigation links
        .to(
          links,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.7",
        )

        // Newsletter
        .to(
          newsletter,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )

        // Large Sundown title
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.6",
        )

        // Divider
        .to(
          divider,
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.7",
        )

        // Footer details
        .to(
          footerDetails,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.6",
        );

      /*
      |--------------------------------------------------------------------------
      | Giant Sundown Text Parallax
      |--------------------------------------------------------------------------
      */

      gsap.to(titleRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /*
      |--------------------------------------------------------------------------
      | Background Glow Animation
      |--------------------------------------------------------------------------
      */

      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.9,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /*
      |--------------------------------------------------------------------------
      | Navigation Link Hover Animation
      |--------------------------------------------------------------------------
      */

      links.forEach((link) => {
        const arrow = link.querySelector(".footer-arrow");

        const handleMouseEnter = () => {
          gsap.to(link, {
            x: 15,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            x: 8,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(link, {
            x: 0,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            x: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });
    },
    {
      scope: footerRef,
  },
  );

  return (
    <footer
      ref={footerRef}
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-0
        flex
        h-[85vh]
        min-h-[500px]
        w-full
        flex-col
        justify-between
        overflow-hidden
        bg-black
        px-6
        py-8
        text-white

        sm:px-10

        md:px-16
        md:py-12
      "
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-black to-[#FE330A] opacity-95" />

      {/* Animated Glow */}
      <div
        ref={glowRef}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[20%]
          z-0
          h-[50vw]
          w-[90vw]
          -translate-x-1/2
          rounded-full
          bg-black
          opacity-80
          blur-[120px]
          will-change-transform

          md:w-[70vw]
        "
      />

      {/* Top Section */}
      <div className="relative z-10 grid grid-cols-1 items-start gap-6 pt-2 md:grid-cols-2 md:gap-8 md:pt-4">
        {/* Navigation */}
        <div className="flex flex-col gap-0 md:gap-1">
          <Link
            href="/work"
            className="
              footer-link
              flex
              w-fit
              items-center
              text-3xl
              font-semibold
              tracking-tight
              text-white
              will-change-transform
              hover:text-zinc-300

              sm:text-4xl

              md:text-6xl
            "
          >
            <span>Work</span>

            <span className="footer-arrow ml-3 text-2xl opacity-0 md:text-3xl">
              →
            </span>
          </Link>

          <Link
            href="/studio"
            className="
              footer-link
              flex
              w-fit
              items-center
              text-3xl
              font-semibold
              tracking-tight
              text-white
              will-change-transform
              hover:text-zinc-300

              sm:text-4xl

              md:text-6xl
            "
          >
            <span>Studio</span>

            <span className="footer-arrow ml-3 text-2xl opacity-0 md:text-3xl">
              →
            </span>
          </Link>

          <Link
            href="/contact"
            className="
              footer-link
              flex
              w-fit
              items-center
              text-3xl
              font-semibold
              tracking-tight
              text-white
              will-change-transform
              hover:text-zinc-300

              sm:text-4xl

              md:text-6xl
            "
          >
            <span>Contact</span>

            <span className="footer-arrow ml-3 text-2xl opacity-0 md:text-3xl">
              →
            </span>
          </Link>
        </div>

        {/* Newsletter */}
        <div className="newsletter flex max-w-xs flex-col gap-2 md:gap-3">
          <p className="text-xs leading-snug text-white/90 sm:text-sm md:text-base">
            Get industry insights and creative inspiration straight to your
            inbox.
          </p>

          <form className="flex items-center border-b border-white/60 pb-2 transition-colors focus-within:border-white">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/50 sm:text-sm"
            />

            <button
              type="submit"
              className="pl-2 text-sm font-bold transition-transform hover:translate-x-1 md:text-base"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* Giant Sundown Title */}
      <div className="relative z-10 my-auto w-full text-center">
        <h1
          ref={titleRef}
          className="
            select-none
            text-[19vw]
            font-bold
            leading-none
            tracking-tighter
            text-[#EFEAE2]
            will-change-transform
          "
        >
          Sundown
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex flex-col gap-3 md:gap-4">
        <div className="footer-divider h-[1px] w-full bg-white/30" />

        <div
          className="
            footer-details
            flex
            flex-col
            items-center
            justify-between
            gap-2
            text-[11px]
            text-white/80

            sm:flex-row
            sm:gap-0
            sm:text-xs

            md:text-sm
          "
        >
          <p>Copyright © Sundown Studio</p>

          <p>Brooklyn, NY</p>

          <div className="flex gap-4 sm:gap-6">
            <Link
              href="#instagram"
              className="transition-colors hover:text-white"
            >
              Instagram
            </Link>

            <Link
              href="#linkedin"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}