import { useState, useEffect, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
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
      <Suspense fallback={null}>
        {paintings.map((painting) => (
          <Painting
            key={painting.url}
            url={painting.url}
            position={painting.position}
          />
        ))}
      </Suspense>
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
    <mesh position={position}>
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
