import { useMemo, useState } from "react";
import { TreeNode, FileNode, FolderNode, isFolderNode, isFileNode } from "@/lib/articles/types";

interface FileTreeProps {
  isActive: boolean;
  Tree: FolderNode;
}

export default function FileTree({ isActive, Tree }: FileTreeProps) {
  // Finder 스타일: 선택된 폴더 경로만 유지
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  // selectedPath를 따라가며 컬럼 데이터 생성
  const columns = useMemo(() => {
    const cols: FolderNode[] = [];
    let current: FolderNode | undefined = Tree;
    cols.push(current);

    for (const seg of selectedPath) {
      if (!current) break;
      const next = current.children.find((n) => isFolderNode(n) && n.id === seg) as FolderNode | undefined;
      if (!next) break;
      cols.push(next);
      current = next;
    }
    return cols;
  }, [Tree, selectedPath]);

  const handleFolderClick = (colIndex: number, folder: FolderNode) => {
    setSelectedPath((prev) => {
      const next = prev.slice(0, colIndex);
      next[colIndex] = folder.id;
      return next;
    });
  };

  return (
    <div className="flex overflow-x-auto gap-0 border border-zinc-200 rounded-lg">
      {columns.map((folder, colIndex) => (
        <Column
          key={folder.id}
          folder={folder}
          colIndex={colIndex}
          selectedId={selectedPath[colIndex]}
          onFolderClick={handleFolderClick}
        />
      ))}
    </div>
  );
}

interface ColumnProps {
  folder: FolderNode;
  colIndex: number;
  selectedId?: string;
  onFolderClick: (colIndex: number, folder: FolderNode) => void;
}

function Column({ folder, colIndex, selectedId, onFolderClick }: ColumnProps) {
  return (
    <div className="w-42 shrink-0 border-l first:border-l-0 bg-zinc-50">
      <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide border-b border-zinc-200">
        {folder.name}
      </div>

      <ul className="divide-y divide-zinc-200">
        {folder.children.map((node) => {
          if (isFolderNode(node)) {
            const active = node.id === selectedId;
            return (
              <li key={node.id}>
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors
                    ${active ? "bg-blue-500 text-white" : "text-zinc-800 hover:bg-blue-50"}`}
                  onClick={() => onFolderClick(colIndex, node)}
                >
                  <span className="flex items-center gap-2">
                    <span className={`${active ? "text-white" : "text-amber-500"}`}>📁</span>
                    {node.name}
                  </span>
                  <span className={`${active ? "text-white" : "text-zinc-400"}`}>›</span>
                </button>
              </li>
            );
          }

          if (isFileNode(node)) {
            return <FileItem key={node.id} FileNode={node} />;
          }

          return null;
        })}
      </ul>
    </div>
  );
}

interface FileProps {
  FileNode: FileNode;
}

function FileItem({ FileNode }: FileProps) {
  return (
    <div className="px-3 py-2 text-sm text-zinc-700 hover:bg-blue-50 transition-colors flex items-center gap-2">
      <span className="text-sky-500">📄</span>
      {FileNode.name}
    </div>
  );
}
