import { FC } from "react";
import { AmbientLight } from "three";

const LightAmbient: FC = () => {
  return <ambientLight intensity={0.5} />;
};

export default LightAmbient;
