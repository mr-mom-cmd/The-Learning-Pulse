export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(date: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );
  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count}${interval.label} ago`;
  }
  return "just now";
}

export function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    technology: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    business: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    creative: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    health: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    vocational: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}

export function getCostBadge(cost: string) {
  const badges: Record<string, string> = {
    free: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    paid: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
    scholarship: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  };
  return badges[cost] || "bg-gray-100 text-gray-800";
}

export function getDurationLabel(duration: string) {
  const labels: Record<string, string> = {
    short: "1–4 weeks",
    medium: "1–6 months",
    long: "6+ months",
  };
  return labels[duration] || duration;
}

export function getModeIcon(mode: string) {
  const icons: Record<string, string> = {
    online: "🌐",
    in_person: "🏫",
    hybrid: "🔄",
  };
  return icons[mode] || "📚";
}
