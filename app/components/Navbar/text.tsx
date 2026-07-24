import Link from "next/link";

interface TextProps {
  text: string;
  className?: string;
  href?: string;
}

export default function Text({ text, className = "", href }: TextProps) {
  const targetHref = href || `/${text.toLowerCase()}`;

  return (
    <Link
      href={targetHref}
      className={`
        group
        relative
        inline-flex
        overflow-hidden
        rounded-full
        border
        border-zinc-400
        px-6
        py-3
        text-sm
        font-bold
        tracking-wide
        text-zinc-900
        ${className}
      `}
    >
      {/* Hover Background */}
      <span
        className="
          absolute
          inset-0
          z-0
          translate-y-full
          rounded-full
          bg-zinc-900
          transition-transform
          duration-300
          ease-in-out
          group-hover:translate-y-0
        "
      />

      {/* Text */}
      <span
        className="
          relative
          z-10
          transition-colors
          duration-300
          group-hover:text-white
        "
      >
        {text}
      </span>
    </Link>
  );
}