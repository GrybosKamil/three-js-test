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
  { url: "/painting/Kinga/Bodzio-z-sasiadem-2022.jpg" },
  { url: "/painting/Kinga/Gucio-z-ogorkiem-2023.jpg" },
  { url: "/painting/Kinga/Kamus-z-Bodziem-2023.jpg" },
  { url: "/painting/Kinga/Kompozycja-z-tabletek-2023.jpg" },
  { url: "/painting/Kinga/Kosmo-akwarium-2024.jpg" },
  { url: "/painting/Kinga/Koty-2022.jpg" },
  { url: "/painting/Kinga/Koty-nocy-2023.jpg" },
  { url: "/painting/Kinga/Kroliczek-2023.jpg" },
  { url: "/painting/Kinga/Madness-2-2024.jpg" },
  { url: "/painting/Kinga/Oni-patrza-2024.jpg" },
  { url: "/painting/Kinga/W-szklarni-pani-Ani-2024.jpg" },
  { url: "/painting/Kinga/Wciaz-zywa-w-srodku-martwa-2020.jpg" },
  { url: "/painting/Kinga/Zakile-2024.jpg" },
  { url: "/painting/Kinga/Zamyslona-2022.jpg" },
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
