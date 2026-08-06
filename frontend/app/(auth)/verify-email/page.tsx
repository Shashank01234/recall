"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function VerifyEmailPage() {

    const params = useSearchParams();

    const router = useRouter();

    useEffect(() => {

        async function verify() {

            const token = params.get("token");

            if (!token) {

                router.replace("/login");

                return;

            }

            const res = await fetch(

                `${process.env.NEXT_PUBLIC_API_URL}/api/email/verify?token=${token}`

            );

            if (res.ok) {

                router.replace("/email-verified");

            } else {

                router.replace(

                    "/check-email?expired=true"

                );

            }

        }

        verify();

    }, []);

    return (

        <FullScreenLoader
        text="Verifying your email..."
        />

    );

}