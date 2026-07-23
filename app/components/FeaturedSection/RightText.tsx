import Image from "next/image";

export default function RightText() {
  return (
    <div className="lg:col-span-5 flex flex-col items-start lg:items-end relative z-10">
      <div className="w-full max-w-md">
        {/* Image Card */}
        <div className="w-full h-64 md:h-72 rounded-3xl overflow-hidden shadow-xl mb-6 bg-zinc-800 relative">
          <Image
            src="/Images/NikeImage.webp" // Update with your actual image path in public folder
            alt="Featured Project"
            fill
            className="object-cover"
          />
        </div>

        {/* Description Paragraph */}
        <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
          We love to create, we love to solve, we love to collaborate, and we love to turn amazing ideas into reality. We&apos;re here to partner with you through every step of the process and know that relationships are the most important things we build.
        </p>
      </div>
    </div>
  );
}