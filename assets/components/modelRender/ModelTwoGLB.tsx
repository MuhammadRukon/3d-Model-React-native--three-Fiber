import React from "react";
import { useGLTF } from "@react-three/drei/native";

export default function ModelGLB(props) {
  const { onLoaded } = props;
  const { nodes, materials } = useGLTF(require("./../../models/wheel.glb"));

  console.log("Nodes:", nodes);
  console.log("Materials:", materials);

  onLoaded();

  return (
    <group {...props} dispose={null} scale={5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IN_142BM?.geometry} // Update this to the correct node name
        material={materials.tire_mat} // Update this to the correct material name
        rotation={[-Math.PI / 2.2, 0, -1.5]}
      />
    </group>
  );
}

useGLTF.preload(require("./../../models/wheel.glb"));
