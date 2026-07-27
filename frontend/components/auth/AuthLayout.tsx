import { ReactNode } from "react";
import Card from "@/components/common/Card";
import AuthSidePanel from "./AuthSidePanel";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl h-[700px] rounded-3xl bg-white shadow-2xl overflow-hidden grid grid-cols-2">

        <Card className="rounded-none shadow-none flex items-center justify-center p-12">
          {children}
        </Card>

        <AuthSidePanel />

      </div>
    </main>
  );
}