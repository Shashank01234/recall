import ThemeToggle from "@/components/common/ThemeToggle";
import LogoutButton from "@/components/common/LogoutButton";

export default function DashboardNavbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 dark:border-slate-700 dark:bg-slate-900">

      <h1 className="text-2xl font-bold">
        Recall
      </h1>

      <div className="flex items-center gap-3">

        <ThemeToggle />

        <LogoutButton />

      </div>

    </nav>
  );
}