import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 마크다운 파일들이 저장된 최상위 폴더 (예: content/)
const baseDir = path.join(process.cwd(), "content");

export interface PostData {
  id: string;
  category: string;
  title: string;
  date: string;
  content?: string;
  [key: string]: any;
}

// 1. 모든 포스트 목록 가져오기 (메뉴판 만들기)
export function getAllPosts(): PostData[] {
  const categories = fs.readdirSync(baseDir);

  const allPosts = categories.flatMap((category) => {
    const categoryPath = path.join(baseDir, category);

    // 폴더가 아니면(.DS_Store 등) 건너뜀
    if (!fs.statSync(categoryPath).isDirectory()) return [];

    const fileNames = fs.readdirSync(categoryPath);

    return fileNames.map((fileName) => {
      if (!fileName.endsWith(".md")) return null;

      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        id,
        category, // 폴더명을 카테고리로 사용
        title: data.title || id,
        date: data.date || "",
        ...data,
      };
    });
  });

  // null 제거 및 날짜순 정렬
  const filteredPosts = allPosts.filter(
    (post): post is PostData => post !== null,
  );
  return filteredPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 2. 특정 포스트 내용 가져오기 (업그레이드된 탐정)
// 이제 카테고리와 ID를 둘 다 받아서 바로 찾습니다.
export async function getPostData(category: string, id: string) {
  // URL 인코딩된 문자열(예: %EC%9E%90%EB%B0%94)을 한글로 변환
  const decodedCategory = decodeURIComponent(category);
  const decodedId = decodeURIComponent(id);

  const targetPath = path.join(baseDir, decodedCategory, `${decodedId}.md`);

  // 파일이 없으면 에러 처리
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Post not found: ${decodedCategory}/${decodedId}`);
  }

  const fileContents = fs.readFileSync(targetPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id: decodedId,
    category: decodedCategory,
    content,
    title: data.title || decodedId,
    date: data.date || "",
    ...data,
  };
}
