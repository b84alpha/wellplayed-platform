import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Layers, Trophy, GraduationCap, HelpCircle, BookText, Flame
} from "lucide-react";

const GROUPS = [
  {
    name: "PLAY",
    items: [
      { to: "/",            label: "Home",        icon: Home        },
      { to: "/leagues",     label: "Leagues",     icon: Layers      },
      { to: "/tournaments", label: "Tournaments", icon: Trophy      },
    ],
  },
  {
    name: "LEARN",
    items: [
      { to: "/main-cup", label: "Main Cup", icon: GraduationCap },
      { to: "/about",    label: "About",    icon: HelpCircle    },
      { to: "/docs",     label: "Docs",     icon: BookText      },
    ],
  },
];

export default function SideNav() {
  const { pathname } = useLocation();

  return (
    <aside className="w-60 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* logo */}
      <NavLink to="/" className="flex items-center gap-2 px-5 py-6 text-primary text-2xl font-bold">
        <Flame className="w-6 h-6" /> Wellplayed
      </NavLink>

      {/* groups */}
      <nav className="flex-1 overflow-y-auto px-3">
        {GROUPS.map((g) => (
          <div key={g.name} className="mb-4">
            <p className="px-2 py-1 text-xs text-gray-500 tracking-widest">{g.name}</p>
            {g.items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-gray-800 ${
                    isActive || pathname.startsWith(to)
                      ? "bg-gray-800 text-primary"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                <Icon className="w-5 h-5" /> {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
