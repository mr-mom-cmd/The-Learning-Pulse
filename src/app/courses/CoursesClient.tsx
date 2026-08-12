"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import CourseCard from "@/components/ui/CourseCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { CATEGORIES, COSTS, MODES, DURATIONS, EDUCATION_TYPES, ITEMS_PER_PAGE } from "@/lib/constants";
import type { Course, CourseFilters } from "@/lib/types";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursesClient() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<CourseFilters>({
    search: "",
    sort: "newest",
    page: 1,
  });

  const supabase = createClient();

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("courses")
      .select("*", { count: "exact" })
      .eq("status", "approved");

    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }
    if (filters.category) query = query.eq("category", filters.category);
    if (filters.cost) query = query.eq("cost", filters.cost);
    if (filters.mode) query = query.eq("mode", filters.mode);
    if (filters.duration) query = query.eq("duration", filters.duration);
    if (filters.education_type) query = query.eq("education_type", filters.education_type);

    if (filters.sort === "alphabetical") {
      query = query.order("title", { ascending: true });
    } else if (filters.sort === "duration") {
      query = query.order("duration", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const page = filters.page || 1;
    const from = (page - 1) * ITEMS_PER_PAGE;
    query = query.range(from, from + ITEMS_PER_PAGE - 1);

    const { data, count } = await query;
    setCourses(data || []);
    setTotal(count || 0);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("bookmarks")
          .select("course_id")
          .eq("user_id", user.id);
        if (data) {
          setBookmarkedIds(new Set(data.map((b) => b.course_id)));
        }
      }
    };
    loadBookmarks();
  }, []);

  const updateFilter = (key: keyof CourseFilters, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ search: "", sort: "newest", page: 1 });
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const activeFilterCount = [
    filters.category,
    filters.cost,
    filters.mode,
    filters.duration,
    filters.education_type,
  ].filter(Boolean).length;

  const filterGroups = [
    { key: "category" as const, label: "Category", options: CATEGORIES },
    { key: "cost" as const, label: "Cost", options: COSTS },
    { key: "mode" as const, label: "Learning Mode", options: MODES },
    { key: "duration" as const, label: "Duration", options: DURATIONS },
    { key: "education_type" as const, label: "Education Type", options: EDUCATION_TYPES },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse Courses</h1>
        <p className="mt-2 text-muted-foreground">
          Explore {total} learning opportunities across all categories
        </p>
      </div>

      {/* Search + Sort + Filter toggle */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value || undefined)}
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={filters.sort || "newest"}
            onChange={(e) =>
              updateFilter("sort", e.target.value as CourseFilters["sort"])
            }
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="alphabetical">A–Z</option>
            <option value="duration">Duration</option>
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              filtersOpen
                ? "border-primary bg-primary-light text-primary"
                : "border-border bg-card text-foreground hover:bg-secondary"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="mb-6 rounded-xl border border-border bg-card p-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Filters</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {filterGroups.map((group) => (
              <div key={group.key}>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {group.label}
                </label>
                <select
                  value={(filters[group.key] as string) || ""}
                  onChange={(e) =>
                    updateFilter(group.key, e.target.value || undefined)
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none"
                >
                  <option value="">All</option>
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {filterGroups.map((group) => {
            const value = filters[group.key] as string;
            if (!value) return null;
            const label = group.options.find((o) => o.value === value)?.label || value;
            return (
              <button
                key={group.key}
                onClick={() => updateFilter(group.key, undefined)}
                className="flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
              >
                {label}
                <X className="h-3 w-3" />
              </button>
            );
          })}
        </div>
      )}

      {/* Course grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="mb-1 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-2/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-foreground">No courses found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isBookmarked={bookmarkedIds.has(course.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() =>
                  setFilters((p) => ({ ...p, page: (p.page || 1) - 1 }))
                }
                disabled={(filters.page || 1) <= 1}
                className="rounded-lg border border-border bg-card p-2 text-foreground disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm text-muted-foreground">
                Page {filters.page || 1} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setFilters((p) => ({ ...p, page: (p.page || 1) + 1 }))
                }
                disabled={(filters.page || 1) >= totalPages}
                className="rounded-lg border border-border bg-card p-2 text-foreground disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
