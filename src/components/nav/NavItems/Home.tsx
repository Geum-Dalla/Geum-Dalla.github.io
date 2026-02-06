"use client";
import Link from "next/link";
import { Home } from "lucide-react";

import { useNavContext } from "@/components/nav/NavigationProvider";
import NavButton from "@/ui/nav/NavButton";

export default function HomeButton() {
  const { setActiveId } = useNavContext();
  return (
    <span
      onClick={() => {
        setActiveId(null);
      }}
      className="active:scale-110"
    >
      <Link href="/">
        <NavButton Icon={Home} label="Home" />
      </Link>
    </span>
  );
}
