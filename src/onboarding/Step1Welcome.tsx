import { NavLink } from "react-router-dom";

export default function Step1Welcome() {
  return (
    <div className="text-center max-w-sm space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Wellplayed</h1>
      <p className="text-sm text-gray-400">
        A Web3 hub for squad competition. Let’s set up your profile—it takes one minute.
      </p>
      <NavLink
        to="../profile"
        className="bg-primary hover:bg-primary-dark px-5 py-2 rounded-lg font-medium"
      >
        Get started
      </NavLink>
    </div>
  );
}
