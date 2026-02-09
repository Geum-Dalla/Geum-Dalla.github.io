import { useMemo, useState } from "react";
import { FolderItem, isFolderItem } from "@/lib/articles/types";
import Column from "@/ui/nav/article/Column";

interface FileTreeProps {
  RootFolderItem: FolderItem;
}

// TODO: 아주 깊은 폴더가 있다면?
// TODO: 모바일에선 어떻게 표현할 것인가?

export default function FileTree({ RootFolderItem }: FileTreeProps) {
  const [selectedByFolderId, setSelectedByFolderId] = useState<Record<string, string>>({}); // 모든 폴더의 열림/닫힘 상태를 저장함

  // 폴더의 전체 경로를 배열로 저장함 Root -> topic -> ... -> subtopic 으로 연결
  const columns = useMemo(() => {
    const cols: FolderItem[] = [];
    let current: FolderItem = RootFolderItem;
    cols.push(current);

    while (current) {
      const selectedChildId = selectedByFolderId[current.id];
      if (!selectedChildId) break;

      const next = current.children.find((n) => isFolderItem(n) && n.id === selectedChildId) as FolderItem | undefined;

      if (!next) break;

      cols.push(next);
      current = next;
    }

    return cols;
  }, [RootFolderItem, selectedByFolderId]);

  const handleFolderClick = (parentFolder: FolderItem, childFolder: FolderItem) => {
    setSelectedByFolderId((prev) => {
      const current = prev[parentFolder.id];
      if (current === childFolder.id) {
        const next = { ...prev };
        delete next[parentFolder.id];
        return next;
      }
      return { ...prev, [parentFolder.id]: childFolder.id };
    });
  };

  return (
    <div className="flex gap-0 h-100 overflow-hidden">
      {columns.map((folder, colIndex) => {
        const isActiveColumn = colIndex === columns.length - 1;

        return (
          <div key={folder.id} className={`border border-zinc-200`}>
            <Column
              folder={folder}
              selectedId={selectedByFolderId[folder.id]}
              onFolderClick={handleFolderClick}
              isActiveColumn={isActiveColumn}
            />
          </div>
        );
      })}
    </div>
  );
}
