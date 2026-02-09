import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type FolderItem, type FileItem, type FileSystemNode, isFolderItem, isFileItem } from "./types";
import { cache } from "react";

// articles 폴더의 최상위 경로
const articlesDir = path.join(process.cwd(), "articles");

/**
 * articles 폴더를 재귀적으로 탐색하여 트리 구조를 생성합니다.
 * 빌드 타임에만 실행됩니다.
 */
export const getArticleTree = cache((): FolderItem => {
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
      // ★ 핵심 수정 1: 맥북(NFD) 호환성을 위해 이름 정규화 (NFC)
      const normalizedFolderName = folder.name.normalize("NFC");

      // 파일 시스템 접근용 (원본 이름 사용)
      const folderPath = path.join(dirPath, folder.name);

      // 트리 데이터용 (정규화된 이름 사용)
      const folderRelativePath = relativePath ? `${relativePath}/${normalizedFolderName}` : normalizedFolderName;

      const children = buildTree(folderPath, folderRelativePath);

      const folderNode: FolderItem = {
        id: folderRelativePath,
        name: normalizedFolderName, // 정규화된 이름 저장
        path: folderRelativePath,
        type: "folder",
        children,
      };

      nodes.push(folderNode);
    }

    // 2. 파일 처리
    for (const file of files) {
      // 파일 시스템 접근용 (원본 이름 사용)
      const filePath = path.join(dirPath, file.name);

      // ★ 핵심 수정 2: 맥북(NFD) 호환성을 위해 파일명 정규화 (NFC)
      const fileNameWithoutExt = file.name.replace(/\.md$/, "").normalize("NFC");

      // 트리 데이터용 (정규화된 이름 사용)
      const fileRelativePath = relativePath ? `${relativePath}/${fileNameWithoutExt}` : fileNameWithoutExt;

      // front-matter 파싱
      let meta: FileItem["meta"] = {};
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
    children,
  };
});

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

    // ★ 핵심 수정 3: URL 인코딩 해제 + 정규화 (NFC)
    // 브라우저는 '한글'을 '%ED%95%9C%EA%B8%80'로 보내므로 decodeURIComponent 필수
    const targetName = decodeURIComponent(first).normalize("NFC");

    const node = nodes.find((n) => n.name.normalize("NFC") === targetName);

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
  // 슬러그 자체를 디코딩해서 경로로 조합
  const decodedSlug = slug.map((s) => decodeURIComponent(s).normalize("NFC"));
  const fileName = decodedSlug[decodedSlug.length - 1];
  const dirPath = decodedSlug.slice(0, -1);

  // OS별 경로 구분자 처리를 위해 path.join 사용
  const fullPath = path.join(articlesDir, ...dirPath, `${fileName}.md`);
  return fullPath;
}
