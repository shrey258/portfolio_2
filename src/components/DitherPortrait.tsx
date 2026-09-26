import { useEffect, useRef } from "react";
import type { ComponentProps } from "react";
import { DARK_SCHEME, REDUCED_MOTION, useMediaQuery } from "../hooks/useMediaQuery";

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// 1-bit ordered (Bayer 8x8) dither in the page's ink and paper colors. Around the pointer a
// soft lens shows the continuous-tone photo underneath.
const FRAGMENT = `
precision mediump float;
uniform sampler2D image;
uniform vec2 resolution;
uniform vec2 imageSize;
uniform float cell;
uniform vec3 dark;
uniform vec3 light;
uniform vec2 pointer;
uniform float radius;
uniform float reveal;

float bayer2(vec2 a) { a = floor(a); return fract(a.x * 0.5 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

vec2 cover(vec2 frag) {
  vec2 uv = frag / resolution;
  uv.y = 1.0 - uv.y;
  float ratio = (resolution.x / resolution.y) / (imageSize.x / imageSize.y);
  if (ratio > 1.0) uv.y = (uv.y - 0.5) / ratio + 0.5;
  else uv.x = (uv.x - 0.5) * ratio + 0.5;
  return uv;
}

float luma(vec2 frag) {
  return dot(texture2D(image, cover(frag)).rgb, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec2 c = floor(gl_FragCoord.xy / cell);
  float tone = pow(smoothstep(0.03, 0.9, luma((c + 0.5) * cell)), 0.8);
  vec3 dithered = mix(dark, light, step(bayer8(c), tone));
  vec3 soft = mix(dark, light, smoothstep(0.04, 0.96, luma(gl_FragCoord.xy)));
  float lens = (1.0 - smoothstep(radius * 0.5, radius, distance(gl_FragCoord.xy, pointer))) * reveal;
  gl_FragColor = vec4(mix(dithered, soft, lens), 1.0);
}
`;

// Resolves any CSS color (including oklch) to sRGB floats by painting one canvas pixel.
function toRgb(color: string): [number, number, number] {
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

type DitherPortraitProps = ComponentProps<"div"> & { src: string; alt: string };

export function DitherPortrait({ src, alt, className = "", ...props }: DitherPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const dark = useMediaQuery(DARK_SCHEME);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!wrap || !canvas || !gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const styles = getComputedStyle(wrap);
    const colors = [toRgb(styles.getPropertyValue("--ink")), toRgb(styles.getPropertyValue("--bg"))];
    const lum = ([r, g, b]: number[]) => r * 0.3 + g * 0.6 + b * 0.1;
    colors.sort((a, b) => lum(a) - lum(b));
    gl.uniform3fv(u("dark"), colors[0]);
    gl.uniform3fv(u("light"), colors[1]);

    const state = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, reveal: 0, target: 0, dpr: 1, ready: false };
    let frame = 0;

    const draw = () => {
      if (!state.ready) return;
      gl.uniform2f(u("pointer"), state.x * state.dpr, (canvas.height / state.dpr - state.y) * state.dpr);
      gl.uniform1f(u("reveal"), state.reveal);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Renders only while the lens is moving, then stops until the next pointer event.
    const tick = () => {
      const ease = reduced ? 1 : 0.2;
      state.x += (state.tx - state.x) * ease;
      state.y += (state.ty - state.y) * ease;
      state.reveal += (state.target - state.reveal) * (reduced ? 1 : 0.14);
      draw();
      const settled =
        Math.abs(state.tx - state.x) < 0.3 && Math.abs(state.ty - state.y) < 0.3 && Math.abs(state.target - state.reveal) < 0.005;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      state.dpr = Math.min(devicePixelRatio, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.round(width * state.dpr);
      canvas.height = Math.round(height * state.dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u("resolution"), canvas.width, canvas.height);
      gl.uniform1f(u("cell"), Math.round(2.5 * state.dpr));
      gl.uniform1f(u("radius"), Math.min(width, height) * 0.32 * state.dpr);
      draw();
    };

    const image = new Image();
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.uniform2f(u("imageSize"), image.width, image.height);
      state.ready = true;
      resize();
    };
    image.src = src;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      state.tx = e.clientX - rect.left;
      state.ty = e.clientY - rect.top;
      if (state.target === 0) {
        state.x = state.tx;
        state.y = state.ty;
      }
      state.target = 1;
      kick();
    };
    const onLeave = () => {
      state.target = 0;
      kick();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointercancel", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointercancel", onLeave);
    };
  }, [src, reduced, dark]);

  return (
    <div ref={wrapRef} className={`dither relative overflow-hidden ${className}`} {...props}>
      {/* Shown until WebGL paints, and kept if WebGL is unavailable. */}
      <img src={src} alt="" className="absolute inset-0 size-full object-cover grayscale" />
      <canvas ref={canvasRef} role="img" aria-label={alt} className="dither-canvas absolute inset-0 size-full" />
    </div>
  );
}
