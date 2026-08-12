import type { Metadata } from "next";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
  title: "Community",
  description: "Join discussions, share experiences, and connect with fellow learners.",
};

export default function CommunityPage() {
  return <CommunityClient />;
}
