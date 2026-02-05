import { getArticleTree } from "@/lib/articles/tree";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-gray-800">
      {/* 프로필 섹션 */}
      <main className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-3xl">
            안녕하세요, <span className="text-blue-600">Geum-Dalla</span>입니다.
          </h1>
          <p className="text-xl text-gray-600 font-medium">React + Java 풀스택 개발자를 꿈꾸는 성장 기록 공간입니다.</p>
        </div>

        {/* 간단한 소개 카드 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">🚀 관심 분야</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✔</span> Next.js & TypeScript
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✔</span> Java & Spring Boot
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✔</span> 로우레벨 시스템 & JVM
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✔</span> 깔끔한 UI/UX 디자인
            </li>
          </ul>
        </div>

        {/* 버튼 링크 */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Geum-Dalla"
            target="_blank"
            className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            GitHub 방문하기
          </a>
          <button className="px-6 py-3 bg-white text-black border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors">
            포스트 읽기
          </button>
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="mt-20 text-gray-400 text-sm">© 2026 Geum-Dalla. Built with Next.js (Static Export)</footer>
    </div>
  );
}
