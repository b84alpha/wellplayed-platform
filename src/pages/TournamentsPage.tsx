import { useState } from "react";

const mock = [
  { name: "EU Spring League", status: "Live", game: "Dota 2" },
  { name: "NA Summer Cup", status: "Registration", game: "CS2" },
  { name: "Asia Challenger", status: "Finished", game: "LoL" }
];

export default function TournamentsPage() {
  const [filter, setFilter] = useState("All");
  return (
    <section>
      <div className="flex gap-3 mb-6">
        {(["All", "Live", "Registration", "Finished"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "px-4 py-1 rounded-full text-sm " +
              (filter === f ? "bg-primary" : "bg-gray-800 hover:bg-gray-700")
            }
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {mock.filter((t) => filter === "All" || t.status === filter).map((t) => (
          <div key={t.name} className="bg-gray-800/70 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{t.name}</h3>
              <span className="text-xs text-gray-400">{t.game}</span>
            </div>
            <span className="text-sm font-medium text-primary">{t.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
