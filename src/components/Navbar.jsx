import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import NavHeader from "./NavHeader";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiCodecrafters } from "react-icons/si";
import { FaRegBookmark } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { VscGitStashApply } from "react-icons/vsc";


// const profilePhoto = localStorage.getItem("profilePhoto");

const Navbar = () => {
  return (
    <nav className=" fixed top-0 left-0 w-full z-50 backdrop-blur bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(23,23,23,0.4)] pt-1 md:px-8 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to={"/"} className="font-mono text-4xl flex items-center gap-4 font-bold">
         <SiCodecrafters/>CodeRound
        </Link>
      </div>
        <NavHeader />
      <div className="flex items-center gap-8">
        <div className="relative">
        <VscGitStashApply className="text-3xl" />
          {/* <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
            5
          </span> */}
        </div>
        <div className="relative">
          <FaRegBookmark className="text-3xl" />
          {/* <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
            5
          </span> */}
        </div>
        <div className="relative">
          <FaBell className="text-3xl" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
            5
          </span>
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
