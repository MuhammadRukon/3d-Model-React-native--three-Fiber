import React from "react";

const Floor = ({ height }: { height: number }) => {
  return (
    <mesh position={[0, height, 0]} rotation={[0, Math.PI * 0.25, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default Floor;
