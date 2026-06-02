# 📦 Submission Notes

> My implementation of the challenge. Everything lives in `starter/`.

## Run it

```bash
cd starter
npm install
npm start            # Remotion Studio — scrub the 4 scenes
npm run render       # → out/tubegen.mp4  (1920×1080, 30fps, ~36s, with audio)
```

Audio assets are procedurally generated and committed under `starter/public/audio/`.
To regenerate them: `node scripts/gen-audio.mjs`.

**Render output (`npm run render`):**

```
Encoded 1080/1080
○ out/tubegen.mp4  4.7 MB
# ffprobe: Video h264 1920x1080 30fps · Audio aac 48kHz stereo · 36.05s
```

## What I built

Four scenes that recreate the **real TubeGen product UI** (light theme) being driven end-to-end:

1. **Channel Input** (`Title` tab) — URL types in → validates → channel stats reveal, with an animated cursor "clicking" the CTA.
2. **Viral Titles** (`Title` tab) — 5 ideas stagger in; the winner snaps to a selected state with a counting-up viral score.
3. **Script** (`Script` tab) — `[HOOK] [INTRO] [MAIN] [CTA]` type out section-by-section, then word-count + AI-confidence chips.
4. **Export** (`Video` tab) — "video is ready" → thumbnail → analytics counting up → pulsing Export button → TubeGen outro.

## Architecture

- **One design system** (`src/design/tokens.ts`) — colors, radius, shadow, type scale, spring configs. Every value the scenes use comes from here, which is what makes 4 scenes feel like one product.
- **One shared chrome** (`src/components/AppWindow.tsx`) — the white product window + tab bar with the active-tab pill. Every scene renders inside it, so consistency is structural, not copy-pasted.
- **13 small, single-purpose components** (`src/components/`) — `SceneHeader`, `Panel`, `Badge`, `PrimaryButton`, `InputField`, `TypewriterText`, `AnimatedEntry`, `ProgressBar`, `StepBadge`, `CountUp`, `Cursor`, `Background`. Reused across scenes via a barrel export.
- **Composition** (`src/Video.tsx`) — a `<Series>` of the 4 scenes over a shared `Background` and `Soundtrack`.

## Animation approach — `spring` vs `interpolate`

I use **`spring()` for anything that enters the UI** (panels, cards, list items, the window itself) because physical settling reads as "real software." The workhorse config is `SPRING.smooth` (`stiffness: 80, damping: 20`) — confident, no overshoot — for panels and the app window. List staggers use `SPRING.snappy` for a crisper pop, and the outro logo uses `SPRING.bouncy` (`damping: 12`) for a touch of celebration.

I use **`interpolate()` (clamped) where progress should be linear/monotonic**: the typewriter (frame → character count), `CountUp` (eased with `Easing.out(Easing.cubic)` so numbers decelerate into their final value), progress fills, and scene-edge cross-dissolves. Springs there would feel wrong — text doesn't "bounce" as it types.

All motion is derived from `useCurrentFrame()` and is deterministic (`Math.sin(frame…)` for ambient drift, never `Math.random()` in render), so every render is identical.

## Audio

Rather than depend on fetched third-party clips, the music bed and UI SFX (click, whoosh, success chime) are **synthesized from scratch** in `scripts/gen-audio.mjs` — a soft Cmaj9 ambient pad plus enveloped tones. It's fully owned, license-free, and deterministic. Each cue is wired to a scene beat in `src/audio/Soundtrack.tsx`.

## Tradeoffs under the time box

- **4 scenes, not 6.** Per the brief, I cut the Voiceover/Visuals/Thumbnail/Soundtrack steps to polish the required four. The `AppWindow` shell already supports those tabs, so they'd be cheap to add next.
- **Mock data kept as-is** (MrBeast) rather than re-theming, to spend the time on motion and architecture.
- **Audio is procedural** — reliable and owned, but a licensed track would have more warmth.

## What I'd improve with more time

- Animate the active-tab pill **sliding** between tabs across scene cuts for a stronger through-line.
- Add the two bonus scenes (Asset pipeline with waveform/EQ, Editor timeline with a scrubbing playhead).
- Sound-design pass with a real composer track; per-keystroke typing ticks in the script scene.
- A subtle parallax on the window against the background for depth.
