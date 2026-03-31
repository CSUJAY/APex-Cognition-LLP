import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function WriggleTube({
  colorA,
  colorB,
  radius = 0.22,
  length = 11,
  offset = new THREE.Vector3(0, 0, 0),
  phase = 0,
  twist = 0.35,
}: {
  colorA: string
  colorB: string
  radius?: number
  length?: number
  offset?: THREE.Vector3
  phase?: number
  twist?: number
}) {
  const points = useMemo(() => {
    const p: THREE.Vector3[] = []
    const n = 12
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      p.push(new THREE.Vector3((t - 0.5) * length, 0, 0))
    }
    return p
  }, [length])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5), [points])

  const tmp = useMemo(() => new THREE.Vector3(), [])
  const group = useRef<THREE.Group>(null)
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 140, radius, 18, false), [curve, radius])
  const mesh = useRef<THREE.Mesh>(null)
  const lastUpdate = useRef(0)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const ampY = 0.75
    const ampZ = 0.95
    const freq = 1.15
    for (let i = 0; i < points.length; i++) {
      const u = i / (points.length - 1)
      const x = (u - 0.5) * length
      const wave = t * 0.9 + u * Math.PI * 2.2 + phase
      points[i].set(
        x,
        Math.sin(wave * freq) * ampY * (0.35 + u),
        Math.cos(wave * (freq * 0.92)) * ampZ * (0.25 + u),
      )
    }

    // Update geometry at a capped rate to keep it smooth
    if (t - lastUpdate.current > 1 / 30) {
      lastUpdate.current = t
      const next = new THREE.TubeGeometry(curve, 140, radius, 18, false)
      geometry.copy(next)
      next.dispose()
      geometry.computeVertexNormals()
    }

    if (group.current) {
      tmp.set(offset.x, offset.y, offset.z)
      group.current.position.lerp(tmp, 1)
      group.current.rotation.y = Math.sin(t * 0.16 + phase) * 0.18
      group.current.rotation.x = Math.cos(t * 0.14 + phase) * 0.09
    }
  })

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <primitive object={geometry} attach="geometry" />
        <MeshDistortMaterial
          color={colorA}
          emissive={colorB}
          emissiveIntensity={0.95}
          metalness={0.55}
          roughness={0.16}
          distort={twist}
          speed={2.6}
        />
      </mesh>
    </group>
  )
}

function Scene({ postFX }: { postFX: boolean }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[4, 4, 6]} intensity={0.65} color="#f5f3ff" />
      <pointLight position={[6, 2.5, 6]} intensity={2.8} color="#22d3ee" />
      <pointLight position={[-6, -1.5, -2]} intensity={2.1} color="#a855f7" />
      <pointLight position={[0, 1.5, 2]} intensity={1.2} color="#e879f9" />

      {/* Wriggly tubes */}
      <group position={[1.35, 0.35, -0.4]} rotation={[0, -0.3, 0]}>
        <WriggleTube
          colorA="#111827"
          colorB="#22d3ee"
          radius={0.23}
          length={12.8}
          offset={new THREE.Vector3(0, 0, 0)}
          phase={0}
          twist={0.42}
        />
      </group>
      <group position={[0.8, -0.7, -0.95]} rotation={[0, -0.12, 0.09]} scale={0.9}>
        <WriggleTube
          colorA="#0b1220"
          colorB="#e879f9"
          radius={0.2}
          length={11.2}
          offset={new THREE.Vector3(0, 0, 0)}
          phase={2.2}
          twist={0.36}
        />
      </group>
      <group position={[1.2, 0.95, -1.2]} rotation={[0, -0.18, -0.02]} scale={0.82}>
        <WriggleTube
          colorA="#0b1220"
          colorB="#a855f7"
          radius={0.18}
          length={10.6}
          offset={new THREE.Vector3(0, 0, 0)}
          phase={4.1}
          twist={0.3}
        />
      </group>

      {postFX && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.1} luminanceThreshold={0.12} luminanceSmoothing={0.92} mipmapBlur />
          <Vignette eskil={false} offset={0.12} darkness={0.6} />
          <Noise opacity={0.03} />
        </EffectComposer>
      )}
    </>
  )
}

export function WriggleScene({ className = '' }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.2, 7.2], fov: 44 }}
        dpr={[1, Math.min(1.35, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
        gl={{
          antialias: !reducedMotion,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene postFX={!reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}

