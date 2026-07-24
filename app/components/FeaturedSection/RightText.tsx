import Image from "next/image";

export default function RightText() {
  return (
    <div className="relative z-10 flex flex-col items-start lg:col-span-5 lg:items-end">
      <div className="w-full max-w-md">
        {/* Image Card */}
        <div
          className="
            featured-image
            relative
            mb-6
            h-64
            w-full
            overflow-hidden
            rounded-3xl
            bg-zinc-800
            shadow-xl

            sm:h-72

            md:h-80
          "
        >
          <Image
            src="/Images/NikeImage.webp"
            alt="Featured Project"
            fill
            priority
            className="
              object-cover
              will-change-transform
            "
          />
        </div>

        {/* Description */}
        <p
          className="
            featured-description
            text-sm
            leading-relaxed
            text-zinc-700

            md:text-base
          "
        >
          We love to create, we love to solve, we love to collaborate, and we
          love to turn amazing ideas into reality. We&apos;re here to partner
          with you through every step of the process and know that relationships
          are the most important things we build.
        </p>
      </div>
    </div>
  );
}