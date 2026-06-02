import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const inter = loadInter();
const mono = loadMono();

export const fontFamily = inter.fontFamily;
export const monoFamily = mono.fontFamily;
