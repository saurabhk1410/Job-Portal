import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import NavHeader from "./NavHeader";
import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiCodecrafters } from "react-icons/si";
import { FaRegBookmark } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { VscGitStashApply } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const [isUser, setIsUser] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    // Check user auth
    axios.get("http://localhost:5000/api/auth/check", { withCredentials: true })
      .then(res => setIsUser(res.data.isAuthenticated))
      .catch(() => setIsUser(false));
    // Check admin auth
    axios.get("http://localhost:5000/api/admin/auth/check", { withCredentials: true })
      .then(res => setIsAdmin(res.data.isAuthenticated))
      .catch(() => setIsAdmin(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/logout', {}, { withCredentials: true });
    } catch (err) {}
    window.location.href = '/admin/login';
  };

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
          {isAdmin ? (
            <button onClick={handleAdminLogout} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">Logout</button>
          ) : isUser ? (
            <>
              {/* Applied Jobs Tooltip */}
              <div className="tooltip tooltip-bottom" data-tip="Applied Jobs">
                <div className="relative cursor-pointer" onClick={() => navigate("/appliedjobs")}>
                  <VscGitStashApply className="text-xl md:text-3xl" />
                </div>
              </div>

              {/* Saved Jobs Tooltip */}
              {/* <div className="tooltip tooltip-bottom" data-tip="Saved Jobs">
                <div className="relative cursor-pointer" onClick={() => navigate("/savedjobs")}>
                  <FaRegBookmark className="text-xl md:text-3xl" />
                </div>
              </div> */}

              {/* <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
                <FaBell className="text-xl md:text-3xl" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
                  5
                </span>
              </div> */}

              {/* Profile Tooltip */}
              <div className="tooltip tooltip-bottom" data-tip="Profile">
                <div className="relative cursor-pointer" onClick={() => navigate("/profile")}>
                  <FaUser className="text-xl md:text-3xl" />
                </div>
              </div>

              {/* Logout Tooltip */}
              <div className="tooltip tooltip-bottom" data-tip="Logout">
                <div className="relative cursor-pointer" onClick={handleLogout}>
                  <FaSignOutAlt className="text-xl md:text-3xl" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Sign Up
              </Link>
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full z-40 backdrop-blur bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(23,23,23,0.8)] md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2">
            <NavHeader mobile />
            {!user && !isAdmin && (
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {isAdmin && (
              <button onClick={handleAdminLogout} className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">Logout</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;