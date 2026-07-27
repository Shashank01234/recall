import Link from "next/link";
import { BookOpen } from "lucide-react";

interface LogoProps {
  showText?: boolean;
  size?: number;
}

export default function Logo({
  showText = true,
  size = 28,
}: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <BookOpen
        size={size}
        className="text-blue-600 dark:text-blue-500"
      />

      {showText && (
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Recall
        </span>
      )}
    </Link>
  );
}