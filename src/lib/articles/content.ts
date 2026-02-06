import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getFilePathBySlug } from "./tree";
import { FolderNode, isFileNode, isFolderNode, TreeNode } from "./types";

export interface ArticleContent {
  content: string;
  meta?: {
    title?: string;
    date?: string;
    description?: string;
    [key: string]: any;
  };
}

/**
 * slug 배열을 받아서 해당 마크다운 파일의 내용을 읽어옵니다.
 * 빌드 타임에만 실행됩니다.
 */
export async function getArticleContent(slug: string[]): Promise<ArticleContent | null> {
  try {
    const filePath = getFilePathBySlug(slug);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      content,
      meta: {
        title: data.title || slug[slug.length - 1],
        date: data.date || "",
        description: data.description || "",
        ...data,
      },
    };
  } catch (error) {
    console.error(`Error reading article: ${slug.join("/")}`, error);
    return null;
  }
}

/**
 * 트리에서 모든 파일 노드의 slug를 수집합니다.
 * generateStaticParams에서 사용됩니다.
 */
export function getAllArticleSlugs(tree: FolderNode): string[][] {
  const slugs: string[][] = [];

  function collectSlugs(nodes: TreeNode[], currentPath: string[] = []) {
    for (const node of nodes) {
      if (isFileNode(node)) {
        slugs.push([...currentPath, node.name]);
      } else if (isFolderNode(node)) {
        collectSlugs(node.children, [...currentPath, node.name]);
      }
    }
  }

  collectSlugs(tree.children);
  return slugs;
}
