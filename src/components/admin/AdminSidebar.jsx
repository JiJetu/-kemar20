import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { ICONS, IMAGES } from "../../assets";
import { logout } from "../../redex/features/auth/auth.slice";

const navItems = [
  {
    name: "Overview",
    path: "/admin",
    icon: Home,
  },
  {
    name: "Student",
    path: "/admin/student",
    iconImage: ICONS.studentIcons,
  },
  {
    name: "Upload Exam",
    path: "/admin/upload-quiz-pdf",
    iconImage: ICONS.uploadIcons,
  },
  {
    name: "Quiz",
    path: "/admin/quiz",
    iconImage: ICONS.quizIcons,
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
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#082042] text-white flex flex-col h-full select-none p-5 border-r border-[#102d58] roboto">
      {/* Brand Logo */}
      <div className="flex justify-center py-6 border-b border-[#102d58] mb-8">
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
                  ? "bg-[#66A331] text-white shadow-md shadow-[#66A331]/25"
                  : "text-slate-300 hover:bg-[#102d58] hover:text-white"
              }`}
            >
              {Icon ? (
                <Icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
                />
              ) : (
                <img
                  src={item.iconImage}
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
      <div className="pt-6 border-t border-[#102d58] mt-auto">
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
