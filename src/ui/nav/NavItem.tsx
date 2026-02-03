export default function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="group relative flex flex-col items-center justify-center p-2">
      {/* 아이콘 크기 반응형: 모바일은 작게(w-6), PC는 크게(md:w-8) 등 조절 가능 */}
      <div className="w-6 h-6 text-gray-800 transition-transform group-hover:scale-110 md:w-8 md:h-8 md:text-black flex items-center justify-center">
        {icon}
      </div>

      {/* (옵션) 모바일에서만 라벨 숨기기 등 추가 가능 */}
      <span className="sr-only">{label}</span>
    </button>
  );
}
