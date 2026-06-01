import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box, Sphere, Cylinder, MeshTransmissionMaterial, Edges } from '@react-three/drei'

export default function Hero3D() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Gentle floating rotation
    groupRef.current.rotation.y = Math.sin(t / 4) * 0.15 - 0.2
    groupRef.current.rotation.x = Math.sin(t / 5) * 0.05 + 0.1
  })

  // Material configurations
  const matteWhite = { color: "#F7F4EF", roughness: 0.9, metalness: 0.05 }
  const darkBlue = { color: "#1a2436", roughness: 0.3, metalness: 0.4, clearcoat: 0.8, clearcoatRoughness: 0.2 }
  const greyMetal = { color: "#8a95a5", roughness: 0.4, metalness: 0.5 }
  const creamBase = { color: "#e8e1d7", roughness: 0.8, metalness: 0.1 }

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 15, 10]} intensity={2.5} castShadow />
      <directionalLight position={[-10, -5, -10]} intensity={1} color="#E8743B" />
      <pointLight position={[-5, 5, 5]} intensity={1.5} color="#ffffff" />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef} position={[0, -0.2, 0]} scale={1.3}>

          {/* Base Grey Cylinder */}
          <Cylinder args={[1.6, 1.6, 0.25, 64]} position={[0.5, -1.4, 0]} castShadow receiveShadow>
            <meshStandardMaterial {...greyMetal} />
          </Cylinder>

          {/* Left Cream Base Block */}
          <Box args={[2.2, 0.7, 2.2]} position={[-1.2, -0.9, -0.4]} castShadow receiveShadow rotation={[0, 0.1, 0]}>
            <meshStandardMaterial {...creamBase} />
          </Box>

          {/* Center White Cube */}
          <Box args={[1.3, 1.3, 1.3]} position={[0.1, 0.4, 0]} castShadow receiveShadow>
            <meshStandardMaterial {...matteWhite} />
          </Box>

          {/* Front Left White Cube */}
          <Box args={[1.1, 1.1, 1.1]} position={[-0.6, -0.4, 1.2]} castShadow receiveShadow rotation={[0, -0.1, 0]}>
            <meshStandardMaterial {...matteWhite} />
          </Box>

          {/* Top Dark Blue Sphere */}
          <Sphere args={[0.55, 64, 64]} position={[0.1, 1.6, 0]} castShadow receiveShadow>
            <meshStandardMaterial {...darkBlue} />
          </Sphere>

          {/* Orange Acrylic/Glass Box */}
          <Box args={[1.3, 1.3, 1.3]} position={[-1.1, 0.4, -0.9]} castShadow receiveShadow rotation={[0.05, 0.1, -0.05]}>
            <MeshTransmissionMaterial
              color="#E8743B"
              transmission={0.8}
              thickness={0.8}
              roughness={0.1}
              ior={1.4}
              chromaticAberration={0.03}
              clearcoat={1}
            />
            {/* Adding subtle edges to mimic thick acrylic box walls */}
            <Edges scale={1} threshold={15} color="#c2501a" />
          </Box>

          {/* Clear Glass Pane/Frame */}
          <Box args={[1.5, 1.6, 0.15]} position={[1.4, -0.2, 0.8]} castShadow receiveShadow rotation={[-0.1, -0.3, 0.1]}>
            <MeshTransmissionMaterial
              color="#ffffff"
              transmission={0.95}
              thickness={0.2}
              roughness={0.05}
              ior={1.3}
              chromaticAberration={0.02}
              clearcoat={1}
            />
            <Edges scale={1.001} threshold={15} color="#e0e0e0" />
          </Box>
        </group>
      </Float>
    </>
  )
}
