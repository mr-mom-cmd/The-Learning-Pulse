import Link from "next/link";
import { ArrowRight, BookOpen, Compass, GraduationCap, Users, Award, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import CourseCard from "@/components/ui/CourseCard";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: featuredCourses } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "approved")
    .eq("featured", true)
    .limit(6);

  const { count: courseCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  const { count: userCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: quizCount } = await supabase
    .from("quiz_results")
    .select("*", { count: "exact", head: true });

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-sm font-medium text-primary">
              <GraduationCap className="h-4 w-4" />
              Supporting UN SDG 4.3.1
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Empower Your{" "}
              <span className="text-primary">Lifelong Learning</span> Journey
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Discover courses, training, and education opportunities that match
              your goals. Take our quiz to find your perfect learning path.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg"
              >
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/quiz"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:shadow-md"
              >
                <Compass className="h-4 w-4" />
                Find My Learning Path
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Check */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center sm:p-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              SDG 4.3.1 Participation Check
            </h2>
            <p className="mt-3 text-muted-foreground">
              Have you participated in any formal or non-formal education or
              training in the past 12 months?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/quiz?participated=yes"
                className="rounded-xl bg-success px-8 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              >
                Yes, I have
              </Link>
              <Link
                href="/quiz?participated=no"
                className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90"
              >
                Not yet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses && featuredCourses.length > 0 && (
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Featured Courses
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Handpicked learning opportunities to get you started
                </p>
              </div>
              <Link
                href="/courses"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} showBookmark={false} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View All Courses
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              How It Works
            </h2>
            <p className="mt-2 text-muted-foreground">
              Three simple steps to find your ideal learning opportunity
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: BookOpen,
                step: "01",
                title: "Browse",
                description:
                  "Explore our curated collection of courses, training programs, and educational opportunities.",
              },
              {
                icon: Compass,
                step: "02",
                title: "Take the Quiz",
                description:
                  "Answer a few questions about your goals, interests, and preferences to get personalized recommendations.",
              },
              {
                icon: GraduationCap,
                step: "03",
                title: "Start Learning",
                description:
                  "Enroll in courses that match your path and begin your lifelong learning journey.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div className="mx-auto mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: BookOpen,
                count: courseCount || 0,
                label: "Courses Available",
              },
              {
                icon: Users,
                count: userCount || 0,
                label: "Users Registered",
              },
              {
                icon: Award,
                count: quizCount || 0,
                label: "Quiz Completions",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.count}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Take our quiz and discover courses tailored to your goals, interests,
            and schedule.
          </p>
          <Link
            href="/quiz"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:shadow-lg"
          >
            Find My Learning Path
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
