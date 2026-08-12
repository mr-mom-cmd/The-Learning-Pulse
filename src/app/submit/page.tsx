import type { Metadata } from "next";
import SubmitClient from "./SubmitClient";

export const metadata: Metadata = {
  title: "Submit a Course",
  description: "Suggest a new course or training opportunity for the community.",
};

export default function SubmitPage() {
  return <SubmitClient />;
}
