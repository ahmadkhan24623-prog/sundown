"use client";

import { useState, useRef } from "react";
import Logo from "./logo";
import Text from "./text";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Studio", href: "/studio" },
    { name: "Contact", href: "/contact" },
  ];

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
          "-=0.4"
        );
    },
    {
      scope: navRef,
    }
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
      const mobileFooter = menu.querySelector(".mobile-menu-footer");

      gsap.set(mobileLinks, {
        opacity: 0,
        y: 60,
      });

      gsap.set(mobileFooter, {
        opacity: 0,
        y: 20,
      });

      const tl = gsap.timeline();
      tl.to(menu, {
        x: "0%",
        duration: 0.7,
        ease: "power4.out",
      })
        .to(
          mobileLinks,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          mobileFooter,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        );
    } else {
      gsap.to(menu, {
        x: "100%",
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
      x: "100%",
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
      {/* Logo Container */}
      <div
        ref={logoRef}
        className="relative z-[60] flex items-center transition-transform duration-300 hover:scale-105"
      >
        <Logo />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-3 md:flex">
        {navLinks.map((link) => (
          <div key={link.name} className="desktop-link">
            <Text text={link.name} />
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
          bg-[#EFEAE2]
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

      {/* Professional Fullscreen Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{ transform: "translateX(100%)" }}
        className="
          fixed
          inset-0
          z-50
          flex
          flex-col
          justify-between
          bg-[#EFEAE2]
          px-6
          py-6
          text-zinc-900
          md:hidden
        "
      >
        {/* Menu Top Bar */}
        <div className="flex w-full items-center justify-between border-b border-zinc-300/60 pb-6">
          <Logo />

          <button
            onClick={closeMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-zinc-400
              text-lg
              font-medium
              transition-colors
              hover:bg-zinc-900
              hover:text-white
            "
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Menu Links Body */}
        <div className="flex flex-col gap-4 py-8">
          {navLinks.map((link, index) => (
            <div key={link.name} className="mobile-link overflow-hidden">
              <Link
                href={link.href}
                onClick={closeMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  text-5xl
                  font-bold
                  tracking-tight
                  text-zinc-900
                  transition-colors
                  hover:text-[#FE330A]

                  sm:text-6xl
                "
              >
                <span>{link.name}</span>
                <span className="text-2xl font-light text-zinc-400 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#FE330A]">
                  0{index + 1}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Menu Bottom Info Footer */}
        <div className="mobile-menu-footer flex flex-col gap-4 border-t border-zinc-300/60 pt-6">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Socials / Connect
          </p>

          <div className="flex items-center justify-between text-sm font-medium">
            <Link href="#instagram" onClick={closeMenu} className="hover:text-[#FE330A]">
              Instagram
            </Link>
            <Link href="#linkedin" onClick={closeMenu} className="hover:text-[#FE330A]">
              LinkedIn
            </Link>
            <Link href="#twitter" onClick={closeMenu} className="hover:text-[#FE330A]">
              Twitter / X
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}