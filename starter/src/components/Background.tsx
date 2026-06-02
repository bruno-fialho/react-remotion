import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../design/tokens";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (i: number) => Math.sin(frame * 0.01 + i) * 30;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.canvas}, ${C.canvasTint})` }}>
      <AbsoluteFill style={{ filter: "blur(80px)", opacity: 0.6 }}>
        <div style={{ position: "absolute", top: 120 + drift(0), left: 180 + drift(1), width: 520, height: 520, borderRadius: "50%", background: "rgba(59,91,245,0.10)" }} />
        <div style={{ position: "absolute", bottom: 80 + drift(2), right: 220 + drift(3), width: 460, height: 460, borderRadius: "50%", background: "rgba(255,0,51,0.06)" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
