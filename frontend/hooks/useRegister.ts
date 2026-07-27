"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";

export function useRegister() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await register(username, password);

      if (!res.ok) {
        const message = await res.text();
        setError(message || "Registration failed");
        return;
      }

      router.push("/login");
    } catch {
      setError("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return {
    username,
    password,
    setUsername,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
}