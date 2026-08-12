"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import CourseCard from "@/components/ui/CourseCard";
import type { Course } from "@/lib/types";
import { ArrowLeft, ArrowRight, RotateCcw, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

interface QuizAnswer {
  participated?: boolean;
  education_level?: string;
  interest_field?: string;
  learning_goal?: string;
  preferred_mode?: string;
  budget?: string;
  time_commitment?: string;
}

const questions = [
  {
    key: "education_level" as const,
    question: "What is your current education level?",
    options: [
      "Secondary school",
      "Diploma",
      "Undergraduate",
      "Postgraduate",
      "Working professional",
      "Other",
    ],
  },
  {
    key: "interest_field" as const,
    question: "What field interests you most?",
    options: [
      { label: "Technology & IT", value: "technology" },
      { label: "Business & Management", value: "business" },
      { label: "Creative Arts & Design", value: "creative" },
      { label: "Health & Sciences", value: "health" },
      { label: "Vocational & Trade Skills", value: "vocational" },
    ],
  },
  {
    key: "learning_goal" as const,
    question: "What is your primary learning goal?",
    options: [
      "Career advancement",
      "Upskilling",
      "Career change",
      "Personal interest",
      "Academic requirement",
    ],
  },
  {
    key: "preferred_mode" as const,
    question: "What is your preferred learning mode?",
    options: [
      { label: "Online", value: "online" },
      { label: "In-person", value: "in_person" },
      { label: "Hybrid", value: "hybrid" },
      { label: "No preference", value: "" },
    ],
  },
  {
    key: "budget" as const,
    question: "What is your budget?",
    options: [
      { label: "Free only", value: "free" },
      { label: "Under $100", value: "under_100" },
      { label: "Under $500", value: "under_500" },
      { label: "No budget constraints", value: "" },
    ],
  },
  {
    key: "time_commitment" as const,
    question: "How much time can you commit?",
    options: [
      { label: "A few hours per week", value: "short" },
      { label: "Part-time", value: "medium" },
      { label: "Full-time", value: "long" },
    ],
  },
];

export default function QuizClient() {
  const searchParams = useSearchParams();
  const participated = searchParams.get("participated");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({
    participated: participated === "yes" ? true : participated === "no" ? false : undefined,
  });
  const [results, setResults] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(false);

  const showParticipationStep = participated !== null;
  const totalSteps = questions.length + (showParticipationStep ? 1 : 0);
  const currentQuestion = showParticipationStep ? step - 1 : step;

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (showParticipationStep && step === 0) return true;
    const q = questions[currentQuestion];
    if (!q) return false;
    return !!answers[q.key as keyof QuizAnswer];
  };

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      await submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("courses")
      .select("*")
      .eq("status", "approved");

    if (answers.interest_field) {
      query = query.eq("category", answers.interest_field);
    }
    if (answers.preferred_mode) {
      query = query.eq("mode", answers.preferred_mode);
    }
    if (answers.budget === "free") {
      query = query.eq("cost", "free");
    }
    if (answers.time_commitment) {
      query = query.eq("duration", answers.time_commitment);
    }

    const { data: courses } = await query.limit(12);

    let fallbackCourses = courses || [];
    if (fallbackCourses.length < 3) {
      let fallbackQuery = supabase
        .from("courses")
        .select("*")
        .eq("status", "approved");
      if (answers.interest_field) {
        fallbackQuery = fallbackQuery.eq("category", answers.interest_field);
      }
      const { data: fallback } = await fallbackQuery.limit(12);
      if (fallback && fallback.length > fallbackCourses.length) {
        fallbackCourses = fallback;
      }
    }

    const recommendedIds = fallbackCourses.map((c) => c.id);
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("quiz_results").insert({
      user_id: user?.id || null,
      participated_12_months: answers.participated ?? null,
      education_level: answers.education_level || null,
      interest_field: answers.interest_field || null,
      learning_goal: answers.learning_goal || null,
      preferred_mode: answers.preferred_mode || null,
      budget: answers.budget || null,
      time_commitment: answers.time_commitment || null,
      recommended_course_ids: recommendedIds,
    });

    setResults(fallbackCourses);
    setLoading(false);
    toast.success("Quiz completed!");
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({
      participated: participated === "yes" ? true : participated === "no" ? false : undefined,
    });
    setResults(null);
  };

  if (results !== null) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 animate-fade-in">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Your Recommended Courses</h1>
          <p className="mt-2 text-muted-foreground">
            Based on your answers, we found {results.length} course{results.length !== 1 ? "s" : ""} for you
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-foreground">
              No exact matches found
            </p>
            <p className="mt-2 text-muted-foreground">
              Try broadening your preferences or browse all courses
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </button>
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <BookOpen className="h-4 w-4" />
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Participation step */}
      {showParticipationStep && step === 0 && (
        <div className="animate-slide-up text-center">
          <div className="mb-8">
            {answers.participated ? (
              <>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Great that you&apos;ve been learning!
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Let&apos;s find your next step and keep the momentum going.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  No worries — let&apos;s get started!
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Let&apos;s find the perfect starting point for your learning journey.
                </p>
              </>
            )}
          </div>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Let&apos;s Go
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Question steps */}
      {((!showParticipationStep && step >= 0) || (showParticipationStep && step >= 1)) &&
        currentQuestion >= 0 &&
        currentQuestion < questions.length && (
          <div className="animate-slide-up" key={currentQuestion}>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
              {questions[currentQuestion].question}
            </h2>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((opt) => {
                const value = typeof opt === "string" ? opt : opt.value;
                const label = typeof opt === "string" ? opt : opt.label;
                const isSelected =
                  answers[questions[currentQuestion].key as keyof QuizAnswer] === value;

                return (
                  <button
                    key={label}
                    onClick={() =>
                      handleSelect(questions[currentQuestion].key, value)
                    }
                    className={cn(
                      "rounded-xl border px-6 py-4 text-left text-sm font-medium transition-all",
                      isSelected
                        ? "border-primary bg-primary-light text-primary shadow-sm"
                        : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-secondary"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
              >
                {loading
                  ? "Finding courses..."
                  : step === totalSteps - 1
                  ? "Get Recommendations"
                  : "Next"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
