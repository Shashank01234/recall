import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getCurrentUser() {
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

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main style={{ maxWidth: 600, margin: "80px auto", padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      <p>
        Welcome, <strong>{user.username}</strong>. You are authenticated.
      </p>
    </main>
  );
}