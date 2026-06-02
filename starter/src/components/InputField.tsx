import React from "react";
import { C, RADIUS, TEXT } from "../design/tokens";
import { TypewriterText } from "./TypewriterText";

export const InputField: React.FC<{
  value: string;
  startFrame: number;
  valid?: boolean;
  style?: React.CSSProperties;
}> = ({ value, startFrame, valid, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px",
      borderRadius: RADIUS.md,
      background: C.cardMuted,
      border: `1.5px solid ${valid ? C.green : C.border}`,
      ...TEXT.h3,
      fontWeight: 500,
      color: C.ink,
      ...style,
    }}
  >
    <TypewriterText text={value} startFrame={startFrame} cps={32} />
    {valid && (
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✓</div>
    )}
  </div>
);
