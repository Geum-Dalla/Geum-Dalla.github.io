import { getArticleTree, getFileNodeBySlug } from "@/lib/articles/tree";
import { getArticleContent, getAllArticleSlugs } from "@/lib/articles/content";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

// 빌드 타임에 모든 article 경로를 생성
export async function generateStaticParams() {
  const tree = getArticleTree();
  const slugs = getAllArticleSlugs(tree);

  return [
    { slug: [] }, // 루트 페이지
    ...slugs.map((slug) => ({ slug })),
  ];
}

export default async function ArticlesPage({ params }: Props) {
  const { slug = [] } = await params;
  const Tree = getArticleTree();

  // 현재 선택된 파일 노드 찾기
  const selectedNode = slug.length > 0 ? getFileNodeBySlug(Tree, slug) : null;

  // 선택된 파일의 내용 가져오기
  const articleContent = selectedNode ? await getArticleContent(slug) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 좌측 트리 패널 */}
      <aside className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Articles</h2>
        </div>
      </aside>

      {/* 우측 컨텐츠 패널 */}
      <main className="flex-1 overflow-y-auto">{articleContent?.content}</main>
    </div>
  );
}
