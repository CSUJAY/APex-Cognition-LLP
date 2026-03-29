import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshDistortMaterial,
  Sparkles,
  Float,
  Trail,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'
import { particleVertex, particleFragment, coreVertex, coreFragment } from '../shaders/neuralShaders'

function NeuralLinks({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.LineSegments>(null)
  const geom = useMemo(() => {
    const n = reduced ? 36 : 64
    const pts: THREE.Vector3[] = []
    const sph = new THREE.Spherical()
    for (let i = 0; i < n; i++) {
      sph.radius = 7.5 + Math.random() * 3.5
      sph.phi = Math.acos(2 * Math.random() - 1)
      sph.theta = Math.random() * Math.PI * 2
      pts.push(new THREE.Vector3().setFromSpherical(sph))
    }
    const arr: number[] = []
    const maxD = reduced ? 2.6 : 3.4
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (pts[i].distanceTo(pts[j]) < maxD) {
          arr.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
    return g
  }, [reduced])

  useFrame((state) => {
    const l = ref.current
    if (!l) return
    l.rotation.y = state.clock.elapsedTime * 0.03
    l.rotation.x = state.pointer.y * 0.08
  })

  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial
        color="#22d3ee"
        transparent
        opacity={reduced ? 0.06 : 0.1}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

function ParticleField({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const { geom, mat } = useMemo(() => {
    const count = reduced ? 900 : 2400
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    const sph = new THREE.Spherical()
    for (let i = 0; i < count; i++) {
      sph.radius = 6 + Math.random() * 5.5
      sph.phi = Math.acos(2 * Math.random() - 1)
      sph.theta = Math.random() * Math.PI * 2
      const v = new THREE.Vector3().setFromSpherical(sph)
      positions[i * 3] = v.x
      positions[i * 3 + 1] = v.y
      positions[i * 3 + 2] = v.z
      phases[i] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#22d3ee') },
        uColorB: { value: new THREE.Color('#a855f7') },
      },
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return { geom: g, mat: m }
  }, [reduced])

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uPointer.value.copy(state.pointer)
    const p = ref.current
    if (p) {
      p.rotation.y = state.clock.elapsedTime * 0.018
    }
  })

  return <points ref={ref} geometry={geom} material={mat} />
}

function ShaderCore({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#0c1222') },
          uEmissive: { value: new THREE.Color('#22d3ee') },
        },
        vertexShader: coreVertex,
        fragmentShader: coreFragment,
        transparent: true,
      }),
    [],
  )

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime
    const m = mesh.current
    if (m) m.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.42, reduced ? 32 : 48, reduced ? 32 : 48]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

function OrbiterTrail({
  radius,
  speed,
  phase,
  color,
  reduced,
}: {
  radius: number
  speed: number
  phase: number
  color: string
  reduced: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime * speed + phase
    m.position.x = Math.cos(t) * radius
    m.position.z = Math.sin(t) * radius * 0.85
    m.position.y = Math.sin(t * 1.3) * 0.35
  })

  const inner = (
    <mesh ref={ref}>
      <sphereGeometry args={[reduced ? 0.04 : 0.055, 10, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  )

  if (reduced) return inner

  return (
    <Trail
      width={0.12}
      color={color}
      length={8}
      decay={2.2}
      attenuation={(t) => t * t}
    >
      {inner}
    </Trail>
  )
}

function NeuralCore({
  mouseFactor,
  reduced,
  offset,
}: {
  mouseFactor: number
  reduced: boolean
  offset: [number, number, number]
}) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const g = group.current
    const w = wireRef.current
    if (!g) return
    const t = state.clock.elapsedTime
    const { pointer } = state
    g.rotation.y = t * 0.12 + pointer.x * mouseFactor * 0.45
    g.rotation.x = pointer.y * mouseFactor * 0.35
    if (w) {
      w.rotation.y = -t * 0.22
      const mat = w.material as THREE.MeshBasicMaterial
      mat.opacity = 0.08 + Math.sin(t * 2) * 0.03
    }
    if (mesh.current) mesh.current.rotation.z = t * 0.08
  })

  return (
    <group position={offset}>
      <Float speed={reduced ? 1.2 : 2} rotationIntensity={0.35} floatIntensity={0.55}>
        <group ref={group}>
          <mesh ref={wireRef}>
            <icosahedronGeometry args={[1.2, reduced ? 1 : 2]} />
            <meshBasicMaterial
              color="#22d3ee"
              wireframe
              transparent
              opacity={0.12}
            />
          </mesh>
          <mesh ref={mesh}>
            <sphereGeometry args={[0.95, reduced ? 32 : 64, reduced ? 32 : 64]} />
            <MeshDistortMaterial
              color="#1e1b4b"
              emissive="#22d3ee"
              emissiveIntensity={reduced ? 0.35 : 0.62}
              roughness={0.22}
              metalness={0.88}
              distort={reduced ? 0.26 : 0.48}
              speed={reduced ? 1.5 : 2.4}
            />
          </mesh>
          <ShaderCore reduced={reduced} />
          <mesh scale={1.08}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.1}
              transparent
              opacity={0.07}
              roughness={1}
              metalness={0}
            />
          </mesh>
          {!reduced && (
            <group>
              <OrbiterTrail
                radius={1.55}
                speed={0.9}
                phase={0}
                color="#22d3ee"
                reduced={reduced}
              />
              <OrbiterTrail
                radius={1.35}
                speed={-1.1}
                phase={2}
                color="#e879f9"
                reduced={reduced}
              />
              <OrbiterTrail
                radius={1.7}
                speed={0.65}
                phase={4}
                color="#67e8f9"
                reduced={reduced}
              />
            </group>
          )}
        </group>
      </Float>
    </group>
  )
}

