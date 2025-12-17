import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Text } from '@react-three/drei'
import * as THREE from 'three'

const HolidayText = () => {
  const particlesRef = useRef<THREE.Points>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const text1Ref = useRef<THREE.Mesh>(null!)
  const text2Ref = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()

  // Create particle positions forming the text
  const particlePositions = useMemo(() => {
    const positions: number[] = []

    // Line 1: "Happy Holidays!" - wider spread
    const line1Width = 5
    const line1Particles = 100
    for (let i = 0; i < line1Particles; i++) {
      const x = (Math.random() - 0.5) * line1Width
      const y = 10.5 + (Math.random() - 0.5) * 0.6
      const z = (Math.random() - 0.5) * 0.5
      positions.push(x, y, z)
    }

    // Line 2: "from Ran" - narrower
    const line2Width = 3
    const line2Particles = 60
    for (let i = 0; i < line2Particles; i++) {
      const x = (Math.random() - 0.5) * line2Width
      const y = 9.7 + (Math.random() - 0.5) * 0.5
      const z = (Math.random() - 0.5) * 0.4
      positions.push(x, y, z)
    }

    return new Float32Array(positions)
  }, [])

  // Animate particles and make text face camera
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating animation
        const time = state.clock.elapsedTime
        positions[i + 1] += Math.sin(time * 2 + i * 0.1) * 0.0005 // Y movement
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Make text always face camera
    if (text1Ref.current && text2Ref.current && groupRef.current) {
      // Get camera position and make group look at it
      const cameraPosition = new THREE.Vector3()
      camera.getWorldPosition(cameraPosition)

      // Only rotate around Y axis to face camera
      const groupPosition = new THREE.Vector3()
      groupRef.current.getWorldPosition(groupPosition)

      const direction = new THREE.Vector3()
      direction.subVectors(cameraPosition, groupPosition)
      direction.y = 0 // Keep it level
      direction.normalize()

      const angle = Math.atan2(direction.x, direction.z)
      groupRef.current.rotation.y = angle

      // Gentle pulsing scale for texts
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03
      text1Ref.current.scale.setScalar(scale)
      text2Ref.current.scale.setScalar(scale * 0.98)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Text - Line 1: "Happy Holidays!" */}
      <Text
        ref={text1Ref}
        position={[0, 10.5, 0]}
        fontSize={0.45}
        font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCGPrcVIT9d0c-dYA.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#D4AF37"
      >
        Happy Holidays!
        <meshStandardMaterial
          color="#E8C875"
          emissive="#D4AF37"
          emissiveIntensity={0.8}
          metalness={0.7}
          roughness={0.3}
        />
      </Text>

      {/* Main Text - Line 2: "from Ran" */}
      <Text
        ref={text2Ref}
        position={[0, 9.7, 0]}
        fontSize={0.35}
        font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCGPrcVIT9d0c-dYA.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.008}
        outlineColor="#D4AF37"
      >
        from Ran
        <meshStandardMaterial
          color="#E8C875"
          emissive="#D4AF37"
          emissiveIntensity={0.8}
          metalness={0.7}
          roughness={0.3}
        />
      </Text>

      {/* Softer golden particles surrounding text */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.10}
          color="#E8C875"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Softer point lights for gentle glow */}
      <pointLight
        position={[0, 10.5, 0.5]}
        intensity={1.2}
        color="#E8C875"
        distance={8}
      />
      <pointLight
        position={[0, 9.7, 0.5]}
        intensity={1.0}
        color="#E8C875"
        distance={6}
      />

      {/* Reduced sparkles around "Happy Holidays!" */}
      <Sparkles
        count={100}
        scale={[6, 1.5, 2]}
        position={[0, 10.5, 0]}
        size={3}
        speed={0.3}
        opacity={0.6}
        color="#E8C875"
      />

      {/* Sparkles around "from Ran" */}
      <Sparkles
        count={60}
        scale={[4, 1.2, 1.5]}
        position={[0, 9.7, 0]}
        size={2.5}
        speed={0.25}
        opacity={0.5}
        color="#D4AF37"
      />

      {/* Additional soft pink sparkles */}
      <Sparkles
        count={80}
        scale={[5, 2, 2]}
        position={[0, 10.1, 0]}
        size={2}
        speed={0.4}
        opacity={0.5}
        color="#FFB7C5"
      />
    </group>
  )
}

export default HolidayText
