"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Thread } from "@/lib/types";
import { THREAD_CATEGORIES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { MessageSquare, Plus, Pin, User as UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import toast from "react-hot-toast";

export default function CommunityClient() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<"hot" | "new">("hot");
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", body: "", category: THREAD_CATEGORIES[0] as string });
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("threads")
        .select(`
          *,
          author:users!threads_author_id_fkey(id, name, avatar_url),
          thread_replies(count)
        `)
        .order(sort === "hot" ? "is_pinned" : "created_at", { ascending: false });

      if (data) {
        const mapped = data.map((t: any) => ({
          ...t,
          author: t.author,
          reply_count: t.thread_replies?.[0]?.count || 0,
        }));
        if (sort === "hot") {
          mapped.sort((a: any, b: any) => {
            if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
            return b.reply_count - a.reply_count;
          });
        }
        setThreads(mapped);
      }
      setLoading(false);
    };
    fetchThreads();
  }, [sort]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please sign in to create a thread");
      return;
    }
    if (!form.title.trim() || !form.body.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("threads").insert({
      title: form.title.trim(),
      body: form.body.trim(),
      category: form.category,
      author_id: userId,
    });
    if (error) {
      toast.error("Failed to create thread");
    } else {
      toast.success("Thread created!");
      setForm({ title: "", body: "", category: THREAD_CATEGORIES[0] });
      setShowForm(false);
      const { data } = await supabase
        .from("threads")
        .select(`
          *,
          author:users!threads_author_id_fkey(id, name, avatar_url),
          thread_replies(count)
        `)
        .order("created_at", { ascending: false });
      if (data) {
        setThreads(
          data.map((t: any) => ({
            ...t,
            author: t.author,
            reply_count: t.thread_replies?.[0]?.count || 0,
          }))
        );
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community</h1>
          <p className="mt-2 text-muted-foreground">
            Share experiences and connect with fellow learners
          </p>
        </div>
        <button
          onClick={() => {
            if (!userId) {
              toast.error("Please sign in to create a thread");
              return;
            }
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Thread
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl border border-border bg-card p-5 animate-fade-in"
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground">Create a Thread</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Thread title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
              maxLength={200}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Share your thoughts..."
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none resize-none"
            />
          </div>
          <div className="mb-4">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
            >
              {THREAD_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Thread"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Sort tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-secondary p-1">
        {(["hot", "new"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${
              sort === s
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "hot" ? "Hot" : "New"}
          </button>
        ))}
      </div>

      {/* Thread list */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="py-16 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">No threads yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to start a discussion!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/community/${thread.id}`}
              className="block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    {thread.is_pinned && (
                      <Pin className="h-3.5 w-3.5 text-primary" />
                    )}
                    <h3 className="text-base font-semibold text-card-foreground truncate">
                      {thread.title}
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {thread.body}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <UserIcon className="h-3 w-3" />
                      {thread.author?.name || "Anonymous"}
                    </span>
                    <span>{timeAgo(thread.created_at)}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                      {thread.category}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {thread.reply_count}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
