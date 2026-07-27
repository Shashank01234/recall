import { ReactNode } from "react";
import AuthSidePanel from "./AuthSidePanel";
import ThemeToggle from "@/components/common/ThemeToggle";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950 p-8 transition-colors">

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div
        className="
          grid
          w-full
          max-w-7xl
          overflow-hidden
          rounded-3xl
          bg-white
          dark:bg-slate-900
          shadow-2xl
          transition-colors
          lg:grid-cols-2
        "
      >
        <div className="flex items-center justify-center p-12">
          {children}
        </div>

        <AuthSidePanel />
      </div>
    </main>
  );
}