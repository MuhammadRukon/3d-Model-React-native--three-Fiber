import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei/native";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { AxesHelper } from "three";

export default function Model(props) {
  const { onLoaded, ...restProps } = props;

  // Load the STL geometry
  const geometry = useLoader(STLLoader, require("./../../models/duplex.STL"));

  // Effect to call onLoaded when the model is loaded
  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  return (
    <group {...restProps} dispose={null} scale={0.0002} position={[0, -1, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={new THREE.MeshStandardMaterial({ color: "white" })} // Set a color for better visibility
        rotation={[-Math.PI / 2.2, 0, 0]} // Adjust rotation as necessary
      />
      {/* Uncomment the following line to see axes for debugging */}
      <axesHelper args={[5]} />
    </group>
  );
}
