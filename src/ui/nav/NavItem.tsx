import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  Icon: LucideIcon;
  label: string;
  isActive: boolean;
  Content: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function NavItem({ Icon, label, isActive, Content }: NavItemProps) {
  const iconStyles = `
  w-6 h-6 text-gray-800 transition-transform duration-200 ease-out group-hover:scale-140
  md:w-8 md:h-8 md:text-black flex items-center justify-center
  `;
  const activedIconStyles = "scale-200 group-hover:scale-200";

  const content = (
    <>
      <div className={clsx(iconStyles, isActive && activedIconStyles)}>
        <Icon color={isActive ? "red" : "black"} />
      </div>
      <span className="sr-only">{label}</span>
    </>
  );

  return (
    <div className="relative">
      {Content && (
        <div
          className={`
            absolute bottom-15 left-1/2 -translate-x-1/2 w-max
            bg-blue-500 rounded px-2 py-1
            transition-transform duration-200 ease-out origin-bottom
            ${
              isActive
                ? "opacity-100 visible scale-100 translate-y-0" // 활성: 원래 크기, 원래 위치
                : "opacity-0 invisible scale-0 translate-y-4 pointer-events-none" // 비활성: 작아지고, 약간 아래로, 클릭 방지
            }
          `}
        >
          {Content}
        </div>
      )}
      <button className="group relative flex flex-col items-center justify-center p-2">{content}</button>
    </div>
  );
}
