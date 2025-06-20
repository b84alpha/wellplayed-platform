// src/pages/MainCupPage.tsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Trophy, Users, MapPin } from "lucide-react";

const PANELS = [
  {
    img: "/src/assets/main-cup/garage.jpg",
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Form Your Squad",
    copy:
      "Grab four friends or jump in as a mercenary. Every legend starts somewhere.",
  },
  {
    img: "/src/assets/main-cup/ladder.jpg",
    icon: <Flame className="w-8 h-8 text-primary" />,
    title: "Climb the Ladder",
    copy:
      "Weekly fast-cups and weekend majors feed points into the seasonal leaderboard.",
  },
  {
    img: "/src/assets/main-cup/map.jpg",
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Regional Main-Cup",
    copy:
      "All registered teams from each region&game will play between each other. This Main even will end the season."
  },
  {
    img: "/src/assets/main-cup/trophy.jpg",
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Become Pro",
    copy:
      "For the win in finals, apart from prizes, some teams earn a full-pro contract, boot-camp support, and sponsorship.",
  },
];

export default function MainCupPage() {
  return (
    <div className="relative h-full overflow-y-scroll snap-y snap-mandatory">
      {PANELS.map((p, i) => (
        <section
          key={i}
          className="snap-start min-h-screen w-full relative flex items-center justify-center"
        >
          {/* background */}
          <img
            src={p.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center scale-110 md:scale-100 opacity-40"
          />

          {/* vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />

          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative max-w-xl text-center space-y-4 p-6"
          >
            <div className="flex justify-center">{p.icon}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold">{p.title}</h2>
            <p className="text-gray-300 text-lg">{p.copy}</p>
          </motion.div>
        </section>
      ))}

      {/* sticky CTA button */}
      <div className="fixed bottom-6 right-6 z-50">
        <NavLink
          to="/tournaments"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold shadow-lg animate-bounce-slow"
        >
          Captain: Register Your Team
        </NavLink>
      </div>
    </div>
  );
}
