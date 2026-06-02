import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AppWindow, SceneHeader, Panel, PrimaryButton, AnimatedEntry, Badge, CountUp } from "../components";
import { C, TEXT, RADIUS } from "../design/tokens";
import { MOCK_ANALYTICS, MOCK_IDEAS, SELECTED_IDEA_ID } from "../mock";

export const Scene6Export: React.FC = () => {
  const frame = useCurrentFrame();
  const idea = MOCK_IDEAS.find((i) => i.id === SELECTED_IDEA_ID)!;
  const sceneOpacity = interpolate(frame, [0, 12, 195, 210], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outro = frame >= 150;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <AppWindow activeTab="Video">
        {!outro ? (
          <>
            <SceneHeader icon="🚀" title="Your video is ready! 🎉" subtitle="Predicted performance before you publish" right={<Badge tone="green">Rendered</Badge>} />
            <div style={{ display: "flex", gap: 28 }}>
              <AnimatedEntry delay={25} style={{ flex: 1.2 }}>
                <div style={{ borderRadius: RADIUS.lg, overflow: "hidden", aspectRatio: "16 / 9", background: "linear-gradient(135deg, #1e1b4b, #4c1d95)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                  <div style={{ ...TEXT.h2, color: "#fff", textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{idea.title}</div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: C.red, color: "#fff", padding: "6px 12px", borderRadius: 8, ...TEXT.label }}>VIRAL {idea.viralScore}</div>
                </div>
              </AnimatedEntry>
              <AnimatedEntry delay={45} style={{ flex: 1 }}>
                <Panel active style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <Stat label="Predicted views (48h)" value={<CountUp to={MOCK_ANALYTICS.predictedViews48h} startFrame={55} />} color={C.indigo} />
                  <Stat label="Predicted revenue" value={<CountUp to={MOCK_ANALYTICS.predictedRevenue} startFrame={55} prefix="$" />} color={C.green} />
                  <Stat label="Est. CTR" value={MOCK_ANALYTICS.ctrEstimate} color={C.gold} />
                  <Stat label="Thumbnail score" value={`${MOCK_ANALYTICS.thumbnailScore}`} color={C.indigo} />
                </Panel>
              </AnimatedEntry>
            </div>
            <AnimatedEntry delay={95} style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <PrimaryButton pulse>🚀 Export & Publish</PrimaryButton>
            </AnimatedEntry>
          </>
        ) : (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
            <AnimatedEntry delay={150} config="bouncy">
              <div style={{ ...TEXT.hero, color: C.ink }}>TubeGen<span style={{ color: C.indigo }}>AI</span></div>
            </AnimatedEntry>
            <AnimatedEntry delay={162}>
              <div style={{ ...TEXT.h3, color: C.inkMuted }}>From idea to published video — in minutes.</div>
            </AnimatedEntry>
          </AbsoluteFill>
        )}
      </AppWindow>
    </AbsoluteFill>
  );
};

const Stat: React.FC<{ label: string; value: React.ReactNode; color: string }> = ({ label, value, color }) => (
  <div>
    <div style={{ ...TEXT.h1, fontSize: 40, color }}>{value}</div>
    <div style={{ ...TEXT.label, color: C.inkMuted }}>{label}</div>
  </div>
);
