import { getAllPosts, getPostData } from "@/lib/posts";
import Link from "next/link";
// 1. 어떤 페이지들을 미리 만들어야 할지 정의 (카테고리 + ID 조합)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    id: post.id,
  }));
}

// 2. 파라미터 타입 정의 (카테고리, 아이디 둘 다 받음)
interface Props {
  params: Promise<{ category: string; id: string }>;
}

// 3. 페이지 컴포넌트
export default async function PostPage({ params }: Props) {
  // params를 await해서 값을 꺼냅니다.
  const { category, id } = await params;

  // 카테고리와 아이디를 이용해 데이터를 가져옵니다.
  const post = await getPostData(category, id);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <Link
          href="/posts"
          className="text-sm text-gray-400 hover:text-black mb-4 inline-block"
        >
          ← 뒤로가기
        </Link>
        <span className="text-blue-600 font-bold mb-2 block text-lg">
          {post.category}
        </span>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500">{post.date}</p>
      </header>

      <div className="prose prose-lg text-gray-700 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
