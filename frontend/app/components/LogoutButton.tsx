"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // needed so the jwt cookie is sent + cleared
      });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button onClick={handleLogout} disabled={loading} style={{ padding: "6px 14px" }}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}