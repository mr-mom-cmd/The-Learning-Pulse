"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES } from "@/lib/constants";
import { Skeleton } from "@/components/ui/Skeleton";
import { BarChart3 } from "lucide-react";

interface AnalyticsData {
  categoryCounts: Record<string, number>;
  goalCounts: Record<string, number>;
  participationCounts: { yes: number; no: number };
  totalQuizzes: number;
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const supabase = createClient();
      const { data: quizzes } = await supabase
        .from("quiz_results")
        .select("*");

      if (!quizzes) {
        setLoading(false);
        return;
      }

      const categoryCounts: Record<string, number> = {};
      const goalCounts: Record<string, number> = {};
      let yesCount = 0;
      let noCount = 0;

      quizzes.forEach((q) => {
        if (q.interest_field) {
          categoryCounts[q.interest_field] =
            (categoryCounts[q.interest_field] || 0) + 1;
        }
        if (q.learning_goal) {
          goalCounts[q.learning_goal] = (goalCounts[q.learning_goal] || 0) + 1;
        }
        if (q.participated_12_months === true) yesCount++;
        else if (q.participated_12_months === false) noCount++;
      });

      setData({
        categoryCounts,
        goalCounts,
        participationCounts: { yes: yesCount, no: noCount },
        totalQuizzes: quizzes.length,
      });
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-foreground">Quiz Analytics</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.totalQuizzes === 0) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-foreground">Quiz Analytics</h1>
        <div className="py-16 text-center">
          <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">No quiz data yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Analytics will appear here once users start taking the quiz
          </p>
        </div>
      </div>
    );
  }

  const maxCategory = Math.max(...Object.values(data.categoryCounts), 1);
  const maxGoal = Math.max(...Object.values(data.goalCounts), 1);
  const totalParticipation =
    data.participationCounts.yes + data.participationCounts.no || 1;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Quiz Analytics</h1>
        <span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
          {data.totalQuizzes} total responses
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Participation */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Participated in Education (Past 12 Months)
          </h3>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-foreground">Yes</span>
                <span className="text-muted-foreground">
                  {data.participationCounts.yes} (
                  {Math.round(
                    (data.participationCounts.yes / totalParticipation) * 100
                  )}
                  %)
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-success transition-all"
                  style={{
                    width: `${(data.participationCounts.yes / totalParticipation) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-foreground">No</span>
                <span className="text-muted-foreground">
                  {data.participationCounts.no} (
                  {Math.round(
                    (data.participationCounts.no / totalParticipation) * 100
                  )}
                  %)
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{
                    width: `${(data.participationCounts.no / totalParticipation) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Popular categories */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Most Popular Categories
          </h3>
          <div className="space-y-3">
            {CATEGORIES.map((cat) => {
              const count = data.categoryCounts[cat.value] || 0;
              return (
                <div key={cat.value}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-foreground">{cat.label}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${(count / maxCategory) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning goals */}
        <div className="rounded-xl border border-border bg-card p-6 sm:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Common Learning Goals
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(data.goalCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([goal, count]) => (
                <div key={goal}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-foreground capitalize">{goal}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{
                        width: `${(count / maxGoal) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
