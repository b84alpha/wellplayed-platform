import { useState } from "react";
import {
  Trophy,
  Video,
  BarChart3,
  Users,
  Award,
  Share2,
  Gamepad2,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const TABS = [
  "General",
  "Stats",
  "Highlights",
  "Achievements",
  "Teams",
  "Friends",
] as const;

type Tab = (typeof TABS)[number];

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("General");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Header />
      {/* tab nav */}
      <nav className="flex gap-6 border-b border-gray-800 pb-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-1 text-sm font-medium ${
              tab === t ? "border-b-2 border-primary text-primary" : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* tab content */}
      {tab === "General" && <General />}
      {tab === "Stats" && <Stats />}
      {tab === "Highlights" && <Highlights />}
      {tab === "Achievements" && <Achievements />}
      {tab === "Teams" && <Teams />}
      {tab === "Friends" && <Friends />}
    </div>
  );
}

/* ───────────────────── Header ───────────────────── */
function Header() {
  const xp = 3400;
  const next = 5000;
  const lvl = 12;
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* level */}
      <div className="md:w-1/3 bg-gray-900/60 rounded-xl p-4 shadow-inner-md">
        <h3 className="text-sm text-gray-400 mb-1">Level</h3>
        <p className="text-3xl font-bold text-primary mb-2">{lvl}</p>
        <Progress value={(xp / next) * 100} />
        <p className="text-xs text-right mt-1 text-gray-400">
          {xp} / {next} XP
        </p>
      </div>

      {/* profile card */}
      <div className="flex-1 bg-gray-900/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 shadow-inner-md">
        <img
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="pfp"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-semibold">PlayerOne</h2>
          <p className="text-gray-400 text-sm">Bio: Mid‑lane enjoyer & support main.</p>
          <div className="flex gap-3 text-gray-400 text-sm">
            <a href="#" className="hover:text-primary">@twitch</a>
            <a href="#" className="hover:text-primary">@twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── General tab ───────────────────── */
function General() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* per‑game stats */}
      <div className="lg:col-span-2 space-y-6">
        {["Dota 2", "CS2", "LoL"].map((g) => (
          <GameStat key={g} game={g} />
        ))}
      </div>

      {/* sidebar */}
      <div className="space-y-6">
        <TeamList />
        <CupSummary />
      </div>
    </div>
  );
}

function GameStat({ game }: { game: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-900/60 rounded-xl p-4 shadow-inner-md">
      <button onClick={() => setOpen(!open)} className="flex justify-between w-full items-center">
        <span className="font-medium">{game}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      {open && (
        <ul className="mt-3 text-sm text-gray-300 grid grid-cols-2 gap-y-1">
          <li>K/D/A: 3.2</li>
          <li>Win rate: 58 %</li>
          <li>Matches: 420</li>
          <li>Average GPM: 540</li>
        </ul>
      )}
    </div>
  );
}

function TeamList() {
  return (
    <div className="bg-gray-900/60 rounded-xl p-4 shadow-inner-md">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <Users className="w-4 h-4 text-primary" /> Teams
      </h3>
      <ul className="space-y-1 text-sm">
        <li>Team Alpha (Dota 2)</li>
        <li>Dust2 Kings (CS2)</li>
        <li>Baron Slayers (LoL)</li>
      </ul>
    </div>
  );
}

function CupSummary() {
  return (
    <div className="bg-gray-900/60 rounded-xl p-4 shadow-inner-md">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-primary" /> Cups &amp; Prizes
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed">
        3× Fast‑Cup champion<br />
        1× Weekend Major finalist<br />
        Total prizes: <span className="text-primary font-medium">2 450 WP</span>
      </p>
    </div>
  );
}

/* ───────────────────── Stats tab ───────────────────── */
function Stats() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" /> Global Stats
      </h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-400 border-b border-gray-800">
          <tr>
            <th className="py-2">Game</th>
            <th>K/D</th>
            <th>Win %</th>
            <th>Matches</th>
            <th>Most‑played role</th>
          </tr>
        </thead>
        <tbody>
          <Row g="Dota 2" kd="3.2" win="58" matches="420" role="Mid" />
          <Row g="CS2" kd="1.14" win="61" matches="310" role="Entry" />
          <Row g="LoL" kd="2.9" win="55" matches="380" role="Jungle" />
        </tbody>
      </table>
    </div>
  );
}
function Row({ g, kd, win, matches, role }: any) {
  return (
    <tr className="border-b border-gray-900/30">
      <td className="py-2">{g}</td>
      <td>{kd}</td>
      <td>{win} %</td>
      <td>{matches}</td>
      <td>{role}</td>
    </tr>
  );
}

/* ───────────────────── Highlights tab ───────────────────── */
function Highlights() {
  const vids = [
    {
      id: "1",
      title: "Ultra Kill – Dota 2",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      premium: false,
    },
    {
      id: "2",
      title: "1v5 Clutch – CS2",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      premium: true,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">
        Share your best plays!{" "}
        <span className="text-primary font-medium">Free</span> uploads,&nbsp;
        <span className="text-yellow-400 font-medium">Premium</span> for
        front-page feature.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {vids.map((v) => (
          <div key={v.id} className="space-y-2">
            {/* video frame */}
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={v.url}
                className="w-full h-full"
                title={v.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* caption row */}
            <div className="flex justify-between items-center text-sm">
              <span>{v.title}</span>
              {v.premium ? (
                <Share2 className="w-4 h-4 text-yellow-400" />
              ) : (
                <Share2 className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ───────────────────── Achievements tab ───────────────────── */
function Achievements() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Dota 2", "CS2", "LoL", "Overwatch", "Cups"];

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1 rounded-full text-xs ${
              filter === c ? "bg-primary text-white" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/60 rounded-xl p-4 flex items-center gap-3 shadow-inner-md"
          >
            <Award className="w-5 h-5 text-primary" />
            <p className="text-sm">Achievement #{i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Teams tab ───────────────────── */
function Teams() {
  return (
    <div className="space-y-4">
      <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm">
        <UserPlus className="inline w-4 h-4 mr-1" /> Create team
      </button>
      <ul className="space-y-2">
        <li className="bg-gray-900/60 rounded-lg p-3">Team Alpha – Dota 2</li>
        <li className="bg-gray-900/60 rounded-lg p-3">Dust2 Kings – CS2</li>
      </ul>
    </div>
  );
}

/* ───────────────────── Friends tab ───────────────────── */
function Friends() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {["Alice", "Bob", "Charlie", "Dana"].map((name) => (
        <div
          key={name}
          className="bg-gray-900/60 rounded-xl p-4 flex items-center gap-3 shadow-inner-md"
        >
          <img
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${name}`}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  );
}
