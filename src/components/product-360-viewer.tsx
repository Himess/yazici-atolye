"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Basit yüzük geometrisi (demo için)
function SimpleRing({ autoRotate = true }: { autoRotate?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef as any}>
      {/* Ana halka */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1, 0.15, 32, 100]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Pırlanta taşı */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <octahedronGeometry args={[0.25, 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          ior={2.4}
          clearcoat={1}
        />
      </mesh>

      {/* Taş yuvası */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.25, 0.15, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// GLB model yükleyici (gerçek model için)
function ModelFromFile({ url, autoRotate = true, materialColor = "gold" }: { url: string; autoRotate?: boolean; materialColor?: "gold" | "silver" | "rosegold" | "original" }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Model boyutunu ve pozisyonunu otomatik ayarla
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim; // 2 birim büyüklüğüne normalize et

  // Merkezi hesapla
  const center = box.getCenter(new THREE.Vector3());

  // Material renklerini override et
  const colors = {
    gold: "#FFD700",
    silver: "#C0C0C0",
    rosegold: "#B76E79",
    original: null,
  };

  // Scene'deki tüm mesh'lerin material'larını güncelle
  if (materialColor !== "original") {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const newMaterial = new THREE.MeshStandardMaterial({
            color: colors[materialColor] || "#FFD700",
            metalness: 1,
            roughness: 0.15,
            envMapIntensity: 1.5,
          });
          mesh.material = newMaterial;
        }
      }
    });
  }

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={scale}
        position={[-center.x * scale, -center.y * scale, -center.z * scale]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

// Loading spinner
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

interface Product360ViewerProps {
  modelUrl?: string; // .glb dosya yolu (opsiyonel)
  autoRotate?: boolean;
  className?: string;
  materialColor?: "gold" | "silver" | "rosegold" | "original";
}

export function Product360Viewer({
  modelUrl,
  autoRotate = true,
  className = "",
  materialColor = "gold",
}: Product360ViewerProps) {
  return (
    <div className={`relative w-full aspect-square bg-gradient-to-b from-muted to-background rounded-lg overflow-hidden ${className}`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: [0, 2, 5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          {/* Aydınlatma */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <spotLight
            position={[-10, 5, -10]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
          />

          {/* Çevre aydınlatması (gerçekçi yansımalar için) */}
          <Environment preset="studio" />

          {/* Model veya basit yüzük */}
          {modelUrl ? (
            <ModelFromFile url={modelUrl} autoRotate={autoRotate} materialColor={materialColor} />
          ) : (
            <SimpleRing autoRotate={autoRotate} />
          )}

          {/* Gölge */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={4}
          />

          {/* Mouse ile kontrol */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* Kullanım ipucu */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span>Döndürmek için sürükle, yakınlaştırmak için kaydır</span>
      </div>
    </div>
  );
}