function PointerLights() {
  const a = useRef<THREE.PointLight>(null)
  const b = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    const { pointer } = state
    if (a.current) {
      a.current.position.x = 3.5 + pointer.x * 2.2
      a.current.position.y = 2.5 + pointer.y * 1.8
    }
    if (b.current) {
      b.current.position.x = -4 - pointer.x * 1.5
      b.current.position.y = -1.5 + pointer.y * 1.2
    }
  })
  return (
    <>
      <pointLight ref={a} position={[4, 3, 6]} intensity={2.4} color="#22d3ee" />
      <pointLight ref={b} position={[-5, -2, -4]} intensity={1.5} color="#d946ef" />
    </>
  )
}

function PostFX({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.12}
        luminanceSmoothing={0.92}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.12} darkness={0.62} />
      <Noise opacity={0.035} />
    </EffectComposer>
  )
}

function SceneContent({
  reduced,
  sparkles,
  fullBleed,
}: {
  reduced: boolean
  sparkles: number
  fullBleed: boolean
}) {
  const mouseFactor = reduced ? 0.5 : 1
  const coreOffset: [number, number, number] = fullBleed ? [1.35, 0.05, 0] : [0, 0, 0]

  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[0, 6, 4]} intensity={0.55} color="#e0f2fe" />
      <PointerLights />

      <NeuralLinks reduced={reduced} />
      <ParticleField reduced={reduced} />

      <NeuralCore mouseFactor={mouseFactor} reduced={reduced} offset={coreOffset} />

      <Sparkles
        count={sparkles}
        scale={reduced ? 5 : 7}
        size={reduced ? 1.1 : 1.55}
        speed={0.32}
        opacity={0.5}
        color="#67e8f9"
      />
      <Sparkles
        count={Math.floor(sparkles * 0.45)}
        scale={reduced ? 4.5 : 6}
        size={0.95}
        speed={0.18}
        opacity={0.32}
        color="#c084fc"
      />

      <PostFX enabled={!reduced} />
    </>
  )
}

export function NeuralScene({
  reduced = false,
  className = '',
  fullBleed = false,
}: {
  reduced?: boolean
  className?: string
  /** Full-viewport hero: core biased right, particle field fills frame */
  fullBleed?: boolean
}) {
  const sparkles = useMemo(() => (reduced ? 40 : 130), [reduced])

  return (
    <div
      className={`relative h-full w-full touch-none ${className}`}
      style={{ minHeight: fullBleed ? 'min(100dvh,900px)' : undefined }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: fullBleed ? 44 : 42 }}
        dpr={reduced ? [1, 1.25] : [1, Math.min(1.75, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
        gl={{
          antialias: !reduced,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent reduced={reduced} sparkles={sparkles} fullBleed={fullBleed} />
        </Suspense>
      </Canvas>
    </div>
  )
}
