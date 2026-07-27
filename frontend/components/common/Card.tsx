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
        bg-white
        dark:bg-slate-900
        border
        border-gray-200
        dark:border-slate-700
        shadow-xl
        transition-colors
        p-8
        
        ${className}
      `}
    >
      {children}
    </div>
  );
}