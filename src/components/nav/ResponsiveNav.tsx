"use client";

import { useState } from "react";
import { cn } from "@/lib/styleUtils";
import NavItem from "@/ui/nav/NavItem";
import { Home, Search, User, FolderTree, PlusSquare, HelpCircle, LucideIcon } from "lucide-react";

const ICON_MAP: { [keys: string]: LucideIcon } = {
  Home: Home,
  Search: Search,
  User: User,
  FolderTree: FolderTree,
  PlusSquare: PlusSquare,
};
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

interface ResponsiveNavProps {
  navItemInfos: { Icon: string; label: string; Content?: React.ReactNode }[];
}

export default function ResponsiveNav({ navItemInfos }: ResponsiveNavProps) {
  const [ActiveItem, setActiveItem] = useState<string | null>("home");

  const activeHandler = (label: string) => {
    if (ActiveItem === label) {
      setActiveItem(null);
    } else {
      setActiveItem(label);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className={cn("pointer-events-auto transition-all duration-300 ease-in-out", mobileStyles, desktopStyles)}>
          {navItemInfos.map(({ Icon, label, Content }) => {
            const icon = ICON_MAP[Icon] || HelpCircle;
            return (
              <span
                key={label}
                onClick={() => {
                  activeHandler(label);
                }}
              >
                <NavItem Icon={icon} label={label} isActive={ActiveItem === label}>
                  {Content}
                </NavItem>
              </span>
            );
          })}
        </nav>
      </div>
    </>
  );
}
