import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export const CountUp: React.FC<{
  to: number;
  startFrame: number;
  durationInFrames?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, startFrame, durationInFrames = 45, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const value = Math.floor(
    interpolate(frame, [startFrame, startFrame + durationInFrames], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );
  return <span style={style}>{prefix}{value.toLocaleString()}{suffix}</span>;
};
