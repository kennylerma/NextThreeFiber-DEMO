import { FC } from "react";

const LightDirect: FC = () => {
  return (
    <directionalLight
      position={[2, 4, 2]}
      castShadow
      intensity={1}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-bias={-0.00001}
    />
  );
};

export default LightDirect;
