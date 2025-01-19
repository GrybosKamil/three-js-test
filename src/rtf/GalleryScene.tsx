import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function getRandomNumberInDefaultRange() {
  return getRandomNumberInRange(-5, 5);
}

function getRandomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const paintings: PaintingProps[] = [
  {
    url: "/paiting/mona-lisa.jpg",
    initialPosition: new THREE.Vector3(
      getRandomNumberInDefaultRange(),
      getRandomNumberInDefaultRange(),
      getRandomNumberInDefaultRange()
    ),
  },
  {
    url: "/paiting/last-supper.jpg",
    initialPosition: new THREE.Vector3(
      getRandomNumberInDefaultRange(),
      getRandomNumberInDefaultRange(),
      getRandomNumberInDefaultRange()
    ),
  },
  {
    url: "/paiting/man.jpg",
    initialPosition: new THREE.Vector3(
      getRandomNumberInDefaultRange(),
      getRandomNumberInDefaultRange(),
      getRandomNumberInDefaultRange()
    ),
  },
];

export function GalleryScene() {
  const controlPosition = new THREE.Vector3(30, 0, 0);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      {paintings.map((painting) => (
        <Painting
          key={painting.url}
          url={painting.url}
          initialPosition={painting.initialPosition}
        />
      ))}
      <OrbitControls position={controlPosition} />
    </Canvas>
  );
}

interface PaintingProps {
  url: string;
  initialPosition: THREE.Vector3;
}

function Painting({ url, initialPosition }: PaintingProps) {
  const texture = useLoader(THREE.TextureLoader, url);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setDimensions({ width: aspectRatio, height: 1 });
    };
  }, [url]);

  return (
    <Suspense
      key={url + "-suspense"}
      fallback={
        <FallbackPaiting key={url + "-fallback"} position={initialPosition} />
      }
    >
      <mesh position={initialPosition} name={url}>
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
