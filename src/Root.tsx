import { Composition } from "remotion";
import { CandleReel } from "./CandleReel";
import { FPS, TOTAL_FRAMES } from "./timeline";
import "./fonts";

export const Root: React.FC = () => (
  <Composition
    id="CandleReel"
    component={CandleReel}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
