import { useGLTF } from "@react-three/drei";
import { FC } from "react";


const House: FC = () => {
    const { scene, nodes } = useGLTF("/models/House.glb");
    for (let key in nodes) {
        nodes[key].castShadow = true;
        nodes[key].receiveShadow = true;
    }

    return <primitive object={scene} scale={[0.07, 0.07, 0.07]} />;
};

export default House;