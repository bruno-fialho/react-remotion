import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C } from "../design/tokens";

export const TypewriterText: React.FC<{
  text: string;
  startFrame: number;
  cps?: number; // chars per second (at 30fps)
  showCaret?: boolean;
  style?: React.CSSProperties;
}> = ({ text, startFrame, cps = 40, showCaret = true, style }) => {
  const frame = useCurrentFrame();
  const charsPerFrame = cps / 30;
  const count = Math.floor(
    interpolate(frame, [startFrame, startFrame + text.length / charsPerFrame], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const done = count >= text.length;
  const caretOn = showCaret && !done && frame % 16 < 8;
  return (
    <span style={style}>
      {text.slice(0, count)}
      {caretOn && <span style={{ color: C.indigo }}>|</span>}
    </span>
  );
};
