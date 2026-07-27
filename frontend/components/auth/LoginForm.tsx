"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Divider from "@/components/common/Divider";
import Input from "@/components/common/Input";

import AuthFooter from "./AuthFooter";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {

  const {
    username,
    password,
    setUsername,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <Card className="w-full max-w-md shadow-none">

      <div className="space-y-8">

        <div className="space-y-2">

          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500">
            Sign in to continue.
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
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </form>

        <Divider text="OR" />

        <Button
          variant="secondary"
          className="w-full"
        >
          Continue with Google
        </Button>

        <AuthFooter 
            text="Don't have an account?" 
            linkText="Register" 
            href="/register"
        />

      </div>

    </Card>
  );
}