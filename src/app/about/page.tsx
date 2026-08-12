import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Target, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about The Learning Pulse and our mission to support SDG 4.3.1.",
};

const team = [
  { name: "Team Member 1", role: "Project Lead" },
  { name: "Team Member 2", role: "Frontend Developer" },
  { name: "Team Member 3", role: "Backend Developer" },
  { name: "Team Member 4", role: "UI/UX Designer" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          About The Learning Pulse
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A platform dedicated to making education discovery accessible, helping
          people find the right learning opportunities aligned with UN Sustainable
          Development Goal 4.3.1.
        </p>
      </div>

      {/* Mission */}
      <div className="mb-16 grid gap-8 sm:grid-cols-3">
        {[
          {
            icon: Target,
            title: "Our Mission",
            description:
              "To bridge the gap between learners and educational opportunities by providing a centralized platform for discovering courses, training, and skill development programs.",
          },
          {
            icon: Heart,
            title: "Why It Matters",
            description:
              "SDG 4.3.1 tracks participation in education and training. By making learning opportunities more discoverable, we help increase participation rates and support lifelong learning.",
          },
          {
            icon: Users,
            title: "Who We Serve",
            description:
              "Students, professionals, career changers, and lifelong learners — anyone looking to grow through formal, non-formal, or vocational education and training.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Background */}
      <div className="mb-16 rounded-2xl bg-muted/50 p-8 sm:p-10">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Project Background
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The Learning Pulse is a student project developed at Asia Pacific
            University (APU) as part of our commitment to addressing global
            challenges through technology.
          </p>
          <p>
            This platform specifically targets{" "}
            <strong className="text-foreground">
              UN Sustainable Development Goal 4.3.1
            </strong>{" "}
            — the participation rate of youth and adults in formal and non-formal
            education and training in the previous 12 months. By creating an
            accessible tool for education discovery, we aim to contribute to
            increased participation in lifelong learning.
          </p>
          <p>
            The platform combines course discovery, personalized recommendations
            through our learning path quiz, and community engagement to create a
            comprehensive learning ecosystem.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          Our Team
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground sm:p-10">
        <h2 className="text-2xl font-bold">Start Your Learning Journey</h2>
        <p className="mt-3 text-primary-foreground/80">
          Take our quiz and find courses tailored to your interests and goals.
        </p>
        <Link
          href="/quiz"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-primary hover:shadow-lg"
        >
          Find My Learning Path
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
