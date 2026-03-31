import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '../hooks/useIsMobile'
import { useInViewMount } from '../hooks/useInViewMount'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export type ProjectVariant = 'webgl' | 'dashboard' | 'saas'

function ProjectMiniStatic({ variant }: { variant: ProjectVariant }) {
  const grad =
    variant === 'webgl'
      ? 'from-cyan-500/25 via-violet-600/10 to-apex-void'
      : variant === 'dashboard'
        ? 'from-cyan-500/15 via-slate-800/30 to-apex-void'
        : 'from-fuchsia-500/20 via-cyan-500/10 to-apex-void'
  return (
    <div
      className={`absolute inset-0 bg-linear-to-br ${grad} motion-safe:animate-[pulse_5s_ease-in-out_infinite]`}
      aria-hidden
    >
      <div className="apex-grid absolute inset-0 opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-2xl" />
    </div>
  )
}

function MiniModel({
  variant,
  hover,
}: {
  variant: ProjectVariant
  hover: boolean
}) {
  const g = useRef<THREE.Group>(null)
  const target = useRef(1)

  useFrame((_, delta) => {
    const group = g.current
    if (!group) return
    target.current = THREE.MathUtils.lerp(target.current, hover ? 1.08 : 1, 1 - Math.pow(0.001, delta))
    group.scale.setScalar(target.current)
    group.rotation.y += delta * (hover ? 0.65 : 0.35)
    group.rotation.x = Math.sin(performance.now() * 0.0008) * 0.12
  })

  return (
    <group ref={g}>
      {variant === 'webgl' && (
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#0c1222"
            metalness={0.85}
            roughness={0.2}
            emissive="#22d3ee"
            emissiveIntensity={hover ? 0.35 : 0.18}
          />
          <Edges color="#22d3ee" threshold={15} />
        </mesh>
      )}
      {variant === 'dashboard' && (
        <group position={[0, -0.15, 0]}>
          <mesh position={[-0.35, 0.35, 0]}>
            <boxGeometry args={[0.35, 0.55, 0.06]} />
            <meshStandardMaterial
              color="#111827"
              emissive="#22d3ee"
              emissiveIntensity={0.15}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.15, 0.2, 0]}>
            <boxGeometry args={[0.55, 0.25, 0.06]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0.15, -0.25, 0]}>
            <boxGeometry args={[0.55, 0.35, 0.06]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#a855f7"
              emissiveIntensity={0.12}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
        </group>
      )}
      {variant === 'saas' && (
        <group>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[1.1, 0.22, 0.85]} />
            <meshStandardMaterial
              color="#0b1220"
              metalness={0.9}
              roughness={0.15}
              emissive="#22d3ee"
              emissiveIntensity={0.08}
            />
            <Edges color="#67e8f9" threshold={20} />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 0.2, 24]} />
            <meshStandardMaterial
              color="#1e1b4b"
              emissive="#d946ef"
              emissiveIntensity={hover ? 0.2 : 0.1}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

function Scene({ variant, hover }: { variant: ProjectVariant; hover: boolean }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 4]} intensity={1.6} color="#22d3ee" />
      <pointLight position={[-3, -1, -2]} intensity={0.9} color="#e879f9" />
      <MiniModel variant={variant} hover={hover} />
    </>
  )
}

export function ProjectMini3D({
  variant,
  className = '',
}: {
  variant: ProjectVariant
  className?: string
}) {
  const [hover, setHover] = useState(false)
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const { ref, active } = useInViewMount({ rootMargin: '80px', hideDelayMs: 800 })

  const useStatic = isMobile || reducedMotion
  const showCanvas = !useStatic && active

  return (
    <div
      ref={ref}
      className={`relative h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-[#030712] ${className}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      role="presentation"
    >
      {showCanvas ? (
        <Canvas
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          dpr={[1, Math.min(1.35, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false }}
        >
          <Suspense fallback={null}>
            <Scene variant={variant} hover={hover} />
          </Suspense>
        </Canvas>
      ) : (
        <ProjectMiniStatic variant={variant} />
      )}
      <div
        className={`pointer-events-none absolute inset-0 rounded-xl transition ${
          hover && showCanvas ? 'shadow-[inset_0_0_0_1px_rgba(34,211,238,0.45)]' : ''
        }`}
      />
    </div>
  )
}
