import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";

function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-[#020b1e] text-white flex flex-col p-4 sm:p-6 font-sans">
      <Header />
      <main className="flex-1 w-full py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
