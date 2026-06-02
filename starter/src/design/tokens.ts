import { fontFamily, monoFamily } from "./fonts";

// ---------------------------------------------------------------------------
// Colors — light product UI (matches real TubeGen screenshots)
// ---------------------------------------------------------------------------
export const C = {
  // Canvas / surfaces
  canvas: "#F5F6FA",
  canvasTint: "#EEF0F8",
  card: "#FFFFFF",
  cardMuted: "#F7F8FB",
  tabBar: "#F1F2F7",

  // Brand
  indigo: "#3B5BF5",
  indigoSoft: "#E8ECFE",
  indigoText: "#3B5BF5",
  red: "#FF0033",
  redSoft: "#FCE4E7",

  // Semantic
  green: "#22C55E",
  greenSoft: "#DCFCE7",
  gold: "#F59E0B",
  goldSoft: "#FEF3C7",

  // Text
  ink: "#0B1220",
  inkSoft: "#475569",
  inkMuted: "#94A3B8",

  // Lines
  border: "#E7E9F0",
  borderStrong: "#D4D8E3",
};

export const RADIUS = { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 };

export const SHADOW = {
  window: "0 30px 80px rgba(2,6,23,0.10), 0 2px 8px rgba(2,6,23,0.04)",
  card: "0 1px 2px rgba(2,6,23,0.04), 0 8px 24px rgba(2,6,23,0.05)",
  button: "0 8px 20px rgba(59,91,245,0.35)",
};

export const FONT = { family: fontFamily, mono: monoFamily };

export const TEXT = {
  hero:  { fontSize: 88, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.02 },
  h1:    { fontSize: 52, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.08 },
  h2:    { fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 },
  h3:    { fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" },
  body:  { fontSize: 19, fontWeight: 400, lineHeight: 1.55 },
  sm:    { fontSize: 15, fontWeight: 500 },
  label: { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const },
};

export const SPACE = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 };

// Spring configs (kept from scaffold)
export const SPRING = {
  snappy: { stiffness: 200, damping: 22, mass: 1 },
  smooth: { stiffness: 80, damping: 20, mass: 1 },
  bouncy: { stiffness: 120, damping: 12, mass: 1 },
  gentle: { stiffness: 60, damping: 15, mass: 1 },
};

export const TABS = [
  "Title", "Script", "Voiceover", "Visuals", "Thumbnail", "Soundtrack", "Video",
] as const;
export type TabName = (typeof TABS)[number];
