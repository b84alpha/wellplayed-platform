import { Outlet } from "react-router-dom";
import SideNav   from "../components/SideNav";
import RightNav  from "../components/RightNav";
import TopBar    from "../components/TopBar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-gray-200">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900/70 backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
      <RightNav />
    </div>
  );
}
