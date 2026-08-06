"use client";

import Link from "next/link";

import Card from "@/components/common/Card";

import Button from "@/components/common/Button";

export default function EmailVerifiedPage() {

    return (

        <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">

            <Card className="max-w-lg text-center space-y-6">

                <div className="text-6xl">

                    ✅

                </div>

                <h1 className="text-4xl font-bold">

                    Email Verified

                </h1>

                <p className="text-gray-500">

                    Your account is now verified.

                </p>

                <Link href="/login">

                    <Button className="w-full">

                        Continue to Login

                    </Button>

                </Link>

            </Card>

        </main>

    );

}