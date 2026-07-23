export default function RightText() {
  return (
    <div className="text-right relative z-10"> {/* Ensure text sits above the blur */}
      <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-zinc-900">
        SPACES <br />
        THAT <br />
        INSPIRE
      </h1>
    </div>
  );
}