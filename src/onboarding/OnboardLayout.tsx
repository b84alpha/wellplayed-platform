import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useOnboard } from "../hooks/useOnboard";

export default function OnboardLayout() {
  const steps = ["welcome", "profile", "game", "team", "done"];
  const { data } = useOnboard();
  const loc = useLocation();
  const current = loc.pathname.split("/").pop() || "welcome";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200">
      <Outlet />

      {/* progress dots */}
      <div className="flex gap-2 mt-8">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full ${
              (data.completed && i === steps.length - 1) ||
              steps.indexOf(current) >= i
                ? "bg-primary"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>

      {!data.completed && (
        <NavLink
          to="/"
          className="text-xs text-gray-400 mt-4 hover:underline"
        >
          Skip onboarding
        </NavLink>
      )}
    </div>
  );
}
