import LeftText from "./components/Hero/LeftText";
import RightText from "./components/Hero/RightText";
import VideoComponent from "./components/Video/video";
import Marquee from "./components/Hero/Marquee";
import FeaturedSection from "./components/FeaturedSection/FeaturedSection";
import ProjectList from "./components/ProjectList/ProjectList";
import DesignExecution from "./components/DesignExecution/DesignExecution";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-hidden relative bg-[#EFEAE2]">
      
      {/* Background Glow */}
      <div className="absolute top-[35%] right-[-10vw] w-[60vw] h-[40vw] min-w-[500px] min-h-[350px] bg-gradient-to-r from-[rgb(254,51,10)] to-[rgb(254,49,22)] blur-[140px] rounded-l-full opacity-80 pointer-events-none z-0"></div>
      
      {/* Hero Section */}
      <section className="w-full px-6 md:px-16 flex flex-col md:flex-row items-end justify-between pt-36 md:pt-48 pb-16 relative z-10">
        <LeftText />
        <RightText />
      </section>

      {/* Video Section */}
      <VideoComponent />

      {/* Transition gradient bridge */}
      <div className="w-full h-24 bg-gradient-to-b from-transparent via-[#FE330A]/20 to-[#EFEAE2] pointer-events-none -mt-24 relative z-20"></div>

      {/* Marquee Section */}
      <Marquee />

      {/* Featured Projects Section */}
      <FeaturedSection />

      {/* Project List Section */}
      <ProjectList />

      {/* Design Project Execution Section */}
      <DesignExecution />
      
    </main>
  );
}