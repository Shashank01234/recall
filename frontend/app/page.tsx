import { redirect } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default async function Home() {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Cookie: "",
      },
      cache: "no-store",
      credentials: "include",
    });

    if (res.ok) {
      redirect("/dashboard");
    }
  } catch {}

  redirect("/login");
}