# Candle Reel (Remotion)

Vertical 1080x1920 trading reel built from AI talking-head clips + animated candlestick charts.

## Setup
```bash
npm install
npm run assets   # downloads the raw clips from Google Drive into public/clips
npm run studio   # preview / edit
npm run render   # -> out/candle-reel.mp4
```

## Structure
- `src/timeline.ts` – clip order, trim points (seconds), layout (full / split), which chart each segment shows
- `src/words.json` – word-level transcript (faster-whisper) used for the captions
- `src/charts/Charts.tsx` – the five chart animations (messy lines, chop, expansion, fair value trail, bearish)
- `src/components/Pieces.tsx` – speaker framing, chart panel (top 1080x960), captions, overlays, end card

## Story order
| # | clip | line | chart |
|---|---|---|---|
| 1 | scene1 0.65–2.7 | "You're drawing the wrong key levels on your chart" | – |
| 2 | scene1 3.95–9.15 | "…marking every reaction, not … accepting value" | messyLines |
| 3 | scene2 0–2.2 | "shh" gesture (rest of scene2 audio is unusable) | – |
| 4 | scene7 0–7.45 | "middle of a range … chopped out …" | chop |
| 5 | speaker 0–3.4 | "real move starts when price leaves balance…" | expansion |
| 6 | scene3 1.0–5.3 | "fair value trail helps show where price is holding value" | fvt |
| 7 | scene6 1.9–5.15 | "accepting below it, that's bearish value" | bearish |
| 8 | speaker 3.45–7.85 | "Instead of drawing random lines … framing every trading session" | outro chips |
| 9 | end card | | |

## Next step: real AlgoAlpha charts
The chart panels are currently synthetic. Plan: replace them with screenshots / screen recordings
from TradingView using **Smart Signals Assistant [AlgoAlpha]** (Fair Value Trail), dropped into
`public/tv/<chart>.mp4|png` and rendered in the top panel, keeping the labels/arrows/captions on top.
