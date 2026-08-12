"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Thread } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { Trash2, Pin, PinOff, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import toast from "react-hot-toast";

export default function AdminCommunity() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchThreads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("threads")
      .select(`
        *,
        author:users!threads_author_id_fkey(id, name),
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
    setLoading(false);
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const togglePin = async (id: string, isPinned: boolean) => {
    const { error } = await supabase
      .from("threads")
      .update({ is_pinned: !isPinned })
      .eq("id", id);
    if (!error) {
      toast.success(isPinned ? "Unpinned" : "Pinned!");
      fetchThreads();
    }
  };

  const deleteThread = async (id: string) => {
    await supabase.from("thread_replies").delete().eq("thread_id", id);
    const { error } = await supabase.from("threads").delete().eq("id", id);
    if (!error) {
      toast.success("Thread deleted");
      fetchThreads();
    }
  };

  const deleteReply = async (replyId: string) => {
    const { error } = await supabase.from("thread_replies").delete().eq("id", replyId);
    if (!error) {
      toast.success("Reply deleted");
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Community Moderation</h1>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <MessageSquare className="mx-auto mb-4 h-12 w-12" />
          <p>No threads yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    {thread.is_pinned && (
                      <Pin className="h-3.5 w-3.5 text-primary" />
                    )}
                    <h3 className="font-semibold text-foreground truncate">
                      {thread.title}
                    </h3>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground line-clamp-1">
                    {thread.body}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{thread.author?.name || "Anonymous"}</span>
                    <span>{timeAgo(thread.created_at)}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5">
                      {thread.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {thread.reply_count} replies
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => togglePin(thread.id, thread.is_pinned)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    title={thread.is_pinned ? "Unpin" : "Pin"}
                  >
                    {thread.is_pinned ? (
                      <PinOff className="h-4 w-4" />
                    ) : (
                      <Pin className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteThread(thread.id)}
                    className="rounded-lg p-2 text-destructive hover:bg-red-50"
                    title="Delete thread"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
