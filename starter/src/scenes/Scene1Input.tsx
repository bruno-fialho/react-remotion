import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AppWindow, SceneHeader, Panel, PrimaryButton, InputField, AnimatedEntry, Badge, Cursor, ProgressBar } from "../components";
import { C, TEXT, RADIUS } from "../design/tokens";
import { MOCK_CHANNEL } from "../mock";

export const Scene1Input: React.FC = () => {
  const frame = useCurrentFrame();
  const urlValid = frame > 62;
  const loading = frame >= 80 && frame < 125;
  const revealed = frame >= 130;
  const dots = ".".repeat(1 + (Math.floor(frame / 8) % 3));
  const sceneOpacity = interpolate(frame, [0, 12, 285, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <AppWindow activeTab="Title">
        <SceneHeader
          icon={<div style={{ width: 44, height: 44, borderRadius: 12, background: C.redSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 16, borderRadius: 5, background: C.red, position: "relative" }}>
              <div style={{ position: "absolute", top: 4, left: 8, width: 0, height: 0, borderLeft: "8px solid #fff", borderTop: "4px solid transparent", borderBottom: "4px solid transparent" }} />
            </div>
          </div>}
          iconBg={C.redSoft}
          title="Generate from YouTube Channel"
          subtitle="Analyze a YouTube channel and generate titles in their style"
          right={<PrimaryButton pressed={frame >= 70 && frame < 78}>Continue to Script →</PrimaryButton>}
        />

        <InputField value={MOCK_CHANNEL.url} startFrame={6} valid={urlValid} style={{ marginBottom: 28 }} />

        {loading && (
          <div>
            <div style={{ ...TEXT.body, color: C.inkMuted, marginBottom: 14 }}>Analyzing channel{dots}</div>
            <ProgressBar startFrame={80} endFrame={124} />
          </div>
        )}

        {revealed && (
          <AnimatedEntry delay={130} config="smooth">
            <Panel active style={{ display: "flex", gap: 32 }}>
              <div style={{ width: 96, height: 96, borderRadius: "50%", background: C.indigoSoft, display: "flex", alignItems: "center", justifyContent: "center", ...TEXT.h1, color: C.indigo }}>
                {MOCK_CHANNEL.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...TEXT.h2, color: C.ink }}>{MOCK_CHANNEL.name}</div>
                <div style={{ ...TEXT.body, color: C.inkMuted, marginBottom: 16 }}>{MOCK_CHANNEL.handle} · {MOCK_CHANNEL.niche}</div>
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                  <Badge tone="indigo">{MOCK_CHANNEL.subscribers} subscribers</Badge>
                  <Badge tone="neutral">{MOCK_CHANNEL.totalViews} views</Badge>
                  <Badge tone="neutral">{MOCK_CHANNEL.videoCount} videos</Badge>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {MOCK_CHANNEL.topTopics.map((t, i) => (
                    <AnimatedEntry key={t} delay={150 + i * 8} y={16} config="snappy">
                      <div style={{ padding: "8px 16px", borderRadius: RADIUS.pill, background: C.cardMuted, border: `1px solid ${C.border}`, ...TEXT.sm, color: C.inkSoft }}>{t}</div>
                    </AnimatedEntry>
                  ))}
                </div>
              </div>
            </Panel>
          </AnimatedEntry>
        )}
      </AppWindow>
      {frame >= 40 && frame < 90 && (
        <Cursor from={{ x: 1180, y: 760 }} to={{ x: 1300, y: 330 }} moveStart={45} moveDur={22} clickFrame={70} />
      )}
    </AbsoluteFill>
  );
};
