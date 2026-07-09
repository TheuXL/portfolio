"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";
import { ThreeCanvasShell } from "@/components/three/ThreeCanvasShell";
import { useThemeAccentHex } from "@/components/three/use-theme-accent";

const NODE_COUNT = 14;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function NeuralGraph() {
  const groupRef = useRef<Group>(null);
  const accent = useThemeAccentHex();

  const { nodes, lineGeometry } = useMemo(() => {
    const nodePositions: [number, number, number][] = Array.from(
      { length: NODE_COUNT },
      (_, i) => [
        (seededRandom(i + 1) - 0.5) * 4.2,
        (seededRandom(i + 11) - 0.5) * 3,
        (seededRandom(i + 21) - 0.5) * 1.8,
      ],
    );

    const segments: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const a = nodePositions[i];
        const b = nodePositions[j];
        const dist = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (dist < 2.1) {
          segments.push(...a, ...b);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(segments, 3),
    );
    return { nodes: nodePositions, lineGeometry: geo };
  }, []);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y += delta * 0.2;
    g.rotation.x = Math.sin(t * 0.18) * 0.14;
    g.rotation.z = Math.sin(t * 0.12) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.42}
          linewidth={1}
        />
      </lineSegments>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07 + (i % 3) * 0.015, 12, 12]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.35 + (i % 4) * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

export function BlogNeuralViz({ className = "" }: { className?: string }) {
  return (
    <ThreeCanvasShell
      className={className}
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      fallbackLabel="IA"
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[2, 2, 3]} intensity={1.1} color="#ffffff" />
      <NeuralGraph />
    </ThreeCanvasShell>
  );
}
