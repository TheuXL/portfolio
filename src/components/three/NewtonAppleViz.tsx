"use client";

import { ThreeCanvasShell } from "@/components/three/ThreeCanvasShell";
import { NewtonAppleScene } from "@/components/three/NewtonAppleScene";
import { NewtonAppleCamera } from "@/components/three/NewtonAppleCamera";

export function NewtonAppleViz({
  className = "",
  onTreeHover,
  interactive = false,
}: {
  className?: string;
  onTreeHover?: (hovered: boolean) => void;
  interactive?: boolean;
}) {
  return (
    <ThreeCanvasShell
      className={className}
      camera={{ position: [0.22, 0.8, 4.35], fov: 50 }}
      dpr={[1, 2]}
      interactive={interactive}
    >
      <NewtonAppleCamera />
      <ambientLight intensity={0.62} />
      <directionalLight position={[1.5, 3.5, 3]} intensity={1} />
      <directionalLight position={[-2, 2, 1]} intensity={0.35} color="#bbf7d0" />
      <pointLight position={[1.2, 1.2, 2]} intensity={0.4} color="#fef08a" />
      <NewtonAppleScene
        onTreeHover={onTreeHover}
        interactive={interactive}
      />
    </ThreeCanvasShell>
  );
}
