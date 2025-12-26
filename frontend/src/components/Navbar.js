// src/components/Navbar.js
import { Search, Bell, Sun } from "lucide-react";

export default function Navbar({ isCollapsed }) {
  return (
    <header
      className={`h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10 transition-all duration-300 ${
        isCollapsed ? "ml-20" : "ml-64"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold border border-black">
          JD
        </div>
        <div className="hidden sm:block">
          <h2 className="text-sm font-black text-black uppercase tracking-tighter">
            John Doe
          </h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Main Warehouse
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black w-64 transition-all placeholder:text-zinc-400"
            placeholder="SEARCH INVENTORY..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 text-black border-l border-zinc-200 pl-6">
          <button className="p-1 hover:bg-zinc-100 rounded transition-colors">
            <Sun size={20} />
          </button>
          <button className="p-1 hover:bg-zinc-100 rounded transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full border border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
