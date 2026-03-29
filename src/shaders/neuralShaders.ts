/** GLSL for particle field + pulsating AI core */

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
attribute float aPhase;

void main() {
  vec3 pos = position;
  float t = uTime * 0.35 + aPhase * 6.28318;
  float n = sin(t + pos.x * 2.0) * 0.08 + cos(t * 0.8 + pos.y * 3.0) * 0.06;
  vec3 dir = length(pos) > 0.001 ? normalize(pos) : vec3(0.0, 1.0, 0.0);
  pos += dir * n;
  pos.x += uPointer.x * 0.45;
  pos.y += uPointer.y * 0.35;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  float d = length(mvPosition.xyz);
  gl_PointSize = mix(1.2, 3.2, smoothstep(12.0, 3.0, d));
}
`

export const particleFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uColorB;

void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  float a = 1.0 - smoothstep(0.45, 0.5, length(c));
  if (a < 0.01) discard;
  vec3 col = mix(uColor, uColorB, gl_PointCoord.y);
  gl_FragColor = vec4(col, a * 0.55);
}
`

export const coreVertex = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  float pulse = sin(uTime * 2.2) * 0.03 + 0.97;
  pos *= pulse;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vView = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`

export const coreFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uEmissive;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5);
  float pulse = 0.55 + 0.45 * sin(uTime * 3.1);
  vec3 base = mix(uColor * 0.35, uEmissive, fresnel * pulse);
  float rim = smoothstep(0.2, 1.0, fresnel);
  base += vec3(0.15, 0.85, 1.0) * rim * 0.4;
  gl_FragColor = vec4(base, 0.92);
}
`
