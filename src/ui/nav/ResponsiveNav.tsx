import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

import { cn, onMd } from "@/lib/styleUtils";

import NavItem from "./NavItem";

export default function ResponsiveNav() {
  const mobileStyles = "w-full h-14 bg-white border-t border-gray-200 flex items-center justify-around px-2 pb-safe";

  const desktopStyles = onMd(
    `w-max h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mb-8 justify-center items-center gap-4 px-6 pb-0 shadow-2xl`,
  );

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
