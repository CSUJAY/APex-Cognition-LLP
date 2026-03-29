import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Shape = 'cube' | 'pyramid' | 'octa' | 'tetra'

function PulseMesh({ shape }: { shape: Shape }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime
    const pulse = 0.92 + Math.sin(t * 2.4) * 0.08
    m.scale.setScalar(pulse)
    m.rotation.x = t * 0.5
    m.rotation.y = t * 0.65
  })

  return (
    <mesh ref={ref}>
      {shape === 'cube' && <boxGeometry args={[0.55, 0.55, 0.55]} />}
      {shape === 'pyramid' && <coneGeometry args={[0.45, 0.65, 4]} />}
      {shape === 'octa' && <octahedronGeometry args={[0.52, 0]} />}
      {shape === 'tetra' && <tetrahedronGeometry args={[0.55, 0]} />}
      <meshStandardMaterial
        color="#0c1222"
        metalness={0.85}
        roughness={0.2}
        emissive="#22d3ee"
        emissiveIntensity={0.45}
      />
    </mesh>
  )
}

function Scene({ shape }: { shape: Shape }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[2, 2, 3]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-2, -1, -1]} intensity={0.7} color="#d946ef" />
      <PulseMesh shape={shape} />
    </>
  )
}

const shapeCycle: Shape[] = ['cube', 'pyramid', 'octa', 'tetra']

export function WhyBullet3D({ index }: { index: number }) {
  const shape = shapeCycle[index % shapeCycle.length]

  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-cyan-500/25 bg-apex-deep/90">
      <Canvas
        camera={{ position: [0, 0, 1.65], fov: 42 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <Scene shape={shape} />
        </Suspense>
      </Canvas>
    </div>
  )
}
