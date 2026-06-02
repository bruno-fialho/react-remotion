import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRING } from "../design/tokens";

export const AnimatedEntry: React.FC<{
  delay?: number;
  y?: number;
  config?: keyof typeof SPRING;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 30, config = "smooth", children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: SPRING[config] });
  const translateY = interpolate(p, [0, 1], [y, 0]);
  const opacity = interpolate(p, [0, 1], [0, 1]);
  return <div style={{ ...style, transform: `translateY(${translateY}px)`, opacity }}>{children}</div>;
};
