import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import NavHeader from "./NavHeader";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiCodecrafters } from "react-icons/si";
import { FaRegBookmark } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { VscGitStashApply } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(23,23,23,0.4)] py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <MdClose /> : <FiMenu />}
          </button>
          <Link 
            to={"/"} 
            className="font-mono text-2xl md:text-4xl flex items-center gap-2 md:gap-4 font-bold"
          >
            <SiCodecrafters className="text-xl md:text-3xl" />
            <span className="hidden sm:inline">CodeRound</span>
          </Link>
        </div>
        
        <div className="hidden md:block">
          <NavHeader />
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="relative cursor-pointer" onClick={() => navigate("/appliedjobs")}>
            <VscGitStashApply className="text-xl md:text-3xl" />
          </div>
          <div className="relative cursor-pointer" onClick={() => navigate("/savedjobs")}>
            <FaRegBookmark className="text-xl md:text-3xl" />
          </div>
          <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
            <FaBell className="text-xl md:text-3xl" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
              5
            </span>
          </div>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full z-40 backdrop-blur bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(23,23,23,0.8)] md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2">
            <NavHeader mobile />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;