// ─── Scraper ──────────────────────────────────────────────────────────────────

export interface InstagramPost {
  imageUrl: string;
  caption: string;
  likes?: number;
  url?: string;
}

export interface ScrapeResult {
  handle: string;
  username: string;
  bio: string;
  avatarUrl: string;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
  externalLinks: string[];
  recentPosts: InstagramPost[];
  scrapedAt: string;
}

// ─── Brand Identity (LLM output) ──────────────────────────────────────────────

export interface ColorPalette {
  primary: string;       // e.g. "#1a1a2e"
  secondary: string;     // e.g. "#e94560"
  accent: string;        // e.g. "#f5a623"
  background: string;    // e.g. "#0f0f1a"
  text: string;          // e.g. "#ffffff"
  textMuted: string;     // e.g. "#a0a0b0"
}

export type FontStyle = "serif" | "sans-serif" | "display" | "mono";
export type LayoutStyle = "editorial" | "minimal" | "bold" | "elegant" | "vibrant";
export type ToneType = "professional" | "playful" | "luxurious" | "edgy" | "warm" | "neutral";

export interface BrandIdentity {
  niche: string;           // e.g. "Luxury Travel"
  tone: ToneType;
  palette: ColorPalette;
  headingFont: string;     // e.g. "Playfair Display"
  bodyFont: string;        // e.g. "Inter"
  fontStyle: FontStyle;
  layoutStyle: LayoutStyle;
  tagline: string;         // AI-generated tagline for the creator
  about: string;           // Rewritten bio with brand tone
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export type SectionType =
  | "hero"
  | "about"
  | "content-grid"
  | "links"
  | "footer";

export interface SiteSection {
  type: SectionType;
  order: number;
  visible: boolean;
}

export interface LinkItem {
  label: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  handle: string;
  slug: string;
  username: string;
  avatarUrl: string;
  brandIdentity: BrandIdentity;
  sections: SiteSection[];
  links: LinkItem[];
  posts: InstagramPost[];
  publishedAt: string;
}

// ─── Job System ───────────────────────────────────────────────────────────────

export type JobStatus = "pending" | "processing" | "done" | "failed";

export interface JobRecord {
  id: string;
  handle: string;
  status: JobStatus;
  reason?: string;
  siteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobProgressEvent {
  jobId: string;
  status: JobStatus;
  step?: "scraping" | "analyzing" | "saving" | "done";
  message?: string;
  reason?: string;
  siteUrl?: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface GenerateRequest {
  handle: string;
}

export interface GenerateResponse {
  jobId?: string;          // present when 202
  siteData?: SiteConfig;   // present when 200 (cache hit)
  cached: boolean;
}
