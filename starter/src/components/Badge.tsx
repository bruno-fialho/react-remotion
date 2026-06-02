import React from "react";
import { C, RADIUS, TEXT } from "../design/tokens";

type Tone = "indigo" | "green" | "gold" | "neutral" | "red";
const TONES: Record<Tone, { bg: string; fg: string }> = {
  indigo: { bg: C.indigoSoft, fg: C.indigo },
  green: { bg: C.greenSoft, fg: C.green },
  gold: { bg: C.goldSoft, fg: C.gold },
  red: { bg: C.redSoft, fg: C.red },
  neutral: { bg: C.cardMuted, fg: C.inkSoft },
};

export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: Tone;
  style?: React.CSSProperties;
}> = ({ children, tone = "neutral", style }) => {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: RADIUS.pill,
        background: t.bg,
        color: t.fg,
        ...TEXT.sm,
        fontWeight: 700,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
