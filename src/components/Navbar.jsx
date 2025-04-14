import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import NavHeader from "./NavHeader";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="p-8 flex gap-6 items-center py-1 ">
      <img
        className="w-14 h-14 object-cover rounded-full border-2 border-primary cursor-pointer"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        alt="User avatar"
      />
      <NavHeader />
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaBell className="text-3xl " />
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
