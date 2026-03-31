import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '../hooks/useIsMobile'
import { useInViewMount } from '../hooks/useInViewMount'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export type Team3DVariant = 'core' | 'flow'

function TeamMiniStatic({ variant }: { variant: Team3DVariant }) {
  return (
    <div
      className={`absolute inset-0 bg-linear-to-br ${
        variant === 'core' ? 'from-cyan-500/25' : 'from-fuchsia-500/25'
      } to-apex-void`}
      aria-hidden
    >
      <div className="apex-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={
            variant === 'core'
              ? 'h-7 w-7 rotate-45 border border-cyan-400/40 bg-cyan-500/20'
              : 'h-8 w-8 rounded-full border-2 border-fuchsia-400/35'
          }
        />
      </div>
    </div>
  )
}

function CoreMark() {
  const g = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!g.current) return
    const t = state.clock.elapsedTime
    g.current.rotation.y = t * 0.45
    g.current.rotation.x = Math.sin(t * 0.5) * 0.1
  })
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#22d3ee"
          emissiveIntensity={0.45}
          metalness={0.88}
          roughness={0.18}
        />
        <Edges color="#67e8f9" threshold={15} />
      </mesh>
    </group>
  )
}

function FlowMark() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.y = t * 0.35
    mesh.current.rotation.x = t * 0.12
  })
  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[0.62, 0.16, 140, 16]} />
      <meshStandardMaterial
        color="#0b1220"
        emissive="#a855f7"
        emissiveIntensity={0.35}
        metalness={0.82}
        roughness={0.2}
      />
      <Edges color="#e879f9" threshold={14} />
    </mesh>
  )
}

function Scene({ variant }: { variant: Team3DVariant }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[2.5, 2, 3]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-2, -1, -1]} intensity={0.9} color="#e879f9" />
      <Float speed={1.8} floatIntensity={0.35} rotationIntensity={0.2}>
        {variant === 'core' ? <CoreMark /> : <FlowMark />}
      </Float>
    </>
  )
}

export function TeamMember3D({
  variant,
  className = '',
  compact = false,
}: {
  variant: Team3DVariant
  className?: string
  /** Small square preview for compact team row */
  compact?: boolean
}) {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const { ref, active } = useInViewMount({ rootMargin: '60px', hideDelayMs: 900 })

  const useStatic = isMobile || reducedMotion
  const showCanvas = !useStatic && active

  const box = compact
    ? 'relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-lg border border-white/10 bg-[#030712] sm:h-20 sm:w-20'
    : 'relative h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-[#030712]'

  return (
    <div ref={ref} className={`${box} ${className}`}>
      {showCanvas ? (
        <Canvas
          camera={{ position: [0, 0, compact ? 2.75 : 3.2], fov: compact ? 40 : 42 }}
          dpr={[1, Math.min(1.35, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false }}
        >
          <Suspense fallback={null}>
            <Scene variant={variant} />
          </Suspense>
        </Canvas>
      ) : (
        <TeamMiniStatic variant={variant} />
      )}
    </div>
  )
}
