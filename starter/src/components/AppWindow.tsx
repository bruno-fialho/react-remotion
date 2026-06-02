import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { C, RADIUS, SHADOW, FONT, TEXT, TABS, TabName, SPRING } from "../design/tokens";

export const AppWindow: React.FC<{ activeTab: TabName; children: React.ReactNode }> = ({
  activeTab,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: SPRING.smooth });
  const translateY = interpolate(enter, [0, 1], [40, 0]);
  const scale = interpolate(enter, [0, 1], [0.96, 1]);
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT.family }}>
      <div
        style={{
          width: 1520,
          background: C.card,
          borderRadius: RADIUS.xl,
          boxShadow: SHADOW.window,
          overflow: "hidden",
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
        }}
      >
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 8, padding: "20px 40px", background: C.tabBar, borderBottom: `1px solid ${C.border}` }}>
          {TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <div
                key={tab}
                style={{
                  padding: "10px 22px",
                  borderRadius: RADIUS.pill,
                  ...TEXT.sm,
                  fontWeight: active ? 700 : 600,
                  color: active ? C.indigoText : C.inkMuted,
                  background: active ? C.indigoSoft : "transparent",
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>
        {/* Body */}
        <div style={{ padding: 48, minHeight: 720 }}>{children}</div>
      </div>
    </AbsoluteFill>
  );
};
