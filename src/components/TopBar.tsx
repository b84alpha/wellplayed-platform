import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  Plus,
  ChevronDown,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

/* click-outside helper */
function useClickAway(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cb]);
  return ref;
}

export default function TopBar() {
  const [openWallet, setOpenWallet] = useState(false);
  const [openQuick, setOpenQuick] = useState(false);
  const walletRef = useClickAway(() => setOpenWallet(false));
  const quickRef  = useClickAway(() => setOpenQuick(false));

  /* mock numbers – wire to API later */
  const liquid = 1_250;
  const locked =   640;
  const currentXP = 3_400;
  const nextXP    = 5_000;

  return (
    <header className="h-14 flex items-center justify-end gap-4 px-6 border-b border-gray-800 bg-gray-950/80 backdrop-blur z-20">

      {/* search – hidden on small screens */}
      <input
        type="text"
        placeholder="Search players, teams, drops…"
        className="hidden md:block bg-gray-800/80 focus:bg-gray-800 outline-none px-3 py-1.5 rounded-lg text-sm w-60 placeholder-gray-500"
      />

      {/* quick-action (+) */}
      <div className="relative" ref={quickRef}>
        <button
          onClick={() => setOpenQuick(!openQuick)}
          className="p-2 rounded-lg hover:bg-gray-800/60 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
        {openQuick && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-800 text-sm z-30">
            <NavLink to="/teams/create"           className="block px-4 py-2 hover:bg-gray-800">Create team</NavLink>
            <NavLink to="/teams/find"             className="block px-4 py-2 hover:bg-gray-800">Find team</NavLink>
            <NavLink to="/marketplace?tab=cases"  className="block px-4 py-2 hover:bg-gray-800">Open case</NavLink>
          </div>
        )}
      </div>

      {/* notifications (stub) */}
      <button className="relative p-2 rounded-lg hover:bg-gray-800/60 transition">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-ping opacity-75" />
      </button>

      {/* XP counter */}
      <div className="hidden md:flex items-center gap-1 text-xs text-gray-400">
        <span>{currentXP.toLocaleString()}</span>
        <span className="text-gray-600">/</span>
        <span>{nextXP.toLocaleString()} XP</span>
      </div>

      {/* wallet pill */}
      <div className="relative" ref={walletRef}>
        <button
          onClick={() => setOpenWallet(!openWallet)}
          className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
        >
          {liquid.toLocaleString()} WP
          <ChevronDown className={`w-4 h-4 transition-transform ${openWallet ? "rotate-180" : "rotate-0"}`} />
        </button>

        {openWallet && (
          <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-lg border border-gray-800 text-sm z-30">
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="flex justify-between"><span>Available</span><span className="font-semibold">{liquid.toLocaleString()} WP</span></p>
              <p className="flex justify-between text-gray-400 mt-1"><span>Locked</span><span>{locked.toLocaleString()} WP</span></p>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-800" disabled>
              <ArrowDownLeft className="w-4 h-4" /> Deposit
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-500 cursor-not-allowed" disabled>
              <ArrowUpRight className="w-4 h-4" /> Withdraw
            </button>
          </div>
        )}
      </div>

      {/* avatar → profile */}
      <NavLink to="/profile">
        <img src="https://avatars.githubusercontent.com/u/1?v=4" alt="pfp" className="w-8 h-8 rounded-full object-cover" />
      </NavLink>
    </header>
  );
}
