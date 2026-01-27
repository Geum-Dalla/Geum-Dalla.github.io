import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  // 빌드 타임에 모든 글 목록을 가져옵니다.
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight">
          Development Log
        </h1>

        {/* 포스트 리스트 영역 */}
        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={post.id}
              className="group flex flex-col gap-2 border-b border-gray-100 pb-8"
            >
              {/* 상단 메타 정보 (카테고리 + 날짜) */}
              <div className="flex items-center gap-3 text-sm">
                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold text-xs uppercase tracking-wide">
                  {post.category}
                </span>
                <span className="text-gray-400">{post.date}</span>
              </div>

              {/* 제목 (클릭 시 상세 페이지로 이동) */}
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              {/* 설명 (description이 있으면 표시) */}
              {post.description && (
                <p className="text-gray-600 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
