import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { IMAGES } from "../../assets";
import { useGetMeQuery } from "../../redex/features/auth/auth.api";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const displayName = useSelector((state) => state.auth.displayName);
  const token = useSelector((state) => state.auth.accessToken);

  // Future-ready API call (skipped if token is not available)
  const { data: profile } = useGetMeQuery(undefined, { skip: !token });

  // Mock fallbacks based on mockup image data
  const username = profile?.username || profile?.name || displayName || user?.email?.split("@")[0] || "Kemar20";
  const userRole = profile?.role || user?.role || "Super Admin";
  const avatarUrl = profile?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80";
  const description = profile?.description || "Author";
  const notificationsCount = profile?.notificationsCount ?? 4;

  return (
    <header className="w-full bg-[#001131] border border-[#192B4C] rounded-[20px] px-6 py-4 flex items-center justify-between shadow-lg select-none">
      {/* Left Section: Logo & Welcome Message */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={IMAGES.logo}
              alt="ExcelJM Logo"
              className="w-14 h-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform"
            />
          </Link>
        </div>
        
        <div className="flex flex-col text-left">
          <h1 className="text-lg sm:text-2xl font-bold text-white roboto flex items-center gap-2">
            Welcome Back, {username}! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium lato mt-0.5">
            Keep Practicing And Achieve Your Goals.
          </p>
        </div>
      </div>

      {/* Right Section: Notifications & User Profile */}
      <div className="flex items-center">
        {/* Notification Bell */}
        {/* <div className="relative cursor-pointer group p-1.5 rounded-full hover:bg-white/5 transition-colors">
          <Bell className="w-6 h-6 text-white transition-transform group-hover:scale-105" />
          {notificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center border border-[#001131]">
              {notificationsCount}
            </span>
          )}
        </div> */}

        {/* Vertical Separator */}
        <div className="h-8 w-px bg-[#192B4C] mx-4 sm:mx-5" />

        {/* Profile Details Link */}
        <Link
          to="/profile"
          className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <div className="flex-shrink-0">
            <img
              src={avatarUrl}
              alt={username}
              className="w-10 h-10 rounded-full border border-[#192B4C] object-cover drop-shadow-sm"
            />
          </div>
          
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-white tracking-wide roboto">
              {userRole}
            </span>
            <span className="text-xs text-slate-400 font-medium lato mt-0.5">
              {description}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
