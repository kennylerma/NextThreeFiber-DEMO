import { Canvas } from "@react-three/fiber";
import LightAmbient from "../components/scene/LightAmbient";
import Terrain from "../components/scene/Terrain";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import css from "../styles/Home.module.css";
import LightDirect from "../components/scene/LightDirect";
import BasicCube from "../components/scene/BasicCube";
import { NextPage } from "next";
import Character from "../components/scene/Character";
import { PCFSoftShadowMap } from "three";

const Home: NextPage = (props) => {
  const controls = [
    { name: "forward", keys: ["w"] },
    { name: "backward", keys: ["s"] },
    { name: "left", keys: ["a"] },
    { name: "right", keys: ["d"] },
  ];

  return (
    <div className={css.scene}>
      <KeyboardControls map={controls}>
        <Canvas
          className={css.canvas}
          camera={{ position: [0, 0.6, 1.6] }}
          shadows={{ enabled: true, type: PCFSoftShadowMap }}
        >
          <LightAmbient />
          <LightDirect />
          <Terrain />
          <BasicCube visible={true} />
          <Character />
          {/* <OrbitControls makeDefault /> */}
        </Canvas>
      </KeyboardControls>
    </div>
  );
};

export default Home;
