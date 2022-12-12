import { FC } from "react";

const Terrain: FC = () => {
  return (
    <mesh receiveShadow rotation-x={Math.PI * -0.5}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={"#464646"} />
    </mesh>
  );
};

export default Terrain;
