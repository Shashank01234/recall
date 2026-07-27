import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>

      <WelcomeCard username={user.username} />

    </DashboardLayout>
  );
}