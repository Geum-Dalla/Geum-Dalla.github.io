import { getArticleTree } from "@/lib/articles/tree";
import { TreeNode, FolderNode, FileNode } from "@/lib/articles/types";

export default function Content() {
  const Tree = getArticleTree();
  return (
    <div className="">
      <div>컨테이너이거왜 글자가안보여</div>
      <div>컨테이너이거왜 글자가안보여</div>
      <div>컨테이너이거왜 글자가안보여</div>
      <div>컨테이너이거왜 글자가안보여</div>
      <div>컨테이너이거왜 글자가안보여</div>
      <div>컨테이너이거왜 글자가안보여</div>
    </div>
  );
}
