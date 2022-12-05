import { useGLTF } from '@react-three/drei';

// Dom components go here
export default function Page(props) {
  return (
    <></>
  )
}

const Terrain = () => {
  
  return (
    <mesh receiveShadow rotation-x={Math.PI * -.5}>
      <planeGeometry args={[10, 10]}/>
      <meshStandardMaterial color={"#464646"}/>
    </mesh>
  );
}

const Farm = () => {
  const { scene, nodes } = useGLTF('/models/mini_home.glb');
  
  for (let node in nodes)
  {
    nodes[node].castShadow = true;
    nodes[node].receiveShadow = true;
  }

  return (
    <primitive object={scene}/>
  );
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => {
  return (
    <>
    <Terrain/>
    <Farm/>
    </>
  );
}

export async function getStaticProps() {
  return { props: { title: 'Next Three' } }
}