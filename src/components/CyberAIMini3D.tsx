import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '../hooks/useIsMobile'
import { useInViewMount } from '../hooks/useInViewMount'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export type CyberAIVariant = 'shield' | 'secure-tunnel' | 'ai-core'

function CyberMiniStatic({ variant }: { variant: CyberAIVariant }) {
  const accent =
    variant === 'shield'
      ? 'from-cyan-500/30 via-apex-deep to-apex-void'
      : variant === 'secure-tunnel'
        ? 'from-cyan-500/25 via-fuchsia-500/15 to-apex-void'
        : 'from-violet-500/30 via-apex-deep to-apex-void'

  return (
    <div
      className={`absolute inset-0 bg-linear-to-br ${accent} motion-safe:animate-[pulse_5s_ease-in-out_infinite]`}
      aria-hidden
    >
      <div className="apex-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`rounded-full blur-2xl motion-safe:animate-[pulse_4s_ease-in-out_infinite] ${
            variant === 'shield'
              ? 'h-20 w-20 bg-cyan-400/25'
              : variant === 'secure-tunnel'
                ? 'h-24 w-24 bg-linear-to-tr from-cyan-400/20 to-fuchsia-500/25'
                : 'h-22 w-22 bg-violet-500/30'
          }`}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
    </div>
  )
}

function ShieldMark() {
  const g = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!g.current) return
    const t = state.clock.elapsedTime
    g.current.rotation.y = t * 0.35
    g.current.rotation.x = Math.sin(t * 0.6) * 0.08
    if (ring.current) {
      ring.current.rotation.z = -t * 0.55
      ring.current.position.y = -0.1 + Math.sin(t * 1.4) * 0.18
    }
  })

  return (
    <group ref={g}>
      <mesh>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#22d3ee"
          emissiveIntensity={0.55}
          metalness={0.92}
          roughness={0.14}
        />
        <Edges color="#67e8f9" threshold={18} />
      </mesh>
      <mesh ref={ring} position={[0, -0.35, 0]} scale={[0.7, 0.22, 0.7]}>
        <torusGeometry args={[1, 0.18, 14, 48]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#a855f7"
          emissiveIntensity={0.22}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

function SecureTunnel({ light }: { light: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const gate = useRef<THREE.Mesh>(null)
  const tubular = light ? 96 : 180
  const tubularSegs = light ? 14 : 18
  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.z = t * 0.12
    mesh.current.rotation.y = t * 0.2
    if (gate.current) {
      gate.current.rotation.x = t * 0.9
      gate.current.rotation.y = -t * 0.55
      const m = gate.current.material as THREE.MeshStandardMaterial
      m.emissiveIntensity = 0.2 + (Math.sin(t * 2.2) * 0.5 + 0.5) * 0.25
    }
  })
  return (
    <group>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[0.72, 0.18, tubular, tubularSegs]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#22d3ee"
          emissiveIntensity={0.22}
          metalness={0.88}
          roughness={0.18}
        />
        <Edges color="#67e8f9" threshold={15} />
      </mesh>
      <mesh ref={gate} scale={1.05}>
        <torusGeometry args={[1.12, 0.05, 12, 64]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#e879f9"
          emissiveIntensity={0.28}
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}

function AICore({ light }: { light: boolean }) {
  const n = light ? 36 : 60
  const maxDist = light ? 1.25 : 1.1

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const sph = new THREE.Spherical()
    for (let i = 0; i < n; i++) {
      sph.radius = 1.6 + Math.random() * 1.2
      sph.phi = Math.acos(2 * Math.random() - 1)
      sph.theta = Math.random() * Math.PI * 2
      pts.push(new THREE.Vector3().setFromSpherical(sph))
    }
    return pts
  }, [n])

  const geom = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) {
          arr.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z)
        }
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
    return g
  }, [points, maxDist])

  const group = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const sphereSegs = light ? 28 : 48
  const torusSegs = light ? 48 : 90
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = t * 0.12
    group.current.rotation.x = Math.sin(t * 0.25) * 0.08
    if (ringA.current) ringA.current.rotation.y = t * 0.7
    if (ringB.current) ringB.current.rotation.x = -t * 0.8
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geom}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.26} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[0.48, sphereSegs, sphereSegs]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#22d3ee"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.16}
        />
      </mesh>
      <mesh ref={ringA} rotation={[0.25, 0, 0]} scale={1.35}>
        <torusGeometry args={[0.72, 0.045, 14, torusSegs]} />
        <meshStandardMaterial color="#0b1220" emissive="#a855f7" emissiveIntensity={0.25} roughness={0.4} />
      </mesh>
      <mesh ref={ringB} rotation={[0, 0.25, 0]} scale={1.18}>
        <torusGeometry args={[0.64, 0.04, 14, torusSegs]} />
        <meshStandardMaterial color="#0b1220" emissive="#e879f9" emissiveIntensity={0.18} roughness={0.45} />
      </mesh>
      <mesh scale={1.25}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.1} transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function Scene({ variant, light }: { variant: CyberAIVariant; light: boolean }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} color="#f5f3ff" />
      <pointLight position={[3, 2.5, 4]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[-3, -1.2, -2]} intensity={1.6} color="#e879f9" />

      <Float speed={light ? 1.2 : 2} floatIntensity={light ? 0.25 : 0.45} rotationIntensity={light ? 0.12 : 0.25}>
        {variant === 'shield' && <ShieldMark />}
        {variant === 'secure-tunnel' && <SecureTunnel light={light} />}
        {variant === 'ai-core' && <AICore light={light} />}
      </Float>

      <Sparkles count={10} scale={3.5} size={0.85} speed={0.25} opacity={0.35} color="#67e8f9" />
      <Sparkles count={6} scale={2.8} size={0.75} speed={0.15} opacity={0.2} color="#c084fc" />
    </>
  )
}

export function CyberAIMini3D({ variant, className = '' }: { variant: CyberAIVariant; className?: string }) {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const { ref, active } = useInViewMount({ rootMargin: '80px', hideDelayMs: 800 })

  const useStatic = isMobile || reducedMotion
  /** Skip postprocessing on these minis — avoids 3× heavy composers + context pressure. */
  const showCanvas = !useStatic && active

  return (
    <div
      ref={ref}
      className={`relative h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-[#030712] ${className}`}
    >
      {showCanvas ? (
        <Canvas
          camera={{ position: [0, 0.1, 4.4], fov: 45 }}
          dpr={[1, Math.min(1.35, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
          }}
        >
          <Suspense fallback={null}>
            <Scene variant={variant} light />
          </Suspense>
        </Canvas>
      ) : (
        <CyberMiniStatic variant={variant} />
      )}
    </div>
  )
}
