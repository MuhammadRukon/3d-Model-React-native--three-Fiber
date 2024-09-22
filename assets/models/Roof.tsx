import React from "react";

const Roof = ({ height }: { height: number }) => {
  return (
    <mesh position={[0, height - 0.25, 0]}>
      <coneGeometry args={[0.8, 0.5, 4]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
};

export default Roof;
