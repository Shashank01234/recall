"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "./Button";
import { logout } from "@/services/auth.service";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await logout();

      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <LogOut size={18} />

      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}