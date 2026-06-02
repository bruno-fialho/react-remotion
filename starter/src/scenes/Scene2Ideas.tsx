import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AppWindow, SceneHeader, Panel, AnimatedEntry, Badge, CountUp } from "../components";
import { C, TEXT } from "../design/tokens";
import { MOCK_IDEAS, SELECTED_IDEA_ID } from "../mock";

export const Scene2Ideas: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneOpacity = interpolate(frame, [0, 12, 255, 270], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <AppWindow activeTab="Title">
        <SceneHeader
          icon="💡"
          title="Viral Title Generator"
          subtitle="5 high-CTR ideas generated in your channel's voice"
          right={frame < 30 ? <Badge tone="indigo">Generating…</Badge> : <Badge tone="green">5 ideas ready</Badge>}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {MOCK_IDEAS.map((idea, i) => {
            const selected = idea.id === SELECTED_IDEA_ID && frame >= 150;
            return (
              <AnimatedEntry key={idea.id} delay={30 + i * 12} y={24}>
                <Panel active={selected} muted={!selected} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...TEXT.h3, color: C.ink, marginBottom: 6 }}>{idea.title}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {idea.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", minWidth: 120 }}>
                    <div style={{ ...TEXT.h1, color: selected ? C.gold : C.inkMuted, fontSize: 44 }}>
                      {selected ? <CountUp to={idea.viralScore} startFrame={160} durationInFrames={30} /> : idea.viralScore}
                    </div>
                    <div style={{ ...TEXT.label, color: C.inkMuted }}>Viral Score</div>
                  </div>
                </Panel>
              </AnimatedEntry>
            );
          })}
        </div>
      </AppWindow>
    </AbsoluteFill>
  );
};
