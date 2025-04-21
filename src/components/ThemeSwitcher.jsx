import React, { useEffect } from "react";
import {  FaSun } from "react-icons/fa";
import { GoMoon } from "react-icons/go";
import AboutPage from "../pages/AboutPage";
import { useTheme } from "../context/ThemeContext";
const ThemeSwitcher = () => {
  const{theme,setTheme}=useTheme();

console.log(theme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  },);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
  
    
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 text-base-content cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <GoMoon className="text-3xl" />
      ) : (
        <FaSun className="text-3xl" />
      )}
    </button>


  

  );
};

export default ThemeSwitcher;
