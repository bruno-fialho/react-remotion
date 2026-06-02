import React from "react";
import { C, TEXT } from "../design/tokens";

export const StepBadge: React.FC<{ n?: number; done?: boolean; style?: React.CSSProperties }> = ({ n, done, style }) => (
  <div
    style={{
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: done ? C.green : C.indigo,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...TEXT.sm,
      fontWeight: 800,
      ...style,
    }}
  >
    {done ? "✓" : n}
  </div>
);
