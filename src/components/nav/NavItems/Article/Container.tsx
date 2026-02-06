import Article from "./Article";
import { getArticleTree } from "@/lib/articles/tree";

export default async function ArticleContainer() {
  return <Article FolderTree={getArticleTree()} />;
}
