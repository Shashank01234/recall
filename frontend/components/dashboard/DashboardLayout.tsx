import { ReactNode } from "react";
import DashboardNavbar from "./DashboardNavbar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">

      <DashboardNavbar />

      <section className="mx-auto max-w-7xl p-8">
        {children}
      </section>

    </main>
  );
}