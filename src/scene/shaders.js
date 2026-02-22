// =============================================
// GLSL NOISE
// =============================================
export const noiseGLSL = /* glsl */ `
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

// =============================================
// SKY — pure cold blue gradient (#010D6E → #0042AF)
// Gold stars (#D4C500), no purple, no warm tones
// =============================================
export const skyVertex = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const skyFragment = /* glsl */ `
${noiseGLSL}
uniform float uTime;
varying vec3 vDir;

void main(){
  vec3 dir = normalize(vDir);
  float y = dir.y;
  float t = y * 0.5 + 0.5;

  // Pure cold blue gradient matching Sleep Well Creatives
  // #020820 at zenith → #010D6E mid → #0042AF lower → #1A4FBF horizon
  vec3 zenith   = vec3(0.008, 0.031, 0.125);  // #020820
  vec3 upper    = vec3(0.004, 0.051, 0.431);   // #010D6E
  vec3 mid      = vec3(0.0, 0.259, 0.686);     // #0042AF
  vec3 horizon  = vec3(0.102, 0.310, 0.749);   // #1A4FBF

  vec3 sky = mix(horizon, mid, smoothstep(0.0, 0.12, t));
  sky = mix(sky, upper, smoothstep(0.12, 0.40, t));
  sky = mix(sky, zenith, smoothstep(0.40, 0.90, t));

  // Prominent horizon glow — bright blue band matching reference
  float hBand = exp(-pow(y * 8.0, 2.0));
  sky += vec3(0.06, 0.12, 0.35) * hBand;

  // Centered spotlight glow at horizon (brighter in the middle)
  float cx = abs(dir.x);
  float centerGlow = exp(-pow(y * 6.0, 2.0)) * exp(-cx * 1.5);
  sky += vec3(0.08, 0.15, 0.40) * centerGlow;

  // Upward light scatter
  float scatter = exp(-abs(y) * 8.0) * 0.08;
  sky += vec3(0.03, 0.06, 0.16) * scatter;

  // Stars — gold (#D4C500), sparse, twinkling
  float s1 = snoise(dir * 220.0);
  float s2 = snoise(dir * 380.0 + 50.0);
  float s3 = snoise(dir * 140.0 + 100.0);

  float star1 = smoothstep(0.965, 0.98, s1);
  float star2 = smoothstep(0.975, 0.99, s2);
  float star3 = smoothstep(0.982, 0.995, s3);

  float starMask = smoothstep(0.03, 0.25, y);

  float tw1 = sin(uTime * 1.0 + s1 * 80.0) * 0.25 + 0.75;
  float tw2 = cos(uTime * 0.7 + s2 * 60.0) * 0.2 + 0.8;

  // #D4C500 = vec3(0.831, 0.773, 0.0)
  vec3 goldStar = vec3(0.83, 0.77, 0.0);
  vec3 warmStar = vec3(0.75, 0.72, 0.25);

  sky += goldStar * star1 * tw1 * starMask * 0.55;
  sky += warmStar * star2 * tw2 * starMask * 0.35;
  sky += goldStar * star3 * starMask * 0.2;

  // Two larger gold orbs (like planets in the reference)
  float orb1 = smoothstep(0.991, 0.997, snoise(dir * 42.0 + 7.0));
  float orb2 = smoothstep(0.993, 0.998, snoise(dir * 58.0 + 33.0));
  sky += vec3(0.83, 0.77, 0.0) * orb1 * starMask * 0.7;
  sky += vec3(0.75, 0.70, 0.1) * orb2 * starMask * 0.5;

  gl_FragColor = vec4(sky, 1.0);
}`;

// =============================================
// TERRAIN — dark blue-black base with flowing cream (#FEF1D0) contour lines
// =============================================
export const terrainVertex = /* glsl */ `
${noiseGLSL}
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;
varying vec3 vPos;
varying vec3 vNorm;

