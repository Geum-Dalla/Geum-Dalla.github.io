"use client";

import { FolderClosed, FolderOpen } from "lucide-react";

import NavButton from "@/ui/nav/NavButton";
import { useNavContext } from "@/components/nav/NavigationProvider";
import { FolderItem } from "@/lib/articles/types";
import FileTree from "@/components/nav/navItems/article/FileTree";
import clsx from "clsx";

/*
컴포넌트 파일에서 할 수 있는 일

레이아웃 잡기 (flex, grid, gap-4)
위치 잡기 (relative, absolute, top-0)
크기 제한 (max-w-screen-md, h-screen)
배경색 (bg-gray-100 - 페이지 전체 배경 같은 경우)
*/
const basicFileTreeStyles = `
      absolute bottom-15 left-1/2 overflow-x-auto w-110 scrollbar-thin
      rounded
      transition-transform duration-200 ease-out origin-bottom max-md:-translate-x-1/2
`;
const openFileTreeStyles = "opacity-100 visible scale-100 translate-y-0"; // 활성: 원래 크기, 원래 위치
const closedFileTreeStyles = "opacity-0 invisible scale-0 translate-y-4 pointer-events-none"; // 비활성: 작아지고, 약간 아래로, 클릭 방지

export default function Article({ folderItem }: { folderItem: FolderItem }) {
  const { activeId, setActiveId } = useNavContext();
  const state = activeId === "Article";
  return (
    <span className="relative">
      <span className={clsx(basicFileTreeStyles, state ? openFileTreeStyles : closedFileTreeStyles)}>
        <FileTree RootFolderItem={folderItem} />
      </span>
      <NavButton
        Icon={state ? FolderOpen : FolderClosed}
        label="Home"
        isActive={state}
        onClick={() => {
          if (state) setActiveId(null);
          else setActiveId("Article");
        }}
      />
    </span>
  );
}
