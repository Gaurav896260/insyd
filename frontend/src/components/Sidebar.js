// src/components/Sidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Menu,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Inventory", icon: Box, path: "/inventory" },
  { name: "Sales Entry", icon: ShoppingCart, path: "/sales" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Stock Audit", icon: ClipboardCheck, path: "/audit" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-white border-r border-zinc-200 min-h-screen p-4 flex flex-col fixed left-0 top-0 z-20 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        } mb-10 px-2`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tighter text-black">
              BUILDSTOCK
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-zinc-100 rounded-md border border-zinc-200 text-black transition-colors"
        >
          {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {!isCollapsed && (
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 px-3">
            Menu
          </p>
        )}
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              title={isCollapsed ? item.name : ""}
              className={`flex items-center transition-all group rounded-lg ${
                isCollapsed
                  ? "justify-center p-3"
                  : "justify-between px-3 py-2.5"
              } ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={isCollapsed ? 22 : 18} />
                {!isCollapsed && (
                  <span className="text-sm font-bold uppercase tracking-tight">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
