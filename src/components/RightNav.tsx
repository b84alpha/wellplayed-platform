import { NavLink } from "react-router-dom";
import { Gift, ShoppingBag } from "lucide-react";

export default function RightNav() {
  return (
    <aside className="h-full w-14 flex flex-col items-center bg-gray-900 border-l border-gray-800">
      <Icon to="/rewards"                 title="Rewards"><Gift        className="w-5 h-5" /></Icon>
      <Icon to="/marketplace?tab=cases"   title="Cases"><ShoppingBag  className="w-5 h-5" /></Icon>
    </aside>
  );
}

function Icon({ to, title, children }: { to: string; title: string; children: React.ReactNode }) {
  return (
    <NavLink to={to} title={title} className="p-3 mt-4 rounded-lg hover:bg-gray-800 transition">
      {children}
    </NavLink>
  );
}
