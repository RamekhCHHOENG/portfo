import type { Ref } from 'vue'

// ─── Vertex shader (shared by all passes) ─────────────────────────────────────
// layout(location=0) lets us use a single VAO across all programs
const VERT = /* glsl */`#version 300 es
layout(location = 0) in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = (a_pos + 1.0) * 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

// ─── Pass 1: Background ───────────────────────────────────────────────────────
// Matches app.vue: gradient(145deg, #07001a → #04081c → #010f0a) + 4 orbs
const BG_FRAG = /* glsl */`#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time;
out vec4 fragColor;

float gauss2(vec2 uv, vec2 c, float sigma) {
  vec2 d = uv - c;
  return exp(-dot(d, d) / (2.0 * sigma * sigma));
}

void main() {
  vec2 uv = v_uv; // 0..1, Y=0 bottom

  // Match app.vue gradient: 145deg ≈ angle in standard coords
  // gradient goes from top-left(ish) #07001a → mid #04081c → bottom-right #010f0a
  float gr = uv.x * 0.4 + (1.0 - uv.y) * 0.6; // 0=top-left, 1=bottom-right
  vec3 col;
  if (gr < 0.45) {
    col = mix(vec3(0.0275, 0.0, 0.102), vec3(0.0157, 0.0314, 0.110), gr / 0.45);
  } else {
    col = mix(vec3(0.0157, 0.0314, 0.110), vec3(0.004, 0.059, 0.039), (gr - 0.45) / 0.55);
  }

  float t = u_time * 0.5;

  // Violet orb — upper-left (matches app.vue orb 1)
  vec2 o1c = vec2(0.08 + sin(t * 0.31) * 0.04, 0.82 + cos(t * 0.26) * 0.04);
  col += vec3(0.427, 0.157, 0.851) * gauss2(uv, o1c, 0.44) * 0.32;

  // Blue orb — right center (matches app.vue orb 2)
  vec2 o2c = vec2(0.90 + sin(t * 0.20 + 2.0) * 0.04, 0.50 + cos(t * 0.16 + 1.0) * 0.04);
  col += vec3(0.114, 0.306, 0.847) * gauss2(uv, o2c, 0.36) * 0.22;

  // Teal orb — lower-left (matches app.vue orb 3)
  vec2 o3c = vec2(0.20 + sin(t * 0.15 + 4.0) * 0.03, 0.14 + cos(t * 0.12 + 3.0) * 0.04);
  col += vec3(0.020, 0.588, 0.412) * gauss2(uv, o3c, 0.34) * 0.16;

  // Rose orb — lower-right (matches app.vue orb 4)
  vec2 o4c = vec2(0.78 + sin(t * 0.18 + 5.0) * 0.03, 0.18 + cos(t * 0.14 + 2.0) * 0.03);
  col += vec3(0.745, 0.094, 0.365) * gauss2(uv, o4c, 0.26) * 0.12;

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

// ─── Pass 2 & 3: Two-pass Gaussian blur ───────────────────────────────────────
const BLUR_H_FRAG = /* glsl */`#version 300 es
precision highp float;
#define MAX_R 22
in vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform int u_radius;
uniform float u_weights[MAX_R + 1];
out vec4 fragColor;
void main() {
  float px = 1.0 / u_res.x;
  vec4 col = texture(u_tex, v_uv) * u_weights[0];
  for (int i = 1; i <= MAX_R; ++i) {
    if (i > u_radius) break;
    float w = u_weights[i];
    col += texture(u_tex, v_uv + vec2(float(i) * px, 0.0)) * w;
    col += texture(u_tex, v_uv - vec2(float(i) * px, 0.0)) * w;
  }
  fragColor = col;
}`

const BLUR_V_FRAG = /* glsl */`#version 300 es
precision highp float;
#define MAX_R 22
in vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform int u_radius;
uniform float u_weights[MAX_R + 1];
out vec4 fragColor;
void main() {
  float py = 1.0 / u_res.y;
  vec4 col = texture(u_tex, v_uv) * u_weights[0];
  for (int i = 1; i <= MAX_R; ++i) {
    if (i > u_radius) break;
    float w = u_weights[i];
    col += texture(u_tex, v_uv + vec2(0.0, float(i) * py)) * w;
    col += texture(u_tex, v_uv - vec2(0.0, float(i) * py)) * w;
  }
  fragColor = col;
}`

// ─── Pass 4: Glass lens ────────────────────────────────────────────────────────
// All distances in physical pixels. Snell-law refraction + chromatic aberration
// + sharp/blur mix based on depth + fresnel rim glow + directional glare.
// Refraction formula matches the reference liquid-glass-studio project.
const GLASS_FRAG = /* glsl */`#version 300 es
precision highp float;
#define PI 3.14159265359

// Per-channel refractive indices (chromatic aberration)
const float N_R = 0.98;
const float N_G = 1.00;
const float N_B = 1.02;

in vec2 v_uv;
uniform sampler2D u_blurred;
uniform sampler2D u_bg;
uniform vec2 u_res;       // physical px

// Glass shape (physical px, Y from bottom)
uniform vec2 u_center;    // center in physical px
uniform float u_hw;       // half-width  in physical px
uniform float u_hh;       // half-height in physical px
uniform float u_r;        // corner radius in physical px

// Optics
uniform float u_refBand;  // refraction edge band in physical px
uniform float u_refEta;   // refractive index ratio (>1 = denser glass)
uniform float u_rimBand;  // fresnel rim band in physical px
uniform float u_rimPow;   // fresnel power
uniform float u_glarePow; // glare power
uniform float u_alpha;    // hover fade: 0=invisible, 1=fully visible

out vec4 fragColor;

float sdRoundBox(vec2 p, float hw, float hh, float r) {
  vec2 q = abs(p) - vec2(hw - r, hh - r);
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float sdf(vec2 p) { return sdRoundBox(p - u_center, u_hw, u_hh, u_r); }

vec2 sdfNormal(vec2 p) {
  float e = 1.5;
  return normalize(vec2(
    sdf(p + vec2(e, 0.0)) - sdf(p - vec2(e, 0.0)),
    sdf(p + vec2(0.0, e)) - sdf(p - vec2(0.0, e))
  ));
}

// Sample texture with per-channel UV offset (chromatic aberration)
vec3 sampleDispersion(sampler2D tex, vec2 uv, vec2 off) {
  return vec3(
    texture(tex, uv + off * (1.0 - (N_R - 1.0))).r,
    texture(tex, uv + off * (1.0 - (N_G - 1.0))).g,
    texture(tex, uv + off * (1.0 - (N_B - 1.0))).b
  );
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float d = sdf(frag);   // positive = outside, negative = inside

  if (d >= 1.0 || u_alpha < 0.001) {
    fragColor = texture(u_bg, v_uv);
    return;
  }

  float edgeMask = clamp(1.0 - d, 0.0, 1.0);
  vec2 n = sdfNormal(frag);
  float insideDist = -d; // ≥ 0 inside (physical px from edge)

  // ── Snell's law refraction (matches reference liquid-glass-studio) ────────
  // x_R_ratio = 1 at edge, 0 at refBand depth
  float x = 1.0 - clamp(insideDist / u_refBand, 0.0, 1.0);
  float sinI = pow(x, 2.0);
  float thetaI = asin(clamp(sinI, 0.0, 1.0));
  float thetaT = asin(clamp(sinI / u_refEta, 0.0, 1.0));
  // Deflection angle: negative because glass bends rays inward
  float deflect = -tan(thetaT - thetaI) * 18.0;
  vec2 refOff = n * deflect / u_res;

  // ── Mix sharp background (edge) → blurred background (interior) ──────────
  float blurMix = smoothstep(0.0, u_refBand, insideDist);

  vec3 sharpCol  = sampleDispersion(u_bg,      v_uv, refOff);
  vec3 blurCol   = sampleDispersion(u_blurred, v_uv, refOff);
  vec3 glassCol  = mix(sharpCol, blurCol, blurMix);

  // Subtle brightening to enhance the glass feel
  glassCol = clamp(glassCol * 1.16 + 0.02, 0.0, 1.0);

  // Subtle violet tint toward interior
  glassCol = mix(glassCol, vec3(0.26, 0.14, 0.48), blurMix * 0.09);

  // ── Fresnel rim glow ──────────────────────────────────────────────────────
  float rim = pow(clamp(1.0 - insideDist / u_rimBand, 0.0, 1.0), u_rimPow);
  glassCol = mix(glassCol, vec3(1.0, 0.95, 1.0), rim * 0.52);

  // ── Directional glare (top-right highlight at 45°) ────────────────────────
  float ang = atan(n.y, n.x);
  float glareDir = cos(ang - PI * 0.25);
  float glareFac = pow(max(glareDir, 0.0), u_glarePow);
  float glareRim = pow(clamp(1.0 - insideDist / (u_rimBand * 2.8), 0.0, 1.0), 1.4);
  glassCol = mix(glassCol, vec3(1.0), glareRim * glareFac * 0.44);

  vec4 outside = texture(u_bg, v_uv);
  fragColor = mix(outside, vec4(glassCol, 1.0), edgeMask * u_alpha);
}`

// ─── Types ────────────────────────────────────────────────────────────────────
type GL = WebGL2RenderingContext
type FBO = { fb: WebGLFramebuffer; tex: WebGLTexture }

// ─── WebGL helpers ────────────────────────────────────────────────────────────
function compileShader(gl: GL, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? 'shader error')
  return s
}

