import { cookies } from "next/headers";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get("jwt");

  if (!jwt) return null;

  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Cookie: `jwt=${jwt.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}