void main(){
  vUv = uv;
  vec3 pos = position;

  // Gentle sculptural dunes
  float breath = sin(uTime * 0.2) * 0.03;
  float h1 = snoise(vec3(pos.x * 0.06, pos.z * 0.06, uTime * 0.02)) * 1.4;
  float h2 = snoise(vec3(pos.x * 0.14, pos.z * 0.10, uTime * 0.03)) * 0.4;
  float h3 = snoise(vec3(pos.x * 0.28 + uTime * 0.008, pos.z * 0.22, 0.0)) * 0.15;

  float ridge = abs(snoise(vec3(pos.x * 0.09, pos.z * 0.11, uTime * 0.015)));
  ridge = pow(ridge, 0.8) * 0.7;

  float totalH = h1 + h2 + h3 + ridge + breath;
  pos.y += totalH;

  float md = length(vec2(pos.x, pos.z) - uMouse * 18.0);
  pos.y += exp(-md * 0.03) * 0.4;

  vElevation = totalH;
  vPos = pos;

  float e = 0.6;
  float hL = snoise(vec3((position.x-e)*0.06, position.z*0.06, uTime*0.02))*1.4;
  float hR = snoise(vec3((position.x+e)*0.06, position.z*0.06, uTime*0.02))*1.4;
  float hD = snoise(vec3(position.x*0.06, (position.z-e)*0.06, uTime*0.02))*1.4;
  float hU = snoise(vec3(position.x*0.06, (position.z+e)*0.06, uTime*0.02))*1.4;
  vNorm = normalize(vec3(hL-hR, 2.0*e, hD-hU));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

export const terrainFragment = /* glsl */ `
${noiseGLSL}
uniform float uTime;
varying vec2 vUv;
varying float vElevation;
varying vec3 vPos;
varying vec3 vNorm;

void main(){
  // Bold flowing organic cream rivers — like zen garden sand patterns
  // Multiple noise layers at different scales create thick flowing bands
  float n1 = snoise(vec3(vPos.x * 0.07, vPos.z * 0.09, uTime * 0.01));
  float n2 = snoise(vec3(vPos.x * 0.05 + 5.0, vPos.z * 0.07 + 3.0, uTime * 0.008));
  float n3 = snoise(vec3(vPos.x * 0.12, vPos.z * 0.15, uTime * 0.012 + 2.0));
  float n4 = snoise(vec3(vPos.x * 0.03 + 10.0, vPos.z * 0.04, uTime * 0.006));

  // Create thick flowing bands using sin of noise — wider smoothstep = thicker bands
  float band1 = sin(n1 * 5.0 + vElevation * 1.5);
  float band2 = sin(n2 * 4.0 + vPos.x * 0.08);
  float band3 = sin(n3 * 6.0 + vElevation * 2.0);
  float band4 = sin(n4 * 3.0 + vPos.z * 0.05);

  // Thick, soft-edged flowing rivers (0.55 threshold = ~50% coverage)
  float river1 = smoothstep(0.15, 0.55, band1);
  float river2 = smoothstep(0.20, 0.60, band2);
  float river3 = smoothstep(0.25, 0.50, band3);
  float river4 = smoothstep(0.10, 0.45, band4);

  // Combine — organic overlap creates natural flowing shapes
  float cream = max(river1, max(river2 * 0.85, max(river3 * 0.65, river4 * 0.75)));

  // Add thin accent lines at the edges of bands for definition
  float edge1 = 1.0 - smoothstep(0.0, 0.08, abs(band1));
  float edge2 = 1.0 - smoothstep(0.0, 0.06, abs(band2));
  cream = max(cream, max(edge1 * 0.9, edge2 * 0.7));

  cream = clamp(cream, 0.0, 1.0);

  // Colors
  vec3 darkBase = vec3(0.01, 0.02, 0.10);
  vec3 creamCol = vec3(0.82, 0.78, 0.64);

  vec3 color = mix(darkBase, creamCol, cream);

  // Directional light from horizon
  vec3 ld = normalize(vec3(0.2, 0.35, -0.5));
  float diff = max(dot(vNorm, ld), 0.0);
  color *= 0.35 + diff * 0.65;

  // Blue ambient in dark crevices
  color += vec3(0.01, 0.02, 0.06) * (1.0 - cream) * 0.4;

  // Distance fog
  float dist = length(vPos.xz);
  float fog = smoothstep(14.0, 55.0, dist);
  vec3 fogCol = vec3(0.02, 0.05, 0.28);
  color = mix(color, fogCol, fog);

  gl_FragColor = vec4(color, 1.0);
}`;

// =============================================
// PARTICLES — tiny gold (#D4C500) motes
// =============================================
export const particleVertex = /* glsl */ `
${noiseGLSL}
uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;
attribute float aScale;
attribute float aSpeed;
attribute float aOffset;
varying float vAlpha;

void main(){
  vec3 pos = position;

  float wx = snoise(vec3(pos.x*0.06, pos.y*0.06, uTime*0.1+aOffset)) * 1.0;
  float wy = snoise(vec3(pos.y*0.06, pos.z*0.06, uTime*0.07+aOffset)) * 0.3;
  float wz = snoise(vec3(pos.z*0.06, pos.x*0.06, uTime*0.08+aOffset)) * 0.8;

  pos.x += wx * aSpeed;
  pos.y += wy * aSpeed + sin(uTime*0.3 + aOffset*6.28) * 0.15;
  pos.z += wz * aSpeed;

  float md = length(vec2(pos.x, pos.z) - uMouse * 12.0);
  float mi = exp(-md * 0.05) * 1.0;
  pos.x += (pos.x - uMouse.x*12.0) * mi * 0.03;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float size = aScale * 12.0 * uPixelRatio;
  gl_PointSize = size * (200.0 / -mvPos.z);

  vAlpha = smoothstep(0.5, 3.0, pos.y) * smoothstep(40.0, 18.0, length(pos.xz));
  float twinkle = sin(uTime * 1.5 + aOffset * 15.0) * 0.3 + 0.7;
  vAlpha *= twinkle * 0.5;
}`;

export const particleFragment = /* glsl */ `
varying float vAlpha;

void main(){
  float d = length(gl_PointCoord - 0.5);
  float dot = smoothstep(0.5, 0.08, d);

  // Gold #D4C500 = (0.83, 0.77, 0.0)
  vec3 color = vec3(0.83, 0.77, 0.0);
  gl_FragColor = vec4(color, dot * vAlpha);
}`;
