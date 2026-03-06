// =============================================
// GLSL NOISE
// =============================================
export const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

// =============================================
// FLUID DISPLACEMENT SHADERS
// =============================================
export const fluidVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const fluidFragment = /* glsl */ `
${noiseGLSL}
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec2 uImageRes;
uniform sampler2D uTexture;
uniform float uScrollProgress;
uniform float uHover;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageRes.x / uImageRes.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageRes.y / uImageRes.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec2 centeredUv = uv * 2.0 - 1.0;
  vec2 mouseUv = uMouse * 2.0 - 1.0;
  mouseUv.y = -mouseUv.y;

  // Masking: Ground distorts heavily, sky subtly. Y goes from 0 (bottom) to 1 (top)
  float groundMask = smoothstep(0.6, 0.0, uv.y);
  
  // Base slow fluid flow
  float noiseFloor = snoise(uv * 3.0 + vec2(uTime * 0.2, 0.0)) * 0.03;
  float noiseDetail = snoise(uv * 8.0 - vec2(0.0, uTime * 0.3)) * 0.015;
  
  // Mouse interaction ripple
  float aspect = uResolution.x / uResolution.y;
  vec2 d = centeredUv - mouseUv;
  d.x *= aspect;
  float dist = length(d);
  float ripple = sin(dist * 20.0 - uTime * 5.0) * exp(-dist * 5.0) * 0.02 * uHover;

  // Add scroll parallax shift
  vec2 scrollShift = vec2(0.0, uScrollProgress * 0.08);

  // Combine distortions
  vec2 finalUv = uv + scrollShift;
  vec2 distortion = vec2(noiseFloor + noiseDetail + ripple) * groundMask;
  
  // Very gentle global warp for the sky
  vec2 globalWarp = vec2(
    snoise(uv * 2.0 + uTime * 0.1) * 0.005,
    snoise(uv * 2.0 - uTime * 0.1) * 0.005
  );

  finalUv += distortion + globalWarp;

  // Clamping to avoid edge artifacts
  finalUv = clamp(finalUv, 0.001, 0.999);

  vec4 color = texture2D(uTexture, finalUv);

  // Deepen the colors slightly based on the noise (gives volume to the fluid)
  color.rgb -= abs(distortion.y) * 2.5;

  gl_FragColor = color;
}`;

