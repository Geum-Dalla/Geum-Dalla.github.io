import { FolderItem, isFolderItem, isFileItem } from "@/lib/articles/types";
import File from "./File";

interface ColumnProps {
  folder: FolderItem;
  selectedId?: string;
  onFolderClick: (parentFolderItem: FolderItem, childFolderItem: FolderItem) => void;
  isActiveColumn: boolean;
}

export default function Column({ folder, selectedId, onFolderClick, isActiveColumn }: ColumnProps) {
  return (
    <div
      className={`w-36 h-full
        ${isActiveColumn ? "bg-white ring-1 ring-blue-300" : "bg-zinc-50"}`}
    >
      <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide border-b border-zinc-200">
        {folder.name}
      </div>

      {folder.children.length === 0 ? (
        <div className="px-3 py-4 text-sm text-zinc-400 italic">비어 있는 폴더입니다</div>
      ) : (
        <ul className="divide-y divide-zinc-200 overflow-scroll h-95 pb-5 scrollbar-thin">
          {folder.children.map((item) => {
            if (isFolderItem(item)) {
              const active = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors
                      ${active ? "bg-blue-500 text-white" : "text-zinc-800 hover:bg-blue-50"}`}
                    onClick={() => onFolderClick(folder, item)}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`${active ? "text-white" : "text-amber-500"}`}>📁</span>
                      {item.name}
                    </span>
                    <span className={`${active ? "text-white" : "text-zinc-400"} pl-0.5`}>›</span>
                  </button>
                </li>
              );
            }

            if (isFileItem(item)) {
              return <File key={item.id} FileItem={item} />;
            }

            return null;
          })}
        </ul>
      )}
    </div>
  );
}
