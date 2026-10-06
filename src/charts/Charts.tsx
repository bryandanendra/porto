import React from "react";
import { Easing, interpolate, spring } from "remotion";
import { C } from "../theme";
import { Candles, Grid, Tag, ema, linePath, makeScale, toCandles, walk } from "./lib";

export const CHART_W = 1000;
export const CHART_H = 740;

export type ChartProps = { frame: number; fps: number };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const at = (frame: number, fps: number, sec: number, dur = 0.35) =>
  interpolate(frame, [sec * fps, (sec + dur) * fps], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
const pop = (frame: number, fps: number, sec: number) =>
  spring({ frame: frame - sec * fps, fps, config: { damping: 11, stiffness: 180, mass: 0.6 } });

// ---------------------------------------------------------------- 1. marking every reaction vs value
const messy = toCandles(
  walk(
    [[0, 100], [6, 112], [9, 107], [14, 124], [17, 129], [20, 126], [24, 133], [27, 127], [31, 132], [34, 128], [38, 131], [41, 127], [44, 130]],
    1.5,
    7,
  ),
  2.2,
  11,
);
const messyLevels = messy.flatMap((d, i) => {
  const win = messy.slice(Math.max(0, i - 2), i + 3);
  const out: number[] = [];
  if (d.h >= Math.max(...win.map((w) => w.h))) out.push(d.h);
  if (d.l <= Math.min(...win.map((w) => w.l))) out.push(d.l);
  return out.map((p) => ({ i, p }));
});

export const MessyLinesChart: React.FC<ChartProps> = ({ frame, fps }) => {
  const s = makeScale(messy.length, 95, 138, CHART_W, CHART_H);
  const visible = interpolate(frame, [0, 0.6 * fps], [8, messy.length], clamp);
  const noise = at(frame, fps, 2.2, 0.3);
  const zone = at(frame, fps, 2.6, 0.5);
  const accept = pop(frame, fps, 3.95);
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width="100%" height="100%">
      <Grid s={s} />
      <rect
        x={s.x(15) - s.bw}
        y={s.y(133.6)}
        width={(CHART_W - s.x(15) + s.bw) * zone}
        height={s.y(126) - s.y(133.6)}
        fill={C.up}
        opacity={0.18}
      />
      <line x1={s.x(15) - s.bw} x2={CHART_W} y1={s.y(133.6)} y2={s.y(133.6)} stroke={C.up} strokeWidth={3} opacity={zone} />
      <line x1={s.x(15) - s.bw} x2={CHART_W} y1={s.y(126)} y2={s.y(126)} stroke={C.up} strokeWidth={3} opacity={zone} />
      <Candles data={messy} s={s} visible={visible} />
      {messyLevels.map(({ i, p }, k) => {
        const t = at(frame, fps, 0.45 + k * 0.07, 0.25);
        const x1 = s.x(i) - s.bw;
        return (
          <line
            key={k}
            x1={x1}
            x2={x1 + (CHART_W - x1) * t}
            y1={s.y(p)}
            y2={s.y(p)}
            stroke={noise > 0 ? C.down : C.gold}
            strokeWidth={3}
            strokeDasharray="14 8"
            opacity={t * (1 - noise * 0.82)}
          />
        );
      })}
      <g transform={`translate(${CHART_W * 0.3},${CHART_H * 0.62}) rotate(-8)`} opacity={noise * (1 - zone)}>
        <Tag x={0} y={0} text="NOISE" color={C.down} anchor="middle" size={64} scale={0.6 + 0.4 * pop(frame, fps, 2.2)} solid />
      </g>
      <Tag x={s.x(15)} y={s.y(133.6) - 48} text="VALUE AREA" color={C.up} opacity={zone} size={34} />
      <Tag
        x={CHART_W - 30}
        y={s.y(126) + 60}
        text="PRICE ACCEPTS HERE"
        color={C.up}
        anchor="end"
        opacity={Math.min(1, accept)}
        scale={accept}
        size={30}
        solid
      />
    </svg>
  );
};

// ---------------------------------------------------------------- 2. middle of the range = chop
const chop = toCandles(
  walk(
    [[0, 110], [3, 116], [6, 104], [9, 115], [12, 105], [15, 117], [18, 103], [21, 114], [24, 106], [27, 116], [30, 104], [33, 113], [36, 107], [39, 111]],
    1.6,
    21,
  ),
  2.5,
  5,
);

