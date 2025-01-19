import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

export function GalleryScene() {
  const paintings: PaintingProps[] = [
    {
      url: "/public/paiting/mona-lisa.jpg",
      width: 1,
      height: 1,
      position: [-2, 0, 0],
    },
    {
      url: "/public/paiting/last-supper.jpg",
      width: 1,
      height: 1,
      position: [0, 0, 0],
    },
    {
      url: "/public/paiting/man.jpg",
      width: 1,
      height: 1,
      position: [2, 0, 0],
    },
  ];

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={<div>Loading...</div>}>
        {paintings.map((painting) => (
          <Painting
            key={painting.url}
            url={painting.url}
            position={painting.position}
            width={painting.width}
            height={painting.height}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}

interface PaintingProps {
  url: string;
  width: number;
  height: number;
  position: [number, number, number];
}

function Painting({ url, position, width, height }: PaintingProps) {
  const texture = useLoader(THREE.TextureLoader, url);

  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
