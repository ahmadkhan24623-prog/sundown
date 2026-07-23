"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProjectList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const projects = [
    { title: "Play New Kidvision", brand: "NIKE", category: "Environment", image: "/Images/ProjectImage1.webp" },
    { title: "SOHO NYC", brand: "ARC'TERYX", category: "Environment", image: "/Images/ProjectImage2.webp" },
    { title: "Makers Studio HOI", brand: "NIKE", category: "Experiential", image: "/Images/ProjectImage3.webp" },
    { title: "SOHO 2023", brand: "CONVERSE", category: "Environment", image: "/Images/ProjectImage4.webp" },
    { title: "NYFW Popup", brand: "AFTERPAY", category: "Experiential", image: "/Images/ProjectImage5.webp" },
    { title: "Air Force 1 2021", brand: "Nike", category: "Environment", image: "/Images/ProjectImage6.webp" },
    { title: "50th Anniversary", brand: "Nike", category: "Environment", image: "/Images/ProjectImage7.webp" },
  ];

  // GSAP Mouse Tracking & Animation Effects
  useGSAP(() => {
    const container = containerRef.current;
    const imgContainer = imageContainerRef.current;

    if (!container || !imgContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(imgContainer, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <section ref={containerRef} className="w-full bg-[#EFEAE2] py-16 relative overflow-hidden">
      
     

      <div className="w-full flex flex-col relative">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="w-full px-6 md:px-16 py-10 border-t border-zinc-300 last:border-b flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-[#ff9831] relative z-10 group"
          >
            {/* Project Title with Slide Effect */}
            <h3 className="text-3xl md:text-6xl font-bold tracking-tight text-zinc-900 group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
              {project.title}
            </h3>

            {/* Right Side Brand & Category */}
            <div className="text-right group-hover:-translate-x-4 transition-transform duration-300">
              <span className="block text-xs md:text-sm font-semibold text-zinc-900 group-hover:text-white tracking-wider transition-colors duration-200">
                {project.brand}
              </span>
              <span className="block text-xs text-zinc-500 group-hover:text-white/80 uppercase tracking-wide transition-colors duration-200">
                {project.category}
              </span>
            </div>
          </div>
        ))}

        {/* Floating Follow-Mouse Image Container */}
        <div
          ref={imageContainerRef}
          className="absolute top-0 left-0 w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden pointer-events-none z-30 shadow-2xl -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0"
        >
          {hoveredIndex !== null && (
            <Image
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}