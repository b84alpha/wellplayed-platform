import { Flame, Trophy, Users, TrendingUp, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="space-y-14 max-w-4xl mx-auto pt-6">
      {/* 1. Hero copy */}
      <header className="space-y-6">
        <h1 className="text-4xl font-extrabold flex items-center gap-2">
          <Flame className="w-8 h-8 text-primary" /> All‑in‑one Arena for <em className="text-primary font-medium"> Gamers</em>
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          <strong>Wellplayed</strong> is an all‑in‑one hub for squad‑based competitive gaming. Build a roster, climb our
          seasonal leagues, enter fast‑cups or weekend tournaments, and take home real prizes. No team? Jump in as a
          <em className="text-primary font-medium"> mercenary</em> and sub for others. This season ends with a regional
          <em className="text-primary font-medium"> Main Cup</em> for every game.
        </p>
      </header>

      {/* 2. Key pillars */}
      <div className="grid sm:grid-cols-2 gap-6">
        <Feature
          icon={<Trophy className="w-6 h-6" />}
          title="Seasonal Leagues & Cups"
          text="Ranked ladders and tournaments for Dota 2, CS2 & LoL."
        />
        <Feature
          icon={<Users className="w-6 h-6" />}
          title="Smart Team Tools"
          text="Calendar, role‑lock, scrim finder and a mercenary queue."
        />
        <Feature
          icon={<TrendingUp className="w-6 h-6" />}
          title="Personal Progression"
          text="XP track, role leaderboards, shareable highlight reels."
        />
        <Feature
          icon={<ShoppingBag className="w-6 h-6" />}
          title="Marketplace Drops"
          text="Win or trade limited‑edition skins & collectibles."
        />
      </div>

      {/* 3. Rewards */}
      <section className="border-l-4 border-primary pl-5">
        <h2 className="text-2xl font-semibold mb-2">Play &amp; Earn</h2>
        <p className="text-gray-300">
          Every match, quest or community action grants <span className="font-medium">XP</span> that advances your battle
          pass. <em>Nothing is pay‑to‑win</em>; every session feels rewarding.
        </p>
      </section>

      {/* 4. Roadmap */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Roadmap</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["June ’25", "Closed beta • Cross‑region leagues • Prepare for Launch"],
            ["July ’25", "Open beta • Live broadcast • First tournaments"],
            ["August ’25", "Full platform launch • Big partnership • Creator‑hosted cups"],
            ["September ’26", "Main Cup • Season end • Token launch"],
          ].map(([month, desc]) => (
            <div key={month} className="bg-gray-800/60 rounded-xl p-4 flex gap-3">
              <span className="text-primary font-semibold min-w-[90px]">{month}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Call to action */}
      <div className="text-center">
        <p className="text-lg mb-4 font-medium">
          Choose a league, invite your friends — or queue as a mercenary — and start climbing today!
        </p>
        <NavLink
          to="/leagues"
          className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Jump into Leagues
        </NavLink>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-gray-900/60 rounded-xl p-5 flex gap-4 shadow-inner-md">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
