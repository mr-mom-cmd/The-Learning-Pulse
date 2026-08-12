import type { Metadata } from "next";
import AuthForm from "../AuthForm";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
