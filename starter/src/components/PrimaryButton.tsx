import React from "react";
import { useCurrentFrame } from "remotion";
import { C, RADIUS, SHADOW, TEXT } from "../design/tokens";

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  pulse?: boolean;
  pressed?: boolean;
  style?: React.CSSProperties;
}> = ({ children, pulse, pressed, style }) => {
  const frame = useCurrentFrame();
  const glow = pulse ? 0.6 + 0.4 * Math.sin((frame * Math.PI * 2) / 36) : 0;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "18px 32px",
        borderRadius: RADIUS.md,
        background: C.indigo,
        color: "#fff",
        ...TEXT.h3,
        transform: `scale(${pressed ? 0.96 : 1})`,
        boxShadow: pulse ? `0 0 ${30 + 30 * glow}px rgba(59,91,245,${0.4 + 0.4 * glow})` : SHADOW.button,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
