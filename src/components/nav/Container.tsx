import { Home, Search, PlusSquare, User, FolderTree } from "lucide-react";

import ResponsiveNav from "@/components/nav/ResponsiveNav";

import Content from "./article/Content";

export default function NavContainer() {
  const navItemInfos = [
    { Icon: "Home", label: "home" },
    { Icon: "FolderTree", label: "article", Content: <Content /> },
    { Icon: "Search", label: "search" },
    { Icon: "PlusSquare", label: "alarm" },
    { Icon: "User", label: "useInfo" },
  ];

  return <ResponsiveNav navItemInfos={navItemInfos} />;
}
