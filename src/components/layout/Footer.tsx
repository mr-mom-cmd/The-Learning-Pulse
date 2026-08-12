import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <BookOpen className="h-5 w-5 text-primary" />
              The Learning Pulse
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Empowering lifelong learning and supporting UN SDG 4.3.1 — equal
              access to quality education and training for all.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/courses", label: "Browse Courses" },
                { href: "/quiz", label: "Find My Path" },
                { href: "/community", label: "Community" },
                { href: "/resources", label: "Resources" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Learn More</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/resources", label: "What is SDG 4.3.1?" },
                { href: "/submit", label: "Submit a Course" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">SDG 4.3.1</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Participation rate of youth and adults in formal and non-formal
              education and training in the previous 12 months.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} The Learning Pulse — An APU Student Project for SDG 4.3.1
          </p>
        </div>
      </div>
    </footer>
  );
}
