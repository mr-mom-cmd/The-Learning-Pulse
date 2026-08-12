export const CATEGORIES = [
  { value: "technology", label: "Technology & IT" },
  { value: "business", label: "Business & Management" },
  { value: "creative", label: "Creative Arts & Design" },
  { value: "health", label: "Health & Sciences" },
  { value: "vocational", label: "Vocational & Trade Skills" },
] as const;

export const COSTS = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "scholarship", label: "Scholarship Available" },
] as const;

export const MODES = [
  { value: "online", label: "Online" },
  { value: "in_person", label: "In-person" },
  { value: "hybrid", label: "Hybrid" },
] as const;

export const DURATIONS = [
  { value: "short", label: "Short (1–4 weeks)" },
  { value: "medium", label: "Medium (1–6 months)" },
  { value: "long", label: "Long (6+ months)" },
] as const;

export const EDUCATION_TYPES = [
  { value: "formal", label: "Formal" },
  { value: "non_formal", label: "Non-Formal" },
  { value: "vocational", label: "Vocational" },
] as const;

export const THREAD_CATEGORIES = [
  "General Discussion",
  "Course Reviews",
  "Study Groups",
  "Career Advice",
  "Resources & Tips",
] as const;

export const ITEMS_PER_PAGE = 12;
