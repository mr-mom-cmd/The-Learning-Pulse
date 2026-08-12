import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Find My Learning Path",
  description: "Take our quiz to discover courses and training programs tailored to your goals.",
};

export default function QuizPage() {
  return <QuizClient />;
}
