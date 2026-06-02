import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AppWindow, SceneHeader, Panel, AnimatedEntry, Badge, TypewriterText } from "../components";
import { C, TEXT, FONT } from "../design/tokens";
import { MOCK_SCRIPT } from "../mock";

const SECTION_TONES = ["indigo", "indigo", "indigo", "green"] as const;

export const Scene3Script: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneOpacity = interpolate(frame, [0, 12, 285, 300], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sectionStart = (i: number) => 20 + i * 58;
  const allDone = frame >= sectionStart(MOCK_SCRIPT.sections.length);

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <AppWindow activeTab="Script">
        <SceneHeader
          icon="📝"
          title="Script Generator"
          subtitle="Generate engaging video scripts optimized for viewer retention"
          right={allDone ? <Badge tone="green">{MOCK_SCRIPT.aiConfidence}% AI confidence</Badge> : <Badge tone="indigo">Writing…</Badge>}
        />
        <Panel muted style={{ marginBottom: 20 }}>
          <div style={{ ...TEXT.label, color: C.inkMuted, marginBottom: 6 }}>Your selected title</div>
          <div style={{ ...TEXT.h3, color: C.ink }}>{MOCK_SCRIPT.title}</div>
        </Panel>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {MOCK_SCRIPT.sections.map((s, i) => {
            if (frame < sectionStart(i)) return null;
            return (
              <AnimatedEntry key={s.label} delay={sectionStart(i)} y={18}>
                <Panel>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <Badge tone={SECTION_TONES[i]}>[{s.label}]</Badge>
                    <span style={{ ...TEXT.sm, color: C.inkMuted, fontFamily: FONT.mono }}>{s.timestamp}</span>
                  </div>
                  <div style={{ ...TEXT.body, color: C.inkSoft }}>
                    <TypewriterText text={s.lines.join(" ")} startFrame={sectionStart(i) + 6} cps={90} showCaret={false} />
                  </div>
                </Panel>
              </AnimatedEntry>
            );
          })}
        </div>

        {allDone && (
          <AnimatedEntry delay={sectionStart(MOCK_SCRIPT.sections.length)} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <Badge tone="indigo">{MOCK_SCRIPT.wordCount} words</Badge>
              <Badge tone="neutral">⏱ {MOCK_SCRIPT.estimatedRuntime}</Badge>
            </div>
          </AnimatedEntry>
        )}
      </AppWindow>
    </AbsoluteFill>
  );
};
