"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Course } from "@/lib/types";
import { CATEGORIES, COSTS, MODES, DURATIONS, EDUCATION_TYPES } from "@/lib/constants";
import { formatDate, cn, getCategoryColor } from "@/lib/utils";
import { Plus, Pencil, Trash2, Check, X, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "technology",
    cost: "free",
    mode: "online",
    duration: "short",
    education_type: "formal",
    external_url: "",
    featured: false,
  });
  const supabase = createClient();

  const fetchCourses = async () => {
    setLoading(true);
    let query = supabase.from("courses").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setCourses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("courses").insert({
      ...form,
      status: "approved",
    });
    if (error) {
      toast.error("Failed to add course");
    } else {
      toast.success("Course added!");
      setShowAdd(false);
      setForm({
        title: "", description: "", category: "technology", cost: "free",
        mode: "online", duration: "short", education_type: "formal",
        external_url: "", featured: false,
      });
      fetchCourses();
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("courses").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Course ${status}`);
      fetchCourses();
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from("courses")
      .update({ featured: !featured })
      .eq("id", id);
    if (!error) {
      toast.success(featured ? "Unfeatured" : "Featured!");
      fetchCourses();
    }
  };

  const deleteCourse = async (id: string) => {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Course deleted");
      fetchCourses();
    }
  };

  const statusCounts = {
    all: courses.length,
    approved: courses.filter((c) => c.status === "approved").length,
    pending: courses.filter((c) => c.status === "pending").length,
    rejected: courses.filter((c) => c.status === "rejected").length,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 rounded-xl border border-border bg-card p-5 animate-fade-in"
        >
          <h3 className="mb-4 font-semibold text-foreground">Add New Course</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Course Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none resize-none"
              />
            </div>
            <input
              type="url"
              placeholder="External URL"
              value={form.external_url}
              onChange={(e) => setForm({ ...form, external_url: e.target.value })}
              required
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none sm:col-span-2"
            />
            {[
              { key: "category", options: CATEGORIES },
              { key: "cost", options: COSTS },
              { key: "mode", options: MODES },
              { key: "duration", options: DURATIONS },
              { key: "education_type", options: EDUCATION_TYPES },
            ].map((field) => (
              <select
                key={field.key}
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              >
                {field.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ))}
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded"
              />
              Featured
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Add Course
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Filter tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-secondary p-1">
        {(["all", "approved", "pending", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${
              filter === s
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Course table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {courses.map((course) => (
              <tr key={course.id} className="bg-card hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {course.featured && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                    <span className="font-medium text-foreground max-w-xs truncate block">
                      {course.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", getCategoryColor(course.category))}>
                    {CATEGORIES.find((c) => c.value === course.category)?.label || course.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      course.status === "approved" && "bg-emerald-100 text-emerald-800",
                      course.status === "pending" && "bg-amber-100 text-amber-800",
                      course.status === "rejected" && "bg-red-100 text-red-800"
                    )}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(course.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {course.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(course.id, "approved")}
                          className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(course.id, "rejected")}
                          className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => toggleFeatured(course.id, course.featured)}
                      className={cn(
                        "rounded-lg p-1.5 hover:bg-secondary",
                        course.featured ? "text-amber-500" : "text-muted-foreground"
                      )}
                      title="Toggle featured"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="rounded-lg p-1.5 text-destructive hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
}
