import React from "react";
import { C, RADIUS, TEXT } from "../design/tokens";

export const SceneHeader: React.FC<{
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle: string;
  right?: React.ReactNode;
}> = ({ icon, iconBg = C.indigoSoft, title, subtitle, right }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 36 }}>
    <div style={{ width: 64, height: 64, borderRadius: RADIUS.md, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ ...TEXT.h2, color: C.ink }}>{title}</div>
      <div style={{ ...TEXT.body, color: C.inkMuted }}>{subtitle}</div>
    </div>
    {right}
  </div>
);
