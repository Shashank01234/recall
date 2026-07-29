"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

export function useLogin() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await login(identifier, password);

      if (!res.ok) {
        setError("Invalid username/email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return {
    identifier,
    password,
    setIdentifier,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
}