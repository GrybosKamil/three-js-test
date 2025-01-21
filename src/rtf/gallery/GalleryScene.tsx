import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
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
  const controlPosition = new THREE.Vector3(0, 0, 0);

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
      <OrbitControls position={controlPosition} />
    </>
  );
}
