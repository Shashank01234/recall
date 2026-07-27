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
        shadow-xl
        border
        border-gray-100
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}