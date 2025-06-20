import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboard } from "@/hooks/useOnboard";

export default function Step4Team() {
  const [team, setTeam] = useState("");
  const { save } = useOnboard();
  const nav = useNavigate();

  return (
    <div className="space-y-4 max-w-xs">
      <h2 className="text-xl font-semibold">Create or join a team</h2>
      <input
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="w-full px-3 py-2 rounded bg-gray-800"
        placeholder="Team name"
      />
      <button
        disabled={!team}
        onClick={() => {
          save({ team });
          nav("../done");
        }}
        className="bg-primary hover:bg-primary-dark px-4 py-2 rounded w-full disabled:bg-gray-700"
      >
        Continue
      </button>
    </div>
  );
}
