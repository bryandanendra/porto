export const C = {
  bg: "#07090d",
  panel: "#0b0f16",
  grid: "rgba(255,255,255,0.05)",
  text: "#f5f7fa",
  muted: "rgba(245,247,250,0.55)",
  up: "#22d38a",
  down: "#ff4d5e",
  value: "#3b82f6",
  gold: "#ffd43b",
};

// Words that get a highlight colour in the captions.
export const KEYWORDS: Record<string, string> = {
  wrong: C.down,
  reaction: C.down,
  accepting: C.up,
  value: C.up,
  chopped: C.down,
  balancing: C.gold,
  balance: C.gold,
  momentum: C.up,
  expands: C.up,
  fair: C.value,
  trail: C.value,
  holding: C.up,
  below: C.down,
  bearish: C.down,
  random: C.down,
  bias: C.gold,
  map: C.value,
  session: C.gold,
};
