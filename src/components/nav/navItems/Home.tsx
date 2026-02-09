"use client";
import Link from "next/link";
import { Home as HomeIcon } from "lucide-react";

import { useNavContext } from "@/components/nav/NavigationProvider";
import NavButton from "@/ui/nav/NavButton";

export default function Home() {
  const { setActiveId } = useNavContext();
  return (
    <span
      onClick={() => {
        setActiveId(null);
      }}
      className="active:scale-110"
    >
      <Link href="/">
        <NavButton Icon={HomeIcon} label="Home" />
      </Link>
    </span>
  );
}
