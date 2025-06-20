import { useState } from "react";
import { Layers } from "lucide-react";

const filters = {
  game: ["All", "Dota 2", "CS2", "LoL"],
  region: ["All", "EU", "NA", "Asia"],
};

const leagues = [
  { id: 1, name: "EU Masters", game: "Dota 2", region: "EU", fav: true },
  { id: 2, name: "NA Challenger", game: "CS2", region: "NA", fav: false },
  { id: 3, name: "Asia Premier", game: "LoL", region: "Asia", fav: false },
];

export default function LeaguesPage() {
  const [g, setG] = useState("All");
  const [r, setR] = useState("All");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Layers className="w-7 h-7 text-primary" /> Leagues
      </h1>
      {/* Filters */}
      <div className="flex gap-4">
        {filters.game.map((opt) => (
          <button
            key={opt}
            onClick={() => setG(opt)}
            className={`px-3 py-1 rounded-full text-sm ${g === opt ? "bg-primary text-white" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {opt}
          </button>
        ))}
        {filters.region.map((opt) => (
          <button
            key={opt}
            onClick={() => setR(opt)}
            className={`px-3 py-1 rounded-full text-sm ${r === opt ? "bg-primary text-white" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Favourited quick‑access */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Favourite Leagues</h2>
        <div className="space-y-2">
          {leagues.filter((l) => l.fav).map((l) => (
            <div key={l.id} className="bg-gray-800/60 p-4 rounded-xl flex justify-between">
              <span>{l.name}</span>
              <span className="text-xs text-gray-400">{l.game} • {l.region}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main list */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Browse</h2>
        <div className="space-y-2">
          {leagues.filter((l) => (g === "All" || l.game === g) && (r === "All" || l.region === r)).map((l) => (
            <div key={l.id} className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-xl flex justify-between cursor-pointer">
              <span>{l.name}</span>
              <span className="text-xs text-gray-400">{l.game} • {l.region}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
