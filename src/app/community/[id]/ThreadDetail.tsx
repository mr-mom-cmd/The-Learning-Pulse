"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Thread, ThreadReply } from "@/lib/types";
import { formatDate, timeAgo } from "@/lib/utils";
import { ArrowLeft, MessageSquare, User as UserIcon, Send } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import toast from "react-hot-toast";

export default function ThreadDetail() {
  const params = useParams();
  const threadId = params.id as string;
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<ThreadReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
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
    const fetchThread = async () => {
      setLoading(true);
      const { data: threadData } = await supabase
        .from("threads")
        .select(`*, author:users!threads_author_id_fkey(id, name, avatar_url)`)
        .eq("id", threadId)
        .single();

      if (threadData) setThread(threadData as any);

      const { data: replyData } = await supabase
        .from("thread_replies")
        .select(`*, author:users!thread_replies_author_id_fkey(id, name, avatar_url)`)
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      if (replyData) setReplies(replyData as any);
      setLoading(false);
    };
    if (threadId) fetchThread();
  }, [threadId]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please sign in to reply");
      return;
    }
    if (!replyText.trim()) return;

    setSubmitting(true);
    const { data, error } = await supabase
      .from("thread_replies")
      .insert({
        thread_id: threadId,
        author_id: userId,
        body: replyText.trim(),
      })
      .select(`*, author:users!thread_replies_author_id_fkey(id, name, avatar_url)`)
      .single();

    if (error) {
      toast.error("Failed to post reply");
    } else if (data) {
      setReplies((prev) => [...prev, data as any]);
      setReplyText("");
      toast.success("Reply posted!");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Skeleton className="mb-6 h-8 w-48" />
        <Skeleton className="mb-4 h-6 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-medium text-foreground">Thread not found</p>
        <Link href="/community" className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to Community
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link
        href="/community"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community
      </Link>

      {/* Thread */}
      <article className="mb-8 rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <UserIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">
              {thread.author?.name || "Anonymous"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(thread.created_at)}
            </p>
          </div>
          <span className="ml-auto rounded-full bg-secondary px-3 py-0.5 text-xs text-muted-foreground">
            {thread.category}
          </span>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-card-foreground">
          {thread.title}
        </h1>
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground/90">
          {thread.body}
        </div>
      </article>

      {/* Replies */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <MessageSquare className="h-5 w-5" />
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>
      </div>

      {replies.length > 0 ? (
        <div className="space-y-4 mb-8">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                  <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  {reply.author?.name || "Anonymous"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(reply.created_at)}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground/90">
                {reply.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-8 text-sm text-muted-foreground">
          No replies yet. Be the first to respond!
        </p>
      )}

      {/* Reply form */}
      {userId ? (
        <form onSubmit={handleReply} className="rounded-xl border border-border bg-card p-5">
          <textarea
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none resize-none"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !replyText.trim()}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              {submitting ? "Posting..." : "Reply"}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <p className="text-sm text-muted-foreground">
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>{" "}
            to reply to this thread
          </p>
        </div>
      )}
    </div>
  );
}
