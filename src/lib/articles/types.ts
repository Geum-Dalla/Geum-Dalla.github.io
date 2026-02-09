// 트리 노드 타입 정의
export interface FileSystemNode {
  id: string; // 경로 기반 유니크 ID
  name: string; // 표시용 이름
  path: string; // 루트 기준 상대 경로 (예: "topic1/subtopic1/title1")
  type: "folder" | "file";
}

export interface FolderItem extends FileSystemNode {
  type: "folder";
  children: FileSystemNode[];
}

export interface FileItem extends FileSystemNode {
  type: "file";
  meta?: {
    title?: string;
    date?: string;
    description?: string;
  };
}

export function isFolderItem(node: FileSystemNode): node is FolderItem {
  return node.type === "folder";
}

export function isFileItem(node: FileSystemNode): node is FileItem {
  return node.type === "file";
}
