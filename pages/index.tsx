import { Canvas } from "@react-three/fiber";
import LightAmbient from "../components/scene/LightAmbient";
import Terrain from "../components/scene/Terrain";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import css from "../styles/Home.module.css";
import LightDirect from "../components/scene/LightDirect";
import BasicCube from "../components/scene/BasicCube";
import { NextPage, NextPageContext } from "next";
import Character from "../components/scene/Character";
import { PCFSoftShadowMap } from "three";
import { getUserDetails } from "./api/userdata";
import House from "../components/scene/House";


interface HomePageProps {
  userDetails: {
    name: string;
    work: string;
  };
}

const Home: NextPage<HomePageProps> = (props) => {
  console.log("User Details", props.userDetails);

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
          camera={{ position: [0, 1, 1.6] }}
          shadows={{ enabled: true, type: PCFSoftShadowMap }}
        >
          <LightAmbient />
          <LightDirect />
          {/* <Terrain /> */}
          <House />
          <BasicCube visible={false} />
          <Character />
          {/* <OrbitControls makeDefault /> */}
        </Canvas>
      </KeyboardControls>
    </div>
  );
};

export const getServerSideProps = (context: NextPageContext) => {
  const userDetails = getUserDetails();

  return {
    props: {
      userDetails,
    },
  };
};

export default Home;
