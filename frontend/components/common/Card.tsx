import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        w-full
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-xl
        transition-all
        duration-300

        dark:border-slate-700
        dark:bg-slate-900

        ${className}
      `}
    >
      {children}
    </div>
  );
}