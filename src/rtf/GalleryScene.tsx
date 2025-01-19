import { useState, useEffect, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const paintings: PaintingProps[] = [
  {
    url: "/paiting/mona-lisa.jpg",
    position: [-2, 0, 0],
  },
  {
    url: "/paiting/last-supper.jpg",
    position: [0, 0, 0],
  },
  {
    url: "/paiting/man.jpg",
    position: [2, 0, 0],
  },
];

export function GalleryScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      {paintings.map((painting) => (
        <Painting
          key={painting.url}
          url={painting.url}
          position={painting.position}
        />
      ))}
      <OrbitControls />
    </Canvas>
  );
}

interface PaintingProps {
  url: string;
  position: [number, number, number];
}

function Painting({ url, position }: PaintingProps) {
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
      fallback={<FallbackPaiting key={url + "-fallback"} position={position} />}
    >
      <mesh position={position}>
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

function FallbackPaiting({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="lightblue" />
    </mesh>
  );
}
