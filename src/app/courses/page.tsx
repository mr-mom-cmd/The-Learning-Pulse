import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Browse Courses",
  description: "Explore courses, training programs, and educational opportunities across all categories.",
};

export default function CoursesPage() {
  return <CoursesClient />;
}
