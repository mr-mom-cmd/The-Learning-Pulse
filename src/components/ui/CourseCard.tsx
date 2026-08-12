"use client";

import { ExternalLink, Clock, Bookmark, BookmarkCheck } from "lucide-react";
import type { Course } from "@/lib/types";
import {
  cn,
  getCategoryColor,
  getCostBadge,
  getDurationLabel,
  getModeIcon,
} from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

interface CourseCardProps {
  course: Course;
  isBookmarked?: boolean;
  showBookmark?: boolean;
}

export default function CourseCard({
  course,
  isBookmarked = false,
  showBookmark = true,
}: CourseCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Sign in to bookmark courses");
      setLoading(false);
      return;
    }

    if (bookmarked) {
      await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", course.id);
      setBookmarked(false);
      toast.success("Bookmark removed");
    } else {
      await supabase
        .from("bookmarks")
        .insert({ user_id: user.id, course_id: course.id });
      setBookmarked(true);
      toast.success("Course bookmarked!");
    }
    setLoading(false);
  };

  const categoryLabel =
    CATEGORIES.find((c) => c.value === course.category)?.label ||
    course.category;

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
      {showBookmark && (
        <button
          onClick={toggleBookmark}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark course"}
        >
          {bookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-primary" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            getCategoryColor(course.category)
          )}
        >
          {categoryLabel}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
            getCostBadge(course.cost)
          )}
        >
          {course.cost}
        </span>
      </div>

      <h3 className="mb-2 text-base font-semibold text-card-foreground line-clamp-2">
        {course.title}
      </h3>
      <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
        {course.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span>{getModeIcon(course.mode)}</span>
          <span className="capitalize">{course.mode.replace("_", "-")}</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {getDurationLabel(course.duration)}
        </span>
      </div>

      <a
        href={course.external_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        Learn More
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
