"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";

export function useRegister() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if(password!==confirmPassword){
      setError("Passwords do not match");;
      return;
    }

    setLoading(true);

    try {
      const res = await register({name, username, email, phoneNumber, password, confirmPassword});


      if (!res.ok) {
        setError(res.data.message || "Registration failed");
        return;
      }

      router.replace("/login");
    } catch {
      setError("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }

  }

  return {
    name,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    setName,
    setUsername,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    loading,
    error,
    handleSubmit,
  };
}