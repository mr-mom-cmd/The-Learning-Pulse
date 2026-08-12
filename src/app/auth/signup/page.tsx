import type { Metadata } from "next";
import AuthForm from "../AuthForm";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
