"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES, COSTS, MODES, DURATIONS, EDUCATION_TYPES } from "@/lib/constants";
import { Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function SubmitClient() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    cost: "",
    mode: "",
    duration: "",
    education_type: "",
    external_url: "",
  });
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    const { error } = await supabase.from("courses").insert({
      ...form,
      status: "pending",
      submitted_by: userId,
    });

    if (error) {
      toast.error("Failed to submit course");
    } else {
      setSubmitted(true);
      toast.success("Course submitted for review!");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Course Submitted!</h1>
          <p className="mt-2 text-muted-foreground">
            Your course has been submitted for review. Our admin team will review it shortly.
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const fields = [
    { key: "title", label: "Course Title", type: "text", placeholder: "e.g., Introduction to Python Programming" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Briefly describe what this course covers..." },
    { key: "external_url", label: "Course URL", type: "url", placeholder: "https://..." },
    { key: "category", label: "Category", type: "select", options: CATEGORIES },
    { key: "cost", label: "Cost", type: "select", options: COSTS },
    { key: "mode", label: "Learning Mode", type: "select", options: MODES },
    { key: "duration", label: "Duration", type: "select", options: DURATIONS },
    { key: "education_type", label: "Education Type", type: "select", options: EDUCATION_TYPES },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Submit a Course</h1>
        <p className="mt-2 text-muted-foreground">
          Know a great learning opportunity? Share it with the community.
          Submissions are reviewed before publishing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border bg-card p-6 space-y-5"
      >
        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={(form as any)[field.key]}
                onChange={(e) =>
                  setForm({ ...form, [field.key]: e.target.value })
                }
                required
                rows={4}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none resize-none"
              />
            ) : field.type === "select" ? (
              <select
                value={(form as any)[field.key]}
                onChange={(e) =>
                  setForm({ ...form, [field.key]: e.target.value })
                }
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={(form as any)[field.key]}
                onChange={(e) =>
                  setForm({ ...form, [field.key]: e.target.value })
                }
                required
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {loading ? "Submitting..." : "Submit for Review"}
        </button>
      </form>
    </div>
  );
}
