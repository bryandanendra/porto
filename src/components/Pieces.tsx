import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, KEYWORDS } from "../theme";
import { DISPLAY, MONO } from "../fonts";
import { CHARTS, CHART_H, CHART_W } from "../charts/Charts";
import type { TimedSegment, Word } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SPLIT = 960;

// ---------------------------------------------------------------- speaker
export const Speaker: React.FC<{ seg: TimedSegment; enter: boolean }> = ({ seg, enter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const split = seg.layout === "split";
  // Short audio fades so hard cuts don't click.
  const fade = 3;
  const volume = (f: number) =>
    interpolate(f, [0, fade, seg.frames - fade, seg.frames], [0, 1, 1, 0], clamp);
  const push = interpolate(frame, [0, seg.frames], [0, 0.04], clamp);
  const punch = enter ? 0 : spring({ frame, fps, config: { damping: 18, stiffness: 220 } });
  const zoom = (seg.zoom ?? 1) + push + (1 - punch) * 0.06;
  const video = (
    <OffthreadVideo
      src={staticFile(`clips/${seg.clip}.mp4`)}
      trimBefore={Math.round(seg.from * fps)}
      volume={volume}
      style={{ width: 1080, height: 1920, objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: `50% ${seg.faceY}px` }}
    />
  );
  if (!split) return <AbsoluteFill style={{ backgroundColor: C.bg }}>{video}</AbsoluteFill>;
  // bottom half: frame the face in the middle of the lower 960px
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div style={{ position: "absolute", top: SPLIT, left: 0, width: 1080, height: 1920 - SPLIT, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: (1920 - SPLIT) / 2 - seg.faceY }}>{video}</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- chart panel (top half)
export const ChartPanel: React.FC<{ seg: TimedSegment; enter: boolean }> = ({ seg, enter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!seg.chart) return null;
  const { C: Chart, title } = CHARTS[seg.chart];
  const slide = enter ? spring({ frame, fps, config: { damping: 20, stiffness: 140 } }) : 1;
  const titleIn = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: SPLIT,
        transform: `translateY(${(slide - 1) * SPLIT}px)`,
        background: `radial-gradient(120% 80% at 50% 0%, #121a28 0%, ${C.panel} 60%, ${C.bg} 100%)`,
        borderBottom: `4px solid rgba(255,255,255,0.08)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 34,
          letterSpacing: 2,
          color: C.text,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -20}px)`,
        }}
      >
        <span style={{ color: C.muted }}>// </span>
        {title}
      </div>
      <div style={{ position: "absolute", left: 40, top: 190, width: CHART_W, height: CHART_H }}>
        <Chart frame={frame} fps={fps} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- word-by-word captions
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");

const chunk = (words: Word[]) => {
  const out: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const gap = words[i + 1] ? words[i + 1].s - w.e : 1;
    if (cur.length >= 3 || /[,.]$/.test(w.w) || gap > 0.35) {
      out.push(cur);
      cur = [];
    }
  });
  if (cur.length) out.push(cur);
  return out;
};

