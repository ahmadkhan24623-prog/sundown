"use client";

import { useState } from "react";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en">
      <body>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
        <Navbar />
        {children}
      </body>
    </html>
  );
}