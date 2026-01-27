import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 마크다운 파일들이 저장된 최상위 폴더 (예: my-blog/content)
const baseDir = path.join(process.cwd(), "src/content");

export interface PostData {
  id: string;
  category: string;
  title: string;
  date: string;
  contentHtml?: string;
  [key: string]: any;
}

/**
 * 1. 모든 포스트 목록 가져오기 (메뉴판 만들기)
 * - content 폴더 내의 모든 카테고리 폴더를 순회합니다.
 * - 각 파일의 정보를 읽어와서 리스트로 반환합니다.
 */
export function getAllPosts(): PostData[] {
  // content 폴더 안에 있는 폴더들(React, Java 등)을 스캔
  const categories = fs.readdirSync(baseDir);

  const allPosts = categories.flatMap((category) => {
    const categoryPath = path.join(baseDir, category);

    // 파일인지 폴더인지 확인 (폴더가 아니면 건너뜀)
    if (!fs.statSync(categoryPath).isDirectory()) return [];

    const fileNames = fs.readdirSync(categoryPath);

    return fileNames.map((fileName) => {
      // .md 파일이 아니면 무시
      if (!fileName.endsWith(".md")) return null;

      const id = fileName.replace(/\.md$/, ""); // 파일명 = ID
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // gray-matter로 메타데이터 파싱
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

  // null 값 제거 및 날짜 최신순 정렬
  const filteredPosts = allPosts.filter(
    (post): post is PostData => post !== null,
  );
  return filteredPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * 2. 특정 포스트 내용 가져오기 (탐정 함수)
 * - ID(파일명)만 가지고 어느 폴더에 있는지 모르므로,
 * - 모든 카테고리 폴더를 뒤져서 해당 파일을 찾아냅니다.
 */
export async function getPostData(id: string) {
  const categories = fs.readdirSync(baseDir);

  for (const category of categories) {
    const categoryPath = path.join(baseDir, category);

    // 폴더가 아니면 패스
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const targetFullPath = path.join(categoryPath, `${id}.md`);

    // ⭐️ 중요: 이 폴더에 해당 파일이 존재하는지 확인!
    if (fs.existsSync(targetFullPath)) {
      const fileContents = fs.readFileSync(targetFullPath, "utf8");
      const { data, content } = matter(fileContents);

      // (선택사항) 여기서 마크다운 content를 HTML로 변환하는 로직을 추가할 수 있습니다.
      // 예: const processedContent = await remark().use(html).process(content);

      return {
        id,
        content, // 본문 내용
        category, // 찾은 폴더 이름
        title: data.title || id,
        date: data.date || "",
        ...data,
      };
    }
  }

  // 모든 폴더를 다 뒤져도 없으면 에러 발생
  throw new Error(`Post not found: ${id}`);
}