export const Captions: React.FC<{ seg: TimedSegment }> = ({ seg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const chunks = chunk(seg.words);
  const idx = chunks.findIndex((c, i) => t >= c[0].s - 0.05 && (i === chunks.length - 1 || t < chunks[i + 1][0].s - 0.05));
  if (idx < 0) return null;
  const c = chunks[idx];
  const sinceIn = frame - Math.round((c[0].s - 0.05) * fps);
  const inS = spring({ frame: sinceIn, fps, config: { damping: 13, stiffness: 260, mass: 0.5 } });
  const top = seg.layout === "split" ? SPLIT - 48 : seg.overlay === "outro" ? 1180 : 1300;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 60,
        right: 60,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 22px",
        fontFamily: DISPLAY,
        fontWeight: 900,
        fontSize: 84,
        lineHeight: 1.05,
        textTransform: "uppercase",
        transform: `scale(${0.85 + 0.15 * inS})`,
        opacity: Math.min(1, inS * 1.5),
      }}
    >
      {c.map((w, i) => {
        const active = t >= w.s - 0.03;
        const key = KEYWORDS[clean(w.w)];
        const color = active ? key ?? C.text : "rgba(245,247,250,0.72)";
        return (
          <span
            key={i}
            style={{
              color,
              textShadow: "0 6px 0 rgba(0,0,0,0.55), 0 0 30px rgba(0,0,0,0.6)",
              WebkitTextStroke: "3px rgba(0,0,0,0.65)",
              paintOrder: "stroke fill",
            }}
          >
            {w.w.replace(/[,.]$/, "")}
          </span>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------- overlays for the full-frame segments
export const ShhOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = ["HERE'S WHAT", "NOBODY TELLS YOU"];
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 520 }}>
      {lines.map((l, i) => {
        const s = spring({ frame: frame - 4 - i * 6, fps, config: { damping: 12, stiffness: 220 } });
        return (
          <div
            key={l}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: i ? 96 : 64,
              color: i ? C.gold : C.text,
              textShadow: "0 6px 0 rgba(0,0,0,0.6)",
              transform: `scale(${s})`,
              opacity: s,
            }}
          >
            {l}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const OutroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // cue times relative to the outro segment start (seconds)
  const random = spring({ frame: frame - 0.55 * fps, fps, config: { damping: 14 } });
  const strike = interpolate(frame, [0.95 * fps, 1.25 * fps], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const chips: [string, number, string][] = [
    ["MAP VALUE", 1.65, C.value],
    ["DEFINE BIAS", 2.3, C.gold],
    ["FRAME EVERY SESSION", 3.1, C.up],
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position: "relative",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 44,
            color: C.down,
            padding: "14px 28px",
            border: `3px solid ${C.down}`,
            borderRadius: 14,
            background: "rgba(7,9,13,0.75)",
            transform: `scale(${random})`,
            opacity: random * (1 - strike * 0.45),
          }}
        >
          RANDOM LINES
          <div style={{ position: "absolute", left: 16, top: "50%", height: 6, width: `calc(${strike * 100}% - 32px)`, background: C.down }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 1440, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {chips.map(([label, sec, color]) => {
          const s = spring({ frame: frame - sec * fps, fps, config: { damping: 12, stiffness: 200 } });
          return (
            <div
              key={label}
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 46,
                color: C.bg,
                background: color,
                padding: "12px 30px",
                borderRadius: 14,
                transform: `translateX(${(1 - s) * 120}px)`,
                opacity: Math.min(1, s),
              }}
            >
              ✓ {label}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- end card
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines: [string, string][] = [
    ["MAP VALUE.", C.value],
    ["DEFINE BIAS.", C.gold],
    ["TRADE THE SESSION.", C.up],
  ];
  const candles = [0.5, 0.8, 0.6, 1.0, 1.35];
  const follow = spring({ frame: frame - 26, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 40%, #121a28 0%, ${C.bg} 70%)`, alignItems: "center", justifyContent: "center" }}>
      <svg width={360} height={240} viewBox="0 0 360 240" style={{ marginBottom: 60 }}>
        {candles.map((h, i) => {
          const s = spring({ frame: frame - i * 3, fps, config: { damping: 14 } });
          const bh = 120 * h * s;
          const x = 40 + i * 70;
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={220 - bh - 20} y2={225} stroke={C.up} strokeWidth={5} opacity={s} />
              <rect x={x - 18} y={210 - bh} width={36} height={bh} rx={4} fill={C.up} />
            </g>
          );
        })}
      </svg>
      {lines.map(([l, color], i) => {
        const s = spring({ frame: frame - 6 - i * 5, fps, config: { damping: 13, stiffness: 200 } });
        return (
          <div key={l} style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 92, color, transform: `translateY(${(1 - s) * 40}px)`, opacity: s }}>
            {l}
          </div>
        );
      })}
      <div
        style={{
          marginTop: 70,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 40,
          color: C.text,
          border: `3px solid ${C.text}`,
          borderRadius: 999,
          padding: "14px 40px",
          opacity: follow,
          transform: `scale(${follow})`,
        }}
      >
        FOLLOW FOR MORE
      </div>
    </AbsoluteFill>
  );
};
