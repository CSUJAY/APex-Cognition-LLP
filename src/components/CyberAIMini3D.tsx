import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Float, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

export type CyberAIVariant = 'shield' | 'secure-tunnel' | 'ai-core'

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
        <torusGeometry args={[1, 0.18, 18, 64]} />
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

function SecureTunnel() {
  const mesh = useRef<THREE.Mesh>(null)
  const gate = useRef<THREE.Mesh>(null)
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
        <torusKnotGeometry args={[0.72, 0.18, 180, 18]} />
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
        <torusGeometry args={[1.12, 0.05, 16, 80]} />
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

function AICore() {
  const points = useMemo(() => {
    const n = 60
    const pts: THREE.Vector3[] = []
    const sph = new THREE.Spherical()
    for (let i = 0; i < n; i++) {
      sph.radius = 1.6 + Math.random() * 1.2
      sph.phi = Math.acos(2 * Math.random() - 1)
      sph.theta = Math.random() * Math.PI * 2
      pts.push(new THREE.Vector3().setFromSpherical(sph))
    }
    return pts
  }, [])

  const geom = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 1.1) {
          arr.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z)
        }
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
    return g
  }, [points])

  const group = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
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
        <sphereGeometry args={[0.48, 48, 48]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#22d3ee"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.16}
        />
      </mesh>
      <mesh ref={ringA} rotation={[0.25, 0, 0]} scale={1.35}>
        <torusGeometry args={[0.72, 0.045, 18, 90]} />
        <meshStandardMaterial color="#0b1220" emissive="#a855f7" emissiveIntensity={0.25} roughness={0.4} />
      </mesh>
      <mesh ref={ringB} rotation={[0, 0.25, 0]} scale={1.18}>
        <torusGeometry args={[0.64, 0.04, 18, 90]} />
        <meshStandardMaterial color="#0b1220" emissive="#e879f9" emissiveIntensity={0.18} roughness={0.45} />
      </mesh>
      <mesh scale={1.25}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.1} transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function Scene({ variant }: { variant: CyberAIVariant }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} color="#f5f3ff" />
      <pointLight position={[3, 2.5, 4]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[-3, -1.2, -2]} intensity={1.6} color="#e879f9" />

      <Float speed={2} floatIntensity={0.45} rotationIntensity={0.25}>
        {variant === 'shield' && <ShieldMark />}
        {variant === 'secure-tunnel' && <SecureTunnel />}
        {variant === 'ai-core' && <AICore />}
      </Float>

      <Sparkles count={45} scale={4} size={1.2} speed={0.35} opacity={0.45} color="#67e8f9" />
      <Sparkles count={20} scale={3.2} size={1} speed={0.2} opacity={0.25} color="#c084fc" />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.12} luminanceSmoothing={0.92} mipmapBlur />
        <Vignette eskil={false} offset={0.12} darkness={0.65} />
        <Noise opacity={0.03} />
      </EffectComposer>
    </>
  )
}

export function CyberAIMini3D({ variant, className = '' }: { variant: CyberAIVariant; className?: string }) {
  return (
    <div className={`relative h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-apex-deep/80 ${className}`}>
      <Canvas
        camera={{ position: [0, 0.1, 4.4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  )
}

