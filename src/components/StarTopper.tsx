import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const StarTopper = () => {
  const starRef = useRef<THREE.Mesh>(null!)

  // Create custom 5-pointed star shape
  const starShape = new THREE.Shape()
  const outerRadius = 1.2
  const innerRadius = 0.5
  const points = 5

  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    if (i === 0) {
      starShape.moveTo(x, y)
    } else {
      starShape.lineTo(x, y)
    }
  }
  starShape.closePath()

  const extrudeSettings = {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2
  }

  useFrame((state) => {
    if (starRef.current) {
      // Gentle rotation
      starRef.current.rotation.z += 0.01

      // Floating animation
      starRef.current.position.y = 8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2

      // Pulsing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      starRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={[0, 8, 0]}>
      {/* Star mesh */}
      <mesh ref={starRef} rotation={[0, 0, 0]}>
        <extrudeGeometry args={[starShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={2.0}
          metalness={1.0}
          roughness={0.1}
        />
      </mesh>

      {/* Point light at star */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#FFD700"
        distance={15}
      />

      {/* Sparkles effect */}
      <Sparkles
        count={100}
        scale={3}
        size={3}
        speed={0.4}
        opacity={0.8}
        color="#FFD700"
      />

      {/* Additional pink sparkles */}
      <Sparkles
        count={50}
        scale={2.5}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#FFB7C5"
      />
    </group>
  )
}

export default StarTopper