export const ChopChart: React.FC<ChartProps> = ({ frame, fps }) => {
  const s = makeScale(chop.length, 92, 128, CHART_W, CHART_H);
  const visible = interpolate(frame, [0, 6 * fps], [6, chop.length], clamp);
  const box = at(frame, fps, 0.15, 0.4);
  const mid = at(frame, fps, 0.5, 0.4);
  const stops = [7, 13, 19];
  const bounce = Math.sin(((frame - 6.3 * fps) / fps) * Math.PI * 3);
  const arrows = at(frame, fps, 5.0, 0.3);
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width="100%" height="100%">
      <Grid s={s} />
      <rect x={0} y={s.y(113.5)} width={CHART_W * mid} height={s.y(106.5) - s.y(113.5)} fill={C.down} opacity={0.2} />
      {[118.5, 102].map((p) => (
        <line key={p} x1={0} x2={CHART_W * box} y1={s.y(p)} y2={s.y(p)} stroke={C.text} strokeWidth={3} opacity={0.75} />
      ))}
      <Candles data={chop} s={s} visible={visible} />
      <Tag x={24} y={s.y(118.5) - 40} text="RANGE HIGH" color={C.text} opacity={box} size={26} />
      <Tag x={24} y={s.y(102) + 40} text="RANGE LOW" color={C.text} opacity={box} size={26} />
      <Tag x={CHART_W / 2} y={s.y(110)} text="CHOP ZONE" color={C.down} anchor="middle" size={44} solid scale={pop(frame, fps, 0.65)} />
      {stops.map((i, k) => {
        const p = pop(frame, fps, 2.7 + k * 0.15);
        return (
          <g key={i} transform={`translate(${s.x(i)},${s.y(chop[i].c)}) scale(${p})`}>
            <circle r={26} fill={C.down} />
            <path d="M-10,-10 L10,10 M10,-10 L-10,10" stroke={C.bg} strokeWidth={6} strokeLinecap="round" />
          </g>
        );
      })}
      <Tag x={s.x(13)} y={s.y(chop[13].c) + 70} text="STOPPED OUT" color={C.down} anchor="middle" size={26} scale={pop(frame, fps, 3.0)} />
      <g opacity={arrows} transform={`translate(${CHART_W - 60},${s.y(110) + (frame > 6.3 * fps ? bounce * 70 : 0)})`}>
        <path d="M0,-110 L0,110 M-22,-84 L0,-110 L22,-84 M-22,84 L0,110 L22,84" stroke={C.gold} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------- 3. balance -> expansion
const expansion = toCandles(
  [
    ...walk([[0, 104], [3, 107], [6, 101], [9, 107], [12, 102], [15, 106.5], [18, 101.5], [21, 105]], 1.0, 3),
    109.5, 115, 113.5, 121, 127.5, 126, 133.5, 139, 137.5, 143,
  ],
  1.8,
  9,
);

export const ExpansionChart: React.FC<ChartProps> = ({ frame, fps }) => {
  const s = makeScale(expansion.length, 94, 148, CHART_W, CHART_H);
  const visible =
    frame < 1.4 * fps
      ? interpolate(frame, [0, 0.4 * fps], [10, 22], clamp)
      : interpolate(frame, [1.4 * fps, 3.0 * fps], [22, expansion.length], { ...clamp, easing: Easing.in(Easing.quad) });
  const box = at(frame, fps, 0.1, 0.4);
  const flash = interpolate(frame, [1.7 * fps, 1.85 * fps, 2.3 * fps], [0, 1, 0.25], clamp);
  const arrow = at(frame, fps, 2.3, 0.5);
  const x0 = s.x(0) - s.bw;
  const x1 = s.x(21) + s.bw;
  const ax = s.x(expansion.length - 1) + 10;
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width="100%" height="100%">
      <Grid s={s} />
      <rect
        x={x0}
        y={s.y(109.5)}
        width={(x1 - x0) * box}
        height={s.y(98.5) - s.y(109.5)}
        fill={C.gold}
        fillOpacity={0.08 + flash * 0.2}
        stroke={C.gold}
        strokeWidth={3}
        rx={8}
      />
      <Candles data={expansion} s={s} visible={visible} />
      <Tag x={x0 + 10} y={s.y(109.5) - 40} text="BALANCE" color={C.gold} opacity={box} size={30} />
      <path
        d={`M${x1 + 20},${s.y(108)} Q${x1 + 160},${s.y(112)} ${ax - 20},${s.y(108 + (140 - 108) * arrow)}`}
        stroke={C.up}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
        opacity={arrow}
      />
      <Tag x={x1 + 10} y={s.y(125)} text="EXPANSION" color={C.up} size={36} scale={pop(frame, fps, 2.3)} solid />
      <Tag x={x1 + 10} y={s.y(118)} text="+ MOMENTUM" color={C.up} size={28} scale={pop(frame, fps, 2.85)} />
    </svg>
  );
};

// ---------------------------------------------------------------- 4. fair value trail
const fvtCloses = walk(
  [[0, 100], [5, 108], [8, 105], [13, 114], [16, 111], [21, 121], [24, 118], [29, 128], [32, 125], [37, 135], [40, 132], [43, 138]],
  1.2,
  31,
);
const fvt = toCandles(fvtCloses, 2, 17);
const fvtTrail = ema(fvtCloses, 9);
const fvtHolds = [8, 16, 24, 32, 40];

