"use client";

import { Home } from "lucide-react";

import { useNavContext } from "@/components/nav/Navigation";
import NavItem from "@/ui/nav/NavItem";
import Link from "next/link";

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
        <NavItem Icon={Home} label="Home" />
      </Link>
    </span>
  );
}
