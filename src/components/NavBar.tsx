import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const navItem = "block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary dark:hover:bg-primary-dark";
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="text-xl font-heading font-bold text-primary">
            Wellplayed
          </NavLink>
          <div className="hidden md:flex gap-4">
            <NavLink to="/games" className={navItem}>Games</NavLink>
            <NavLink to="/tournaments" className={navItem}>Tournaments</NavLink>
            <NavLink to="/marketplace" className={navItem}>Marketplace</NavLink>
            <NavLink to="/rewards" className={navItem}>Rewards</NavLink>
            <NavLink to="/main-cup" className={navItem}>Main Cup</NavLink>
            <NavLink to="/docs" className={navItem}>Docs</NavLink>
          </div>
          <div className="hidden md:block">
            <NavLink to="/profile" className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-md text-sm">
              My Profile
            </NavLink>
          </div>
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-2 pb-3 space-y-1">
          {[
            ["/games", "Games"],
            ["/tournaments", "Tournaments"],
            ["/marketplace", "Marketplace"],
            ["/rewards", "Rewards"],
            ["/main-cup", "Main Cup"],
            ["/docs", "Docs"],
            ["/profile", "My Profile"]
          ].map(([to, label]) => (
            <NavLink key={to} to={to as string} className={navItem} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
