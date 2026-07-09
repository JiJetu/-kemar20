import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../redex/features/profile/profile.api";

export default function AdminHeader({ onOpenSidebar }) {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);

  const { data: profile } = useGetMeQuery(undefined, { skip: !token });

  const avatarUrl = profile?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80";
  const userRole = profile?.role || user?.role || "Super Admin";
  const description = profile?.description || "Author";
  const notificationsCount = profile?.notificationsCount ?? 4;

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm select-none">
      {/* Left Section: Mobile Menu Trigger & Welcome Title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 roboto tracking-tight">
          Welcome Back
        </h1>
      </div>

      {/* Right Section: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        {/* <div className="relative cursor-pointer group p-1.5 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="w-6 h-6 text-slate-800 transition-transform group-hover:scale-105" />
          {notificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center border border-white">
              {notificationsCount}
            </span>
          )}
        </div> */}

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* Profile Link */}
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 hover:opacity-85 transition-opacity"
        >
          <img
            src={avatarUrl}
            alt={userRole}
            className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-sm"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-slate-900 tracking-wide roboto leading-tight">
              {userRole}
            </span>
            <span className="text-xs text-slate-500 font-medium lato mt-0.5 leading-none">
              {description}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
