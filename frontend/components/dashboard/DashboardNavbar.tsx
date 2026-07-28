import Logo from "@/components/common/Logo";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardNavbar() {
  const user = await getCurrentUser();

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-950">
      <Logo />

      <ProfileMenu username={user?.username ?? "User"} />
    </nav>
  );
}