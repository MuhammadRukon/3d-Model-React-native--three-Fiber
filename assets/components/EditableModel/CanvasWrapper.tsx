import React from "react";
import { Canvas } from "@react-three/fiber/native";

import Floor from "../../models/Floor";
import Roof from "../../models/Roof";
interface Props {
  floors: number[];
  showRoof: boolean;
  OrbitControls: any;
}
const CanvasWrapper = ({ floors, showRoof, OrbitControls }: Props) => {
  return (
    <Canvas camera={{ near: 0.5, far: 100, position: [0, 0, 5] }}>
      <OrbitControls enablePan={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 10]} intensity={1} color="white" />
      {showRoof && <Roof height={floors.length} />}
      {floors.map((floor) => (
        <Floor key={floor} height={floor} />
      ))}
    </Canvas>
  );
};

export default CanvasWrapper;
