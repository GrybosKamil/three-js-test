import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type PaintingProps = {
  url: string;
  initialPosition?: THREE.Vector3;
  initialRotation?: THREE.Euler;
};

export function Painting({
  url,
  initialPosition,
  initialRotation,
}: PaintingProps) {
  const texture = useLoader(THREE.TextureLoader, url);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  const meshRef = useRef<THREE.Mesh>(null);

  const [rotationDirection] = useState<THREE.Euler>(
    new THREE.Euler(
      getRandomNumberInRange(-0.005, 0.005),
      getRandomNumberInRange(-0.005, 0.005),
      getRandomNumberInRange(-0.005, 0.005)
    )
  );

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setDimensions({ width: aspectRatio, height: 1 });
    };
  }, [url]);

  const position = initialPosition
    ? initialPosition
    : new THREE.Vector3(
        getRandomNumberInDefaultRange(),
        getRandomNumberInDefaultRange(),
        getRandomNumberInDefaultRange()
      );

  const rotation = initialRotation
    ? initialRotation
    : new THREE.Euler(
        getRandomNumberInRange(0, Math.PI * 2),
        getRandomNumberInRange(0, Math.PI * 2),
        getRandomNumberInRange(0, Math.PI * 2)
      );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationDirection.x;
      meshRef.current.rotation.y += rotationDirection.y;
      meshRef.current.rotation.z += rotationDirection.z;
    }
  });

  return (
    <Suspense
      key={url + "-suspense"}
      fallback={<FallbackPaiting key={url + "-fallback"} position={position} />}
    >
      <mesh ref={meshRef} position={position} name={url} rotation={rotation}>
        <boxGeometry args={[dimensions.width, dimensions.height, 0.1]} />
        <meshBasicMaterial attach="material-0" color="black" />
        <meshBasicMaterial attach="material-1" color="black" />
        <meshBasicMaterial attach="material-2" color="black" />
        <meshBasicMaterial attach="material-3" color="black" />
        <meshBasicMaterial attach="material-4" map={texture} />
        <meshBasicMaterial attach="material-5" map={texture} />
      </mesh>
    </Suspense>
  );
}

function FallbackPaiting({ position }: { position: THREE.Vector3 }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="lightblue" />
    </mesh>
  );
}

function getRandomNumberInDefaultRange() {
  return getRandomNumberInRange(-3, 3);
}

function getRandomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
