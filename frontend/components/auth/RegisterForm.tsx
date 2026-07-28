"use client";

import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

import AuthFooter from "./AuthFooter";
import { useRegister } from "@/hooks/useRegister";
import Divider from "../common/Divider";
import Image from "next/image";

export default function RegisterForm() {
  const {
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
  } = useRegister();

  return (
    <Card className="w-full max-w-lg h-[650px] flex flex-col">

      <div className="space-y-2">

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Create Account
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Create your account to get started.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex-1 overflow-y-auto pr-2 space-y-5"
      >
        <Input
          label="Full Name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Phone Number (Optional)"
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="space-y-5"></div>

    
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
          >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

      </form>

      <Divider text="OR" />

      <Button
        variant="secondary"
        className="w-full"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        Continue with Google
      </Button>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign In"
        href="/login"
      />

    </Card>
  );
}