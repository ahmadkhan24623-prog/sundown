interface TextProps {
  text: string;
}

export default function Text({ text }: TextProps) {
  return (
    <a
      href={`#${text.toLowerCase()}`}
      className="relative px-6 py-3 rounded-full border border-zinc-400 text-zinc-900 text-sm font-bold tracking-wide overflow-hidden group transition-colors duration-300"
    >
      {/* Sliding background hover effect */}
      <span className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
        {text}
      </span>
    </a>
  );
}