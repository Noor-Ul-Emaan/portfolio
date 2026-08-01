import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshDistortMaterial,
  Sphere,
  Float,
  Environment,
  Sparkles,
  Trail,
  Line,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../hooks/useTheme.jsx'

/* Soft glowing halo behind the core sphere for extra depth */
function Halo() {
  return (
    <mesh scale={1.9}>
      <sphereGeometry args={[1.3, 32, 32]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.08} depthWrite={false} />
    </mesh>
  )
}

/* Core distorted sphere — the "AI core" — reacts to mouse */
function CoreSphere() {
  const meshRef = useRef(null)
  const { isDark } = useTheme()

  useFrame((state) => {
    if (!meshRef.current) return
    const { mouse, clock } = state
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15 + mouse.x * 0.5
    meshRef.current.rotation.x = mouse.y * 0.35
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.4}>
      <Halo />
      <Sphere ref={meshRef} args={[1, 160, 160]}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.5}
          speed={2.4}
          roughness={0.05}
          metalness={0.85}
          emissive={isDark ? '#06B6D4' : '#2563EB'}
          emissiveIntensity={0.35}
        />
      </Sphere>
    </Float>
  )
}

/* Fibonacci-sphere distribution — even spread of points on a sphere surface */
function fibonacciSphere(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius))
  }
  return points
}

/* Neural network shell — nodes on a sphere connected to their nearest
   neighbours, pulsing gently. This is the "AI brain" motif for the hero. */
function NeuralShell({ radius = 2.05, nodeCount = 42, color = '#22D3EE' }) {
  const groupRef = useRef(null)
  const nodeRefs = useRef([])

  const nodes = useMemo(() => fibonacciSphere(nodeCount, radius), [nodeCount, radius])

  const edges = useMemo(() => {
    const result = []
    const maxDist = radius * 0.9
    for (let i = 0; i < nodes.length; i++) {
      let closest = []
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        const d = nodes[i].distanceTo(nodes[j])
        if (d < maxDist) closest.push([d, j])
      }
      closest.sort((a, b) => a[0] - b[0])
      closest.slice(0, 2).forEach(([, j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!result.some((e) => e.key === key)) {
          result.push({ key, a: nodes[i], b: nodes[j] })
        }
      })
    }
    return result
  }, [nodes, radius])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + state.mouse.x * 0.25
      groupRef.current.rotation.x = -state.mouse.y * 0.15
    }
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const pulse = 1 + Math.sin(t * 1.6 + i) * 0.35
      mesh.scale.setScalar(pulse)
    })
  })

  return (
    <group ref={groupRef}>
      {edges.map(({ key, a, b }) => (
        <Line key={key} points={[a, b]} color={color} transparent opacity={0.28} lineWidth={1} />
      ))}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => (nodeRefs.current[i] = el)}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
        </mesh>
      ))}
    </group>
  )
}

/* Thin glowing orbit rings around the core sphere */
function OrbitRing({ radius, tilt, speed, color }) {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.getElapsedTime() * speed
  })
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.006, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

/* Small satellite shapes orbiting the core, each trailing a soft comet-like tail */
function Satellite({ radius, speed, offset, geometry, color, scale = 0.16 }) {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * (radius * 0.4), Math.sin(t) * radius)
    ref.current.rotation.x += 0.012
    ref.current.rotation.y += 0.018
  })

  return (
    <Trail width={1.5} length={5} color={color} attenuation={(t) => t * t} decay={2}>
      <mesh ref={ref} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
    </Trail>
  )
}

/* Ambient floating dust particles */
function Particles() {
  const count = 70
  const positions = useMemo(
    () =>
      Array.from({ length: count }, () => [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]),
    []
  )

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015 + Math.random() * 0.02, 8, 8]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.4} />
        </mesh>
      ))}
    </group>
  )
}

/* Camera drifts subtly with the mouse for a parallax feel */
function ParallaxRig({ children }) {
  const group = useRef(null)
  useFrame((state) => {
    if (!group.current) return
    const { mouse } = state
    group.current.rotation.y += (mouse.x * 0.3 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-mouse.y * 0.2 - group.current.rotation.x) * 0.05
  })
  return <group ref={group}>{children}</group>
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1.8} color="#7C3AED" />
          <pointLight position={[-5, -3, -5]} intensity={1.3} color="#06B6D4" />
          <pointLight position={[0, -4, 2]} intensity={0.8} color="#F43F5E" />
          <spotLight position={[0, 6, 3]} intensity={0.8} angle={0.4} penumbra={1} color="#ffffff" />

          <ParallaxRig>
            <CoreSphere />
            <NeuralShell radius={2.05} nodeCount={42} color="#22D3EE" />

            <OrbitRing radius={2.9} tilt={0.6} speed={0.2} color="#A78BFA" />
            <OrbitRing radius={3.3} tilt={-0.4} speed={-0.15} color="#FB7185" />

            <Satellite
              radius={2.9}
              speed={0.35}
              offset={0}
              color="#22D3EE"
              geometry={<icosahedronGeometry args={[1, 0]} />}
            />
            <Satellite
              radius={3.3}
              speed={-0.25}
              offset={2}
              color="#FB7185"
              geometry={<octahedronGeometry args={[1, 0]} />}
              scale={0.14}
            />

            <Sparkles count={50} scale={8} size={2.5} speed={0.3} color="#A78BFA" opacity={0.6} />
          </ParallaxRig>

          <Particles />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
