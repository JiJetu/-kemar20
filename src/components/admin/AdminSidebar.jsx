import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home, Settings, LogOut, CreditCard } from "lucide-react";
import { ICONS, IMAGES } from "../../assets";
import { logout } from "../../redex/features/auth/auth.slice";
import { baseApi } from "../../redex/api/base.api";

const navItems = [
  {
    name: "Overview",
    path: "/admin",
    icon: Home,
  },
  {
    name: "Student",
    path: "/admin/student",
    iconImage: ICONS.studentIconscolr,
    hoverImage: ICONS.studentIconscolr,
  },
  {
    name: "Upload Exam",
    path: "/admin/upload-quiz",
    iconImage: ICONS.uploadIconscolr,   
    hoverImage: ICONS.uploadIconscolr,
  },
  {
    name: "Quiz",
    path: "/admin/quiz",
    iconImage: ICONS.quizIconscolr,
    hoverImage: ICONS.quizIconscolr,
  },
  {
    name: "Subscriptions",
    path: "/admin/subscriptions",
    icon: CreditCard,
  },
  {
    name: "Setting",
    path: "/admin/setting",
    icon: Settings,
  },
];

export default function AdminSidebar({ onCloseMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#0A2648] text-white flex flex-col h-full select-none p-5 roboto">
      {/* Brand Logo */}
      <div className="flex justify-center py-6 border-b border-[#66A331] mb-8">
        <Link
          to="/admin"
          className="block focus:outline-none"
          onClick={onCloseMobile}
        >
          <img
            src={IMAGES.logo}
            alt="ExcelJM Logo"
            className="w-24 h-auto object-contain drop-shadow-md"
          />
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onCloseMobile}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all duration-200 text-lg ${
                isActive
                  ? "bg-[#66A331] text-white shadow-md shadow-secondary/25"
                  : "text-white"
              }`}
            >
              {Icon ? (
                <Icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-white"}`}
                />
              ) : (
                <img
                  src={isActive ? item.hoverImage : item.iconImage}
                  alt={item.name}
                  className="w-5 h-5 shrink-0"
                />
              )}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Log Out Section */}
      <div className="pt-6 border-t border-[#66A331] mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/60 bg-transparent hover:bg-red-500/5 text-red-500 hover:text-red-400 py-3 rounded-xl font-semibold transition-all text-sm"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
