"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Divider from "@/components/common/Divider";
import Input from "@/components/common/Input";

import AuthFooter from "./AuthFooter";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import GoogleSignIn from "./GoogleSignIn";

export default function LoginForm() {

  const {
    identifier,
    password,
    setIdentifier,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <Card className="w-full max-w-md">

      <div className="space-y-8">

        <div className="space-y-2">

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Sign in to continue.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            label="Username or Email"
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
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

        {/* <Button
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
        </Button> */}

        <GoogleSignIn />

        <AuthFooter
          text="Don't have an account?"
          linkText="Register"
          href="/register"
        />

      </div>

    </Card>
  );
}