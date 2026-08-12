"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/community", label: "Community", icon: MessageSquare },
  { href: "/admin/resources", label: "Resources", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
        <div className="p-4">
          <Link
            href="/"
            className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <h2 className="mb-4 text-lg font-bold text-foreground">Admin Panel</h2>
          <nav className="space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary-light text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="w-full md:hidden">
        <div className="flex overflow-x-auto border-b border-border bg-card px-4">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-xs font-medium transition-colors",
                pathname === link.href
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </div>
        <div className="p-4">{children}</div>
      </div>

      {/* Desktop content */}
      <div className="hidden flex-1 overflow-auto p-6 md:block lg:p-8">
        {children}
      </div>
    </div>
  );
}
