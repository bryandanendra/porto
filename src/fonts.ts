import { continueRender, delayRender, staticFile } from "remotion";

const faces: [string, string, number][] = [
  ["Montserrat", "montserrat-latin-600-normal.woff2", 600],
  ["Montserrat", "montserrat-latin-800-normal.woff2", 800],
  ["Montserrat", "montserrat-latin-900-normal.woff2", 900],
  ["JetBrains Mono", "jetbrains-mono-latin-500-normal.woff2", 500],
  ["JetBrains Mono", "jetbrains-mono-latin-700-normal.woff2", 700],
];

const handle = delayRender("Loading fonts");
Promise.all(
  faces.map(([family, file, weight]) => {
    const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, { weight: String(weight) });
    document.fonts.add(face);
    return face.load();
  }),
).then(() => continueRender(handle));

export const DISPLAY = "Montserrat, sans-serif";
export const MONO = "'JetBrains Mono', monospace";
