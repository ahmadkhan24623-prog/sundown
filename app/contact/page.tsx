"use client";

import { useState } from "react";
import Loader from "../components/Loader/Loader";
import LeftText from "../components/Hero/LeftText";
import RightText from "../components/Hero/RightText";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#EFEAE2] overflow-hidden">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <section className="w-full px-6 md:px-16 flex flex-col md:flex-row items-end justify-between pt-24">
        <LeftText isLoaded={!isLoading} />
        <RightText isLoaded={!isLoading} />
      </section>
    </main>
  );
}