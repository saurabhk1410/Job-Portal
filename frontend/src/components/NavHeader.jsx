import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavHeader = ({ mobile }) => {
  const { user } = useAuth();
  const navItems = [
    { name: "Home", path: "/" },
    ...(user ? [{ name: "Jobs", path: "/jobs" }] : []),
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className={`flex ${mobile ? 'flex-col' : 'flex-row'} gap-4 md:gap-8`}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavHeader; 