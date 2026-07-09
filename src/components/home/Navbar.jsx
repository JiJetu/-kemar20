import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { IMAGES } from "../../assets";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Features", path: "#features" },
    { name: "How It Works", path: "#how-it-works" },
    { name: "About Us", path: "#about" },
    { name: "FAQ", path: "#faq" },
    { name: "Contact Us", path: "#contact" },
  ];

  const handleScroll = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = path.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-40 bg-transparent select-none">
      <div className="px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={IMAGES.logo} alt="ExcelJM Logo" className="h-16 w-auto object-contain" />
        </Link>

        {/* Center menu links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className="text-slate-600 font-bold hover:text-[#082042] transition-colors text-base nunito"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right action buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="border border-[#092449] text-[#092449] transition-colors px-8 py-3 rounded-[6px] text-sm font-bold shadow-sm nunito leading-none"
          >
            Log In
          </Link>
          {/* <Link
            to="/signup"
            className="btn-gradient text-white transition-all px-6 py-2 rounded-[6px] text-sm font-bold shadow-sm nunito leading-none"
          >
            Get Started
          </Link> */}
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className="text-slate-600 font-semibold hover:text-[#082042] transition-colors text-sm py-1.5 border-b border-slate-50 nunito text-left"
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center border border-[#092449] text-[#092449] transition-colors py-2.5 rounded-[6px] text-sm font-bold shadow-sm nunito"
            >
              Log In
            </Link>
            {/* <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center btn-gradient text-white py-2.5 rounded-[6px] text-sm font-bold shadow-sm nunito"
            >
              Get Started
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
}
