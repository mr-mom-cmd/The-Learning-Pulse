"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Resource, ResourceCategory } from "@/lib/types";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import toast from "react-hot-toast";

const RESOURCE_CATEGORIES: { value: ResourceCategory; label: string }[] = [
  { value: "formal_education", label: "Formal Education" },
  { value: "non_formal", label: "Non-Formal Education" },
  { value: "lifelong_learning", label: "Lifelong Learning" },
  { value: "sdg_info", label: "SDG 4.3.1 Info" },
  { value: "external_link", label: "External Link" },
];

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "formal_education" as ResourceCategory,
    external_url: "",
    order: 0,
  });
  const supabase = createClient();

  const fetchResources = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("category")
      .order("order", { ascending: true });
    setResources(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("resources").insert(form);
    if (error) {
      toast.error("Failed to add resource");
    } else {
      toast.success("Resource added!");
      setShowAdd(false);
      setForm({ title: "", content: "", category: "formal_education", external_url: "", order: 0 });
      fetchResources();
    }
  };

  const handleEdit = async (id: string) => {
    const { error } = await supabase.from("resources").update(form).eq("id", id);
    if (error) {
      toast.error("Failed to update");
    } else {
      toast.success("Updated!");
      setEditingId(null);
      fetchResources();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (!error) {
      toast.success("Deleted!");
      fetchResources();
    }
  };

  const startEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setForm({
      title: resource.title,
      content: resource.content,
      category: resource.category,
      external_url: resource.external_url || "",
      order: resource.order,
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Resource Management</h1>
        <button
          onClick={() => {
            setShowAdd(!showAdd);
            setEditingId(null);
          }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Resource
        </button>
      </div>

      {/* Add/Edit form */}
      {(showAdd || editingId) && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editingId) handleEdit(editingId);
            else handleAdd(e);
          }}
          className="mb-6 rounded-xl border border-border bg-card p-5 animate-fade-in"
        >
          <h3 className="mb-4 font-semibold text-foreground">
            {editingId ? "Edit Resource" : "Add New Resource"}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
            />
            <textarea
              placeholder="Content (HTML supported)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={5}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none resize-none font-mono"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as ResourceCategory })
                }
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              >
                {RESOURCE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <input
                type="url"
                placeholder="External URL (optional)"
                value={form.external_url}
                onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              />
              <input
                type="number"
                placeholder="Order"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Save className="h-4 w-4" />
              {editingId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAdd(false);
                setEditingId(null);
              }}
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Resource list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : resources.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          No resources yet
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{resource.title}</h3>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {RESOURCE_CATEGORIES.find((c) => c.value === resource.category)?.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => startEdit(resource)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="rounded-lg p-2 text-destructive hover:bg-red-50"
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
