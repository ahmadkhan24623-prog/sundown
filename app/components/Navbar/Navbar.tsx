"use client";

import { useState } from "react";
import Logo from "./logo";
import Text from "./text";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Work", "Studio", "Contact"];

  return (
    <header className="w-full px-6 md:px-12 py-6 md:py-8 flex items-center justify-between bg-[#EFEAE2] relative z-50">
      {/* Logo */}
      <div className="z-50">
        <Logo />
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-3">
        {navLinks.map((link) => (
          <Text key={link} text={link} />
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-zinc-400 z-50 focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        <span
          className={`w-4 h-[2px] bg-zinc-900 transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-[5px]" : "-translate-y-1"
          }`}
        />
        <span
          className={`w-4 h-[2px] bg-zinc-900 transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`w-4 h-[2px] bg-zinc-900 transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-[5px]" : "translate-y-1"
          }`}
        />
      </button>

      {/* Mobile Dropdown Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#EFEAE2] flex flex-col items-center justify-center gap-6 transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <div key={link} onClick={() => setIsOpen(false)}>
            <Text text={link} />
          </div>
        ))}
      </div>
    </header>
  );
}