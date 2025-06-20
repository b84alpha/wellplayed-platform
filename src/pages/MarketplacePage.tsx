/* ------------------------------------------------------------------ */
/*  MarketplacePage.tsx                                               */
/* ------------------------------------------------------------------ */
import { useState } from "react";
import {
  Search,
  Filter,
  Package,
  Box,
  Info,
  ShoppingCart,
  X,
  ArrowRight,
  Upload,
  DollarSign,
} from "lucide-react";
import { clsx } from "clsx";

/* ─── Mock data ──────────────────────────────────────────────────── */
const ITEMS = [
  { id: 1, name: "★ Butterfly | Slaughter", game: "CS2", price: 12_000, tier: 1 },
  { id: 2, name: "Dragonclaw Hook",         game: "Dota 2", price: 9_500,  tier: 2 },
  { id: 3, name: "Spirit Guard Udyr",       game: "LoL",   price: 1_100,  tier: 4 },
  // …
];

const CASES = [
  { id: "bronze",  name: "Bronze Case",  price: 500,  chance: "1 % Tier-1" },
  { id: "silver",  name: "Silver Case",  price: 1_200, chance: "3 % Tier-1" },
  { id: "gold",    name: "Gold Case",    price: 2_500, chance: "7 % Tier-1" },
];

/* ------------------------------------------------------------------ */
export default function MarketplacePage() {
  const [tab, setTab] = useState<"market" | "cases" | "inv" | "other">("market");

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* tabs */}
      <nav className="flex gap-6 border-b border-gray-800 pb-3">
        <Tab id="market" label="Marketplace" active={tab} set={setTab} />
        <Tab id="cases"  label="Cases"        active={tab} set={setTab} />
        <Tab id="inv"    label="My inventory" active={tab} set={setTab} />
        <Tab id="other"  label="Other"        active={tab} set={setTab} />
      </nav>

      {tab === "market" && <MarketView />}
      {tab === "cases"  && <CasesView />}
      {tab === "inv"    && <InventoryView />}
      {tab === "other"  && <OtherView />}
    </div>
  );
}

