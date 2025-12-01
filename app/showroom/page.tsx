"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Text,
  PerspectiveCamera,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Eye, Home, Maximize, Phone, RotateCcw } from "lucide-react"
import type * as THREE from "three"

function ADUModel({
  position,
  rotation,
  scale,
  onClick,
  isSelected,
  name,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  onClick: () => void
  isSelected: boolean
  name: string
}) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={rotation || [0, 0, 0]} scale={scale || 1} onClick={onClick}>
      {/* Base/Foundation */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Main Structure */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 2, 2.8]} />
        <meshStandardMaterial color={isSelected ? "#c2956e" : "#e5e7eb"} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[4.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.9, 1.41]} castShadow>
        <boxGeometry args={[0.8, 1.6, 0.05]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>

      {/* Windows */}
      <mesh position={[-1.2, 1.3, 1.41]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.05]} />
        <meshStandardMaterial color="#7dd3fc" opacity={0.8} transparent />
      </mesh>
      <mesh position={[1.2, 1.3, 1.41]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.05]} />
        <meshStandardMaterial color="#7dd3fc" opacity={0.8} transparent />
      </mesh>

      {/* Side Windows */}
      <mesh position={[1.91, 1.3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#7dd3fc" opacity={0.8} transparent />
      </mesh>

      {/* Label */}
      <Html position={[0, 3.2, 0]} center distanceFactor={10}>
        <div
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            isSelected ? "bg-accent text-white scale-110" : "bg-white/90 text-gray-800"
          }`}
        >
          {name}
        </div>
      </Html>
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#1e293b"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  )
}

function Scene({
  selectedModel,
  onSelectModel,
}: { selectedModel: string | null; onSelectModel: (name: string) => void }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[12, 8, 12]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
      />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />

      <Environment preset="city" />

      <Floor />

      {/* ADU Models */}
      <ADUModel
        name="Studio ADU"
        position={[-6, 0, 0]}
        rotation={[0, 0.3, 0]}
        scale={0.8}
        onClick={() => onSelectModel("Studio ADU")}
        isSelected={selectedModel === "Studio ADU"}
      />

      <ADUModel
        name="1-Bedroom ADU"
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={1}
        onClick={() => onSelectModel("1-Bedroom ADU")}
        isSelected={selectedModel === "1-Bedroom ADU"}
      />

      <ADUModel
        name="2-Bedroom ADU"
        position={[6, 0, 0]}
        rotation={[0, -0.3, 0]}
        scale={1.2}
        onClick={() => onSelectModel("2-Bedroom ADU")}
        isSelected={selectedModel === "2-Bedroom ADU"}
      />

      {/* Floating Text */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <Text
          position={[0, 6, -5]}
          fontSize={1.5}
          color="#c2956e"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          Modern Construx
        </Text>
      </Float>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <Text
          position={[0, 4.5, -5]}
          fontSize={0.6}
          color="#94a3b8"
          font="/fonts/Inter_Regular.json"
          anchorX="center"
          anchorY="middle"
        >
          3D ADU Showroom
        </Text>
      </Float>
    </>
  )
}

const aduDetails: Record<string, { sqft: string; beds: string; baths: string; price: string; features: string[] }> = {
  "Studio ADU": {
    sqft: "400-500",
    beds: "Studio",
    baths: "1",
    price: "$150,000 - $200,000",
    features: ["Open floor plan", "Full kitchen", "Modern bathroom", "Energy efficient", "Perfect for rental income"],
  },
  "1-Bedroom ADU": {
    sqft: "600-800",
    beds: "1",
    baths: "1",
    price: "$200,000 - $275,000",
    features: ["Separate bedroom", "Living area", "Full kitchen", "Washer/dryer hookup", "Private entrance"],
  },
  "2-Bedroom ADU": {
    sqft: "900-1,200",
    beds: "2",
    baths: "1-2",
    price: "$275,000 - $350,000",
    features: [
      "Two bedrooms",
      "Open living/dining",
      "Full kitchen",
      "Master suite option",
      "Multi-generational living",
    ],
  },
}

export default function ShowroomPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>("1-Bedroom ADU")
  const details = selectedModel ? aduDetails[selectedModel] : null

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="absolute top-24 left-0 right-0 z-10 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">3D ADU Showroom</h1>
            <p className="text-slate-400 text-sm mt-1">Click on a model to explore • Drag to rotate • Scroll to zoom</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setSelectedModel(null)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset View
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact">
                Request Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-screen w-full">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene selectedModel={selectedModel} onSelectModel={setSelectedModel} />
          </Suspense>
        </Canvas>
      </div>

      {/* Info Panel */}
      {details && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-20">
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedModel}</h3>
                  <p className="text-accent font-semibold">{details.price}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedModel(null)}>
                  <Eye className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <Maximize className="w-4 h-4 mx-auto text-muted-foreground" />
                  <p className="text-sm font-semibold mt-1">{details.sqft}</p>
                  <p className="text-xs text-muted-foreground">Sq Ft</p>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <Home className="w-4 h-4 mx-auto text-muted-foreground" />
                  <p className="text-sm font-semibold mt-1">{details.beds}</p>
                  <p className="text-xs text-muted-foreground">Beds</p>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <span className="text-muted-foreground text-sm">🚿</span>
                  <p className="text-sm font-semibold mt-1">{details.baths}</p>
                  <p className="text-xs text-muted-foreground">Baths</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {details.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href="/contact">Get Quote</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+18587440521">
                    <Phone className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-10">
        {!details && (
          <Button className="w-full" size="lg" asChild>
            <Link href="/contact">
              Request Free Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </main>
  )
}
