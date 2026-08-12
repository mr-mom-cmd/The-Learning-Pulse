import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Target,
  Heart,
  Users,
  Megaphone,
  MessageSquare,
  Globe,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about The Learning Pulse — a 12-week APU student project addressing UN SDG 4.3.1.",
};

const team = [
  { name: "Lim Chin Boon", role: "Project Manager" },
  { name: "Chen Ziyin", role: "Analytics & Quality Assurance" },
  { name: "Kong Yi Sheng", role: "Content Coordinator" },
  { name: "Shailen Joshua Nanu", role: "Social Media & Community Manager" },
  { name: "Thivaan Shah", role: "Digital Solution Developer" },
  { name: "Toh Whei Hung", role: "Expert Interview Coordinator" },
  { name: "Wong Jia Le", role: "Creative Designer" },
  { name: "Yeoh Li Wei", role: "Documentation Lead" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Section 1: Hero */}
      <div className="mb-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          About The Learning Pulse
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A 12-week student project addressing UN Sustainable Development Goal
          4.3.1 — helping youth and adults discover formal, non-formal, and
          lifelong learning opportunities through a centralised digital platform.
        </p>
      </div>

      {/* Section 2: Three Info Cards */}
      <div className="mb-16 grid gap-8 sm:grid-cols-3">
        {[
          {
            icon: Target,
            title: "Our Mission",
            description:
              "To make education and training opportunities more discoverable. Rather than creating new courses or issuing qualifications, The Learning Pulse serves as a centralised aggregator — connecting learners with existing providers and helping them find the right path.",
          },
          {
            icon: Heart,
            title: "Why It Matters",
            description:
              "SDG 4.3.1 measures participation in education and training over the past 12 months. Educational resources already exist online, but they're scattered across countless platforms. The real challenge isn't availability — it's discoverability. This platform tackles that gap.",
          },
          {
            icon: Users,
            title: "Who We Serve",
            description:
              "Students exploring their options, professionals looking to upskill, career changers seeking new directions, and lifelong learners pursuing personal growth — anyone who wants to find formal, non-formal, or vocational education and training opportunities.",
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
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Section 3: Project Background */}
      <div className="mb-16 rounded-2xl bg-muted/50 p-8 sm:p-10">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Project Background
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The Learning Pulse is a 12-week academic project developed at Asia
            Pacific University (APU) between May and August 2026, under the module{" "}
            <strong className="text-foreground">
              CT050-3-3-PRMGT (Project Management)
            </strong>
            , supervised by TS. Jerry Chong Chean Fuh.
          </p>
          <p>
            The project addresses{" "}
            <strong className="text-foreground">
              UN Sustainable Development Goal 4.3.1
            </strong>{" "}
            — the participation rate of youth and adults in formal and non-formal
            education and training in the previous 12 months. Although numerous
            learning resources exist online, they are widely distributed across
            different platforms and difficult to identify. The Learning Pulse was
            created to improve awareness and accessibility of these opportunities.
          </p>
          <p>
            The project consists of three integrated components: an Instagram
            awareness campaign to promote lifelong learning, an expert validation
            interview to confirm the project&apos;s direction, and a web-based
            digital solution to centralise and simplify the discovery of
            educational opportunities.
          </p>
        </div>
      </div>

      {/* Section 4: The Three Pillars */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            The Three Pillars
          </h2>
          <p className="mt-2 text-muted-foreground">
            Our integrated approach to addressing SDG 4.3.1
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Megaphone,
              title: "Instagram Awareness Campaign",
              description:
                "A total of 10 Instagram posts were published to raise awareness about SDG 4.3.1, lifelong learning, and skills development. Content was refined based on expert feedback to prioritise concise, visually engaging posts that communicate key messages quickly — addressing the challenge of shorter attention spans on social media.",
            },
            {
              icon: MessageSquare,
              title: "Expert Validation",
              description:
                "An expert interview was conducted with Mr. Kau Guan Kiat, a Senior Lecturer at APU's School of Computing with over 20 years of experience in higher education. His insights shaped the platform's direction — confirming the focus on discoverability over content creation, and recommending system stability over interface novelty.",
            },
            {
              icon: Globe,
              title: "Digital Solution",
              description:
                "A web-based platform that aggregates existing education and training opportunities into one searchable, filterable directory. Features include course browsing with category and cost filters, a personalised \"Find My Path\" quiz, community course submissions with moderation, and course-linked discussion threads — turning awareness into action.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <pillar.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-3 text-base font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Key Insight */}
      <div className="mb-16 rounded-2xl border border-accent/20 bg-accent/5 p-8 sm:p-10">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
          <Quote className="h-5 w-5 text-accent" />
        </div>
        <blockquote className="mb-4 text-lg font-medium italic leading-relaxed text-foreground sm:text-xl">
          &ldquo;The main problem is not a lack of educational content — learners
          can already access substantial information online. The greater challenge
          is awareness and discoverability.&rdquo;
        </blockquote>
        <p className="mb-4 text-sm font-semibold text-foreground">
          Mr. Kau Guan Kiat{" "}
          <span className="font-normal text-muted-foreground">
            — Senior Lecturer, School of Computing, APU
          </span>
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This insight reshaped the project&apos;s direction. Instead of creating
          or hosting educational materials, The Learning Pulse focuses on being a
          centralised directory that curates and signposts existing courses,
          clearly distinguishing between accredited and non-accredited resources
          to avoid user confusion.
        </p>
      </div>

      {/* Section 6: Team */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          Our Team
        </h2>
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-bold text-primary">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 7: CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground sm:p-10">
        <h2 className="text-2xl font-bold">Start Your Learning Journey</h2>
        <p className="mt-3 text-primary-foreground/80">
          Discover courses and training opportunities matched to your interests,
          goals, and budget.
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
