"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import CourseCard from "@/components/ui/CourseCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { User, Course, QuizResult } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { User as UserIcon, BookmarkCheck, History, Settings } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileClient() {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>([]);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookmarks" | "history" | "settings">("bookmarks");
  const [editName, setEditName] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();
      if (profile) {
        setUser(profile);
        setEditName(profile.name);
      }

      const { data: bookmarks } = await supabase
        .from("bookmarks")
        .select("course_id, courses(*)")
        .eq("user_id", authUser.id);
      if (bookmarks) {
        setBookmarkedCourses(bookmarks.map((b: any) => b.courses).filter(Boolean));
      }

      const { data: quizzes } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })
        .limit(10);
      if (quizzes) setQuizHistory(quizzes);

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdateName = async () => {
    if (!user || !editName.trim()) return;
    const { error } = await supabase
      .from("users")
      .update({ name: editName.trim() })
      .eq("id", user.id);
    if (error) {
      toast.error("Failed to update name");
    } else {
      setUser({ ...user, name: editName.trim() });
      toast.success("Name updated!");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="mb-6 h-20 w-full" />
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { key: "bookmarks" as const, label: "Bookmarks", icon: BookmarkCheck, count: bookmarkedCourses.length },
    { key: "history" as const, label: "Quiz History", icon: History, count: quizHistory.length },
    { key: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Profile header */}
      <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground">
            Joined {formatDate(user.created_at)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-secondary p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.label}</span>
            {t.count !== undefined && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookmarks tab */}
      {tab === "bookmarks" && (
        <div>
          {bookmarkedCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {bookmarkedCourses.map((course) => (
                <CourseCard key={course.id} course={course} isBookmarked />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <BookmarkCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">No bookmarks yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse courses and bookmark ones you&apos;re interested in
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quiz history tab */}
      {tab === "history" && (
        <div>
          {quizHistory.length > 0 ? (
            <div className="space-y-3">
              {quizHistory.map((quiz) => (
                <div
                  key={quiz.id}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Quiz taken on {formatDate(quiz.created_at)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {quiz.recommended_course_ids?.length || 0} recommendations
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {quiz.interest_field && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5">
                        {quiz.interest_field}
                      </span>
                    )}
                    {quiz.learning_goal && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5">
                        {quiz.learning_goal}
                      </span>
                    )}
                    {quiz.preferred_mode && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5">
                        {quiz.preferred_mode}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <History className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">No quiz history</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Take the quiz to get personalized course recommendations
              </p>
            </div>
          )}
        </div>
      )}

      {/* Settings tab */}
      {tab === "settings" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Account Settings
          </h3>
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Display Name
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              />
              <button
                onClick={handleUpdateName}
                disabled={editName.trim() === user.name}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-muted-foreground"
            />
          </div>
        </div>
      )}
    </div>
  );
}
