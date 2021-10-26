import React, { useRef, useState } from "react";
import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);

  //* In load put whatever URL to change
  //* token texture
  const texture = new THREE.TextureLoader().load(
    "https://ipfs.io/ipfs/QmSqW4dSSmEPo3envs3FP3wo226hnmdW8dtJd1xStzvJgE"
  );

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  const [expand, setExpland] = useState(false);

  return (
    <mesh
      onClick={() => setExpland(!expand)}
      castShadow
      position={position}
      ref={mesh}
    >
      <cylinderBufferGeometry castShadow attach="geometry" args={args} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

function BigSpinningCoin(props) {
  return (
    // <div
    //   style={{
    //     display: "inline-block",
    //     // maxHeight: "5000px",
    //     // maxWidth: "5000px",
    //   }}
    // >
    <Canvas
      shadows
      camera={{ position: [-5, 2, 10], fov: 60 }}
      style={
        {
          // bottom: "0px",
        }
      }
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />

      <SpinningMesh position={[0, 0, 0]} args={[5.5, 5.5, 0.3, 50]} speed={2} />
    </Canvas>
    // </div>
  );
}
export default BigSpinningCoin;
