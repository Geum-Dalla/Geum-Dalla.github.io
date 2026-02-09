"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

const iconStyles = `
  w-6 h-6 text-gray-800 transition-transform duration-200 ease-out group-hover:scale-140
  md:w-8 md:h-8 md:text-black flex items-center justify-center
  `;
const activedIconStyles = "scale-200 group-hover:scale-200";

export interface NavItemProps {
  Icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavButton({ Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <div onClick={onClick}>
      <button className="group relative flex flex-col items-center justify-center p-2">
        <div className={clsx(iconStyles, isActive && activedIconStyles)}>
          {<Icon color={isActive ? "red" : "black"} />}
        </div>
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}
