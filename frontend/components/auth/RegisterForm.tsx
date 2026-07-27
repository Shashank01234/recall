"use client";

import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

import AuthFooter from "./AuthFooter";
import { useRegister } from "@/hooks/useRegister";
import Divider from "../common/Divider";

export default function RegisterForm() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useRegister();

  return (
    <Card className="w-full max-w-lg">

      <div className="space-y-8">

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
          className="space-y-5"
        >

          <Input
            label="Username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

        </form>
        
        <AuthFooter
          text="Already have an account?"
          linkText="Sign In"
          href="/login"
        />

      </div>

    </Card>
  );
}