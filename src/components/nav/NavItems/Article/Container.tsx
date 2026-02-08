import Article from "./Article";
import { getArticleTree } from "@/lib/articles/tree";

// 필요한 데이터를 Article로 넘겨줌
export default async function ArticleContainer() {
  return <Article FolderTree={getArticleTree()} />;
}
