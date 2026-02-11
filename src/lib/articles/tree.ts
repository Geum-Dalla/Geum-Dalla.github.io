import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type FolderItem, type FileItem, type FileSystemNode, isFolderItem, isFileItem } from "./types";

// articles 폴더의 최상위 경로
const articlesDir = path.join(process.cwd(), "articles");

function getDirMetaData(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

export const getArticleTree = (): FolderItem => {
  function buildTree(dirPath: string, relativePath: string = ""): FileSystemNode[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const nodes: FileSystemNode[] = [];

    // 폴더와 파일을 분리하여 정렬 (폴더 먼저, 그 다음 파일)
    const folders = entries.filter((entry) => entry.isDirectory());
    const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

    // 1. 폴더 처리
    for (const folder of folders) {
      const folderPath = path.join(dirPath, folder.name);
      const folderRelativePath = relativePath ? `${relativePath}/${folder.name}` : folder.name;
      const children = buildTree(folderPath, folderRelativePath);

      const folderNode: FolderItem = {
        id: folderRelativePath,
        name: folder.name,
        path: folderRelativePath,
        type: "folder",
        children,
      };
      // 폴더에 대한 meta Data가 있다면
      if (fs.existsSync(path.join(folderPath, "_meta.json"))) {
        folderNode["meta"] = getDirMetaData(path.join(folderPath, "_meta.json"));
      }

      nodes.push(folderNode);
    }

    // 2. 파일 처리
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      const fileNameWithoutExt = file.name.replace(/\.md$/, "");
      const fileRelativePath = relativePath ? `${relativePath}/${fileNameWithoutExt}` : fileNameWithoutExt;

      // front-matter 파싱
      let meta: FileItem["meta"] = {};

      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      meta = {
        title: data.title || fileNameWithoutExt,
        date: data.date || "",
        description: data.description || "",
        ...data,
      };

      const fileItem: FileItem = {
        id: fileRelativePath,
        name: fileNameWithoutExt, // 정규화된 이름 저장
        path: fileRelativePath,
        type: "file",
        meta,
      };

      nodes.push(fileItem);
    }

    // 디버깅용 로그 (빌드 시 확인 가능)
    // console.log(JSON.stringify(nodes, null, 2));

    return nodes;
  }

  const children = buildTree(articlesDir, "");
  return {
    id: "Root",
    name: "articles",
    path: "",
    type: "folder",
    meta: {
      title: "폴더",
      description: "",
    },
    children,
  };
};

/**
 * slug 배열을 받아서 해당하는 FileItem를 찾습니다.
 */
export function getFileItemBySlug(tree: FolderItem, slug: string[]): FileItem | null {
  if (!slug || slug.length === 0) {
    return null;
  }

  function findNode(nodes: FileSystemNode[], pathSegments: string[]): FileSystemNode | null {
    if (pathSegments.length === 0) {
      return null;
    }
    const [first, ...rest] = pathSegments;
    const targetName = decodeURIComponent(first);

    const node = nodes.find((n) => n.name === targetName);

    if (!node) {
      return null;
    }

    if (rest.length === 0) {
      // 마지막 경로인데 폴더가 아니라 파일이어야 함
      return node.type === "file" ? node : null;
    }

    if (isFolderItem(node)) {
      return findNode(node.children, rest);
    }

    return null;
  }

  const result = findNode(tree.children, slug);
  return result && isFileItem(result) ? result : null;
}

/**
 * slug 배열을 받아서 해당 파일의 전체 경로를 반환합니다.
 * (주의: 파일 시스템이 NFD를 쓰더라도 Node.js는 보통 NFC 경로도 잘 처리해 줍니다)
 */
export function getFilePathBySlug(slug: string[]): string {
  const fileName = slug[slug.length - 1];
  const dirPath = slug.slice(0, -1);
  const fullPath = path.join(articlesDir, ...dirPath, `${fileName}.md`);
  return fullPath;
}
