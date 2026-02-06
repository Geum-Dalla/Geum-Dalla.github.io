"use client";

import { FolderClosed, FolderOpen } from "lucide-react";

import NavButton from "@/ui/nav/NavButton";
import { useNavContext } from "@/components/nav/NavigationProvider";
import { TreeNode } from "@/lib/articles/types";

export default function Article({ FolderTree }: { FolderTree: TreeNode }) {
  const { activeId, setActiveId } = useNavContext();
  console.log(FolderTree);
  const state = activeId === "Article";
  return (
    <span
      onClick={() => {
        if (activeId === "Article") setActiveId(null);
        else setActiveId("Article");
      }}
    >
      <NavButton Icon={state ? FolderOpen : FolderClosed} label="Home" isActive={state} />
    </span>
  );
}

// {Content && (
//   <div
//     className={`
//       absolute bottom-15 left-1/2 -translate-x-1/2 w-max
//       bg-blue-500 rounded px-2 py-1
//       transition-transform duration-200 ease-out origin-bottom
//       ${
//         isActive
//           ? "opacity-100 visible scale-100 translate-y-0" // 활성: 원래 크기, 원래 위치
//           : "opacity-0 invisible scale-0 translate-y-4 pointer-events-none" // 비활성: 작아지고, 약간 아래로, 클릭 방지
//       }
//     `}
//   ></div>
// )}
