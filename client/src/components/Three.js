import React, { useRef } from "react";

// SASS extension - SASS for CSS like TypeScript for JavaScript
import "../styles/Three.scss";

import { Canvas, useFrame } from "@react-three/fiber";

// import { Box } from "@react-three/drei";

const SpinningMesh = (props) => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

function Three(props) {
  return (
    <>
      <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <SpinningMesh position={[0, 1, 0]} />
        <SpinningMesh position={[-2, 1, -5]} />
        <SpinningMesh position={[5, 1, -2]} />
      </Canvas>
    </>
  );
}
export default Three;
