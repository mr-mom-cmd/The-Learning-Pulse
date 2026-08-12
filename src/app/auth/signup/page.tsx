import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "../AuthForm";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignupPage() {
  return (
    <Suspense>
      <AuthForm mode="signup" />
    </Suspense>
  );
}
