import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight">
          Development Log
        </h1>

        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={`${post.category}-${post.id}`}
              className="group flex flex-col gap-2 border-b border-gray-100 pb-8"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold text-xs uppercase">
                  {post.category}
                </span>
                <span className="text-gray-400">{post.date}</span>
              </div>

              {/* ⭐️ 링크 구조 변경: /posts/카테고리/아이디 */}
              <Link href={`/posts/${post.category}/${post.id}`}>
                <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors cursor-pointer">
                  {post.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
