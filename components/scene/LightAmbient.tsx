import { FC } from "react";
import { AmbientLight } from "three";

const LightAmbient: FC = () => {
  return <ambientLight intensity={0.75} />;
};

export default LightAmbient;
