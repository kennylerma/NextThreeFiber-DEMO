import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { AnimationAction, AnimationClip, MathUtils, Matrix4, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Controls } from './types';

const SPEED:number = .0215;

const Character = () => {
  const { camera } = useThree();
  const { scene, nodes, animations } = useGLTF('/models/IndieGuyWithAnimations.glb');
  const { ref, actions, names, mixer, clips } = useAnimations(animations);

  const currentPosition = useRef<Vector3>(new Vector3(0, 0, 0));
  const currentLookat = useRef<Vector3>(new Vector3(0, 0, 0));

  const forwardPressed = useKeyboardControls<Controls>(state => state.forward);
  const backPressed = useKeyboardControls<Controls>(state => state.back);
  const leftPressed = useKeyboardControls<Controls>(state => state.left);
  const rightPressed = useKeyboardControls<Controls>(state => state.right);

  const previousAction = useRef<AnimationAction>(null);

  for (let node in nodes)
  {
    nodes[node].castShadow = true;
    nodes[node].receiveShadow = true;
  }

  useEffect(() => {
    
    if (previousAction.current)
    {
      previousAction.current.fadeOut(.5);
    }
    
    if (forwardPressed)
    {
      actions?.Walk.reset().fadeIn(.2).play();
      previousAction.current = actions?.Walk;
    }
    else
    {
      actions?.Idle.reset().fadeIn(.2).play();
      previousAction.current = actions?.Idle;
    }
  },[actions, forwardPressed]);


  const idealOffset = ():Vector3 => {
    const offset = new Vector3(0, .6, 1.6);
    offset.applyQuaternion(ref.current.quaternion);
    offset.add(ref.current.position);

    return offset;
  }

  const idealLookAt = ():Vector3 => {
    const lookat = new Vector3(0, .6, 0);
    lookat.applyQuaternion(ref.current.quaternion);
    lookat.add(ref.current.position);

    return lookat;
  }

  useFrame(()=> {
    if (forwardPressed) ref.current.translateZ(-SPEED);
    if (backPressed) ref.current.translateZ(SPEED);
    if (leftPressed) ref.current.rotateY(.1);
    if (rightPressed) ref.current.rotateY(-.1);

    currentPosition.current.lerp(idealOffset(), .1);
    currentLookat.current.lerp(idealLookAt(), .1);

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookat.current);

  });
  
  return (
    <primitive ref={ref} object={scene} scale={[.5,.5,.5]}/>
  );
}

export default Character;