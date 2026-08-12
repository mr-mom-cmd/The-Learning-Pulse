"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Users, MessageSquare, BarChart3, Clock, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

interface Stats {
  totalCourses: number;
  pendingSubmissions: number;
  totalUsers: number;
  quizCompletions: number;
  totalThreads: number;
  totalResources: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      const [courses, pending, users, quizzes, threads, resources] =
        await Promise.all([
          supabase
            .from("courses")
            .select("*", { count: "exact", head: true })
            .eq("status", "approved"),
          supabase
            .from("courses")
            .select("*", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase.from("users").select("*", { count: "exact", head: true }),
          supabase
            .from("quiz_results")
            .select("*", { count: "exact", head: true }),
          supabase.from("threads").select("*", { count: "exact", head: true }),
          supabase
            .from("resources")
            .select("*", { count: "exact", head: true }),
        ]);

      setStats({
        totalCourses: courses.count || 0,
        pendingSubmissions: pending.count || 0,
        totalUsers: users.count || 0,
        quizCompletions: quizzes.count || 0,
        totalThreads: threads.count || 0,
        totalResources: resources.count || 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = stats
    ? [
        { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "text-blue-600" },
        { label: "Pending Submissions", value: stats.pendingSubmissions, icon: Clock, color: "text-amber-600" },
        { label: "Registered Users", value: stats.totalUsers, icon: Users, color: "text-emerald-600" },
        { label: "Quiz Completions", value: stats.quizCompletions, icon: BarChart3, color: "text-purple-600" },
        { label: "Community Threads", value: stats.totalThreads, icon: MessageSquare, color: "text-pink-600" },
        { label: "Resources", value: stats.totalResources, icon: FileText, color: "text-teal-600" },
      ]
    : [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Dashboard</h1>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl bg-secondary p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
