import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type FolderNode, type FileNode, type TreeNode, isFolderNode, isFileNode } from "./types";
import { cache } from "react";

// articles 폴더의 최상위 경로
const articlesDir = path.join(process.cwd(), "articles");

/**
 * articles 폴더를 재귀적으로 탐색하여 트리 구조를 생성합니다.
 * 빌드 타임에만 실행됩니다.
 */
export const getArticleTree = cache((): FolderNode => {
  function buildTree(dirPath: string, relativePath: string = ""): TreeNode[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const nodes: TreeNode[] = [];

    // 폴더와 파일을 분리하여 정렬 (폴더 먼저, 그 다음 파일)
    const folders = entries.filter((entry) => entry.isDirectory());
    const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

    // 폴더 처리
    for (const folder of folders) {
      const folderPath = path.join(dirPath, folder.name);
      const folderRelativePath = relativePath ? `${relativePath}/${folder.name}` : folder.name;
      const children = buildTree(folderPath, folderRelativePath);

      const folderNode: FolderNode = {
        id: folderRelativePath,
        name: folder.name,
        path: folderRelativePath,
        type: "folder",
        children,
      };

      nodes.push(folderNode);
    }

    // 파일 처리
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      const fileNameWithoutExt = file.name.replace(/\.md$/, "");
      const fileRelativePath = relativePath ? `${relativePath}/${fileNameWithoutExt}` : fileNameWithoutExt;

      // front-matter 파싱
      let meta: FileNode["meta"] = {};
      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        meta = {
          title: data.title || fileNameWithoutExt,
          date: data.date || "",
          description: data.description || "",
          ...data,
        };
      } catch (error) {
        // 파싱 실패 시 파일명을 제목으로 사용
        meta = { title: fileNameWithoutExt };
      }

      const fileNode: FileNode = {
        id: fileRelativePath,
        name: fileNameWithoutExt,
        path: fileRelativePath,
        type: "file",
        meta,
      };

      nodes.push(fileNode);
    }

    return nodes;
  }

  const children = buildTree(articlesDir, "");
  return {
    id: "Root",
    name: "articles",
    path: "",
    type: "folder",
    children,
  };
});

/**
 * slug 배열을 받아서 해당하는 FileNode를 찾습니다.
 */
export function getFileNodeBySlug(tree: FolderNode, slug: string[]): FileNode | null {
  if (slug.length === 0) {
    return null;
  }

  function findNode(nodes: TreeNode[], pathSegments: string[]): TreeNode | null {
    if (pathSegments.length === 0) {
      return null;
    }

    const [first, ...rest] = pathSegments;
    const node = nodes.find((n) => n.name === first);

    if (!node) {
      return null;
    }

    if (rest.length === 0) {
      return node.type === "file" ? node : null;
    }

    if (isFolderNode(node)) {
      return findNode(node.children, rest);
    }

    return null;
  }

  const result = findNode(tree.children, slug);
  return result && isFileNode(result) ? result : null;
}

/**
 * slug 배열을 받아서 해당 파일의 전체 경로를 반환합니다.
 */
export function getFilePathBySlug(slug: string[]): string {
  const fileName = slug[slug.length - 1];
  const dirPath = slug.slice(0, -1);
  const fullPath = path.join(articlesDir, ...dirPath, `${fileName}.md`);
  return fullPath;
}
