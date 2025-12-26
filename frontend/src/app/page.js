"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  BarChart3,
  ShieldCheck,
  Search,
  Sun,
  Clock,
  Bell,
  Menu,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [chartAnimated, setChartAnimated] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    const chartTimer = setTimeout(() => setChartAnimated(true), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(chartTimer);
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div
          className={`flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-3 transition-transform duration-300">
            <Box className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">BuildStock</span>
        </div>
        <div
          className={`hidden md:flex gap-10 text-sm font-medium text-gray-600 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <a className="hover:text-gray-900 transition-colors" href="#">
            Features
          </a>
          <a className="hover:text-gray-900 transition-colors" href="#">
            Pricing
          </a>
          <a
            className="flex items-center gap-1 hover:text-gray-900 transition-colors group"
            href="/dashboard"
          >
            Open Dashboard
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        <div className="text-center mb-16 relative">
          <div
            className={`flex justify-center gap-6 mb-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:scale-110 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <Box className="w-5 h-5 text-gray-700" />
            </div>
            <div
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:scale-110 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              <BarChart3 className="w-5 h-5 text-gray-700" />
            </div>
            <div
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:scale-110 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 animate-float"
              style={{ animationDelay: "0.4s" }}
            >
              <ShieldCheck className="w-5 h-5 text-gray-700" />
            </div>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-medium mb-6 leading-[1.1] tracking-tight transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Inventory Intelligence for
            <br />
            <span className="text-gray-500">Construction Businesses</span>
          </h1>
          <p
            className={`text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Real-time visibility into your Cement, Steel, and Paint stock.
            Identify dead stock before it costs you and never miss a sale due to
            low supplies.
          </p>
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/dashboard"
              className="bg-gray-900 text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              Get Started
            </Link>
            <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 hover:scale-105 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          className={`relative w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[700px] ring-1 ring-black/5 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-6 hidden md:flex">
            <div className="flex items-center gap-2 mb-10">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-md hover:rotate-12 transition-transform duration-300">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">BuildStock</span>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Menu
              </p>
              <div className="flex items-center gap-3 px-3 py-2.5 bg-white text-gray-900 rounded-xl shadow-sm border border-gray-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-white hover:scale-105 hover:shadow-sm rounded-xl transition-all duration-200 cursor-pointer">
                <Box className="w-4 h-4" />
                <span className="text-sm font-medium">Inventory</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 hover:bg-white hover:scale-105 hover:shadow-sm rounded-xl transition-all duration-200 cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Alerts</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
            {/* Header */}
            <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md hover:scale-110 transition-transform duration-300">
                  T
                </div>
                <div>
                  <h2 className="text-sm font-bold">Hey, Timothy</h2>
                  <p className="text-xs text-gray-500">Sunday, June 25, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <input
                    className="pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-64 transition-all duration-200"
                    placeholder="Search"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-1 text-gray-400 border-l border-gray-200 pl-4">
                  <Sun className="w-5 h-5 hover:text-yellow-500 hover:rotate-180 transition-all duration-500 cursor-pointer" />
                  <Bell className="w-5 h-5 ml-2 hover:text-gray-600 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer animate-wiggle" />
                </div>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 hover:rotate-12 transition-transform duration-300">
                        <Box className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight">
                          ₹8.95L
                        </h3>
                        <div className="text-xs text-gray-400 mt-1 uppercase">
                          Total Stock Value
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-32 flex items-end justify-between gap-4 px-2">
                    {[40, 60, 30, 80, 50, 45].map((height, i) => (
                      <div
                        key={i}
                        className="w-full bg-gray-100 rounded-t-lg hover:bg-gray-900 transition-all duration-300 cursor-pointer"
                        style={{
                          height: chartAnimated ? `${height}%` : "0%",
                          transition: `all 0.6s ease-out ${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-all duration-300">
                        <Box className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Cement Stock</h3>
                        <p className="text-xs text-green-600 font-semibold">
                          +12% this month
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        450{" "}
                        <span className="text-lg font-normal text-gray-400">
                          Bags
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-32 flex items-end justify-between gap-3 px-2 pt-4">
                    {[60, 75, 55, 90, 70, 45, 65].map((height, i) => (
                      <div
                        key={i}
                        className="w-full bg-gray-100 rounded-t-md hover:bg-gray-900 transition-all duration-300 cursor-pointer"
                        style={{
                          height: chartAnimated ? `${height}%` : "0%",
                          transition: `all 0.6s ease-out ${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
