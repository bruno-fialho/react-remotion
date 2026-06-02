import React from "react";
import { C, RADIUS, SHADOW } from "../design/tokens";

export const Panel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  muted?: boolean;
  active?: boolean;
}> = ({ children, style, muted, active }) => (
  <div
    style={{
      background: muted ? C.cardMuted : C.card,
      border: `1.5px solid ${active ? C.indigo : C.border}`,
      borderRadius: RADIUS.lg,
      boxShadow: active ? SHADOW.card : "none",
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);
