/* ------------------------------------------------------------------ */
/*  DocsPage.tsx – Tokenomics table, liquidity plan, airdrop & revenue */
/* ------------------------------------------------------------------ */
import { FileText, BarChart3, TrendingUp } from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import airdropImg from "@/assets/tokenomics-50m.png"; // donut: Season-1 airdrop

/* number formatter */
const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ─────── total-supply tokenomics (updated) ─────── */
const alloc = [
  { bucket: "Community",  pct: 30 },
  { bucket: "Staking",    pct: 10 },
  { bucket: "Team",       pct: 25 },
  { bucket: "Investors",  pct: 10 },
  { bucket: "Treasury",   pct: 18 }, // was 22
  { bucket: "Liquidity",  pct:  6 }, // was 2
  { bucket: "Launchpad",  pct:  1 },
];

/* ─────── 90-day revenue model ─────── */
const FINANCE = [
  { stream: "Premium Subscriptions",        note: "~10 % buy Battle-Pass @ $150",            season: 750_000 },
  { stream: "Case Openings (Loot Crates)",  note: "~20 % buy cases; ≈$10/mo → $30",          season: 300_000 },
  { stream: "Marketplace Fees",             note: "≈$100 k volume/mo • 10 % fee",            season: 100_000 },
  { stream: "Tournament & Fantasy Tickets", note: "~2 % pay entry; $20/mo → $60",            season: 240_000 },
  { stream: "Affiliate Commissions",        note: "~6 % trigger ≈$50 hardware sale; 5 %",    season: 100_000 },
  { stream: "Sponsorships",                 note: "$150–200 k/mo brand deals → $500 k (betting sponsor)", season: 500_000 },
];
const TOTAL = FINANCE.reduce((s, r) => s + r.season, 0); // $1.99 M

/* ------------------------------------------------------------------ */
export default function DocsPage() {
  return (
    <article className="max-w-5xl mx-auto py-12 space-y-16">
      {/* header */}
      <header className="flex items-center gap-3">
        <FileText className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-extrabold">Wellplayed · Docs & Numbers</h1>
      </header>

      {/* 1️⃣ TOTAL TOKENOMICS TABLE & BAR CHART */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <BarChart3 className="w-5 h-5 text-primary" />
          Tokenomics – Full Supply Breakdown (1 B WP)
        </h2>

        {/* table */}
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="py-2 text-left">Bucket</th>
              <th className="py-2 text-right">% of supply</th>
              <th className="py-2 text-right">Tokens (M)</th>
            </tr>
          </thead>
          <tbody>
            {alloc.map((a) => (
              <tr key={a.bucket} className="border-b border-gray-900/30">
                <td className="py-2">{a.bucket}</td>
                <td className="py-2 text-right">{a.pct}</td>
                <td className="py-2 text-right">{(a.pct * 10).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* bar chart */}
        <ResponsiveContainer width="100%" height={240}>
          <ReBarChart data={alloc}>
            <XAxis dataKey="bucket" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="pct" fill="#38bdf8" />
          </ReBarChart>
        </ResponsiveContainer>
      </section>

      {/* 2️⃣ INITIAL LIQUIDITY PLAN (6 % stance) */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <BarChart3 className="w-5 h-5 text-primary" />
          Initial Liquidity Plan (6 % supply)
        </h2>

        {/* comparison table */}
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="py-2">Metric</th>
              <th className="py-2 text-right">2 % (small)</th>
              <th className="py-2 text-right">4 % (medium)</th>
              <th className="py-2 text-right">6 % (big)</th>
            </tr>
          </thead>
          <tbody className="text-right">
            <tr className="border-b border-gray-900/30">
              <td className="py-2 text-left">Supply paired</td>
              <td className="py-2">20 M</td>
              <td className="py-2">40 M</td>
              <td className="py-2">60 M</td>
            </tr>
            <tr className="border-b border-gray-900/30">
              <td className="py-2 text-left">Cash side (½ of pool)</td>
              <td className="py-2">$500 k</td>
              <td className="py-2">$1 m</td>
              <td className="py-2">$1.5 m</td>
            </tr>
            <tr className="border-b border-gray-900/30">
              <td className="py-2 text-left">AMM depth (total)</td>
              <td className="py-2">$1 m</td>
              <td className="py-2">$2 m</td>
              <td className="py-2">$3 m</td>
            </tr>
            <tr>
              <td className="py-2 text-left">Price impact on $25 k swap*</td>
              <td className="py-2">~2.5 %</td>
              <td className="py-2">~1.3 %</td>
              <td className="py-2">~0.8 %</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-400">
          *Constant-product estimate, assuming no arbitrage lag.
        </p>

        {/* upsides list */}
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li><strong>“Whale-safe”</strong> – $100 k trades slip &lt; 3 %, enabling guild & fund participation without OTC.</li>
          <li><strong>Instant parity</strong> – \$3 m depth keeps CEX & DEX prices in lock-step via arbitrage.</li>
          <li><strong>Lower volatility index</strong> – meets the “\$2 m+ 24 h depth” rule for smaller CEX listings.</li>
          <li><strong>Stronger narrative</strong> – launch comms can tout “\$3 m liquidity locked” for KOL decks.</li>
          <li><strong>Future yield headroom</strong> – 10 % LP APR costs \$300 k/year and is sustainable on a \$3 m pool.</li>
        </ul>
      </section>

      {/* 3️⃣ SEASON-1 AIRDROP ALLOCATION (50 M WP) */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <BarChart3 className="w-5 h-5 text-primary" />
          Season-1 Airdrop Allocation (5 % supply · 50 M WP)
        </h2>

        <img
          src={airdropImg}
          alt="Donut chart: Season-1 airdrop 50 M WP"
          className="rounded-xl shadow-lg w-full max-w-3xl"
        />

        <ul className="grid md:grid-cols-3 gap-3 text-sm text-gray-300">
          <li><strong>35 %</strong> · Leagues & Cups · 17.5 M WP</li>
          <li><strong>25 %</strong> · Battle-Pass Tiers · 12.5 M WP</li>
          <li><strong>15 %</strong> · Cases & Marketplace · 7.5 M WP</li>
          <li><strong>10 %</strong> · XP Leaderboard · 5 M WP</li>
          <li><strong>10 %</strong> · Quests & Social · 5 M WP</li>
          <li><strong>5 %</strong>  · “Last-Call” Buffer · 2.5 M WP</li>
        </ul>
      </section>

      {/* 4️⃣ SEASON-1 REVENUE MODEL */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <TrendingUp className="w-5 h-5 text-primary" />
          Season-1 Revenue Model · 50 k MAU (90 days)
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-inner-md">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Revenue Stream</th>
                <th className="px-4 py-3 text-left">Assumption</th>
                <th className="px-4 py-3 text-right">Season Revenue</th>
              </tr>
            </thead>
            <tbody>
              {FINANCE.map((r) => (
                <tr key={r.stream} className="border-b border-gray-800 even:bg-gray-800/40">
                  <td className="px-4 py-2 font-medium">{r.stream}</td>
                  <td className="px-4 py-2 text-gray-400">{r.note}</td>
                  <td className="px-4 py-2 text-right font-semibold">${fmt(r.season)}</td>
                </tr>
              ))}
              <tr className="bg-gray-900/70">
                <td className="px-4 py-3 font-bold">TOTAL</td>
                <td />
                <td className="px-4 py-3 text-right font-bold text-primary">${fmt(TOTAL)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
