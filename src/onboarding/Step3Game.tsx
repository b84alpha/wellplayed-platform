import { useNavigate } from "react-router-dom";
import { useOnboard } from "@/hooks/useOnboard";

const GAMES = ["Dota 2", "CS 2", "LoL"];

export default function Step3Game() {
  const { save } = useOnboard();
  const nav = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Pick your main game</h2>
      <div className="grid grid-cols-3 gap-4">
        {GAMES.map((g) => (
          <button
            key={g}
            onClick={() => {
              save({ mainGame: g });
              nav("../team");
            }}
            className="bg-gray-800 hover:bg-gray-700 px-3 py-6 rounded"
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