function linkProgram(gl: GL, vertSrc: string, fragSrc: string): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  const prog = gl.createProgram()!
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(prog) ?? 'link error')
  return prog
}

function createFBO(gl: GL, w: number, h: number): FBO {
  const fb = gl.createFramebuffer()!
  const tex = gl.createTexture()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.bindTexture(gl.TEXTURE_2D, null)
  return { fb, tex }
}

function resizeFBOTex(gl: GL, fbo: FBO, w: number, h: number) {
  gl.bindTexture(gl.TEXTURE_2D, fbo.tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.bindTexture(gl.TEXTURE_2D, null)
}

function gaussianWeights(radius: number, maxLen: number): number[] {
  const sigma = radius / 3
  const w = Array.from({ length: radius + 1 }, (_, i) =>
    Math.exp(-(i * i) / (2 * sigma * sigma)),
  )
  const total = w[0] + 2 * w.slice(1).reduce((s, v) => s + v, 0)
  const normalized = w.map(v => v / total)
  // Pad to maxLen
  while (normalized.length < maxLen) normalized.push(0)
  return normalized
}

// ─── Composable ───────────────────────────────────────────────────────────────
const BLUR_RADIUS = 18
const BLUR_MAX_ARRAY = 23 // MAX_R + 1 = 23

export function useLiquidGlass(canvasRef: Ref<HTMLCanvasElement | null>) {
  let gl: GL | null = null
  let rafId = 0
  let t0 = 0
  let pw = 0, ph = 0, dpr = 1, lw = 0, lh = 0

  // Programs
  let bgProg: WebGLProgram | null = null
  let blurHProg: WebGLProgram | null = null
  let blurVProg: WebGLProgram | null = null
  let glassProg: WebGLProgram | null = null

  // Fullscreen quad VAO (shared)
  let vao: WebGLVertexArrayObject | null = null

  // FBOs
  let bgFBO: FBO | null = null
  let blurHFBO: FBO | null = null
  let blurVFBO: FBO | null = null

  let blurWeights: number[] = []

  // Spring physics (physical px, WebGL Y-up)
  let sx = 0, sy = 0, vx = 0, vy = 0
  let tx = 0, ty = 0, hasMouse = false
  let alpha = 0  // 0 = invisible, 1 = fully shown

  // ── Uniform setters ────────────────────────────────────────────────────────
  const ul = (p: WebGLProgram, n: string) => gl!.getUniformLocation(p, n)
  const f1 = (p: WebGLProgram, n: string, v: number) => gl!.uniform1f(ul(p, n), v)
  const i1 = (p: WebGLProgram, n: string, v: number) => gl!.uniform1i(ul(p, n), v)
  const f2 = (p: WebGLProgram, n: string, x: number, y: number) => gl!.uniform2f(ul(p, n), x, y)
  const fv = (p: WebGLProgram, n: string, a: number[]) => gl!.uniform1fv(ul(p, n), new Float32Array(a))

  function bindUnit(unit: number, tex: WebGLTexture) {
    gl!.activeTexture(gl!.TEXTURE0 + unit)
    gl!.bindTexture(gl!.TEXTURE_2D, tex)
  }

  function quad() {
    gl!.bindVertexArray(vao)
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    gl!.bindVertexArray(null)
  }

  // ── Render loop ────────────────────────────────────────────────────────────
  function frame(now: number) {
    if (!gl || !bgFBO || !blurHFBO || !blurVFBO) return

    const elapsed = (now - t0) / 1000

    // Fade in/out based on hover state
    alpha += ((hasMouse ? 1.0 : 0.0) - alpha) * 0.07

    // Spring physics — only chase the mouse when visible
    const targetX = hasMouse ? tx : pw / 2
    const targetY = hasMouse ? ty : ph * 0.42
    vx += (targetX - sx) * 0.065; vy += (targetY - sy) * 0.065
    vx *= 0.80; vy *= 0.80
    sx += vx; sy += vy

    gl.viewport(0, 0, pw, ph)

    // Pass 1 — Background
    gl.bindFramebuffer(gl.FRAMEBUFFER, bgFBO.fb)
    gl.useProgram(bgProg)
    f1(bgProg!, 'u_time', elapsed)
    quad()

    // Pass 2 — H-blur
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurHFBO.fb)
    gl.useProgram(blurHProg)
    bindUnit(0, bgFBO.tex)
    i1(blurHProg!, 'u_tex', 0)
    f2(blurHProg!, 'u_res', pw, ph)
    i1(blurHProg!, 'u_radius', BLUR_RADIUS)
    fv(blurHProg!, 'u_weights', blurWeights)
    quad()

    // Pass 3 — V-blur
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurVFBO.fb)
    gl.useProgram(blurVProg)
    bindUnit(0, blurHFBO.tex)
    i1(blurVProg!, 'u_tex', 0)
    f2(blurVProg!, 'u_res', pw, ph)
    i1(blurVProg!, 'u_radius', BLUR_RADIUS)
    fv(blurVProg!, 'u_weights', blurWeights)
    quad()

    // Pass 4 — Glass onto screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.useProgram(glassProg)
    bindUnit(0, blurVFBO.tex)
    bindUnit(1, bgFBO.tex)
    i1(glassProg!, 'u_blurred', 0)
    i1(glassProg!, 'u_bg', 1)
    f2(glassProg!, 'u_res', pw, ph)
    f2(glassProg!, 'u_center', sx, sy)
    f1(glassProg!, 'u_hw', 160 * dpr)   // 320px wide (half-width)
    f1(glassProg!, 'u_hh', 54 * dpr)    // 108px tall (half-height)
    f1(glassProg!, 'u_r', 54 * dpr)     // pill shape (r == hh)
    f1(glassProg!, 'u_refBand', 34 * dpr)
    f1(glassProg!, 'u_refEta', 1.42)
    f1(glassProg!, 'u_rimBand', 28 * dpr)
    f1(glassProg!, 'u_rimPow', 2.2)
    f1(glassProg!, 'u_glarePow', 2.2)
    f1(glassProg!, 'u_alpha', alpha)
    quad()

    rafId = requestAnimationFrame(frame)
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init(): boolean {
    const canvas = canvasRef.value
    if (!canvas) return false

    dpr = Math.min(window.devicePixelRatio || 1, 2)
    lw = canvas.offsetWidth || window.innerWidth
    lh = canvas.offsetHeight || window.innerHeight
    pw = Math.round(lw * dpr)
    ph = Math.round(lh * dpr)
    canvas.width = pw
    canvas.height = ph

    const ctx = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!ctx) {
      console.warn('[LiquidGlass] WebGL2 not available')
      return false
    }
    gl = ctx

    try {
      bgProg = linkProgram(gl, VERT, BG_FRAG)
      blurHProg = linkProgram(gl, VERT, BLUR_H_FRAG)
      blurVProg = linkProgram(gl, VERT, BLUR_V_FRAG)
      glassProg = linkProgram(gl, VERT, GLASS_FRAG)
    }
    catch (e) {
      console.error('[LiquidGlass] Shader error:', e)
      return false
    }

    // Single fullscreen-quad VAO (all programs use location=0)
    vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)

    blurWeights = gaussianWeights(BLUR_RADIUS, BLUR_MAX_ARRAY)

    bgFBO = createFBO(gl, pw, ph)
    blurHFBO = createFBO(gl, pw, ph)
    blurVFBO = createFBO(gl, pw, ph)

    // Start glass at hero center (hidden — will fade in on first mousemove)
    sx = tx = pw / 2
    sy = ty = ph * 0.42
    alpha = 0

    t0 = performance.now()
    rafId = requestAnimationFrame(frame)
    return true
  }

  // ── Resize ─────────────────────────────────────────────────────────────────
  // IMPORTANT: setting canvas.width destroys all WebGL state.
  // So on resize we do a full destroy + re-init instead.
  function resize(w: number, h: number) {
    const newPw = Math.round(w * dpr)
    const newPh = Math.round(h * dpr)
    if (newPw === pw && newPh === ph) return // same size — skip (initial ResizeObserver fire)
    destroy()
    init()
  }

  // ── Mouse ──────────────────────────────────────────────────────────────────
  function setMouse(clientX: number, clientY: number) {
    const canvas = canvasRef.value
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    tx = (clientX - rect.left) * dpr
    ty = (lh - (clientY - rect.top)) * dpr // flip Y for WebGL
    hasMouse = true
  }

  function clearMouse() { hasMouse = false }

  // ── Cleanup ────────────────────────────────────────────────────────────────
  function destroy() {
    cancelAnimationFrame(rafId)
    gl = null
    bgProg = blurHProg = blurVProg = glassProg = null
    vao = null
    bgFBO = blurHFBO = blurVFBO = null
    alpha = 0
  }

  return { init, resize, setMouse, clearMouse, destroy }
}
