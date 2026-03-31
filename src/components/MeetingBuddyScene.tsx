import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useInViewMount } from '../hooks/useInViewMount'

function DataFlow({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)

  const { cloudLine, secureLine } = useMemo(() => {
    const cloudPts = [
      new THREE.Vector3(-2.4, 0.3, 0),
      new THREE.Vector3(-1.5, 0.1, 0.2),
      new THREE.Vector3(-0.85, 0, 0),
    ]
    const securePts = [
      new THREE.Vector3(-0.35, 0, 0),
      new THREE.Vector3(0.4, 0.05, 0),
      new THREE.Vector3(1.1, 0, 0),
      new THREE.Vector3(1.85, -0.05, 0),
    ]
    return { cloudLine: cloudPts, secureLine: securePts }
  }, [])

  useFrame((state) => {
    const g = ref.current
    if (!g) return
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.06
  })

  return (
    <group ref={ref}>
      {/* Cloud / blocked path */}
      <mesh position={[-2.35, 0.35, 0]}>
        <sphereGeometry args={[0.28, reduced ? 12 : 20, reduced ? 12 : 20]} />
        <meshStandardMaterial
          color="#f87171"
          emissive="#ef4444"
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      <Line
        points={cloudLine}
        color="#f87171"
        lineWidth={reduced ? 1 : 1.5}
        transparent
        opacity={0.35}
        dashed
        dashScale={10}
        dashSize={0.15}
        gapSize={0.12}
      />

      {/* Barrier / private network */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.05, 0.03, 8, reduced ? 48 : 96]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.12, reduced ? 16 : 32, reduced ? 16 : 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* On-prem server / core */}
      <mesh position={[1.55, 0, 0]}>
        <boxGeometry args={[1.15, 1.45, 0.22]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.92}
          roughness={0.18}
          emissive="#0e7490"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[1.55, 0, 0.13]}>
        <planeGeometry args={[0.95, 1.15]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#22d3ee"
          emissiveIntensity={0.08}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>

      <Line
        points={secureLine}
        color="#22d3ee"
        lineWidth={reduced ? 1.2 : 2}
        transparent
        opacity={0.75}
      />

      {!reduced && (
        <Sparkles
          count={32}
          scale={[2.2, 1.8, 1.2]}
          position={[1.55, 0, 0.2]}
          size={1.2}
          speed={0.25}
          opacity={0.45}
          color="#67e8f9"
        />
      )}
    </group>
  )
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 4, 5]} intensity={1.8} color="#22d3ee" />
      <pointLight position={[-4, -2, -3]} intensity={1.1} color="#d946ef" />
      <directionalLight position={[2, 5, 4]} intensity={0.5} />
      <DataFlow reduced={reduced} />
    </>
  )
}

export function MeetingBuddyScene({
  reduced = false,
  className = '',
}: {
  reduced?: boolean
  className?: string
}) {
  const { ref, active } = useInViewMount({ rootMargin: '100px', hideDelayMs: 1000 })

  return (
    <div ref={ref} className={`relative h-full min-h-[280px] w-full ${className}`}>
      {active ? (
        <Canvas
          camera={{ position: [0, 0.2, 4.8], fov: 42 }}
          dpr={reduced ? [1, 1.15] : [1, Math.min(1.35, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
          gl={{
            antialias: !reduced,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
          }}
        >
          <Suspense fallback={null}>
            <Scene reduced={reduced} />
          </Suspense>
        </Canvas>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-3xl bg-apex-void [background-image:radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_65%)]"
          aria-hidden
        >
          <p className="text-sm text-zinc-600">Scroll for visualization</p>
        </div>
      )}
    </div>
  )
}
