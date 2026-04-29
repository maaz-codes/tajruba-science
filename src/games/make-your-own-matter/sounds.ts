// Web Audio synth — no files needed. Each function creates a short sound
// using the browser's AudioContext. Call playSynth(type) anywhere.
// Replace individual functions with file-based audio when brand assets arrive.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  // Resume if browser suspended it (autoplay policy)
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function gain(ac: AudioContext, value: number, at: number): GainNode {
  const g = ac.createGain();
  g.gain.setValueAtTime(value, at);
  return g;
}

// ── Start click — short confident tap ────────────────────────────────────────
function playStartClick() {
  const ac = getCtx();
  const t = ac.currentTime;

  const osc = ac.createOscillator();
  const g = gain(ac, 0.35, t);

  osc.type = "sine";
  osc.frequency.setValueAtTime(520, t);
  osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);

  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.13);
}

// ── Particle drop pop — soft bubble pop ───────────────────────────────────────
function playParticlePop() {
  const ac = getCtx();
  const t = ac.currentTime;

  const osc = ac.createOscillator();
  const g = gain(ac, 0.25, t);

  osc.type = "sine";
  osc.frequency.setValueAtTime(480, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.07);

  g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.11);
}

// ── Slider tick — crisp light click ───────────────────────────────────────────
function playSliderTick() {
  const ac = getCtx();
  const t = ac.currentTime;

  const buf = ac.createBuffer(1, ac.sampleRate * 0.04, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 6);
  }

  const src = ac.createBufferSource();
  src.buffer = buf;

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3000;
  filter.Q.value = 0.8;

  const g = gain(ac, 0.2, t);

  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t);
}

// ── Discovery chime — bright two-note sparkle ─────────────────────────────────
function playDiscoveryChime() {
  const ac = getCtx();
  const t = ac.currentTime;

  const notes = [660, 880, 1100];
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator();
    const g = gain(ac, 0, t);
    const start = t + i * 0.1;

    osc.type = "triangle";
    osc.frequency.value = freq;

    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(0.18, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

    osc.connect(g).connect(ac.destination);
    osc.start(start);
    osc.stop(start + 0.36);
  });
}

// ── Public API ────────────────────────────────────────────────────────────────
export type SfxType = "start" | "pop" | "tick" | "chime";

export function playSynth(type: SfxType, muted: boolean) {
  if (muted) return;
  try {
    switch (type) {
      case "start":
        playStartClick();
        break;
      case "pop":
        playParticlePop();
        break;
      case "tick":
        playSliderTick();
        break;
      case "chime":
        playDiscoveryChime();
        break;
    }
  } catch {
    // AudioContext unavailable or blocked — fail silently
  }
}
