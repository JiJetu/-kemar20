import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex overflow-hidden font-sans text-slate-800">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen sticky top-0 shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* Sidebar Drawer */}
          <div className="relative max-w-xs w-full bg-[#082042] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <AdminSidebar onCloseMobile={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <AdminHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 w-full p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
