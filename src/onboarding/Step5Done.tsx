import { NavLink } from "react-router-dom";
import { useOnboard } from "@/hooks/useOnboard";

export default function Step5Done() {
  const { save } = useOnboard();

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold">All set!</h2>
      <p className="text-sm text-gray-400">
        You’re ready to start earning XP and WP.
      </p>
      <NavLink
        to="/"
        onClick={() => save({ completed: true })}
        className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-medium"
      >
        Enter dashboard
      </NavLink>
    </div>
  );
}
