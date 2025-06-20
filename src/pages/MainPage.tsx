/* ------------------------------------------------------------------ */
/*  MainPage.tsx                                                      */
/* ------------------------------------------------------------------ */
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Trophy,
  ShoppingBag,
  Flame,
  Skull,
  Shield,
  Coins,
} from "lucide-react";
import heroImg from "@/assets/hero-play-win.png";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
const upcoming = [
  { id: 1, name: "EU Spring Clash",  date: "Jun 14" },
  { id: 2, name: "NA Summer Cup",    date: "Jun 22" },
  { id: 3, name: "Asia Night League",date: "Jun 29" },
];

const drops = [
  { id: 1, title: "Mythic Arcana",      game: "Dota 2" },
  { id: 2, title: "★ Karambit | Fade",  game: "CS2"    },
  { id: 3, title: "Prestige Ahri",      game: "LoL"    },
];

/* helper for pretty numbers */
const fmt = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ------------------------------------------------------------------ */
export default function MainPage() {
  const nav  = useNavigate();
  const jump = (g: string) => nav(`/leagues?game=${encodeURIComponent(g)}`);

  /* CTA label decides by onboarding flag */
  const newUser   = !localStorage.getItem("wp_onboard_completed");
  const ctaTo     = newUser ? "/onboard" : "/profile";
  const ctaLabel  = newUser ? "Join Wellplayed" : "Go to my profile";

  /* season stats (static mock) */
  const POOL    = 50_000_000;  // 50 M WP total
  const CLAIMED = 0.72;        // 72 %
  const pct     = Math.round(CLAIMED * 100);

  return (
    <section className="space-y-20 pb-32">

      {/* ─────────── HERO ─────────── */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Wellplayed hero banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Play · Earn · Govern
          </h1>
          <p className="max-w-2xl text-gray-200 md:text-lg mb-6">
            15 ranked ladders · 1 350 fast-cups · 50 M WP in on-chain prizes
          </p>

          <NavLink
            to={ctaTo}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            {ctaLabel} <ArrowRight className="w-5 h-5" />
          </NavLink>
        </div>
      </div>

      {/* ─────────── SEASON BAR ─────────── */}
      <div className="max-w-6xl mx-auto bg-gray-800/80 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-inner-md">
        <div className="relative w-24 h-24 shrink-0">
          <svg className="-rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
            <circle
              cx="50" cy="50" r="45"
              stroke="currentColor" strokeWidth="10"
              strokeDasharray="282"
              strokeDashoffset={282 - (pct / 100) * 282}
              strokeLinecap="round"
              className="text-primary" fill="none"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">{pct}%</span>
        </div>

        <div className="flex-1 space-y-1">
          <h2 className="text-lg font-semibold">
            Season-1 Reward Pool: {fmt(POOL)} WP
          </h2>
          <p className="text-sm text-gray-400">
            {fmt(CLAIMED * POOL)} WP already claimed by players
          </p>
        </div>

        <NavLink
          to="/rewards"
          className="bg-gray-700/60 hover:bg-gray-600 px-5 py-2 rounded-lg text-sm font-medium"
        >
          View my rewards →
        </NavLink>
      </div>

      {/* ─────────── CORE LOOP ─────────── */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <LoopLink to="/tournaments" icon={<Flame className="w-8 h-8 mx-auto text-rose-500" />} title="Play">
          1 350 fast-cups every season
        </LoopLink>
        <LoopLink to="/profile?tab=Achievements" icon={<Coins className="w-8 h-8 mx-auto text-emerald-400" />} title="Earn">
          XP & WP for wins, quests and clips
        </LoopLink>
        <LoopLink to="/marketplace" icon={<ShoppingBag className="w-8 h-8 mx-auto text-yellow-400" />} title="Trade / Spend">
          Cases, marketplace, major buy-ins
        </LoopLink>
      </div>

      {/* ─────────── MAIN GRID ─────────── */}
      <div className="max-w-6xl mx-auto grid xl:grid-cols-3 gap-8">
        <InfoCard icon={<Trophy className="w-5 h-5 text-primary" />} title="Upcoming Tournaments"
          footer={<NavLink to="/tournaments" className="text-primary hover:underline text-sm">View more →</NavLink>}
        >
          <ul className="space-y-2">
            {upcoming.map(t => (
              <li key={t.id} className="flex justify-between text-sm">
                <span>{t.name}</span><span className="text-gray-400">{t.date}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard icon={<ShoppingBag className="w-5 h-5 text-primary" />} title="Latest Drops"
          footer={<NavLink to="/marketplace?tab=cases" className="text-primary hover:underline text-sm">Marketplace →</NavLink>}
        >
          <ul className="space-y-2">
            {drops.map(d => (
              <li key={d.id} className="flex justify-between text-sm">
                <NavLink to="/marketplace?tab=cases" className="hover:underline">{d.title}</NavLink>
                <span className="text-gray-400">{d.game}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard icon={<Layers className="w-5 h-5 text-primary" />} title="Quick Leagues">
          <div className="grid grid-cols-3 gap-4">
            <LeagueBtn label="Dota 2" icon={<Flame className="text-rose-500" />} onClick={() => jump("Dota 2")} />
            <LeagueBtn label="CS2"    icon={<Skull className="text-yellow-400" />} onClick={() => jump("CS2")} />
            <LeagueBtn label="LoL"    icon={<Shield className="text-sky-400" />}  onClick={() => jump("LoL")} />
          </div>
        </InfoCard>
      </div>
    </section>
  );
}

/* ───────── reusable bits ───────── */

function InfoCard({ icon, title, children, footer }: { icon: React.ReactNode; title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="bg-gray-800/80 rounded-2xl p-6 flex flex-col shadow-inner-md">
      <div className="flex items-center gap-2 mb-4">{icon}<h3 className="font-semibold">{title}</h3></div>
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4 self-start">{footer}</div>}
    </div>
  );
}

function LeagueBtn({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-xl bg-gray-900/70 hover:bg-gray-700 p-5 flex flex-col items-center transition">
      {icon}<span className="mt-2 text-xs">{label}</span>
    </button>
  );
}

function LoopLink({ to, icon, title, children }: { to: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <NavLink to={to} className="bg-gray-800/80 hover:bg-gray-700 rounded-2xl p-6 shadow-inner-md space-y-3 block">
      {icon}<h3 className="font-semibold">{title}</h3><p className="text-sm text-gray-400">{children}</p>
    </NavLink>
  );
}
