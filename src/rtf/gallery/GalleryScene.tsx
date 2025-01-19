import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Painting, PaintingProps } from "./Paiting";

const paintings: PaintingProps[] = [
  // { url: "/painting/mona-lisa.jpg" },
  // { url: "/painting/last-supper.jpg" },
  // { url: "/painting/man.jpg" },
  { url: "/painting/Kinga/Diana-2024.jpg" },
  { url: "/painting/Kinga/Koci-demon-2024.jpg" },
  { url: "/painting/Kinga/Luna-z-bombkami-2024.jpg" },
  { url: "/painting/Kinga/Madness-3-2024.jpg" },
  { url: "/painting/Kinga/Marzenie-2024.jpg" },
  { url: "/painting/Kinga/Samotnosc-duszy-2024.jpg" },
  { url: "/painting/Kinga/Zmeczony-Kamil-2024.jpg" },
];

export function GalleryScene() {
  const { speed, radius } = useMemo(
    () => ({
      speed: Math.random() * 0.1 + 0.1,
      radius: Math.random() * 0.1,
    }),
    []
  );

  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.cos(elapsedTime * speed) * radius;
    camera.position.y = Math.cos(elapsedTime * speed) * radius;
    camera.position.z = Math.sin(elapsedTime * speed) * radius;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      {paintings.map((painting) => (
        <Painting
          key={painting.url}
          url={painting.url}
          initialPosition={painting.initialPosition}
        />
      ))}
      <OrbitControls />
    </>
  );
}
