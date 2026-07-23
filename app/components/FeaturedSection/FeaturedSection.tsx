import LeftText from "./Lefttext";
import OrangeCircle from "./OrangeCircle";
import RightText from "./RightText";

export default function FeaturedSection() {
  return (
    <section className="w-full px-8 md:px-16 py-24 relative overflow-hidden bg-[#EFEAE2]">
      {/* Featured Projects Small Label at Bottom-Left */}
      <div className="absolute bottom-6 left-6 md:left-16 flex items-center gap-2 z-20">
        <span className="w-2.5 h-2.5 bg-[#FE330A] rounded-full inline-block"></span>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-800">
          FEATURED PROJECTS
        </span>
      </div>

      {/* Main Grid Layout without max-w restriction */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <LeftText />
        <OrangeCircle />
        <RightText />
      </div>
    </section>
  );
}