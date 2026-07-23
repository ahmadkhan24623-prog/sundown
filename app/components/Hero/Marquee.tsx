export default function Marquee() {
  const items = [
    "EXPERIENCES",
    "CONTENT",
    "ENVIRONMENTS",
  ];

  return (
    <div className="w-full py-10 bg-[#EFEAE2] overflow-hidden whitespace-nowrap flex relative">
      <div className="flex items-center animate-marquee shrink-0">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-6xl md:text-8xl font-black uppercase tracking-tight text-zinc-900 mx-6">
              {item}
            </span>
            <span className="w-6 h-6 md:w-10 md:h-10 bg-[#FE330A] rounded-full mx-6 inline-block"></span>
          </div>
        ))}
      </div>

      <div className="flex items-center animate-marquee shrink-0" aria-hidden="true">
        {items.map((item, index) => (
          <div key={`dup-${index}`} className="flex items-center">
            <span className="text-6xl md:text-8xl font-black uppercase tracking-tight text-zinc-900 mx-6">
              {item}
            </span>
            <span className="w-6 h-6 md:w-10 md:h-10 bg-[#FE330A] rounded-full mx-6 inline-block"></span>
          </div>
        ))}
      </div>
    </div>
  );
}