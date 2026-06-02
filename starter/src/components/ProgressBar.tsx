import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, RADIUS } from "../design/tokens";

export const ProgressBar: React.FC<{
  startFrame: number;
  endFrame: number;
  color?: string;
  height?: number;
  style?: React.CSSProperties;
}> = ({ startFrame, endFrame, color = C.indigo, height = 8, style }) => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ width: "100%", height, background: C.border, borderRadius: RADIUS.pill, overflow: "hidden", ...style }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: RADIUS.pill }} />
    </div>
  );
};
