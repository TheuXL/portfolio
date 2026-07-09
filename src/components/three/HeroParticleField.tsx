"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import * as THREE from "three";
import { ThreeCanvasShell } from "@/components/three/ThreeCanvasShell";
import { useThemeAccentHex } from "@/components/three/use-theme-accent";
import { getRoundParticleTexture } from "@/lib/round-particle-texture";

const COUNT = 1100;

function ParticleCloud() {
  const pointsRef = useRef<Points>(null);
  const accent = useThemeAccentHex();
  const sprite = useMemo(() => getRoundParticleTexture(), []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const base = new THREE.Color(accent);
    const dim = base.clone().multiplyScalar(0.45);

    for (let i = 0; i < COUNT; i++) {
      const radius = 3.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.65;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      const mix = Math.random();
      const c = base.clone().lerp(dim, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [accent]);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;
    pts.rotation.y = t * 0.035;
    pts.rotation.x = Math.sin(t * 0.02) * 0.06;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        map={sprite}
        size={0.065}
        vertexColors
        transparent
        opacity={0.78}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        alphaTest={0.02}
      />
    </points>
  );
}

export function HeroParticleField({ className = "" }: { className?: string }) {
  return (
    <ThreeCanvasShell
      className={className}
      camera={{ position: [0, 0.2, 2.8], fov: 58 }}
    >
      <ambientLight intensity={0.35} />
      <ParticleCloud />
    </ThreeCanvasShell>
  );
}
