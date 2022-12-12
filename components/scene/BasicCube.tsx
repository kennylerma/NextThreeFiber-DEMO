import { FC } from "react";
import { IBasicCubeProps } from "./types";

const BasicCube: FC<IBasicCubeProps> = ({ visible = true }) => {
  return (
    <mesh castShadow position={[0, 0.25, 0]} visible={visible}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  );
};

export default BasicCube;
