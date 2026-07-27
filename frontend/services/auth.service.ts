const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function login(username: string, password: string) {
  return fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

export async function register(username: string, password: string) {
  return fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

export async function logout() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  return fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}