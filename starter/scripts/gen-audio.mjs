// Procedurally synthesize the soundtrack assets (no external/licensed audio).
// Run: node scripts/gen-audio.mjs  → writes WAVs into public/audio/
// 16-bit PCM, mono, 44.1kHz. Deterministic, fully owned by this project.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SR = 44100;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "audio");
mkdirSync(OUT, { recursive: true });

// --- WAV writer ------------------------------------------------------------
function writeWav(name, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  writeFileSync(join(OUT, name), buf);
  console.log("wrote", name, (buf.length / 1024).toFixed(0) + "KB");
}

const sine = (t, f) => Math.sin(2 * Math.PI * f * t);

// --- music bed: soft Cmaj9 ambient pad, 36s, very low level ----------------
function music() {
  const dur = 36;
  const N = SR * dur;
  const out = new Float32Array(N);
  // chord (Hz) with gentle per-voice amplitude LFOs for slow movement
  const voices = [
    { f: 130.81, lfo: 0.05, ph: 0.0 }, // C3
    { f: 196.0,  lfo: 0.07, ph: 1.1 }, // G3
    { f: 246.94, lfo: 0.06, ph: 2.3 }, // B3
    { f: 293.66, lfo: 0.04, ph: 0.7 }, // D4
    { f: 329.63, lfo: 0.08, ph: 3.0 }, // E4
  ];
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    let s = 0;
    for (const v of voices) {
      const amp = 0.5 + 0.5 * Math.sin(2 * Math.PI * v.lfo * t + v.ph);
      // tiny detune partial for warmth
      s += amp * (sine(t, v.f) + 0.3 * sine(t, v.f * 2.001));
    }
    s /= voices.length * 1.3;
    // global fade in (2s) / out (3s)
    const fin = Math.min(1, t / 2);
    const fout = Math.min(1, (dur - t) / 3);
    out[i] = s * 0.5 * fin * fout * 0.36; // peak ~0.18
  }
  writeWav("music.wav", out);
}

// --- whoosh: enveloped noise with a soft body, ~0.45s ----------------------
function whoosh() {
  const dur = 0.45;
  const N = (SR * dur) | 0;
  const out = new Float32Array(N);
  let lp = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const env = Math.sin(Math.PI * (t / dur)) ** 2; // bell
    const noise = Math.random() * 2 - 1;
    lp += 0.04 * (noise - lp); // lowpass → airy, not harsh
    out[i] = (lp * 2.2 + 0.15 * sine(t, 220)) * env * 0.5;
  }
  writeWav("whoosh.wav", out);
}

// --- click: short soft UI tick, ~0.07s -------------------------------------
function click() {
  const dur = 0.07;
  const N = (SR * dur) | 0;
  const out = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 90);
    out[i] = (sine(t, 1100) * 0.7 + (Math.random() * 2 - 1) * 0.25) * env * 0.5;
  }
  writeWav("click.wav", out);
}

// --- success: rising major arpeggio C5-E5-G5-C6, ~1.1s ---------------------
function success() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  const step = 0.1; // onset spacing
  const dur = 1.2;
  const N = (SR * dur) | 0;
  const out = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    let s = 0;
    notes.forEach((f, k) => {
      const start = k * step;
      if (t >= start) {
        const tt = t - start;
        const env = Math.exp(-tt * 3.2);
        s += (sine(tt, f) + 0.25 * sine(tt, f * 2)) * env;
      }
    });
    out[i] = (s / notes.length) * 0.55;
  }
  writeWav("success.wav", out);
}

music();
whoosh();
click();
success();
console.log("done →", OUT);
