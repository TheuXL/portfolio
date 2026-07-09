"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import { ThreeCanvasShell } from "@/components/three/ThreeCanvasShell";
import { useThemeAccentHex } from "@/components/three/use-theme-accent";
import { SKILL_CLOUD_TAGS } from "@/lib/skill-tags";
import { getRoundParticleTexture } from "@/lib/round-particle-texture";

function fibonacciSphere(
  index: number,
  total: number,
  radius: number,
): [number, number, number] {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  return [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi),
  ];
}

function SkillPoints({
  positions,
  color,
}: {
  positions: [number, number, number][];
  color: string;
}) {
  const sprite = useMemo(() => getRoundParticleTexture(), []);

  const geometry = useMemo(() => {
    const arr = new Float32Array(positions.length * 3);
    positions.forEach(([x, y, z], i) => {
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [positions]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        map={sprite}
        size={0.055}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.02}
      />
    </points>
  );
}

function TagLabel({
  label,
  position,
}: {
  label: string;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <Html transform center distanceFactor={6.5} occlude={false}>
        <span
          className="pointer-events-none select-none whitespace-nowrap font-(family-name:--font-body-family) text-[11px] font-semibold leading-none text-accent antialiased sm:text-xs"
          style={{
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function TagSphere() {
  const groupRef = useRef<Group>(null);
  const accent = useThemeAccentHex();
  const tagCount = SKILL_CLOUD_TAGS.length;

  const positions = useMemo(
    () =>
      SKILL_CLOUD_TAGS.map((_, i) =>
        fibonacciSphere(i, tagCount, 2.5),
      ) as [number, number, number][],
    [tagCount],
  );

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    g.rotation.x = Math.sin(performance.now() * 0.00022) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <SkillPoints positions={positions} color={accent} />
      {SKILL_CLOUD_TAGS.map((label, i) => (
        <TagLabel key={label} label={label} position={positions[i]} />
      ))}
    </group>
  );
}

export function SkillsTagCloud({ className = "" }: { className?: string }) {
  return (
    <ThreeCanvasShell
      className={className}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      fallbackLabel="Skills"
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.9} />
      <TagSphere />
    </ThreeCanvasShell>
  );
}
