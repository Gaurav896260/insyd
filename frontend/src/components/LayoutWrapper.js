// src/components/LayoutWrapper.js
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isLandingPage = pathname === "/";

  if (isLandingPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-white">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col">
        <Navbar isCollapsed={isCollapsed} />
        <main
          className={`p-8 bg-zinc-50/50 min-h-[calc(100vh-80px)] transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
