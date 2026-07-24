"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    logo: "/Images/NikeLogo.svg",
    alt: "Nike",
    text: "Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work from concept to installation across the Country.",
  },
  {
    logo: "/Images/ConverseLogo.svg",
    alt: "Converse",
    text: "Creative Concepting, Design, Design Management, Project Management, and execution of work from concept to installation across the Country. Cross functional communication and management of third party partners.",
  },
  {
    logo: "/Images/ArcteryxLogo.svg",
    alt: "Arc'teryx",
    text: "Production and design along with install oversight and execution support for the SoHo store opening on Broadway St, New York. Also working on creative and production work for a new store opening in Glendale, California.",
  },
  {
    logo: "/Images/HunterLogo.svg",
    alt: "Hunter",
    text: "Design and Production partner for Hunter Holiday 2022 Pop-in at Nordstrom 57th St, New York, including activations in Women's, Men's and Kid's zones. Thirty-five (35) additional smaller take-down events in Nordstrom stores across the US. Concept design for Holiday boot customization events in stores across winter 2022.",
  },
];

export default function Client() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".client-card");
      const logos = gsap.utils.toArray<HTMLElement>(".client-logo");
      const descriptions = gsap.utils.toArray<HTMLElement>(".client-description");

      // Initial states
      gsap.set(headingRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 60,
      });

      gsap.set(logos, {
        opacity: 0,
        y: 25,
        scale: 0.9,
      });

      gsap.set(descriptions, {
        opacity: 0,
        y: 20,
      });

      // Main entrance animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to(
          logos,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.5)",
          },
          "-=0.55",
        )
        .to(
          descriptions,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.45",
        );

      // Hover animation for each client card
      cards.forEach((card) => {
        const logo = card.querySelector(".client-logo");
        const text = card.querySelector(".client-description");

        const enter = () => {
          gsap.to(logo, {
            y: -8,
            scale: 1.04,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(text, {
            x: 5,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(logo, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(text, {
            x: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        return () => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        overflow-hidden
        bg-[#eeeae4]
        px-0
        py-20
        sm:py-24
        lg:min-h-[510px]
        lg:py-[90px]
      "
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="
          mb-16
          flex
          items-center
          gap-2
          px-5
          sm:px-8
          lg:mb-[70px]
          lg:pl-[40px]
          xl:pl-[46px]
        "
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff3b19]" />

        <h2
          className="
            font-sans
            text-[14px]
            font-normal
            tracking-[-0.3px]
            text-[#111]
            sm:text-[15px]
            lg:text-[16px]
          "
        >
          WHO WE WORK WITH
        </h2>
      </div>

      {/* Desktop / Tablet Clients */}
      <div
        ref={cardsRef}
        className="
          hidden
          lg:flex
          lg:w-full
          lg:pl-[40px]
          xl:pl-[46px]
        "
      >
        {clients.map((client, index) => (
          <div
            key={index}
            className="
              client-card
              min-h-[248px]
              w-1/4
              shrink-0
              border-l
              border-[#cfcac3]
              px-7
              first:pl-7
              xl:min-h-[248px]
              2xl:px-7
            "
          >
            {/* Logo */}
            <div
              className="
                client-logo
                mb-0
                flex
                h-[90px]
                items-start
                justify-start
              "
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={170}
                height={80}
                className="
                  h-[65px]
                  w-[145px]
                  object-contain
                  object-left-top
                "
              />
            </div>

            {/* Description */}
            <p
              className="
                client-description
                max-w-[245px]
                font-sans
                text-[14px]
                font-normal
                leading-[1.28]
                text-[#0b1c34]
                xl:max-w-[250px]
              "
            >
              {client.text}
            </p>
          </div>
        ))}
      </div>

      {/* Tablet */}
      <div
        className="
          grid
          grid-cols-2
          gap-y-12
          px-6
          md:px-10
          lg:hidden
          sm:gap-y-16
        "
      >
        {clients.map((client, index) => (
          <div
            key={index}
            className="
              client-card
              min-h-[270px]
              border-l
              border-[#cfcac3]
              px-5
              sm:px-7
            "
          >
            <div className="client-logo mb-0 flex h-[90px] items-start">
              <Image
                src={client.logo}
                alt={client.alt}
                width={170}
                height={80}
                className="h-[65px] w-[145px] object-contain object-left-top"
              />
            </div>

            <p
              className="
                client-description
                max-w-[280px]
                font-sans
                text-[14px]
                leading-[1.28]
                text-[#0b1c34]
              "
            >
              {client.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}