"use client";

import { useCallback, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

const CYCLE = 4.8;
/** Galho à direita, em frente ao tronco (visível na câmera). */
const BRANCH = new THREE.Vector3(0.58, 1.58, 0.32);
const FALL_END = new THREE.Vector3(0.64, 0.08, 0.34);

const LEAF_LAYOUT = [
  { pos: [0.38, 0.15, 0.48] as const, phase: 0.2, scale: 1.15 },
  { pos: [0.22, 0.38, 0.44] as const, phase: 1.1, scale: 1.05 },
  { pos: [0.05, 0.52, 0.4] as const, phase: 2.3, scale: 1.1 },
  { pos: [-0.18, 0.28, 0.36] as const, phase: 0.7, scale: 0.95 },
  { pos: [0.42, -0.05, 0.3] as const, phase: 1.8, scale: 1 },
  { pos: [0.15, 0.08, 0.46] as const, phase: 2.9, scale: 1.08 },
  { pos: [-0.28, 0.1, 0.22] as const, phase: 3.4, scale: 0.9 },
  { pos: [0.3, 0.55, 0.18] as const, phase: 1.4, scale: 1 },
  { pos: [-0.08, 0.45, 0.28] as const, phase: 2.1, scale: 0.92 },
  { pos: [0.48, 0.32, 0.12] as const, phase: 0.5, scale: 1.05 },
];

function easeInQuad(t: number) {
  return t * t;
}

function Tree({
  onTreeHover,
  interactive = false,
}: {
  onTreeHover?: (hovered: boolean) => void;
  interactive?: boolean;
}) {
  const bodyRef = useRef<Group>(null);
  const leavesRef = useRef<Group>(null);
  const hoverCount = useRef(0);

  const pointerHandlers = useMemo(() => {
    if (!interactive) return {};

    const enter = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      hoverCount.current += 1;
      if (hoverCount.current === 1) onTreeHover?.(true);
    };
    const leave = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      hoverCount.current = Math.max(0, hoverCount.current - 1);
      if (hoverCount.current === 0) onTreeHover?.(false);
    };

    return { onPointerOver: enter, onPointerOut: leave };
  }, [interactive, onTreeHover]);
  const bark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5c4033", roughness: 0.92 }),
    [],
  );
  const foliageA = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3d8f42", roughness: 0.84 }),
    [],
  );
  const foliageB = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#4caf50", roughness: 0.8 }),
    [],
  );
  const leafMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#86efac",
        emissive: "#16a34a",
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
        depthWrite: false,
        roughness: 0.55,
      }),
    [],
  );

  useFrame((state) => {
    const body = bodyRef.current;
    const leaves = leavesRef.current;
    if (!body) return;
    const t = state.clock.elapsedTime;
    body.rotation.z = Math.sin(t * 0.5) * 0.012;

    if (leaves) {
      leaves.children.forEach((leaf, i) => {
        const layout = LEAF_LAYOUT[i];
        if (!layout) return;
        leaf.rotation.z = Math.sin(t * 1.2 + layout.phase) * 0.14;
        leaf.rotation.y = Math.sin(t * 0.85 + layout.phase) * 0.1;
      });
    }
  });

  return (
    <group ref={bodyRef}>
      <mesh
        position={[-0.08, 0.62, 0]}
        rotation={[0, 0, 0.03]}
        material={bark}
        {...pointerHandlers}
      >
        <cylinderGeometry args={[0.085, 0.11, 1.24, 12]} />
      </mesh>

      <mesh position={[0, 1.42, 0.02]} material={foliageA} {...pointerHandlers}>
        <icosahedronGeometry args={[0.52, 1]} />
      </mesh>
      <mesh
        position={[-0.14, 1.56, -0.04]}
        material={foliageB}
        {...pointerHandlers}
      >
        <icosahedronGeometry args={[0.4, 1]} />
      </mesh>
      <mesh position={[0.12, 1.62, 0.1]} material={foliageA} {...pointerHandlers}>
        <icosahedronGeometry args={[0.32, 1]} />
      </mesh>

      <mesh
        position={[0.1, 1.38, 0.06]}
        rotation={[0.15, 0.35, -0.42]}
        material={bark}
        {...pointerHandlers}
      >
        <cylinderGeometry args={[0.018, 0.022, 0.38, 6]} />
      </mesh>
      <mesh
        position={[0.38, 1.52, 0.2]}
        rotation={[0.2, 0.5, -0.55]}
        material={bark}
        {...pointerHandlers}
      >
        <cylinderGeometry args={[0.014, 0.017, 0.26, 6]} />
      </mesh>

      <group ref={leavesRef} position={[0.02, 1.48, 0.06]} renderOrder={2}>
        {LEAF_LAYOUT.map((leaf, i) => (
          <mesh
            key={i}
            position={leaf.pos}
            scale={[leaf.scale, leaf.scale, 1]}
            rotation={[0.25, 0.35, 0.1]}
            renderOrder={2}
            material={leafMat}
            {...pointerHandlers}
          >
            <planeGeometry args={[0.2, 0.11]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function NewtonAppleScene({
  onTreeHover,
  interactive = false,
}: {
  onTreeHover?: (hovered: boolean) => void;
  interactive?: boolean;
}) {
  const appleRef = useRef<Group>(null);

  const handleTreeHover = useCallback(
    (hovered: boolean) => {
      if (interactive) onTreeHover?.(hovered);
    },
    [interactive, onTreeHover],
  );

  const appleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ef4444",
        emissive: "#991b1b",
        emissiveIntensity: 0.18,
        roughness: 0.38,
        metalness: 0.04,
      }),
    [],
  );

  useFrame((state, delta) => {
    const apple = appleRef.current;
    if (!apple) return;

    const elapsed = state.clock.elapsedTime;
    const phase = elapsed % CYCLE;

    if (phase < 1.6) {
      const wobble = Math.sin(elapsed * 2.5) * 0.01;
      apple.position.set(BRANCH.x, BRANCH.y + wobble, BRANCH.z);
      apple.rotation.set(0, 0, 0);
      appleMat.opacity = 1;
      appleMat.transparent = false;
    } else if (phase < 2.85) {
      const p = easeInQuad((phase - 1.6) / 1.25);
      apple.position.lerpVectors(BRANCH, FALL_END, p);
      apple.position.x += Math.sin(p * Math.PI) * 0.03;
      apple.rotation.x += delta * 2.4;
      appleMat.opacity = 1;
      appleMat.transparent = false;
    } else if (phase < 3.45) {
      apple.position.copy(FALL_END);
      apple.rotation.z += delta * 0.2;
      appleMat.opacity = 1;
    } else {
      const p = (phase - 3.45) / (CYCLE - 3.45);
      appleMat.transparent = true;
      if (p < 0.35) {
        appleMat.opacity = 1 - p / 0.35;
      } else {
        apple.position.copy(BRANCH);
        apple.rotation.set(0, 0, 0);
        appleMat.opacity = Math.min(1, (p - 0.35) / 0.65);
      }
    }
  });

  return (
    <group rotation={[0, -0.38, 0]} position={[0, 0.02, 0]} scale={0.8}>
      <Tree onTreeHover={handleTreeHover} interactive={interactive} />
      <group ref={appleRef} renderOrder={3}>
        <mesh material={appleMat} renderOrder={3}>
          <sphereGeometry args={[0.09, 20, 20]} />
        </mesh>
        <mesh position={[0, 0.065, 0]} rotation={[0.15, 0, -0.35]} renderOrder={3}>
          <cylinderGeometry args={[0.006, 0.006, 0.038, 5]} />
          <meshStandardMaterial color="#3f6212" roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
}
