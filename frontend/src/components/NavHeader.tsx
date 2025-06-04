import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = ["Home", "Jobs", "Profile", "About", "Contact"];

const pathToTab: Record<string, string> = {
  "/": "Home",
  "/jobs": "Jobs",
  "/profile": "Profile",
  "/about": "About",
  "/contact": "Contact",
};

interface NavHeaderProps {
  mobile?: boolean;
}

const NavHeader: React.FC<NavHeaderProps> = ({ mobile = false }) => {
  const [position, setPosition] = useState({ left: 0, width: 0 });
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const navigate = useNavigate();
  const location = useLocation();

  const updatePosition = (element: HTMLLIElement) => {
    setPosition({ left: element.offsetLeft, width: element.offsetWidth });
  };

  const handleTabClick = (tab: string) => {
    navigate(tab === "Home" ? "/" : `/${tab.toLowerCase()}`);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedTab = pathToTab[currentPath];
    setActiveTab(matchedTab);

    // Delay to ensure refs are ready
    setTimeout(() => {
      const el = matchedTab && tabRefs.current[matchedTab];
      if (el) updatePosition(el);
    }, 0);
  }, [location.pathname]);

  return (
    <div className={`relative ${mobile ? "w-full" : "flex items-center justify-center w-full py-4"}`}>
      <div className={`flex justify-center ${mobile ? "w-full" : "w-full"}`}>
        <ul className={`relative flex ${mobile ? "flex-col gap-2 w-full" : "w-fit rounded-full border-2 border-neutral p-1"}`}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              ref={(el) => {
                if (el) tabRefs.current[tab] = el;
              }}
              isActive={activeTab === tab}
              onClick={() => {
                handleTabClick(tab);
                if (mobile) {
                  // Close mobile menu after navigation if on mobile
                  const navEvent = new CustomEvent("closeMobileMenu");
                  window.dispatchEvent(navEvent);
                }
              }}
              mobile={mobile}
            >
              {tab}
            </Tab>
          ))}
          {activeTab && !mobile && <Cursor position={position} />}
        </ul>
      </div>
    </div>
  );
};

const Tab = React.forwardRef<HTMLLIElement, { children: string; isActive: boolean; onClick: () => void; mobile?: boolean }>(
  ({ children, isActive, onClick, mobile = false }, ref) => (
    <li
      ref={ref}
      onClick={onClick}
      className={`relative z-10 block cursor-pointer ${
        mobile
          ? `px-4 py-3 text-base ${isActive ? "bg-neutral text-primary-content font-bold" : "text-base-content"}`
          : `px-3 py-1.5 text-xs md:px-5 md:py-3 md:text-base ${
              isActive ? "text-primary-content font-bold" : "text-base-content"
            }`
      } transition-colors duration-200`}
    >
      {children}
    </li>
  )
);

const Cursor: React.FC<{ position: { left: number; width: number } }> = ({ position }) => (
  <motion.div
    layout
    animate={{ left: position.left, width: position.width }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="absolute z-0 h-7 md:h-12 rounded-full bg-neutral"
    style={{ pointerEvents: "none" }}
  />
);

export default NavHeader;
