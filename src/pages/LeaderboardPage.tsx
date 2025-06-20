// src/pages/LeaderboardPage.tsx
import { useState } from "react";

const users = [
  { name: "PlayerOne", xp: 34000, game: "Dota 2", ach: 80 },
  { name: "PlayerTwo", xp: 29500, game: "CS 2", ach: 72 },
  { name: "PlayerThree", xp: 22000, game: "LoL", ach: 55 },
  // …fetch from API later
];

export default function LeaderboardPage() {
  const [sort, setSort] = useState<"xp" | "ach">("xp");

  const sorted = [...users].sort((a, b) =>
    sort === "xp" ? b.xp - a.xp : b.ach - a.ach
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Global Leaderboard</h1>

      <div className="flex gap-4 text-sm">
        <button
          onClick={() => setSort("xp")}
          className={sort === "xp" ? "text-primary" : "text-gray-400"}
        >
          Sort by XP
        </button>
        <button
          onClick={() => setSort("ach")}
          className={sort === "ach" ? "text-primary" : "text-gray-400"}
        >
          Sort by Achievements
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-800">
          <tr>
            <th className="py-2 text-left">#</th>
            <th className="text-left">User</th>
            <th className="text-right">XP</th>
            <th className="text-right">Main game</th>
            <th className="text-right">% Ach.</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((u, i) => (
            <tr key={u.name} className="border-b border-gray-900/30">
              <td className="py-2">{i + 1}</td>
              <td>{u.name}</td>
              <td className="text-right">{u.xp.toLocaleString()}</td>
              <td className="text-right">{u.game}</td>
              <td className="text-right">{u.ach} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
