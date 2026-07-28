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

export async function register(data: {
  name: string,
  username: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
}) {

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  return{
    ok: response.ok,
    status: response.status,
    data: responseData,
  };
}

export async function logout() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  return fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}