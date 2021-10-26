import React, { useRef, useState } from "react";
import * as THREE from "three";
// SASS extension - SASS for CSS like TypeScript for JavaScript
import "../styles/Three.scss";

import { Canvas, useFrame } from "@react-three/fiber";

import { softShadows, OrbitControls } from "@react-three/drei";

softShadows();

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  const texture = new THREE.TextureLoader().load(
    "https://ipfs.io/ipfs/Qmb3UJty18tWfsF1PrfApxGvrjMFpakAVsvaTwUYdNhbtK"
  );

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.02;
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

const arr = new Array(10).fill(0).map((el, index) => {
  return 3 * index - 9;
});

function Token(props) {
  return (
    <>
      {/* shadows instead of shadowMap */}
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[10, 20, -10]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        {/* This is our floor */}
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <shadowMaterial attach="material" opacity={0.3} />
            <meshStandardMaterial attach="material" color="blue" />
          </mesh>
          {arr.map((el1, index, arr) => {
            return arr.map((el2) => {
              return (
                <SpinningMesh
                  key={[el1, el2]}
                  position={[el1, 1, el2]}
                  args={[1, 1, 0.1, 50]}
                  speed={2}
                />
              );
            });
          })}
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}
export default Token;
