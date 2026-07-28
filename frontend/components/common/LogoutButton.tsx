"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { logout } from "@/services/auth.service";
import Spinner from "./Spinner";

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
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50"
    >
      {loading ? (
        <Spinner size={18} />
      ) : (
        <LogOut size={18} />
      )}

      <span>Logout</span>
    </button>
  );
}