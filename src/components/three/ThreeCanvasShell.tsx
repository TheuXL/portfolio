"use client";

import { Canvas } from "@react-three/fiber";
import { type ReactNode, useEffect, useState } from "react";
import { ThreeSceneFallback } from "@/components/three/ThreeSceneFallback";
import { useClientMounted } from "@/components/three/use-client-mounted";
import { useReducedMotion3d } from "@/components/three/use-reduced-motion-3d";

type CameraProps = {
  position: [number, number, number];
  fov: number;
};

function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

export function ThreeCanvasShell({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 50 },
  fallbackLabel,
  dpr = [1, 1.5],
}: {
  children: ReactNode;
  className?: string;
  camera?: CameraProps;
  fallbackLabel?: string;
  dpr?: [number, number];
}) {
  const mounted = useClientMounted();
  const reduced = useReducedMotion3d();
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    setWebglOk(canUseWebGL());
  }, []);

  if (!mounted || reduced || !webglOk) {
    return (
      <ThreeSceneFallback
        className={className}
        label={reduced ? undefined : fallbackLabel}
      />
    );
  }

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={camera}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setWebglOk(false);
          });
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
