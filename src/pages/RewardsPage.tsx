// src/pages/RewardsPage.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Gift,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlarmClock,
} from "lucide-react";

/* ─────────────────────────── Page ─────────────────────────── */
export default function RewardsPage() {
  const [tab, setTab] = useState<"Me" | "Team">("Me");
  const personalWP = 1_250;

  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <SeasonBar />

      {/* tab switch */}
      <div className="flex gap-6 border-b border-gray-800">
        {["Me", "Team"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`pb-2 text-sm font-medium ${
              tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t === "Me" ? "My Rewards" : "Team Rewards"}
          </button>
        ))}
      </div>

      {tab === "Me" ? (
        <MyRewards personalWP={personalWP} />
      ) : (
        <TeamRewards />
      )}
    </section>
  );
}

/* ───────────────────── Season header ───────────────────── */
function SeasonBar() {
  const progress = 72; // %
  return (
    <div className="flex items-center gap-6 bg-gray-900/60 rounded-xl p-6 shadow-inner-md">
      {/* circle progress */}
      <div className="relative w-24 h-24">
        <svg className="-rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="var(--tw-prose-links)"
            strokeWidth="10"
            strokeDasharray="282"
            strokeDashoffset={282 - (progress / 100) * 282}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {progress}%
        </span>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" /> Season 1 Prize Pool
        </h2>
        <p className="text-gray-400">2 450 000 WP already locked for finals</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock className="w-4 h-4" />
        12 days left
      </div>
    </div>
  );
}

/* ───────────── My Rewards (personal) ───────────── */
function MyRewards({ personalWP }: { personalWP: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Claim card */}
        <div className="lg:col-span-2 bg-gray-900/60 rounded-xl p-6 space-y-6 shadow-inner-md">
          <h3 className="text-lg font-semibold mb-2">Claimable WP</h3>
          <p className="text-4xl font-extrabold text-primary">{personalWP} WP</p>

          <button
            disabled={personalWP === 0}
            className={`px-6 py-3 rounded-xl font-semibold text-white ${
              personalWP
                ? "bg-primary hover:bg-primary-dark animate-pulse"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            Claim Now
          </button>

          <h4 className="text-sm font-medium mt-8 mb-2">Recent Claims</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>May 28 – 800 WP</li>
            <li>May 22 – 420 WP</li>
          </ul>
        </div>

        {/* Quests card */}
        <div className="bg-gray-900/60 rounded-xl p-6 space-y-4 shadow-inner-md">
          <h3 className="text-lg font-semibold flex gap-2 items-center">
            <AlarmClock className="w-5 h-5 text-primary" /> Active Quests
          </h3>
          {[
            { q: "Win 3 fast-cups", done: true, xp: 250 },
            { q: "Trade an item", done: false, xp: 100 },
            { q: "Watch a stream 30 min", done: false, xp: 50 },
          ].map((q, i) => (
            <div
              key={i}
              className={`flex items-center justify-between text-sm ${
                q.done ? "text-gray-400 line-through" : ""
              }`}
            >
              <span>{q.q}</span>
              <span className="flex items-center gap-1">
                {q.done && <CheckCircle2 className="w-4 h-4 text-primary" />}
                +{q.xp} XP
              </span>
            </div>
          ))}

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 text-primary hover:underline text-sm mt-2"
          >
            View all quests <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showModal && <QuestModal onClose={() => setShowModal(false)} />}
    </>
  );
}

/* ───────────── Team Rewards tab ───────────── */
function TeamRewards() {
  const teams = [
    {
      name: "Team Alpha",
      game: "Dota 2",
      unclaimed: 1_850,
      splits: [
        ["PlayerOne", 450],
        ["PlayerTwo", 450],
        ["PlayerThree", 450],
        ["PlayerFour", 250],
        ["PlayerFive", 250],
      ],
    },
    {
      name: "Dust2 Kings",
      game: "CS2",
      unclaimed: 600,
      splits: [
        ["PlayerOne", 120],
        ["PlayerSix", 120],
        ["PlayerSeven", 120],
        ["PlayerEight", 120],
        ["PlayerNine", 120],
      ],
    },
  ];
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {teams.map((t) => (
        <div key={t.name} className="bg-gray-900/60 rounded-xl p-4 shadow-inner-md">
          <button
            onClick={() => setOpen(open === t.name ? null : t.name)}
            className="flex justify-between w-full items-center"
          >
            <span className="font-medium">
              {t.name} <span className="text-gray-400 text-xs">({t.game})</span>
            </span>
            <span className="text-primary font-semibold">{t.unclaimed} WP</span>
          </button>

          {open === t.name && (
            <ul className="mt-4 text-sm text-gray-300 space-y-1">
              {t.splits.map(([p, amt]) => (
                <li key={p} className="flex justify-between">
                  <span>{p}</span>
                  <span>{amt} WP</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────────── Quest Modal ───────────── */
function QuestModal({ onClose }: { onClose: () => void }) {
  const allQuests = [
    { q: "Win 3 fast-cups", xp: 250, wp: 50, done: true },
    { q: "Trade an item", xp: 100, wp: 20, done: false },
    { q: "Watch a stream 30 min", xp: 50, wp: 10, done: false },
    { q: "Complete daily quest 5 days", xp: 300, wp: 70, done: false },
    { q: "Play a weekend major", xp: 200, wp: 40, done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* card */}
      <div className="relative bg-gray-900 rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <AlarmClock className="w-5 h-5 text-primary" /> All Quests
        </h3>

        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
          {allQuests.map((q, i) => (
            <div
              key={i}
              className={`flex items-center justify-between text-sm ${
                q.done ? "text-gray-400 line-through" : ""
              }`}
            >
              <span>{q.q}</span>
              <span className="flex gap-3">
                <span>+{q.xp} XP</span>
                <span className="text-primary">+{q.wp} WP</span>
                {q.done && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
