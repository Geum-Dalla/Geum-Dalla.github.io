"use client";

import ResponsiveNav from "@/ui/nav/ResponsiveNav";
import { useState, createContext, useContext, PropsWithChildren } from "react";

type NavContextType = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function useNavContext() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNavContext must be used within ResponsiveNav");
  return ctx;
}

export default function NavigationProvider({ children }: PropsWithChildren) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <NavContext.Provider value={{ activeId, setActiveId }}>
      <ResponsiveNav>{children}</ResponsiveNav>
    </NavContext.Provider>
  );
}
