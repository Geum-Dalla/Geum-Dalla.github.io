"use client";
import { Home, Search, PlusSquare, User, FolderTree } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/styleUtils";
import NavItem from "@/ui/nav/NavItem";

const mobileStyles = "w-full h-14 bg-white border-t border-gray-200 flex items-center justify-around px-2 pb-safe";

const desktopStyles = `
    md:w-max 
    md:h-20
    md:bg-white/10 md:backdrop-blur-xl md:border md:border-white/20 
    md:rounded-2xl 
    md:mb-8 
    md:justify-center
    md:items-center
    md:gap-4 
    md:px-6 md:pb-0
    md:shadow-2xl
  `;

const tempNavItems = [
  { icon: <Home />, label: "홈" },
  { icon: <FolderTree />, label: "글" },
  { icon: <Search />, label: "검색" },
  { icon: <PlusSquare />, label: "알림" },
  { icon: <User />, label: "내 정보" },
];

//TODO: NavItem은 주입받아서 렌더링
export default function ResponsiveNav() {
  const [ActiveItem, setActiveItem] = useState("home");

  return (
    <>
      {" "}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className={cn("pointer-events-auto transition-all duration-300 ease-in-out", mobileStyles, desktopStyles)}>
          {tempNavItems.map(({ icon, label }) => (
            <span key={label} onClick={() => setActiveItem(label)}>
              <NavItem icon={icon} label={label} isActive={ActiveItem === label} />
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
