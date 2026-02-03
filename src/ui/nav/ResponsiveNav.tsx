import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

import { cn } from "@/lib/styleUtils";

import NavItem from "./NavItem";

export default function ResponsiveNav() {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav className={cn("pointer-events-auto transition-all duration-300 ease-in-out", mobileStyles, desktopStyles)}>
        {/* 아이콘 리스트 */}
        <NavItem icon={<Home />} label="홈" />
        <NavItem icon={<Search />} label="검색" />
        <NavItem icon={<PlusSquare />} label="등록" />
        <NavItem icon={<Heart />} label="알림" />
        <NavItem icon={<User />} label="내 정보" />
      </nav>
    </div>
  );
}
