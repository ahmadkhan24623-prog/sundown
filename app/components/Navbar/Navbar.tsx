"use client";

import { useState, useRef } from "react";
import Logo from "./logo";
import Text from "./text";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navLinks = ["Work", "Studio", "Contact"];

  useGSAP(
    () => {
      const desktopLinks = gsap.utils.toArray<HTMLElement>(".desktop-link");

      // Initial state
      gsap.set(logoRef.current, {
        opacity: 0,
        y: -30,
      });

      gsap.set(desktopLinks, {
        opacity: 0,
        y: -20,
      });

      // Navbar entrance animation
      const timeline = gsap.timeline();

      timeline
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          desktopLinks,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4",
        );
    },
    {
      scope: navRef,
    },
  );

  /*
  |--------------------------------------------------------------------------
  | Mobile Menu Animation
  |--------------------------------------------------------------------------
  */

  const toggleMenu = () => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    if (!isOpen) {
      setIsOpen(true);

      const mobileLinks = menu.querySelectorAll(".mobile-link");

      gsap.set(mobileLinks, {
        opacity: 0,
        y: 40,
      });

      gsap
        .timeline()
        .fromTo(
          menu,
          {
            xPercent: 100,
          },
          {
            xPercent: 0,
            duration: 0.7,
            ease: "power4.out",
          },
        )
        .to(
          mobileLinks,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3",
        );
    } else {
      gsap.to(menu, {
        xPercent: 100,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          setIsOpen(false);
        },
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Close Mobile Menu
  |--------------------------------------------------------------------------
  */

  const closeMenu = () => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    gsap.to(menu, {
      xPercent: 100,
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <header
      ref={navRef}
      className="
        relative
        z-50
        flex
        w-full
        items-center
        justify-between
        bg-[#EFEAE2]
        px-6
        py-6

        md:px-12
        md:py-8
      "
    >
      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-[60] transition-transform duration-300 hover:scale-105"
      >
        <Logo />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-3 md:flex">
        {navLinks.map((link) => (
          <div key={link} className="desktop-link">
            <Text text={link} />
          </div>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        onClick={toggleMenu}
        className="
          relative
          z-[60]
          flex
          h-10
          w-10
          flex-col
          items-center
          justify-center
          rounded-full
          border
          border-zinc-400
          md:hidden
        "
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
      >
        <span
          className={`
            absolute
            h-[2px]
            w-4
            bg-zinc-900
            transition-all
            duration-300
            ${isOpen ? "rotate-45" : "-translate-y-[4px]"}
          `}
        />

        <span
          className={`
            absolute
            h-[2px]
            w-4
            bg-zinc-900
            transition-all
            duration-300
            ${isOpen ? "opacity-0" : "opacity-100"}
          `}
        />

        <span
          className={`
            absolute
            h-[2px]
            w-4
            bg-zinc-900
            transition-all
            duration-300
            ${isOpen ? "-rotate-45" : "translate-y-[4px]"}
          `}
        />
      </button>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="
          fixed
          inset-0
          z-50
          flex
          translate-x-full
          flex-col
          items-center
          justify-center
          gap-6
          bg-[#EFEAE2]
          md:hidden
        "
      >
        {navLinks.map((link) => (
          <div
            key={link}
            className="mobile-link"
            onClick={closeMenu}
          >
            <Text text={link} />
          </div>
        ))}
      </div>
    </header>
  );
}