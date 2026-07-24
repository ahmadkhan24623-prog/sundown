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
    {
      title: "Play New Kidvision",
      brand: "NIKE",
      category: "Environment",
      image: "/Images/ProjectImage1.webp",
    },
    {
      title: "SOHO NYC",
      brand: "ARC'TERYX",
      category: "Environment",
      image: "/Images/ProjectImage2.webp",
    },
    {
      title: "Makers Studio HOI",
      brand: "NIKE",
      category: "Experiential",
      image: "/Images/ProjectImage3.webp",
    },
    {
      title: "SOHO 2023",
      brand: "CONVERSE",
      category: "Environment",
      image: "/Images/ProjectImage4.webp",
    },
    {
      title: "NYFW Popup",
      brand: "AFTERPAY",
      category: "Experiential",
      image: "/Images/ProjectImage5.webp",
    },
    {
      title: "Air Force 1 2021",
      brand: "NIKE",
      category: "Environment",
      image: "/Images/ProjectImage6.webp",
    },
    {
      title: "50th Anniversary",
      brand: "NIKE",
      category: "Environment",
      image: "/Images/ProjectImage7.webp",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | GSAP Setup
  |--------------------------------------------------------------------------
  */

  useGSAP(
    () => {
      const container = containerRef.current;
      const imageContainer = imageContainerRef.current;

      if (!container || !imageContainer) return;

      const projectRows = gsap.utils.toArray<HTMLElement>(".project-row");

      /*
      |--------------------------------------------------------------------------
      | Initial Row Animation
      |--------------------------------------------------------------------------
      */

      gsap.set(projectRows, {
        opacity: 0,
        y: 50,
      });

      gsap.to(projectRows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      /*
      |--------------------------------------------------------------------------
      | Mouse Position
      |--------------------------------------------------------------------------
      */

      const moveX = gsap.quickTo(imageContainer, "x", {
        duration: 0.5,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(imageContainer, "y", {
        duration: 0.5,
        ease: "power3.out",
      });

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        moveX(x);
        moveY(y);
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    },
    {
      scope: containerRef,
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Project Hover
  |--------------------------------------------------------------------------
  */

  const handleMouseEnter = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(index);

    const container = containerRef.current;
    const imageContainer = imageContainerRef.current;

    if (!container || !imageContainer) return;

    // Instantly snap the image container to the exact current mouse position on enter
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gsap.set(imageContainer, { x, y });
    gsap.killTweensOf(imageContainer);

    gsap.fromTo(
      imageContainer,
      {
        scale: 0,
        opacity: 0,
        rotate: -8,
      },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
  };

  const handleMouseLeave = () => {
    const imageContainer = imageContainerRef.current;

    if (!imageContainer) return;

    gsap.to(imageContainer, {
      scale: 0,
      opacity: 0,
      rotate: 8,
      duration: 0.35,
      ease: "power3.in",
    });

    setHoveredIndex(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Row Hover Animation
  |--------------------------------------------------------------------------
  */

  const handleRowEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const row = event.currentTarget;

    const title = row.querySelector(".project-title");
    const details = row.querySelector(".project-details");

    gsap.to(title, {
      x: 25,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(details, {
      x: -20,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleRowLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const row = event.currentTarget;

    const title = row.querySelector(".project-title");
    const details = row.querySelector(".project-details");

    gsap.to(title, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(details, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#EFEAE2]
        py-16
        sm:py-20
        md:py-24
      "
    >
      <div className="relative flex w-full flex-col">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseEnter={(event) => {
              handleMouseEnter(index, event);
              handleRowEnter(event);
            }}
            onMouseLeave={(event) => {
              handleMouseLeave();
              handleRowLeave(event);
            }}
            className="
              project-row
              group
              relative
              z-10
              flex
              w-full
              cursor-pointer
              items-center
              justify-between
              border-t
              border-zinc-300
              px-5
              py-8
              transition-colors
              duration-500
              last:border-b

              hover:bg-[#ff9831]

              sm:px-8
              sm:py-10

              md:px-12
              md:py-12

              lg:px-16
            "
          >
            {/* Project Title */}
            <h3
              className="
                project-title
                max-w-[70%]
                text-2xl
                font-bold
                tracking-tight
                text-zinc-900
                transition-colors
                duration-300

                group-hover:text-white

                sm:text-3xl

                md:text-5xl

                lg:text-6xl
              "
            >
              {project.title}
            </h3>

            {/* Brand & Category */}
            <div
              className="
                project-details
                text-right
                transition-colors
                duration-300
              "
            >
              <span
                className="
                  block
                  text-[10px]
                  font-semibold
                  tracking-wider
                  text-zinc-900
                  transition-colors
                  duration-300

                  group-hover:text-white

                  sm:text-xs

                  md:text-sm
                "
              >
                {project.brand}
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[9px]
                  uppercase
                  tracking-wide
                  text-zinc-500
                  transition-colors
                  duration-300

                  group-hover:text-white/80

                  sm:text-[10px]

                  md:text-xs
                "
              >
                {project.category}
              </span>
            </div>
          </div>
        ))}

        {/* Floating Mouse-Following Image */}
        <div
          ref={imageContainerRef}
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-30
            h-64
            w-52
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            rounded-2xl
            opacity-0
            shadow-2xl

            sm:h-72
            sm:w-60

            md:h-80
            md:w-72

            lg:h-96
            lg:w-80
          "
        >
          {hoveredIndex !== null && (
            <Image
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              fill
              sizes="(max-width: 768px) 208px, 320px"
              className="
                object-cover
                transition-transform
                duration-700
                hover:scale-110
              "
            />
          )}
        </div>
      </div>
    </section>
  );
}