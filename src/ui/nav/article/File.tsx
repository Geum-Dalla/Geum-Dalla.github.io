import { FileItem } from "@/lib/articles/types";
import Link from "next/link";

interface FileProps {
  FileItem: FileItem;
}

export default function File({ FileItem }: FileProps) {
  const cleanPath = FileItem.path.startsWith("/") ? FileItem.path : `/${FileItem.path}`;
  const href = `/article${cleanPath}`;
  return (
    <Link href={href}>
      <div className="px-3 py-2 text-sm text-zinc-700 hover:bg-blue-50 transition-colors flex items-center gap-2">
        <span className="text-sky-500">📄</span>
        {FileItem.name}
      </div>
    </Link>
  );
}
