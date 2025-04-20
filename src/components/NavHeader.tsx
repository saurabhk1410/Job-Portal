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

const NavHeader: React.FC = () => {
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
  }, [location.pathname]); // Trigger when path changes

  return (
    <div className="relative flex items-center justify-center w-full py-4">
      <div className="flex justify-center w-full">
        <ul className="relative flex w-fit rounded-full border-2 border-neutral p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              ref={(el) => {
                if (el) tabRefs.current[tab] = el;
              }}
              isActive={activeTab === tab}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Tab>
          ))}
          {activeTab && <Cursor position={position} />}
        </ul>
      </div>
    </div>
  );
};

const Tab = React.forwardRef<
  HTMLLIElement,
  { children: string; isActive: boolean; onClick: () => void }
>(({ children, isActive, onClick }, ref) => (
  <li
    ref={ref}
    onClick={onClick}
    className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase transition-colors duration-200 md:px-5 md:py-3 md:text-base
      ${isActive ? "text-primary-content font-bold" : "text-base-content"}`}
  >
    {children}
  </li>
));

const Cursor: React.FC<{ position: { left: number; width: number } }> = ({ position }) => (
  <motion.li
    animate={position}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="absolute z-0 h-7 md:h-12 rounded-full bg-neutral"
    style={{ pointerEvents: "none", width: position.width, left: position.left }}
  />
);

export default NavHeader;
