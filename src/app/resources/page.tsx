import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, ExternalLink, GraduationCap, Lightbulb, Globe, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description: "Learn about formal and non-formal education, lifelong learning, and SDG 4.3.1.",
};

const categoryIcons: Record<string, any> = {
  formal_education: GraduationCap,
  non_formal: Lightbulb,
  lifelong_learning: BookOpen,
  sdg_info: Globe,
  external_link: ExternalLink,
};

const categoryLabels: Record<string, string> = {
  formal_education: "Formal Education",
  non_formal: "Non-Formal Education",
  lifelong_learning: "Lifelong Learning",
  sdg_info: "SDG 4.3.1",
  external_link: "Useful Links",
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: resources } = await supabase
    .from("resources")
    .select("*")
    .order("order", { ascending: true });

  const grouped = (resources || []).reduce(
    (acc, r) => {
      const key = r.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    },
    {} as Record<string, typeof resources>
  );

  const categoryOrder = [
    "formal_education",
    "non_formal",
    "lifelong_learning",
    "sdg_info",
    "external_link",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Learn about education types, lifelong learning, and SDG 4.3.1
        </p>
      </div>

      <div className="space-y-10">
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          const Icon = categoryIcons[cat] || FileText;

          return (
            <section key={cat}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {categoryLabels[cat] || cat}
                </h2>
              </div>

              {cat === "external_link" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((item: any) => (
                    <a
                      key={item.id}
                      href={item.external_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <ExternalLink className="h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-card-foreground truncate">
                          {item.title}
                        </h3>
                        {item.content && (
                          <p className="text-xs text-muted-foreground truncate">
                            {item.content}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                        {item.title}
                      </h3>
                      <div className="prose prose-sm max-w-none text-card-foreground/90 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1">
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {(!resources || resources.length === 0) && (
        <div className="py-16 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">No resources yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon for educational resources and guides
          </p>
        </div>
      )}
    </div>
  );
}
