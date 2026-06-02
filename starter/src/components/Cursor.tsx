import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING } from "../design/tokens";

// Animates a pointer from `from` to `to` between moveStart..moveStart+dur,
// then a small "click" dip at clickFrame.
export const Cursor: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  moveStart: number;
  moveDur?: number;
  clickFrame?: number;
}> = ({ from, to, moveStart, moveDur = 20, clickFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - moveStart, fps, config: SPRING.smooth, durationInFrames: moveDur });
  const x = interpolate(p, [0, 1], [from.x, to.x]);
  const y = interpolate(p, [0, 1], [from.y, to.y]);
  const click = clickFrame != null && frame >= clickFrame && frame < clickFrame + 6 ? 0.85 : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${click})`, zIndex: 50, pointerEvents: "none" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M5 3l14 8-6 1.5L9 19 5 3z" fill="#0B1220" stroke="#fff" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
