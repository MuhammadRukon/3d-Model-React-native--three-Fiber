import React from "react";
import { useGLTF } from "@react-three/drei/native";

export default function ModelGLB(props) {
  const { onLoaded } = props;
  const { nodes, materials } = useGLTF(require("./../../models/dollar.glb"));

  onLoaded();

  return (
    <group {...props} dispose={null} scale={0.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Meshgrass1Mtl.001"]}
        rotation={[-Math.PI / 2.2, 0, -1.5]}
      />
    </group>
  );
}

useGLTF.preload(require("./../../models/dollar.glb"));
