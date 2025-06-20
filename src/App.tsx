import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout   from "./layouts/MainLayout";
import MainPage     from "./pages/MainPage";
import LeaguesPage  from "./pages/LeaguesPage";
import TournamentsPage from "./pages/TournamentsPage";
import MainCupPage  from "./pages/MainCupPage";
import MarketplacePage from "./pages/MarketplacePage";
import RewardsPage  from "./pages/RewardsPage";
import ProfilePage  from "./pages/ProfilePage";
import DocsPage     from "./pages/DocsPage";
import AboutPage    from "./pages/AboutPage";

/* ── onboarding steps ─────────────────────────────────────────────── */
import OnboardLayout   from "./onboarding/OnboardLayout";
import Step1Welcome    from "./onboarding/Step1Welcome";
import Step2Profile    from "./onboarding/Step2Profile";
import Step3Game       from "./onboarding/Step3Game";
import Step4Team       from "./onboarding/Step4Team";
import Step5Done       from "./onboarding/Step5Done";

export default function App() {
  return (
    <Routes>
      {/* ───────── Public site ───────────────────────────── */}
      <Route element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="leagues"      element={<LeaguesPage />} />
        <Route path="tournaments"  element={<TournamentsPage />} />
        <Route path="main-cup"     element={<MainCupPage />} />
        <Route path="marketplace"  element={<MarketplacePage />} />
        <Route path="rewards"      element={<RewardsPage />} />
        <Route path="profile"      element={<ProfilePage />} />
        <Route path="docs"         element={<DocsPage />} />
        <Route path="about"        element={<AboutPage />} />
      </Route>

      {/* ───────── On-boarding wizard ────────────────────── */}
      <Route path="onboard" element={<OnboardLayout />}>
        <Route index          element={<Step1Welcome />} />
        <Route path="profile" element={<Step2Profile />} />
        <Route path="game"    element={<Step3Game />} />
        <Route path="team"    element={<Step4Team />} />
        <Route path="done"    element={<Step5Done />} />
      </Route>

      {/* ───────── Fallback ─────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
