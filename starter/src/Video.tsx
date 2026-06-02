import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Background } from "./components";
import { Scene1Input } from "./scenes/Scene1Input";
import { Scene2Ideas } from "./scenes/Scene2Ideas";
import { Scene3Script } from "./scenes/Scene3Script";
import { Scene6Export } from "./scenes/Scene6Export";

const S = { scene1: 300, scene2: 270, scene3: 300, scene6: 210 };

export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: S.scene1 + S.scene2 + S.scene3 + S.scene6, // 1080 = 36s
};

export const TubeGenVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Series>
        <Series.Sequence durationInFrames={S.scene1}><Scene1Input /></Series.Sequence>
        <Series.Sequence durationInFrames={S.scene2}><Scene2Ideas /></Series.Sequence>
        <Series.Sequence durationInFrames={S.scene3}><Scene3Script /></Series.Sequence>
        <Series.Sequence durationInFrames={S.scene6}><Scene6Export /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
