import { useState } from "react";
import { IMAGES } from "../../assets";
import { FaTiktok, FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    // Simulate successful subscription
    toast.success("Thank you! You have been subscribed to our newsletter.");
    setEmail("");
  };

  const socials = [
    { icon: FaTiktok, color: "text-black hover:text-black", hoverBg: "hover:bg-slate-100", url: "#" },
    { icon: FaInstagram, color: "text-[#E1306C] hover:text-[#E1306C]", hoverBg: "hover:bg-pink-50", url: "#" },
    { icon: FaFacebookF, color: "text-[#1877F2] hover:text-[#1877F2]", hoverBg: "hover:bg-blue-50", url: "#" },
    { icon: FaPinterestP, color: "text-[#BD081C] hover:text-[#BD081C]", hoverBg: "hover:bg-red-50", url: "#" },
    { icon: FaYoutube, color: "text-[#FF0000] hover:text-[#FF0000]", hoverBg: "hover:bg-red-50", url: "#" }
  ];

  const links = [
    { name: "Features", url: "#features" },
    { name: "How It Works", url: "#how-it-works" },
    { name: "FAQ", url: "#faq" },
    { name: "Contact", url: "#contact" },
    { name: "Terms & Conditions", url: "#" }
  ];

  return (
    <footer className="w-full bg-white pt-16 pb-8 select-none border-t border-slate-100">
      <div className="px-6 md:px-12 lg:px-24 flex flex-col">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-12">
          
          {/* Column 1: Logo, Description & Socials */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src={IMAGES.logo}
                alt="ExcelIM Logo"
                className="h-14 md:h-20 w-auto object-contain"
              />
            </div>
            {/* Description */}
            <p className="text-[#47515E] text-sm leading-relaxed font-medium max-w-md roboto">
              ExcellIM Is An AI-Powered Quiz Generation Platform That Helps Educators And Institutions Transform Exam Papers Into Interactive Quizzes, Automate Assessments, And Track Student Performance With Ease.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    className={`w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 ${social.hoverBg}`}
                  >
                    <Icon className={`w-4 h-4 ${social.color}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="lg:col-span-3 flex flex-col items-start text-left gap-5">
            {/* Title with Underline */}
            <div>
              <h4 className="font-bold text-lg text-[#082042] lora tracking-wide">
                Link
              </h4>
              <div className="w-9 h-[2px] bg-[#082042] mt-1" />
            </div>
            {/* Links list */}
            <ul className="flex flex-col gap-3.5">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-[#47515E] hover:text-[#1C398E] font-medium text-sm transition-colors duration-200 roboto"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="lg:col-span-4 flex flex-col items-start text-left gap-5 w-full">
            {/* Title with Underline */}
            <div>
              <h4 className="font-bold text-lg text-[#082042] lora tracking-wide">
                Stay in the know
              </h4>
              <div className="w-16 h-[2px] bg-[#FF7A59] mt-1" />
            </div>
            {/* Description */}
            <p className="text-[#47515E] text-sm leading-relaxed font-medium roboto">
              Stay Updated With The Latest Features, Product Updates, And AI-Powered Learning Insights Delivered Directly To Your Inbox.
            </p>
            {/* Input Form */}
            <form onSubmit={handleSubscribe} className="flex items-center bg-[#F0F4FA] border border-[#E2E8F0] p-1.5 rounded-xl w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 w-full roboto focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#082042] hover:bg-[#1C398E] text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors shrink-0 roboto active:scale-95 duration-150"
              >
                Send
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Divider & Copyright */}
        <div className="border-t border-slate-100 w-full pt-8 flex justify-center items-center">
          <p className="text-[#47515E]/70 text-xs md:text-sm font-medium roboto">
            &copy; 2026 ExcellIM. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
