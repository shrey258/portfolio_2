import { useEffect, useRef } from "react";

// Ordered (Bayer 8x8) dither of an animated field, drawn at one canvas pixel per dot and
// upscaled with image-rendering: pixelated. Cost stays tiny: a 1440px-wide hero at cell=4
// is ~360x200 fragments, capped at `fps`, paused off-screen / in hidden tabs, and a single
// still frame under reduced motion.
//
// The scene: sky, sun and three parallax ridgelines (tea hills); the pointer nudges the sun.

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform float uGain;
uniform float uSeed;
uniform float uSunY;
uniform float uMoon;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

float ridge(float x, float base, float amp, float freq, float seed, float drift) {
  return base + amp * (fbm(vec2(x * freq + seed + uTime * drift, seed)) - 0.5);
}

float horizon(vec2 frag) {
  vec2 uv = frag / uRes;
  float aspect = uRes.x / uRes.y;
  float dusk = smoothstep(0.55, 0.2, uSunY);
  float v = mix(0.2 + dusk * 0.12, dusk * 0.06, smoothstep(0.3, 0.95, uv.y));
  vec2 sun = vec2(0.72 + (uPointer.x - 0.5) * 0.06, uSunY + (uPointer.y - 0.5) * 0.04);
  vec2 ds = (uv - sun) * vec2(aspect, 1.0);
  float r = length(ds);
  v += 0.3 * smoothstep(0.32, 0.09, r);
  // After dark the sun becomes a crescent: the shadowed side keeps the sky's dots.
  if (r < 0.085 && (uMoon < 0.5 || length(ds - vec2(0.034, 0.022)) > 0.078)) v = 0.0;
  float cloud = fbm(vec2(uv.x * 3.0 - uTime * 0.012, uv.y * 7.0));
  v += 0.12 * smoothstep(0.58, 0.78, cloud) * smoothstep(0.45, 0.8, uv.y);
  if (uv.y < ridge(uv.x, 0.46, 0.22, 1.3, 1.0 + uSeed, 0.004)) v = 0.34;
  if (uv.y < ridge(uv.x, 0.33, 0.20, 1.9, 7.0 + uSeed, 0.008)) v = 0.5 + 0.15 * fbm(uv * 30.0);
  if (uv.y < ridge(uv.x, 0.19, 0.18, 2.6, 13.0 + uSeed, 0.013)) v = 0.72 + 0.12 * fbm(uv * 40.0 + 3.0);
  return v * uGain;
}

void main() {
  float v = horizon(gl_FragCoord.xy);
  float on = step(bayer8(gl_FragCoord.xy) + 0.001, clamp(v, 0.0, 1.0));
  gl_FragColor = vec4(mix(uPaper, uInk, on), 1.0);
}
`;

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

type DitherProps = {
  ink: string;
  paper: string;
  cell?: number;
  fps?: number;
  gain?: number;
  seed?: number;
  sunY?: number;
  /** Draw a crescent moon instead of the sun. */
  moon?: boolean;
  /** Ms for the dots to resolve from bare paper on mount; skipped under reduced motion. */
  intro?: number;
  className?: string;
};

export function Dither({ ink, paper, cell = 4, fps = 20, gain = 1, seed = 0, sunY = 0.6, intro = 0, moon = false, className = "" }: DitherProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, depth: false, premultipliedAlpha: false });
    if (!gl) return;
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform3fv(u("uInk"), hexToRgb(ink));
    gl.uniform3fv(u("uPaper"), hexToRgb(paper));
    gl.uniform1f(u("uSeed"), seed);
    gl.uniform1f(u("uMoon"), moon ? 1 : 0);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.62, y: 0.55 };
    const pointer = { ...target };
    let visible = true;
    let frame = 0;
    let last = 0;
    const start = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.ceil(r.width / cell));
      canvas.height = Math.max(1, Math.ceil(r.height / cell));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u("uRes"), canvas.width, canvas.height);
      draw(last);
    };
    const draw = (now: number) => {
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;
      gl.uniform1f(u("uTime"), reduced ? 12 : (now - start) / 1000);
      // Quint ease-out, close to the site's --ease-out-strong: the dots arrive fast, then settle.
      const t = reduced || !intro ? 1 : Math.min(1, Math.max(0, (now - start) / intro));
      gl.uniform1f(u("uGain"), gain * (1 - (1 - t) ** 5));
      gl.uniform2f(u("uPointer"), pointer.x, pointer.y);
      gl.uniform1f(u("uSunY"), sunY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 1000 / fps) return;
      last = now;
      draw(now);
    };
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (!reduced) {
      frame = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [ink, paper, cell, fps, gain, seed, sunY, intro, moon]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ imageRendering: "pixelated", width: "100%", height: "100%", display: "block" }}
    />
  );
}
