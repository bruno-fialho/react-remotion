import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

// Procedurally-generated audio (see scripts/gen-audio.mjs). Toggle any cue here.
// Scene frame offsets (30fps): s1 0–299 · s2 300–569 · s3 570–869 · s6 870–1079.
const HAS = { music: true, whoosh: true, click: true, success: true };

const Sfx: React.FC<{ file: string; at: number; volume?: number; dur?: number }> = ({
  file,
  at,
  volume = 0.6,
  dur = 60,
}) => (
  <Sequence from={at} durationInFrames={dur} layout="none">
    <Audio src={staticFile(`audio/${file}`)} volume={volume} />
  </Sequence>
);

export const Soundtrack: React.FC = () => (
  <>
    {HAS.music && <Audio src={staticFile("audio/music.wav")} volume={0.9} />}
    {HAS.click && <Sfx file="click.wav" at={70} volume={0.5} dur={10} />}
    {HAS.whoosh && <Sfx file="whoosh.wav" at={130} volume={0.45} />}{/* s1 channel reveal */}
    {HAS.whoosh && <Sfx file="whoosh.wav" at={450} volume={0.45} />}{/* s2 idea selected */}
    {HAS.whoosh && <Sfx file="whoosh.wav" at={895} volume={0.45} />}{/* s6 thumbnail */}
    {HAS.success && <Sfx file="success.wav" at={965} volume={0.7} dur={40} />}{/* s6 export */}
  </>
);
