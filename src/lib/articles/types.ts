// 트리 노드 타입 정의
export interface TreeNode {
  id: string; // 경로 기반 유니크 ID
  name: string; // 표시용 이름
  path: string; // 루트 기준 상대 경로 (예: "topic1/subtopic1/title1")
  type: "folder" | "file";
}

export interface FolderNode extends TreeNode {
  type: "folder";
  children: TreeNode[];
}

export interface FileNode extends TreeNode {
  type: "file";
  meta?: {
    title?: string;
    date?: string;
    description?: string;
  };
}

export function isFolderNode(node: TreeNode): node is FolderNode {
  return node.type === "folder";
}

export function isFileNode(node: TreeNode): node is FileNode {
  return node.type === "file";
}
