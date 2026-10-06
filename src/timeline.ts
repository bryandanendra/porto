import words from "./words.json";

export const FPS = 30;

export type ClipName = "scene1" | "scene2" | "scene3" | "speaker" | "scene6" | "scene7";
export type ChartKey = "messyLines" | "chop" | "expansion" | "fvt" | "bearish";

export type Word = { w: string; s: number; e: number };

export type Segment = {
  id: string;
  clip: ClipName;
  /** source in/out points, seconds */
  from: number;
  to: number;
  layout: "full" | "split";
  chart?: ChartKey;
  /** y (px, source frame) of the speaker's face, used to frame the bottom half in split layout */
  faceY: number;
  /** extra zoom on the speaker for jump-cut punch-ins */
  zoom?: number;
  overlay?: "shh" | "outro";
};

// Story order: hook -> the secret -> why ranges chop you -> what the real move is
// -> the tool (fair value trail) -> how to read it -> payoff.
export const SEGMENTS: Segment[] = [
  { id: "hookA", clip: "scene1", from: 0.65, to: 2.7, layout: "full", faceY: 850, zoom: 1.0 },
  { id: "hookB", clip: "scene1", from: 3.95, to: 9.15, layout: "split", chart: "messyLines", faceY: 830, zoom: 1.1 },
  { id: "shh", clip: "scene2", from: 0.0, to: 2.2, layout: "full", faceY: 700, overlay: "shh" },
  { id: "chop", clip: "scene7", from: 0.0, to: 7.45, layout: "split", chart: "chop", faceY: 680, zoom: 1.1 },
  { id: "expansion", clip: "speaker", from: 0.0, to: 3.4, layout: "split", chart: "expansion", faceY: 700, zoom: 1.1 },
  { id: "fvt", clip: "scene3", from: 1.0, to: 5.3, layout: "split", chart: "fvt", faceY: 700, zoom: 1.1 },
  { id: "bearish", clip: "scene6", from: 1.9, to: 5.15, layout: "split", chart: "bearish", faceY: 690, zoom: 1.1 },
  { id: "outro", clip: "speaker", from: 3.45, to: 7.85, layout: "full", faceY: 900, zoom: 1.04, overlay: "outro" },
];

export const END_CARD_FRAMES = Math.round(2.2 * FPS);

export type TimedSegment = Segment & { start: number; frames: number; words: Word[] };

const transcript = words as Record<string, { words: Word[] }>;

let cursor = 0;
export const TIMED: TimedSegment[] = SEGMENTS.map((seg) => {
  const frames = Math.round((seg.to - seg.from) * FPS);
  const start = cursor;
  cursor += frames;
  const src = seg.clip === "scene2" ? [] : transcript[seg.clip].words;
  const segWords = src
    .filter((w) => w.s >= seg.from - 0.05 && w.s < seg.to)
    .map((w) => ({ w: w.w, s: Math.max(0, w.s - seg.from), e: Math.min(seg.to, w.e) - seg.from }));
  return { ...seg, start, frames, words: segWords };
});

export const END_CARD_START = cursor;
export const TOTAL_FRAMES = cursor + END_CARD_FRAMES;
