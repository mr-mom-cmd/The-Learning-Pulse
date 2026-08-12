export type UserRole = "user" | "admin";
export type CourseCategory =
  | "technology"
  | "business"
  | "creative"
  | "health"
  | "vocational";
export type CourseCost = "free" | "paid" | "scholarship";
export type CourseMode = "online" | "in_person" | "hybrid";
export type CourseDuration = "short" | "medium" | "long";
export type EducationType = "formal" | "non_formal" | "vocational";
export type CourseStatus = "approved" | "pending" | "rejected";
export type ResourceCategory =
  | "formal_education"
  | "non_formal"
  | "lifelong_learning"
  | "sdg_info"
  | "external_link";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  cost: CourseCost;
  mode: CourseMode;
  duration: CourseDuration;
  education_type: EducationType;
  external_url: string;
  status: CourseStatus;
  submitted_by: string | null;
  featured: boolean;
  created_at: string;
}

export interface QuizResult {
  id: string;
  user_id: string | null;
  participated_12_months: boolean;
  education_level: string;
  interest_field: string;
  learning_goal: string;
  preferred_mode: string;
  budget: string;
  time_commitment: string;
  recommended_course_ids: string[];
  created_at: string;
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  author_id: string;
  category: string;
  is_pinned: boolean;
  created_at: string;
  author?: User;
  reply_count?: number;
}

export interface ThreadReply {
  id: string;
  thread_id: string;
  author_id: string;
  body: string;
  created_at: string;
  author?: User;
}

export interface Resource {
  id: string;
  title: string;
  content: string;
  category: ResourceCategory;
  external_url: string | null;
  order: number;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
}

export interface CourseFilters {
  search?: string;
  category?: CourseCategory;
  cost?: CourseCost;
  mode?: CourseMode;
  duration?: CourseDuration;
  education_type?: EducationType;
  sort?: "newest" | "alphabetical" | "duration";
  page?: number;
}
