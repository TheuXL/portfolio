"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Enquadra tronco + copa inteiros no viewport da miniatura. */
export function NewtonAppleCamera() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    const target = new THREE.Vector3(0.06, 0.78, 0);
    camera.position.set(0.22, 0.8, 4.35);
    camera.lookAt(target);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 50;
      camera.near = 0.05;
      camera.far = 30;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return null;
}
