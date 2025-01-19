// import { Intro } from "./rtf/Intro.tsx";
// import { FirstScene } from "./rtf/FirstScene.tsx";
import { Canvas } from "@react-three/fiber";
import { GalleryScene } from "./rtf/gallery/GalleryScene.tsx";

function App() {
  return (
    <>
      {/* <Intro /> */}
      {/* <FirstScene /> */}
      <Canvas>
        <GalleryScene />
      </Canvas>
    </>
  );
}

export default App;
