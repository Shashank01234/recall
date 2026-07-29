"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

import { googleLogin } from "@/services/auth.service";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignIn() {
  const router = useRouter();

  async function handleCredentialResponse(response: any) {
    const res = await googleLogin(response.credential);

    if (!res.ok) {
      alert("Google login failed");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  function initializeGoogle() {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        width: 330,
      }
    );
  }

  useEffect(() => {
    if (window.google) {
      initializeGoogle();
    }
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />

      <div
        id="googleButton"
        className="flex justify-center"
      />
    </>
  );
}