export const FvtChart: React.FC<ChartProps> = ({ frame, fps }) => {
  const s = makeScale(fvt.length, 94, 144, CHART_W, CHART_H);
  const visible = interpolate(frame, [0, 0.5 * fps], [10, fvt.length], clamp);
  const trail = interpolate(frame, [0.7 * fps, 2.4 * fps], [0, fvt.length - 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const last = Math.floor(trail);
  const upper: string[] = [];
  const lower: string[] = [];
  for (let i = 0; i <= last; i++) {
    upper.push(`${s.x(i)},${s.y(fvtTrail[i] + 1.8)}`);
    lower.unshift(`${s.x(i)},${s.y(fvtTrail[i] - 1.8)}`);
  }
  const bandPath = `M${[...upper, ...lower].join(" L")} Z`;
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width="100%" height="100%">
      <Grid s={s} />
      <Candles data={fvt} s={s} visible={visible} dim={() => (trail > 0 ? 0.55 : 1)} />
      {trail > 0 && <path d={bandPath} fill={C.value} opacity={0.22} />}
      <path d={linePath(fvtTrail, s, trail)} stroke={C.value} strokeWidth={8} fill="none" strokeLinecap="round" />
      {trail > 0 && <circle cx={s.x(trail)} cy={s.y(fvtTrail[last])} r={12} fill={C.value} />}
      <Tag x={s.x(20)} y={s.y(fvtTrail[20]) + 70} text="FAIR VALUE TRAIL" color={C.value} size={34} scale={pop(frame, fps, 1.2)} solid />
      {fvtHolds.map((i, k) => {
        const p = pop(frame, fps, 3.35 + k * 0.08);
        return (
          <g key={i} transform={`translate(${s.x(i)},${s.y(fvt[i].l) + 30}) scale(${p})`}>
            <circle r={18} fill={C.up} />
            <path d="M-8,0 L-2,7 L9,-7" stroke={C.bg} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
      <Tag x={s.x(40)} y={s.y(fvt[40].l) + 90} text="HOLDING VALUE" color={C.up} anchor="end" size={28} scale={pop(frame, fps, 3.75)} />
    </svg>
  );
};

// ---------------------------------------------------------------- 5. acceptance below = bearish
const bearCloses = walk(
  [[0, 120], [6, 126], [10, 123], [16, 128], [20, 125], [23, 121], [26, 114], [29, 116], [32, 110], [35, 112], [38, 106], [41, 108], [43, 103]],
  1.2,
  41,
);
const bear = toCandles(bearCloses, 2, 23);
const bearTrail = ema(bearCloses, 10);
const breakIdx = bearCloses.findIndex((c, i) => i > 15 && c < bearTrail[i]);

export const BearishChart: React.FC<ChartProps> = ({ frame, fps }) => {
  const s = makeScale(bear.length, 96, 134, CHART_W, CHART_H);
  const visible = interpolate(frame, [0, 0.3 * fps, 0.4 * fps, 2.0 * fps], [16, 22, 22, bear.length], clamp);
  const trail = Math.max(0, visible - 1);
  const shade = at(frame, fps, 1.1, 0.4);
  const shadeEnd = Math.min(trail, bear.length - 1);
  let area = "";
  if (shadeEnd > breakIdx) {
    const xs = [];
    for (let i = breakIdx; i <= Math.floor(shadeEnd); i++) xs.push(`${s.x(i)},${s.y(bearTrail[i])}`);
    area = `M${xs.join(" L")} L${s.x(Math.floor(shadeEnd))},${CHART_H} L${s.x(breakIdx)},${CHART_H} Z`;
  }
  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width="100%" height="100%">
      <Grid s={s} />
      {area && <path d={area} fill={C.down} opacity={0.2 * shade} />}
      <Candles data={bear} s={s} visible={visible} dim={(i) => (i < breakIdx ? 0.5 : 1)} />
      <path d={linePath(bearTrail, s, trail)} stroke={C.value} strokeWidth={8} fill="none" strokeLinecap="round" />
      <Tag x={s.x(4)} y={s.y(bearTrail[4]) - 70} text="FAIR VALUE TRAIL" color={C.value} size={24} />
      <g opacity={shade}>
        <circle cx={s.x(breakIdx)} cy={s.y(bearTrail[breakIdx])} r={16 + 10 * (1 - shade)} fill="none" stroke={C.down} strokeWidth={5} />
      </g>
      <Tag x={s.x(breakIdx) + 30} y={s.y(bearTrail[breakIdx]) - 60} text="ACCEPTANCE BELOW" color={C.down} size={28} scale={pop(frame, fps, 1.1)} />
      <g transform={`translate(${CHART_W * 0.62},${CHART_H * 0.8})`}>
        <Tag x={0} y={0} text="BEARISH VALUE" color={C.down} anchor="middle" size={44} scale={pop(frame, fps, 2.35)} solid />
      </g>
    </svg>
  );
};

export const CHARTS = {
  messyLines: { C: MessyLinesChart, title: "MARKING EVERY REACTION" },
  chop: { C: ChopChart, title: "MID-RANGE = CHOP" },
  expansion: { C: ExpansionChart, title: "BALANCE → EXPANSION" },
  fvt: { C: FvtChart, title: "FAIR VALUE TRAIL" },
  bearish: { C: BearishChart, title: "ACCEPTANCE BELOW = BEARISH" },
};
