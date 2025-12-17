import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AnimationState } from '../types'

interface TreeDecorationsProps {
  animationState: AnimationState
}

const TreeDecorations = ({ animationState }: TreeDecorationsProps) => {
  const cubesRef = useRef<THREE.InstancedMesh>(null!)
  const icosahedronsRef = useRef<THREE.InstancedMesh>(null!)
  const CUBE_COUNT = 1000
  const ICO_COUNT = 1000

  // Generate positions for cubes
  const cubePositions = useMemo(() => {
    const treePos: THREE.Vector3[] = []
    const explodePos: THREE.Vector3[] = []
    const currentPos: THREE.Vector3[] = []

    for (let i = 0; i < CUBE_COUNT; i++) {
      // Tree position - scattered on tree
      const t = Math.random()
      const y = t * 15 - 7
      const radius = (1 - t) * 2.8
      const angle = Math.random() * Math.PI * 2

      treePos.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ))

      // Explode position
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI
      const r = 20 + Math.random() * 15

      explodePos.push(new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      ))

      currentPos.push(treePos[i].clone())
    }

    return { treePos, explodePos, currentPos }
  }, [])

  // Generate positions for icosahedrons
  const icoPositions = useMemo(() => {
    const treePos: THREE.Vector3[] = []
    const explodePos: THREE.Vector3[] = []
    const currentPos: THREE.Vector3[] = []

    for (let i = 0; i < ICO_COUNT; i++) {
      // Tree position
      const t = Math.random()
      const y = t * 15 - 7
      const radius = (1 - t) * 2.5
      const angle = Math.random() * Math.PI * 2

      treePos.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ))

      // Explode position
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI
      const r = 18 + Math.random() * 12

      explodePos.push(new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      ))

      currentPos.push(treePos[i].clone())
    }

    return { treePos, explodePos, currentPos }
  }, [])

  // Animation for cubes
  useFrame(() => {
    const dummy = new THREE.Object3D()
    const target = animationState === 'TREE' ? cubePositions.treePos : cubePositions.explodePos

    for (let i = 0; i < CUBE_COUNT; i++) {
      cubePositions.currentPos[i].lerp(target[i], 0.05)
      dummy.position.copy(cubePositions.currentPos[i])

      dummy.rotation.x += 0.02
      dummy.rotation.y += 0.02

      const scale = 0.12 + Math.sin(Date.now() * 0.001 + i) * 0.03
      dummy.scale.set(scale, scale, scale)

      dummy.updateMatrix()
      cubesRef.current.setMatrixAt(i, dummy.matrix)
    }

    cubesRef.current.instanceMatrix.needsUpdate = true
  })

  // Animation for icosahedrons
  useFrame(() => {
    const dummy = new THREE.Object3D()
    const target = animationState === 'TREE' ? icoPositions.treePos : icoPositions.explodePos

    for (let i = 0; i < ICO_COUNT; i++) {
      icoPositions.currentPos[i].lerp(target[i], 0.05)
      dummy.position.copy(icoPositions.currentPos[i])

      dummy.rotation.x += 0.015
      dummy.rotation.z += 0.015

      const scale = 0.1 + Math.sin(Date.now() * 0.0008 + i * 0.5) * 0.02
      dummy.scale.set(scale, scale, scale)

      dummy.updateMatrix()
      icosahedronsRef.current.setMatrixAt(i, dummy.matrix)
    }

    icosahedronsRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      {/* White/Light Purple Cubes */}
      <instancedMesh ref={cubesRef} args={[undefined, undefined, CUBE_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#E6E6FA"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>

      {/* Icosahedrons - Gem-like */}
      <instancedMesh ref={icosahedronsRef} args={[undefined, undefined, ICO_COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#DDA0DD"
          emissiveIntensity={0.6}
          metalness={1.0}
          roughness={0.05}
        />
      </instancedMesh>
    </>
  )
}

export default TreeDecorations