/* ─── Helper ─────────────────────────────────────────────────────── */
function Tab({
  id,
  label,
  active,
  set,
}: {
  id: any;
  label: string;
  active: any;
  set: (v: any) => void;
}) {
  return (
    <button
      onClick={() => set(id)}
      className={clsx(
        "pb-1 text-sm font-medium",
        active === id
          ? "border-b-2 border-primary text-primary"
          : "text-gray-400 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  1 / MARKETPLACE GRID                                              */
/* ------------------------------------------------------------------ */
function MarketView() {
  const [game, setGame]   = useState("All");
  const [min, setMin]     = useState("");
  const [max, setMax]     = useState("");

  const filtered = ITEMS.filter((i) => {
    if (game !== "All" && i.game !== game) return false;
    if (min && i.price < +min) return false;
    if (max && i.price > +max) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* filter bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <select value={game} onChange={(e) => setGame(e.target.value)} className="bg-gray-800 px-3 py-1.5 rounded text-sm">
          {["All","Dota 2","CS2","LoL"].map((g)=> <option key={g}>{g}</option>)}
        </select>
        <input value={min} onChange={(e)=>setMin(e.target.value)} placeholder="min" className="w-24 bg-gray-800 rounded px-2 py-1.5 text-sm"/>
        <span className="text-gray-500 text-sm">—</span>
        <input value={max} onChange={(e)=>setMax(e.target.value)} placeholder="max" className="w-24 bg-gray-800 rounded px-2 py-1.5 text-sm"/>
        <Search className="w-5 h-5 text-gray-400 ml-2" />
      </div>

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((it) => (
          <div key={it.id} className="bg-gray-800/70 p-4 rounded-xl space-y-2">
            <p className="font-medium text-sm">{it.name}</p>
            <p className="text-gray-400 text-xs">{it.game}</p>
            <p className="text-primary font-semibold text-sm">{it.price.toLocaleString()} WP</p>
            <button className="mt-2 w-full bg-primary/80 hover:bg-primary px-3 py-1.5 rounded text-sm">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2 / CASES VIEW                                                    */
/* ------------------------------------------------------------------ */
function CasesView() {
  const [open, setOpen] = useState<string | null>(null);
  const [trade, setTrade] = useState(false);

  return (
    <div className="space-y-6">
      {/* case list */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => setOpen(open === c.id ? null : c.id)}
            className={clsx(
              "bg-gray-800/70 p-6 rounded-2xl flex flex-col items-center hover:bg-gray-700 transition space-y-3",
              open === c.id && "ring-2 ring-primary"
            )}
          >
            <Box className="w-10 h-10 text-primary" />
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-400">{c.price.toLocaleString()} WP</p>
          </button>
        ))}
      </div>

      {/* case detail */}
      {open && (
        <div className="bg-gray-800/70 rounded-xl p-6 space-y-4 shadow-inner-md">
          <h3 className="font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> {CASES.find(x=>x.id===open)?.name} details
          </h3>
          <p className="text-sm text-gray-300">
            Chances: {CASES.find((x) => x.id === open)?.chance}. Tier-1 items are valued at &gt;10 000 WP.
          </p>
          <button className="bg-primary/80 hover:bg-primary px-4 py-2 rounded text-sm">
            Open for {CASES.find((x) => x.id === open)?.price.toLocaleString()} WP
          </button>
          <button onClick={()=>setTrade(true)} className="ml-4 text-sm text-primary hover:underline">
            Trade-up →
          </button>
        </div>
      )}

      {/* trade-up modal */}
      {trade && (
        <Modal onClose={() => setTrade(false)}>
          <h3 className="font-semibold mb-4">Trade-up</h3>
          <p className="text-sm text-gray-300 mb-4">
            Exchange <span className="font-medium">10 Tier-4</span> items for <span className="font-medium">1 Tier-3</span> item.
          </p>
          <button className="w-full bg-primary/80 hover:bg-primary px-4 py-2 rounded text-sm flex items-center justify-center gap-2">
            Confirm <ArrowRight className="w-4 h-4" />
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3 / INVENTORY VIEW                                                */
/* ------------------------------------------------------------------ */
function InventoryView() {
  const [sel, setSel] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-800">
          <tr><th className="py-2 text-left">Item</th><th>Game</th><th className="text-right">Price (WP)</th></tr>
        </thead>
        <tbody>
          {ITEMS.map((it) => (
            <tr key={it.id} onClick={()=>setSel(it.id)} className="border-b border-gray-900/30 hover:bg-gray-800/40 cursor-pointer">
              <td className="py-2">{it.name}</td>
              <td>{it.game}</td>
              <td className="text-right">{it.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* item action modal */}
      {sel && (
        <Modal onClose={() => setSel(null)}>
          <h3 className="font-semibold mb-4">{ITEMS.find(x=>x.id===sel)?.name}</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-800/70 rounded hover:bg-gray-800">
              <DollarSign className="w-4 h-4" /> Sell (set price)
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-800/70 rounded hover:bg-gray-800">
              <DollarSign className="w-4 h-4" /> Fast-sell (–5 %)
            </button>
            <button disabled className="w-full flex items-center gap-2 px-4 py-2 bg-gray-800/70 rounded text-gray-500 cursor-not-allowed">
              <Upload className="w-4 h-4" /> Transfer to Steam
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4 / OTHER VIEW                                                    */
/* ------------------------------------------------------------------ */
function OtherView() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {["Double-XP Booster","Seasonal Avatar Pack","Chat Flair"].map((n)=>(
        <div key={n} className="bg-gray-800/70 rounded-xl p-6 flex flex-col items-center gap-3">
          <Package className="w-10 h-10 text-primary" />
          <p className="font-medium">{n}</p>
          <button className="bg-primary/80 hover:bg-primary px-4 py-1.5 rounded text-sm">Buy</button>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal helper                                                      */
/* ------------------------------------------------------------------ */
function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-900 max-w-sm w-full p-6 rounded-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
