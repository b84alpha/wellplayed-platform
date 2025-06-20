import { useParams } from "react-router-dom";

export default function GameDetailsPage() {
  const { id } = useParams();
  const map: Record<string, { title: string; about: string }> = {
    dota2: {
      title: "Dota 2",
      about: "Dota 2 is Valve’s flagship MOBA. Wellplayed runs ranked 5v5 leagues each season across all regions, culminating in a playoff."
    },
    cs2: {
      title: "Counter-Strike 2",
      about: "Fast-paced tactical FPS. Compete in 5v5 ladders, weekly cups, and seasonal majors. KD, DPR & APR tracked on leaderboards."
    },
    lol: {
      title: "League of Legends",
      about: "The world’s most-played MOBA. Supports + Core dual-ladder. Compete in leagues, climb to the Main Cup."
    }
  };
  const game = map[id ?? ""] ?? { title: "Unknown", about: "…" };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{game.title}</h1>
      <p className="text-gray-300 max-w-2xl">{game.about}</p>
    </div>
  );
}
