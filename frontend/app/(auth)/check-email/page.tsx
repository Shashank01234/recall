"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

export default function CheckEmailPage() {

    const params = useSearchParams();

    const email = params.get("email");

    return (

        <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">

            <Card className="max-w-lg text-center space-y-6">

                <div className="text-6xl">
                    📧
                </div>

                <h1 className="text-4xl font-bold">

                    Check your email

                </h1>

                <p className="text-gray-500">

                    We've sent a verification link to

                </p>

                <p className="font-semibold">

                    {email}

                </p>

                <p className="text-sm text-gray-500">

                    Click the verification link before logging in.

                </p>

                <Link href="/login">

                    <Button
                        className="w-full"
                    >

                        Back to Login

                    </Button>

                </Link>

            </Card>

        </main>

    );

}