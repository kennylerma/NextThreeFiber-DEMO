import { Canvas } from '@react-three/fiber';
import { KeyboardControls, OrbitControls, Preload, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLight, DirectionalLightHelper } from 'three';
import Character from './Character';
import { Controls } from './types';

const DirectLight = () => {
  const directLight = useRef<DirectionalLight>(null);
  useHelper(directLight, DirectionalLightHelper, 1, 'orange');

  return (
    <directionalLight 
      ref={directLight} 
      castShadow={true}
      intensity={1} 
      position={[2, 4, 2]} 
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-bias={-.0001}
    />
  );
}

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  
  return (
    <KeyboardControls
      map={[
        { name: Controls.forward, keys: ["ArrowUp", "w", "W"] },
        { name: Controls.back, keys: ["ArrowDown", "s", "S"] },
        { name: Controls.left, keys: ["ArrowLeft", "a", "A"] },
        { name: Controls.right, keys: ["ArrowRight", "d", "D"] },
        { name: Controls.jump, keys: ["Space"] },
      ]}>
    <Canvas camera={{ position: [0, .6, 1.6], rotation:[0,0,0] }} shadows {...props}>
      <DirectLight />
      <ambientLight intensity={0.75} />
      <Character/>
      {children}
      <Preload all />
    </Canvas>
    </KeyboardControls>
  )
}
