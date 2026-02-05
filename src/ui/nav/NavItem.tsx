import Link from "next/link";
import clsx from "clsx";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  href?: string;
  onClick?: () => void;
}

export default function NavItem({ icon, label, isActive, href, onClick }: NavItemProps) {
  const className = "group relative flex flex-col items-center justify-center p-2";
  const iconStyles =
    "w-6 h-6 text-gray-800 transition-transform group-hover:scale-110 md:w-8 md:h-8 md:text-black flex items-center justify-center";
  const activeIconStyles = "text-red-500 scale-200 group-hover:scale-200";

  const content = (
    <>
      <div className={clsx(iconStyles, isActive && activeIconStyles)}>{icon}</div>
      <span className="sr-only">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}
