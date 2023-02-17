import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import { AnimationAction, Vector3 } from "three";

const Character: FC = () => {
  const { scene, nodes, animations } = useGLTF("/models/GuyWithAnimations.glb");
  const { ref, actions } = useAnimations(animations);
  const { camera } = useThree();
  for (let key in nodes) {
    nodes[key].castShadow = true;
    nodes[key].receiveShadow = true;
  }
  const SPEED: number = 0.0215;
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const currentPosition = useRef<Vector3>(new Vector3(0, 0, 0));
  const currentLookat = useRef<Vector3>(new Vector3(0, 0, 0));
  const previousAction = useRef<AnimationAction | null>(null);
  const [currentAction, setCurrentAction] = useState("Idle");

  useEffect(() => {
    if (actions.Idle && !previousAction.current) {
      actions?.Idle.play();
      previousAction.current = actions?.Idle;
    }

    if ((forward || left || right) && actions?.Walk) {
      if (currentAction !== "Walk") {
        previousAction.current
          ?.crossFadeTo(actions?.Walk, 0.5, false)
          .reset()
          .fadeIn(0.2)
          .play();
        previousAction.current = actions?.Walk;
        setCurrentAction("Walk");
      }
    } else {
      if (currentAction !== "Idle" && actions?.Idle) {
        previousAction.current
          ?.crossFadeTo(actions?.Idle, 0.5, false)
          .reset()
          .fadeIn(0.2)
          .play();
        previousAction.current = actions?.Idle;
        setCurrentAction("Idle");
      }
    }
  }, [forward, left, right]);

  const cameraOffset = (): Vector3 => {
    const offset: Vector3 = new Vector3(0, 2.5, 2.6);
    if (ref.current) {
      offset.applyQuaternion(ref.current?.quaternion);
      offset.add(ref.current.position);
    }
    return offset;
  };

  const cameraLookAt = (): Vector3 => {
    const lookat = new Vector3(0, 2, 0);
    if (ref.current) {
      lookat.applyQuaternion(ref.current.quaternion);
      lookat.add(ref.current.position);
    }

    return lookat;
  };

  useFrame(() => {
    if (forward) ref.current?.translateZ(-SPEED);
    if (backward) ref.current?.translateZ(SPEED);
    if (left) ref.current?.rotateY(0.05);
    if (right) ref.current?.rotateY(-0.05);

    currentPosition.current.lerp(cameraOffset(), 0.1);
    currentLookat.current.lerp(cameraLookAt(), 0.1);

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookat.current);
  });

  actions?.Idle?.reset().play();

  return <primitive ref={ref} object={scene} scale={[0.5, 0.5, 0.5]} />;
};

export default Character;
