import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { C } from "./theme";
import { END_CARD_FRAMES, END_CARD_START, TIMED, TOTAL_FRAMES } from "./timeline";
import { Captions, ChartPanel, EndCard, OutroOverlay, ShhOverlay, Speaker } from "./components/Pieces";

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{ pointerEvents: "none", background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
  />
);

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [0, TOTAL_FRAMES - 1], [0, 1080]);
  return <div style={{ position: "absolute", left: 0, bottom: 0, height: 8, width: w, background: C.up, opacity: 0.85 }} />;
};

export const CandleReel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    {TIMED.map((seg, i) => {
      // Panels only slide in when coming from a full-frame shot; split -> split is a hard cut.
      const enter = seg.layout === "split" && TIMED[i - 1]?.layout !== "split";
      return (
        <Sequence key={seg.id} from={seg.start} durationInFrames={seg.frames} name={seg.id}>
          <Speaker seg={seg} enter={enter} />
          <Vignette />
          <ChartPanel seg={seg} enter={enter} />
          {seg.overlay === "shh" && <ShhOverlay />}
          {seg.overlay === "outro" && <OutroOverlay />}
          <Captions seg={seg} />
        </Sequence>
      );
    })}
    <Sequence from={END_CARD_START} durationInFrames={END_CARD_FRAMES} name="endCard">
      <EndCard />
    </Sequence>
    <Progress />
  </AbsoluteFill>
);
