import React from "react";
import { C } from "../theme";
import { MONO } from "../fonts";

export type Candle = { o: number; h: number; l: number; c: number };

export const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Close prices that follow linearly-interpolated anchor points plus noise. */
export const walk = (anchors: [number, number][], noise: number, seed: number): number[] => {
  const r = rng(seed);
  const n = anchors[anchors.length - 1][0] + 1;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const k = anchors.findIndex(([x]) => x >= i);
    const [x1, y1] = anchors[Math.max(0, k - 1)];
    const [x2, y2] = anchors[k];
    const t = x2 === x1 ? 0 : (i - x1) / (x2 - x1);
    out.push(y1 + (y2 - y1) * t + (r() - 0.5) * 2 * noise);
  }
  return out;
};

export const toCandles = (closes: number[], wick: number, seed: number, firstOpen?: number): Candle[] => {
  const r = rng(seed);
  return closes.map((c, i) => {
    const o = i === 0 ? firstOpen ?? c - wick : closes[i - 1] + (r() - 0.5) * wick * 0.3;
    return { o, c, h: Math.max(o, c) + r() * wick, l: Math.min(o, c) - r() * wick };
  });
};

export const ema = (values: number[], len: number): number[] => {
  const k = 2 / (len + 1);
  const out: number[] = [];
  values.forEach((v, i) => out.push(i === 0 ? v : v * k + out[i - 1] * (1 - k)));
  return out;
};

export type Scale = {
  x: (i: number) => number;
  y: (p: number) => number;
  bw: number;
  W: number;
  H: number;
};

export const makeScale = (n: number, min: number, max: number, W: number, H: number, padX = 40, padY = 60): Scale => {
  const step = (W - padX * 2) / n;
  return {
    x: (i) => padX + (i + 0.5) * step,
    y: (p) => padY + ((max - p) / (max - min)) * (H - padY * 2),
    bw: step * 0.62,
    W,
    H,
  };
};

/** Candles revealed left-to-right. `visible` may be fractional: the newest candle grows from its open. */
export const Candles: React.FC<{ data: Candle[]; s: Scale; visible: number; dim?: (i: number) => number }> = ({
  data,
  s,
  visible,
  dim,
}) => (
  <g>
    {data.map((d, i) => {
      if (i >= Math.ceil(visible)) return null;
      const grow = Math.min(1, visible - i);
      const c = d.o + (d.c - d.o) * grow;
      const h = Math.max(d.o, c) + (d.h - Math.max(d.o, d.c)) * grow;
      const l = Math.min(d.o, c) - (Math.min(d.o, d.c) - d.l) * grow;
      const col = d.c >= d.o ? C.up : C.down;
      const top = s.y(Math.max(d.o, c));
      const bot = s.y(Math.min(d.o, c));
      return (
        <g key={i} opacity={dim ? dim(i) : 1}>
          <line x1={s.x(i)} x2={s.x(i)} y1={s.y(h)} y2={s.y(l)} stroke={col} strokeWidth={3} />
          <rect x={s.x(i) - s.bw / 2} y={top} width={s.bw} height={Math.max(3, bot - top)} fill={col} rx={2} />
        </g>
      );
    })}
  </g>
);

export const Grid: React.FC<{ s: Scale }> = ({ s }) => (
  <g>
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={`h${i}`} x1={0} x2={s.W} y1={(s.H / 8) * i} y2={(s.H / 8) * i} stroke={C.grid} strokeWidth={2} />
    ))}
    {Array.from({ length: 7 }).map((_, i) => (
      <line key={`v${i}`} y1={0} y2={s.H} x1={(s.W / 6) * i} x2={(s.W / 6) * i} stroke={C.grid} strokeWidth={2} />
    ))}
  </g>
);

/** Polyline path through points, cut off at `progress` (0..n) along the x index. */
export const linePath = (vals: number[], s: Scale, progress: number) => {
  const p = Math.min(progress, vals.length - 1);
  const pts: [number, number][] = [];
  for (let i = 0; i <= Math.floor(p); i++) pts.push([s.x(i), s.y(vals[i])]);
  const f = p - Math.floor(p);
  if (f > 0) {
    const i = Math.floor(p);
    pts.push([s.x(i + f), s.y(vals[i] + (vals[i + 1] - vals[i]) * f)]);
  }
  return pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
};

export const Tag: React.FC<{
  x: number;
  y: number;
  text: string;
  color: string;
  opacity?: number;
  scale?: number;
  anchor?: "start" | "middle" | "end";
  size?: number;
  solid?: boolean;
}> = ({ x, y, text, color, opacity = 1, scale = 1, anchor = "start", size = 30, solid = false }) => {
  const w = text.length * size * 0.62 + 32;
  const h = size + 22;
  const left = anchor === "start" ? 0 : anchor === "middle" ? -w / 2 : -w;
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
      <rect x={left} y={-h / 2} width={w} height={h} rx={10} fill={solid ? color : "rgba(7,9,13,0.85)"} stroke={color} strokeWidth={3} />
      <text
        x={left + w / 2}
        y={size * 0.36}
        textAnchor="middle"
        fontFamily={MONO}
        fontWeight={700}
        fontSize={size}
        fill={solid ? C.bg : color}
      >
        {text}
      </text>
    </g>
  );
};
