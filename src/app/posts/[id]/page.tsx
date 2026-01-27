import { getAllPosts, getPostData } from "@/lib/posts";

// 1. generateStaticParams는 그대로 두셔도 됩니다 (빌드 시점 실행)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// 2. 타입을 Promise로 변경하고, 내부에서 await 처리
interface Props {
  params: Promise<{ id: string }>; // ⭐️ 여기가 핵심 변경 포인트!
}

export default async function PostPage({ params }: Props) {
  // ⭐️ params를 먼저 await 해서 id를 꺼내야 합니다.
  const { id } = await params;

  // 이제 id가 정상적인 문자열("java-basic" 등)로 들어갑니다.
  const post = await getPostData(id);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <span className="text-blue-600 font-bold mb-2 block">
          {post.category}
        </span>
        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
      </header>

      {/* 마크다운 본문이 들어갈 자리 (HTML 렌더링이 필요하다면 추가 작업 필요) */}
      <div className="prose prose-lg text-gray-700 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
