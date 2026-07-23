import Image from "next/image";

export default function DesignExecution() {
  return (
    <section className="w-full bg-[#EFEAE2] py-20 px-6 md:px-16">
      <div className="w-full bg-black rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-2xl">
        
        {/* Left Black Content Panel */}
        <div className="lg:col-span-5 px-8 md:px-16 py-28 flex flex-col justify-center relative">
          {/* Vertical white/grey accent line beside the heading */}
          <div className="absolute left-8 md:left-16 top-24 bottom-24 w-[2px] bg-gradient-to-b from-zinc-400 via-zinc-700 to-transparent"></div>

          <div className="pl-6 md:pl-8">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
              Design <br />
              <span className="font-semibold text-zinc-300">Project</span> <br />
              <span className="font-bold text-white">Execution</span>
            </h2>

            <p className="mt-8 text-xs md:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Our team works with our clients to refine an idea and concept into an executable design. We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.
            </p>
          </div>
        </div>

        {/* Right Image Display Panel with Maximized Height */}
        <div className="lg:col-span-7 p-6 md:p-10 relative h-[650px] md:h-[850px] w-full">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="/Images/DesignExecution.webp"
              alt="Design Project Execution"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}